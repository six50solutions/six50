"use client";

import { Button } from "@/components/ui/Button";
import { FadeIn } from "@/components/ui/FadeIn";
import { Section } from "@/components/ui/Section";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        message: ""
    });
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

        // Simulate network request
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        // Clear error when user starts typing
        if (errors[id as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [id]: "" }));
        }
    };

    return (
        <Section className="min-h-[80vh] pt-32">
            <FadeIn>
                <div className="max-w-2xl mx-auto">
                    {isSubmitted ? (
                        <div className="text-center py-16 bg-white border border-gold-100 rounded-sm shadow-sm scale-in-center animate-in fade-in zoom-in duration-500">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="w-8 h-8 text-green-600" />
                            </div>
                            <h2 className="text-3xl font-bold text-navy-900 mb-4">Message Received</h2>
                            <p className="text-navy-600 text-lg mb-8 max-w-md mx-auto">
                                Thank you for reaching out. We will review your inquiry and get back to you within 24 hours.
                            </p>
                            <Button onClick={() => window.location.href = '/'} variant="outline">
                                Return Home
                            </Button>
                        </div>
                    ) : (
                        <>
                            <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">Contact Us</h1>
                            <p className="text-slate-500 mb-12 text-lg">Reach out to discuss how we can help you cross the threshold.</p>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-medium text-slate-700">Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-sm border ${errors.name ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors`}
                                            placeholder="John Doe"
                                            disabled={isSubmitting}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-slate-700">Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`w-full px-4 py-3 rounded-sm border ${errors.email ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors`}
                                            placeholder="john@company.com"
                                            disabled={isSubmitting}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={`w-full px-4 py-3 rounded-sm border ${errors.message ? 'border-red-500' : 'border-slate-300'} focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors`}
                                        placeholder="Tell us about your project..."
                                        disabled={isSubmitting}
                                    ></textarea>
                                    {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                                </div>

                                <Button size="lg" className="w-full md:w-auto min-w-[150px]" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        "Send Message"
                                    )}
                                </Button>
                            </form>
                        </>
                    )}
                </div>
            </FadeIn>
        </Section>
    );
}
