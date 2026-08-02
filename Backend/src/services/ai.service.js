const { GoogleGenAI } = require("@google/genai")
const { z } = require("zod")
const { zodToJsonSchema } = require("zod-to-json-schema")
const puppeteer = require("puppeteer")

const ai = new GoogleGenAI({
    apiKey: process.env.GOOGLE_GENAI_API_KEY
})

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const prompt = `You are an expert AI technical recruiter and senior engineering manager.
Analyze the candidate's profile against the Target Job Description and generate a thorough interview preparation strategy.

Candidate Resume: ${resume || "Not provided"}
Candidate Self Description: ${selfDescription || "Not provided"}
Target Job Description: ${jobDescription || "Not provided"}

CRITICAL REQUIREMENT: You MUST return a single JSON object with EXACTLY the following structure and key names. Do NOT change key names:

{
  "title": "Short Job Position Title (e.g. Senior SaaS Engineer)",
  "matchScore": 82,
  "technicalQuestions": [
    {
      "question": "Specific technical question based on the job requirements",
      "intention": "Why the interviewer asks this question",
      "answer": "Comprehensive model answer with technical depth"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Behavioral question tailored to company environment",
      "intention": "What trait or competency is being evaluated",
      "answer": "Structured response using the STAR method"
    }
  ],
  "skillGaps": [
    {
      "skill": "Identified skill gap or area for improvement",
      "severity": "medium"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Daily study focus topic",
      "tasks": [
        "Task 1 description",
        "Task 2 description"
      ]
    }
  ]
}

Instructions:
- matchScore MUST be a number between 0 and 100.
- technicalQuestions MUST contain 4 to 6 detailed technical questions.
- behavioralQuestions MUST contain 3 to 4 behavioral questions.
- skillGaps MUST contain 3 to 5 skill gap items. 'severity' MUST be one of 'low', 'medium', or 'high'.
- preparationPlan MUST contain 3 to 7 structured day-by-day plans.
`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json"
            }
        })

        const rawJson = JSON.parse(response.text)

        // Ensure robust default fallback values
        return {
            title: rawJson.title || "Interview Preparation Strategy",
            matchScore: typeof rawJson.matchScore === "number" ? rawJson.matchScore : 75,
            technicalQuestions: Array.isArray(rawJson.technicalQuestions) && rawJson.technicalQuestions.length > 0
                ? rawJson.technicalQuestions
                : [
                    {
                        question: "Explain the architecture and design patterns you would use for this role.",
                        intention: "To assess system design knowledge and technical approach.",
                        answer: "Focus on modular architecture, scalability, state management, and clear component contracts."
                    }
                ],
            behavioralQuestions: Array.isArray(rawJson.behavioralQuestions) && rawJson.behavioralQuestions.length > 0
                ? rawJson.behavioralQuestions
                : [
                    {
                        question: "Describe a challenging situation in your previous project and how you solved it.",
                        intention: "To evaluate problem-solving mindset and teamwork.",
                        answer: "Use STAR format: Describe the Situation, Task, Actions taken, and measurable Result."
                    }
                ],
            skillGaps: Array.isArray(rawJson.skillGaps) && rawJson.skillGaps.length > 0
                ? rawJson.skillGaps.map(g => ({
                    skill: g.skill || "Technical Depth",
                    severity: ["low", "medium", "high"].includes(g.severity) ? g.severity : "medium"
                }))
                : [{ skill: "Advanced System Design", severity: "medium" }],
            preparationPlan: Array.isArray(rawJson.preparationPlan) && rawJson.preparationPlan.length > 0
                ? rawJson.preparationPlan
                : [
                    {
                        day: 1,
                        focus: "Core Concepts & Architecture",
                        tasks: ["Review primary tech stack documentation", "Practice key coding problems"]
                    }
                ]
        }
    } catch (err) {
        console.error("Gemini AI Generation Error:", err)
        throw new Error("Failed to generate AI interview report: " + err.message)
    }
}


async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" })

    const pdfBuffer = await page.pdf({
        format: "A4", margin: {
            top: "20mm",
            bottom: "20mm",
            left: "15mm",
            right: "15mm"
        }
    })

    await browser.close()

    return pdfBuffer
}

async function generateResumePdf({ resume, selfDescription, jobDescription }) {
    const resumePdfSchema = z.object({
        html: z.string().describe("The HTML content of the resume which can be converted to PDF using any library like puppeteer")
    })

    const prompt = `Generate resume for a candidate with the following details:
                        Resume: ${resume}
                        Self Description: ${selfDescription}
                        Job Description: ${jobDescription}

                        the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
                        The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
                        The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
                        you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
                        The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
                        The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
                    `

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: zodToJsonSchema(resumePdfSchema),
        }
    })

    const jsonContent = JSON.parse(response.text)
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html)

    return pdfBuffer
}

module.exports = { generateInterviewReport, generateResumePdf }