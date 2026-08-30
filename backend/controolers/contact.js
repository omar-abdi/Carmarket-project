import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendContactEmail = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate input
        if (!name || !email || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields: name, email, subject, message",
            });
        }

        // Send email with Resend
        const { data, error } = await resend.emails.send({
            from: "onboarding@resend.dev",
            to: "omarcabdi0008@gmail.com",
            replyTo: email,
            subject: `Contact Form: ${subject}`,
            html: `
                <h2>New Contact Form Submission</h2>

                <p><strong>Name:</strong> ${name}</p>

                <p><strong>Email:</strong> ${email}</p>

                <p><strong>Subject:</strong> ${subject}</p>

                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        });

        if (error) {
            console.error("Resend Error:", error);

            return res.status(500).json({
                success: false,
                message: "Failed to send email",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Email sent successfully",
            data,
        });

    } catch (error) {
        console.error("Error sending contact email:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to send email",
        });
    }
};