import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { generateMotivationLetter } from "./aiLetter";

// Mock axios globally — we never want to hit the real Gemini API in tests
vi.mock("axios");

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Builds a fake Gemini API response with the given text */
const fakeGeminiResponse = (text) => ({
    data: {
        candidates: [
            {
                content: {
                    parts: [{ text }],
                },
            },
        ],
    },
});

const VALID_INPUT = {
    name: "Yassin",
    domain: "Front-End Development",
    skills: "React, Tailwind CSS, TypeScript",
};

const EXPECTED_LETTER = `Dear Hiring Manager,\nI am Yassin, a passionate Front-End Developer...\nSincerely,\nYassin`;

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("generateMotivationLetter", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    // ✅ Happy path
    it("returns the AI-generated text from Gemini response", async () => {
        axios.post.mockResolvedValueOnce(fakeGeminiResponse(EXPECTED_LETTER));

        const result = await generateMotivationLetter(VALID_INPUT);

        expect(result).toBe(EXPECTED_LETTER);
    });

    // ✅ Correct API endpoint and request shape
    it("calls the Gemini API with correct URL and body", async () => {
        axios.post.mockResolvedValueOnce(fakeGeminiResponse("..."));

        await generateMotivationLetter(VALID_INPUT);

        // URL must contain the Gemini endpoint
        const calledUrl = axios.post.mock.calls[0][0];
        expect(calledUrl).toContain("generativelanguage.googleapis.com");
        expect(calledUrl).toContain("generateContent");

        // Body must contain a `contents` array with the prompt
        const calledBody = axios.post.mock.calls[0][1];
        expect(calledBody).toHaveProperty("contents");
        expect(Array.isArray(calledBody.contents)).toBe(true);
        expect(calledBody.contents[0].parts[0].text).toContain("Yassin");
        expect(calledBody.contents[0].parts[0].text).toContain("Front-End Development");
        expect(calledBody.contents[0].parts[0].text).toContain("React, Tailwind CSS, TypeScript");
    });

    // ✅ Prompt includes all user data
    it("includes name, domain and skills inside the prompt", async () => {
        axios.post.mockResolvedValueOnce(fakeGeminiResponse("ok"));

        await generateMotivationLetter({
            name: "Ali",
            domain: "AI / Data Science",
            skills: "Python, TensorFlow",
        });

        const prompt = axios.post.mock.calls[0][1].contents[0].parts[0].text;
        expect(prompt).toContain("Ali");
        expect(prompt).toContain("AI / Data Science");
        expect(prompt).toContain("Python, TensorFlow");
    });

    // ✅ Content-Type header is set
    it("sends Content-Type: application/json header", async () => {
        axios.post.mockResolvedValueOnce(fakeGeminiResponse("ok"));

        await generateMotivationLetter(VALID_INPUT);

        const headers = axios.post.mock.calls[0][2].headers;
        expect(headers["Content-Type"]).toBe("application/json");
    });

    // ❌ Network error
    it("throws when the API call fails (network error)", async () => {
        axios.post.mockRejectedValueOnce(new Error("Network Error"));

        await expect(generateMotivationLetter(VALID_INPUT)).rejects.toThrow("Network Error");
    });

    // ❌ Malformed response — missing candidates
    it("throws when Gemini returns an empty candidates array", async () => {
        axios.post.mockResolvedValueOnce({
            data: { candidates: [] },
        });

        await expect(generateMotivationLetter(VALID_INPUT)).rejects.toThrow();
    });

    // ❌ API key error (403)
    it("throws when Gemini returns a 403 permission error", async () => {
        const error = Object.assign(new Error("Request failed with status code 403"), {
            response: { status: 403, data: { error: { message: "API key not valid" } } },
        });
        axios.post.mockRejectedValueOnce(error);

        await expect(generateMotivationLetter(VALID_INPUT)).rejects.toThrow("403");
    });
});
