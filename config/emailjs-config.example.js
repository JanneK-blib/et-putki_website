/**
 * EmailJS Configuration Template
 * 
 * Copy this file to emailjs-config.js and fill in your actual credentials.
 * DO NOT commit emailjs-config.js to version control!
 * 
 * To get these values:
 * 1. Go to https://www.emailjs.com/
 * 2. Sign up or log in
 * 3. Public Key: Account > API Keys
 * 4. Service ID: Email Services > Your service
 * 5. Template ID: Email Templates > Your template
 */

const EMAILJS_CONFIG = {
    publicKey: 'YOUR_PUBLIC_KEY_HERE',
    serviceId: 'YOUR_SERVICE_ID_HERE',
    templateId: 'YOUR_TEMPLATE_ID_HERE',
    toEmail: 'your-email@example.com'
};

// Make config available globally
window.EMAILJS_CONFIG = EMAILJS_CONFIG;
