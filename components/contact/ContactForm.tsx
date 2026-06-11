"use client";

import { Button } from "@/components/ui/Button";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

const inputClasses = (hasError: boolean) =>
    `w-full rounded-[3px] border bg-ink-800 px-4 py-3.5 text-paper placeholder:text-fog-2 transition-colors focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 ${
        hasError ? "border-red-500" : "border-line-strong"
    }`;

export function ContactForm() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [errors, setErrors] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        let isValid = true;
        const newErrors = { name: "", email: "", message: "" };

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            isValid = false;
        }
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }
        if (!formData.message.trim()) {
            newErrors.message = "Message is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || "Failed to send message");
            }
            setIsSubmitting(false);
            setIsSubmitted(true);
        } catch (error) {
            console.error("Error sending message:", error);
            setIsSubmitting(false);
            setErrors((prev) => ({ ...prev, message: "Something went wrong. Please try again later." }));
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        if (errors[id as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [id]: "" }));
        }
    };

    if (isSubmitted) {
        return (
            <div className="rounded-md border border-gold-500/40 bg-ink-800 py-16 text-center" data-no-burst>
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gold-100">
                    <CheckCircle2 className="h-8 w-8 text-gold-500" />
                </div>
                <h2 className="font-display mb-4 text-3xl">Message received</h2>
                <p className="mx-auto mb-8 max-w-md text-lg text-fog">
                    Thank you for reaching out. We will review your inquiry and get back to you
                    within 24 hours.
                </p>
                <Button onClick={() => (window.location.href = "/")} variant="outline">
                    Return home
                </Button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6" data-no-burst>
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <label htmlFor="name" className="font-mono text-xs uppercase tracking-[0.12em] text-fog">
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses(!!errors.name)}
                        placeholder="John Doe"
                        disabled={isSubmitting}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="font-mono text-xs uppercase tracking-[0.12em] text-fog">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClasses(!!errors.email)}
                        placeholder="john@company.com"
                        disabled={isSubmitting}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
            </div>

            <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-[0.12em] text-fog">
                    Message
                </label>
                <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className={inputClasses(!!errors.message)}
                    placeholder="Tell us about your project..."
                    disabled={isSubmitting}
                />
                {errors.message && <p className="mt-1 text-xs text-red-400">{errors.message}</p>}
            </div>

            <Button size="lg" className="w-full min-w-[150px] md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                    </>
                ) : (
                    "Send message"
                )}
            </Button>
        </form>
    );
}
