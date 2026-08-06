const nodemailer = require("nodemailer");

let transporter;

async function getTransporter() {
    if (transporter) return transporter;

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || "smtp.gmail.com",
            port: parseInt(process.env.EMAIL_PORT || "587"),
            secure: process.env.EMAIL_SECURE === "true",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    } else {
        // Fallback test account if no credentials in .env
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        console.log("Using Ethereal SMTP test account for emails.");
    }
    return transporter;
}

/**
 * Send Welcome Email to newly registered user
 */
async function sendWelcomeEmail(email, username, password) {
    try {
        const mailer = await getTransporter();
        const fromAddress = process.env.EMAIL_FROM || '"GenAI Job Prep" <no-reply@genaijobprep.com>';

        const passwordSnippet = password
            ? `<div style="background-color: #1e293b; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #6366f1;">
                        <h3 style="margin-top: 0; color: #a5b4fc;">Your Account Credentials:</h3>
                        <p style="margin: 6px 0; font-size: 15px;"><strong>Username:</strong> <span style="color: #38bdf8;">${username}</span></p>
                        <p style="margin: 6px 0; font-size: 15px;"><strong>Email:</strong> <span style="color: #38bdf8;">${email}</span></p>
                        <p style="margin: 6px 0; font-size: 15px;"><strong>Password:</strong> <span style="color: #f43f5e; font-weight: bold;">${password}</span></p>
                    </div>`
            : "";

        const info = await mailer.sendMail({
            from: fromAddress,
            to: email,
            subject: `Welcome to GenAI Job Prep, ${username}! 🚀`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 12px;">
                    <h1 style="color: #6366f1; text-align: center;">Welcome to GenAI Job Prep! 🎉</h1>
                    <p style="font-size: 16px; line-height: 1.6;">Hi <strong>${username}</strong>,</p>
                    <p style="font-size: 16px; line-height: 1.6;">Thank you for registering with us. We are excited to help you crack your dream job interviews using AI-driven interview analysis and preparation plans!</p>
                    
                    ${passwordSnippet}

                    <div style="background-color: #1e293b; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
                        <h3 style="margin-top: 0; color: #a5b4fc;">What you can do next:</h3>
                        <ul style="padding-left: 20px; line-height: 1.8;">
                            <li>Upload your resume & job description</li>
                            <li>Get instant match score & skill gap analysis</li>
                            <li>Receive AI-generated technical & behavioral questions</li>
                            <li>Follow a step-by-step personalized preparation roadmap</li>
                        </ul>
                    </div>
                    <p style="font-size: 14px; color: #94a3b8; text-align: center; margin-top: 30px;">
                        Good luck with your preparation!<br/>
                        &copy; GenAI Job Preparation Team
                    </p>
                </div>
            `,
        });

        console.log(`Welcome email sent to ${email}. MessageId: ${info.messageId}`);
        if (info.ethereal) {
            console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
        }
        return info;
    } catch (err) {
        console.error("Error sending welcome email:", err.message);
    }
}

/**
 * Send Interview Report Email to user
 */
async function sendReportEmail(email, username, report) {
    try {
        const mailer = await getTransporter();
        const fromAddress = process.env.EMAIL_FROM || '"GenAI Job Prep" <no-reply@genaijobprep.com>';

        const techQuestionsList = (report.technicalQuestions || [])
            .map(
                (q, idx) => `
                <div style="background: #1e293b; margin-bottom: 10px; padding: 12px; border-radius: 6px;">
                    <strong style="color: #818cf8;">Q${idx + 1}: ${q.question}</strong>
                    <p style="margin: 5px 0 0 0; color: #cbd5e1; font-size: 14px;"><strong>Answer:</strong> ${q.answer}</p>
                </div>
            `
            )
            .join("");

        const info = await mailer.sendMail({
            from: fromAddress,
            to: email,
            subject: `Your AI Interview Preparation Report (Match Score: ${report.matchScore}%) 🎯`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 12px;">
                    <h1 style="color: #6366f1; text-align: center;">Interview Preparation Plan</h1>
                    <p>Hi <strong>${username}</strong>,</p>
                    <p>Here is your generated interview report summary:</p>

                    <div style="text-align: center; background: #1e293b; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <h2 style="margin: 0; color: #a5b4fc;">Role Match Score</h2>
                        <span style="font-size: 48px; font-weight: bold; color: ${report.matchScore >= 80 ? "#22c55e" : report.matchScore >= 60 ? "#eab308" : "#ef4444"};">
                            ${report.matchScore}%
                        </span>
                    </div>

                    <h3 style="color: #a5b4fc;">Technical Questions Preview</h3>
                    ${techQuestionsList || "<p>No technical questions listed.</p>"}

                    <p style="font-size: 14px; color: #94a3b8; text-align: center; margin-top: 30px;">
                        Keep practicing and good luck!<br/>
                        &copy; GenAI Job Preparation Team
                    </p>
                </div>
            `,
        });

        console.log(`Interview report email sent to ${email}. MessageId: ${info.messageId}`);
        return info;
    } catch (err) {
        console.error("Error sending interview report email:", err.message);
    }
}

module.exports = {
    sendWelcomeEmail,
    sendReportEmail,
};
