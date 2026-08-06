require('dotenv').config();
const { sendWelcomeEmail } = require('../src/services/email.service');

async function test() {
    console.log('Testing sendWelcomeEmail with user:', process.env.EMAIL_USER);
    try {
        const info = await sendWelcomeEmail(process.env.EMAIL_USER, 'TestUser', 'TestPassword123');
        console.log('Test completed successfully!', info);
    } catch (err) {
        console.error('Test failed:', err);
    }
}

test();
