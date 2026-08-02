const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")
const userModel = require("../models/user.model")
const { sendReportEmail } = require("../services/email.service")

/**
 * @description Controller to generate interview report based on user self description, resume and job description.
 */
async function generateInterViewReportController(req, res) {
    try {
        const { selfDescription, jobDescription } = req.body || {}

        if (!jobDescription || !jobDescription.trim()) {
            return res.status(400).json({ message: "Please provide a Target Job Description." })
        }

        let resumeText = ""
        if (req.file && req.file.buffer) {
            try {
                if (typeof pdfParse === "function") {
                    const parsed = await pdfParse(req.file.buffer)
                    resumeText = parsed.text || ""
                } else if (pdfParse.PDFParse) {
                    const parser = new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))
                    const resParsed = await parser.getText()
                    resumeText = resParsed.text || resParsed || ""
                }
            } catch (pdfErr) {
                console.error("PDF Parsing Warning:", pdfErr.message)
                resumeText = ""
            }
        }

        if (!resumeText && (!selfDescription || !selfDescription.trim())) {
            return res.status(400).json({ message: "Either a Resume PDF or a Self Description is required." })
        }

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription: selfDescription || "",
            jobDescription: jobDescription.trim()
        })

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription: selfDescription || "",
            jobDescription: jobDescription.trim(),
            title: interViewReportByAi?.title || "Interview Preparation Strategy",
            ...interViewReportByAi
        })

        // Optionally send report email
        userModel.findById(req.user.id).then((user) => {
            if (user && user.email) {
                sendReportEmail(user.email, user.username, interviewReport).catch(console.error)
            }
        }).catch(console.error)

        return res.status(201).json({
            message: "Interview report generated successfully.",
            interviewReport
        })
    } catch (err) {
        console.error("Generate Interview Report Error:", err)
        return res.status(500).json({
            message: err.message || "Failed to generate interview report"
        })
    }
}

/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {
    try {
        const { interviewId } = req.params

        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        return res.status(200).json({
            message: "Interview report fetched successfully.",
            interviewReport
        })
    } catch (err) {
        console.error("Get Interview Report Error:", err)
        return res.status(500).json({
            message: err.message || "Failed to fetch interview report"
        })
    }
}


/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    try {
        const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

        return res.status(200).json({
            message: "Interview reports fetched successfully.",
            interviewReports
        })
    } catch (err) {
        console.error("Get All Interview Reports Error:", err)
        return res.status(500).json({
            message: err.message || "Failed to fetch interview reports"
        })
    }
}


/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    try {
        const { interviewReportId } = req.params

        const interviewReport = await interviewReportModel.findById(interviewReportId)

        if (!interviewReport) {
            return res.status(404).json({
                message: "Interview report not found."
            })
        }

        const { resume, jobDescription, selfDescription } = interviewReport

        const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

        res.set({
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
        })

        return res.send(pdfBuffer)
    } catch (err) {
        console.error("Generate Resume PDF Error:", err)
        return res.status(500).json({
            message: err.message || "Failed to generate resume PDF"
        })
    }
}

/**
 * @description Controller to send interview report email on demand.
 */
async function sendEmailReportController(req, res) {
    try {
        const { interviewId } = req.params

        const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })
        if (!interviewReport) {
            return res.status(404).json({ message: "Interview report not found" })
        }

        const user = await userModel.findById(req.user.id)
        if (!user || !user.email) {
            return res.status(400).json({ message: "User email not found" })
        }

        await sendReportEmail(user.email, user.username, interviewReport)

        return res.status(200).json({
            message: `Interview report emailed successfully to ${user.email}`
        })
    } catch (err) {
        console.error("Send Email Report Error:", err)
        return res.status(500).json({
            message: err.message || "Failed to send email"
        })
    }
}

module.exports = {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController,
    sendEmailReportController
}