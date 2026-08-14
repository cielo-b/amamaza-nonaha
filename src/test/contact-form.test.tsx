import { describe, it, expect, beforeEach, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const send = vi.fn().mockResolvedValue({ status: 200, text: "OK" });
vi.mock("@emailjs/browser", () => ({ default: { send: (...args: unknown[]) => send(...args) } }));
vi.mock("sonner", () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

import i18n from "@/i18n/config";
import ContactSection from "@/components/ContactSection";

/** The params object handed to emailjs.send is its 3rd argument. */
const sentParams = () => send.mock.calls.at(-1)?.[2] as Record<string, string>;

const fill = (placeholder: string | RegExp, value: string) =>
  fireEvent.change(screen.getByPlaceholderText(placeholder), { target: { value } });

describe("contact form submission", () => {
  beforeEach(async () => {
    send.mockClear();
    await i18n.changeLanguage("en");
  });

  it("sends the phone number the form collected", async () => {
    render(<ContactSection />);

    fill("Enter your names", "Alex Doe");
    fill("you@company.com", "alex@example.com");
    fill("7XX XXX XXX", "788 123 456");
    fill(/Tell us how we can help/, "Hello");
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => expect(send).toHaveBeenCalledTimes(1));

    // The dial code sits beside the input as static UI, so it must be added on send.
    expect(sentParams()).toMatchObject({
      name: "Alex Doe",
      email: "alex@example.com",
      phone: "+250 788 123 456",
      message: "Hello",
    });
  });

  it("sends an empty phone rather than a bare dial code when the optional field is blank", async () => {
    render(<ContactSection />);

    // Name, email and message are required; phone is the only optional field.
    fill("Enter your names", "Alex Doe");
    fill("you@company.com", "alex@example.com");
    fill(/Tell us how we can help/, "Hello");
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

    await waitFor(() => expect(send).toHaveBeenCalledTimes(1));
    expect(sentParams().phone).toBe("");
  });
});
