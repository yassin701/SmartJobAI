import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Navbar from "../Navbar";

const renderNavbar = (initialPath = "/") => {
    return render(
        <MemoryRouter initialEntries={[initialPath]}>
            <Navbar />
        </MemoryRouter>
    );
};

describe("Navbar Component", () => {
    it("renders correctly with logo and primary links", () => {
        renderNavbar();

        expect(screen.getByText(/SmartJob/i)).toBeInTheDocument();
        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Jobs")).toBeInTheDocument();
        expect(screen.getByText("Apply")).toBeInTheDocument();
        expect(screen.getByText("Admin")).toBeInTheDocument();
    });

    it("applies active styles to the Home link when at root path", () => {
        renderNavbar("/");

        // Desktop NavLink for Home
        const homeLink = screen.getByRole("link", { name: /home/i });
        // Based on Navbar.jsx: isActive ? "bg-white text-blue-600 shadow-sm border border-gray-100" : ...
        expect(homeLink).toHaveClass("text-blue-600");
    });

    it("applies active styles to the Jobs link when at /jobs", () => {
        renderNavbar("/jobs");

        const jobsLink = screen.getByRole("link", { name: /jobs/i });
        expect(jobsLink).toHaveClass("text-blue-600");
    });

    it("opens the mobile menu when the hamburger button is clicked", () => {
        renderNavbar();

        const menuButton = screen.getByRole("button", { name: /open menu/i });
        fireEvent.click(menuButton);

        // Drawer content should now be visible
        expect(screen.getByText("Admin Portal")).toBeInTheDocument();
    });

    it("closes the mobile menu when the close button is clicked", async () => {
        renderNavbar();

        // Open menu
        const menuButton = screen.getByRole("button", { name: /open menu/i });
        fireEvent.click(menuButton);

        // Find close button
        const closeButton = screen.getByRole("button", { name: /close menu/i });
        fireEvent.click(closeButton);

        // Drawer elements should disappear
        expect(screen.queryByText("Admin Portal")).not.toBeInTheDocument();
    });

    it("navigates correctly through links", () => {
        renderNavbar();

        const homeLink = screen.getByRole("link", { name: /home/i });
        const jobsLink = screen.getByRole("link", { name: /jobs/i });
        const applyLink = screen.getByRole("link", { name: /apply/i });

        expect(homeLink.getAttribute("href")).toBe("/");
        expect(jobsLink.getAttribute("href")).toBe("/jobs");
        expect(applyLink.getAttribute("href")).toBe("/apply");
    });
});
