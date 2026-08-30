
import { useState } from "react";
import axios from "axios";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:8000/api/users/email",
                formData
            );

            setSuccess(response.data.message);
            console.log("DATA:", err.response?.data);
    console.log("MESSAGE:", err.message);

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen bg-slate-950 px-4 py-20 text-white">
            <div className="mx-auto max-w-6xl">

                {/* Header */}
                <div className="mb-14 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-blue-500">
                        Get In Touch
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Let's Talk
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
                        Have a question, suggestion, or just want to say hello?
                        Send me a message and I'll get back to you as soon as possible.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Contact Info */}
                    <div className="space-y-6">

                        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                                📧
                            </div>

                            <h3 className="text-lg font-semibold">
                                Email
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                                Feel free to contact me directly.
                            </p>

                            <a
                                href="mailto:omarcabdi0008@gmail.com"
                                className="mt-4 block break-all text-sm font-medium text-blue-400 hover:text-blue-300"
                            >
                                omarcabdi0008@gmail.com
                            </a>
                        </div>

                        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-2xl">
                                💬
                            </div>

                            <h3 className="text-lg font-semibold">
                                Let's Connect
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-400">
                                Whether it's a project, collaboration, or feedback,
                                I'm always open to hearing from you.
                            </p>
                        </div>

                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl sm:p-8">

                            <form onSubmit={handleSubmit} className="space-y-6">

                                {/* Name + Email */}
                                <div className="grid gap-6 sm:grid-cols-2">

                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="mb-2 block text-sm font-medium text-slate-300"
                                        >
                                            Your Name
                                        </label>

                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            required
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="mb-2 block text-sm font-medium text-slate-300"
                                        >
                                            Email Address
                                        </label>

                                        <input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="john@example.com"
                                            required
                                            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                        />
                                    </div>

                                </div>

                                {/* Subject */}
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="mb-2 block text-sm font-medium text-slate-300"
                                    >
                                        Subject
                                    </label>

                                    <input
                                        id="subject"
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="How can I help you?"
                                        required
                                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="mb-2 block text-sm font-medium text-slate-300"
                                    >
                                        Message
                                    </label>

                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..."
                                        required
                                        rows="7"
                                        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                                    />
                                </div>

                                {/* Success */}
                                {success && (
                                    <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                                        ✓ {success}
                                    </div>
                                )}

                                {/* Error */}
                                {error && (
                                    <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                                        ✕ {error}
                                    </div>
                                )}

                                {/* Submit */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? "Sending..." : "Send Message →"}
                                </button>

                            </form>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;

