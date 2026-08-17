// services/emailService.js

const EMAILJS_SERVICE_ID = 'service_vsskz26';
const EMAILJS_TEMPLATE_ID = 'template_g4k6mla';
const EMAILJS_PUBLIC_KEY = 'N_4zArm3BvVn9kfsR';

export const sendOtpEmail = async ({ toEmail, otpCode, expiredAt }) => {
  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          email: toEmail,           // Matches {{email}} in "To Email" box
          to_email: toEmail,
          
          // SEND ALL ALIASES SO EMAILJS NEVER GETS AN UNDEFINED VALUE:
          passcode: otpCode,        // Matches {{otp_code}}
                   // Matches {{code}}
          
          time: expiredAt,          // Matches {{time}}
          company_name: 'TaskFlow', // Matches [Company Name] or {{company_name}}
        },
      }),
    });

    if (response.status === 200) {
      console.log('✅ Email sent successfully!');
      return { success: true };
    } else {
      const errorText = await response.text();
      console.log('❌ EmailJS Error:', errorText);
      return { success: false, error: errorText };
    }
  } catch (error) {
    console.log('❌ Network Error:', error);
    return { success: false, error: error.message };
  }
};