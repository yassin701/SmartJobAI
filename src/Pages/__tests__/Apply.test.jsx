import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ApplyForm from "../Apply";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { sendApplication } from "../../Redux/applySlice";
import { uploadCV } from "../../services/UploadCV";
import { sendToN8n } from "../../services/SendToN8n";

// Mocking dependencies
vi.mock("react-redux", () => ({
    useDispatch: vi.fn(),
    useSelector: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
    useParams: vi.fn(),
}));

vi.mock("../../Redux/applySlice", () => ({
    sendApplication: vi.fn(),
    resetApplyState: vi.fn(),
}));

vi.mock("../../services/UploadCV", () => ({
    uploadCV: vi.fn(),
}));

vi.mock("../../services/SendToN8n", () => ({
    sendToN8n: vi.fn(),
}));

// Mocking child components to keep test focused
vi.mock("../../Components/GenerateMotivationButton", () => ({
    default: () => <button data-testid="generate-motivation">Generate</button>,
}));

vi.mock("../../Components/Tips", () => ({
    default: () => <div data-testid="tips">Tips Sidebar</div>,
}));

vi.mock("../../Components/Footer", () => ({
    default: () => <footer>Footer</footer>,
}));

describe("ApplyForm Component", () => {
    const mockDispatch = vi.fn();
    const mockJob = {
        title: "Software Engineer",
        company: "Tech Corp",
        location: "Remote",
        contract: "Full-time",
    };

    beforeEach(() => {
        vi.clearAllMocks();
        useDispatch.mockReturnValue(mockDispatch);
        useParams.mockReturnValue({ id: "123" });
        useSelector.mockReturnValue({ loading: false, success: false, error: null });
    });

    it("renders the form with initial labels and fields", () => {
        render(<ApplyForm job={mockJob} />);

        expect(screen.getByText(/Application Form/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/John Doe/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/john@example.com/i)).toBeInTheDocument();
        expect(screen.getByText(/Professional Domain/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/React, JavaScript, Node.js, Python.../i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Explain why you're interested/i)).toBeInTheDocument();
        expect(screen.getByText(/Click to upload your CV/i)).toBeInTheDocument();
    });

    it("shows validation errors when submitting an empty form", async () => {
        render(<ApplyForm job={mockJob} />);

        const submitButton = screen.getByRole("button", { name: /Submit Application/i });
        fireEvent.click(submitButton);

        expect(await screen.findByText(/Name is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Domain is required/i)).toBeInTheDocument();
        expect(screen.getByText(/Skills are required/i)).toBeInTheDocument();
        expect(screen.getByText(/Motivation letter is required/i)).toBeInTheDocument();
        expect(screen.getByText(/CV is required/i)).toBeInTheDocument();
    });

    it("successfully submits the form when all fields are filled", async () => {
        uploadCV.mockResolvedValue("https://fakecvurl.com/cv.pdf");

        render(<ApplyForm job={mockJob} />);

        // Fill fields
        fireEvent.change(screen.getByPlaceholderText(/John Doe/i), { target: { value: "Jane Doe" } });
        fireEvent.change(screen.getByPlaceholderText(/john@example.com/i), { target: { value: "jane@test.com" } });
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "Front-End Development" } });
        fireEvent.change(screen.getByPlaceholderText(/React, JavaScript/i), { target: { value: "React, CSS" } });
        fireEvent.change(screen.getByPlaceholderText(/Explain why you're interested/i), { target: { value: "I am a great dev." } });

        // Mock file upload
        const file = new File(["dummy content"], "resume.pdf", { type: "application/pdf" });
        const fileInput = screen.getByLabelText(/Click to upload your CV/i);
        // Note: Applying file to hidden input via label click or finding by display text might be tricky.
        // Let's use the actual file input if possible.
        const hiddenFileInput = document.querySelector('input[type="file"]');
        fireEvent.change(hiddenFileInput, { target: { files: [file] } });

        const submitButton = screen.getByRole("button", { name: /Submit Application/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(uploadCV).toHaveBeenCalledWith(file);
            expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function)); // for sendApplication thunk
            expect(sendToN8n).toHaveBeenCalled();
        });
    });

    it("displays a success message when the application is successfully sent", () => {
        useSelector.mockReturnValue({ loading: false, success: true, error: null });

        render(<ApplyForm job={mockJob} />);

        expect(screen.getByText(/Application Submitted!/i)).toBeInTheDocument();
        expect(screen.getByText(/We've received your application/i)).toBeInTheDocument();
    });

    it("displays an error message when the application fails", () => {
        useSelector.mockReturnValue({ loading: false, success: false, error: "Something went wrong" });

        render(<ApplyForm job={mockJob} />);

        expect(screen.getByText(/Submission Failed/i)).toBeInTheDocument();
        expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    });
});
