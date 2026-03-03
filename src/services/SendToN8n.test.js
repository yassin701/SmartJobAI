import axios from "axios";
import { sendToN8n } from "./SendToN8n";

// 1. Mock the axios library so we don't make real network requests in tests
jest.mock("axios");

describe("sendToN8n", () => {
    // 2. Clear out any previous mock data before each test runs
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should successfully send data to n8n via a POST request", async () => {
        // Setup (Arrange): Create fake data and a fake response
        const fakeApplicationData = { name: "Yassin", email: "yassin@example.com" };
        const fakeApiResponse = { data: { success: true, message: "Application received" } };

        // Tell our mocked axios to return our fake response when called
        axios.post.mockResolvedValue(fakeApiResponse);

        // Execution (Act): Call the function
        const result = await sendToN8n(fakeApplicationData);

        // Verification (Assert): Check the results
        // -> Did it return the exact data property from the response?
        expect(result).toEqual(fakeApiResponse.data);

        // -> Was axios.post called exactly once?
        expect(axios.post).toHaveBeenCalledTimes(1);

        // -> Was axios.post called with the right arguments?
        // Note: Due to babel-plugin-transform-vite-meta-env, import.meta.env becomes process.env in tests
        expect(axios.post).toHaveBeenCalledWith(
            process.env.VITE_N8N_API_KEY,
            fakeApplicationData,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    });

    it("should throw an error when the POST request fails", async () => {
        // Setup (Arrange): Make axios throw an error
        const fakeApplicationData = { name: "Jane" };
        const fakeError = new Error("Network connection failed");

        axios.post.mockRejectedValue(fakeError);

        // Execution & Verification (Act & Assert)
        // -> Expect the function to throw the exact error we fed to axios
        await expect(sendToN8n(fakeApplicationData)).rejects.toThrow("Network connection failed");
    });
});
