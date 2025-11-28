# EmailJS Setup Guide for ET-Putki Website

## ✅ What's Already Done
- EmailJS SDK has been added to your website
- Form has been updated to use EmailJS instead of FormSubmit
- JavaScript code is ready to send emails
- Both email addresses configured: `jan.kokkonen1@gmail.com` and `info.etputki@gmail.com`

## 🔧 Setup Steps (5 minutes)

### Step 1: Create EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (free account gives you 200 emails/month)
3. Verify your email address

### Step 2: Add Email Service (Löydät Service ID:n täältä)
1. EmailJS dashboard → Vasemmalla **"Email Services"**
2. Klikkaa **"Add New Service"**
3. Valitse **Gmail** (tai muu sähköposti)
4. Klikkaa **"Connect Account"** ja anna lupa Gmailiin
5. **TÄRKEÄÄ:** Kun palvelu on luotu, näet sen listassa
6. **Service ID** näkyy palvelun nimen alla (esim. `service_abc1234`)
7. 📝 Kopioi tämä Service ID talteen!

### Step 3: Create Email Template (Löydät Template ID:n täältä)
1. EmailJS dashboard → Vasemmalla **"Email Templates"**
2. Klikkaa **"Create New Template"**
3. **Template ID** näkyy heti oikeassa yläkulmassa (esim. `template_xyz5678`)
4. 📝 Kopioi tämä Template ID talteen!
5. Käytä alla olevaa template-sisältöä:

**Template Name:** `contact_form_etputki`

**Subject:**
```
Uusi yhteydenottopyyntö - {{from_name}}
```

**Content (Body):**
```
Uusi yhteydenotto ET-Putki verkkosivuilta

Yhteystiedot:
━━━━━━━━━━━━━━━━━━━━
Nimi: {{from_name}}
Sähköposti: {{from_email}}
Puhelin: {{phone}}
Osoite: {{address}}

Palvelu:
━━━━━━━━━━━━━━━━━━━━
{{service}}

Viesti:
━━━━━━━━━━━━━━━━━━━━
{{message}}

━━━━━━━━━━━━━━━━━━━━
Tämä viesti lähetettiin automaattisesti etputki.fi -verkkosivuston yhteydenottolomakkeelta.
```

6. Template **Settings** (klikkaa Settings-välilehteä):
   - **To Email:** `{{to_email}}`
   - **From Name:** `{{from_name}}`
   - **Reply To:** `{{from_email}}`
7. Klikkaa **"Save"** oikeassa yläkulmassa

### Step 4: Missä ID:t löytyvät?

**Public Key:**
- Vasen valikko → **Account** → **General**
- Näkyy kohdassa "Public Key" (esim. `yoW4TRKQG3tzOcdQ9`)
- ✅ Sinulla on jo tämä!

**Service ID:**
- Vasen valikko → **Email Services**
- Näet listan sähköpostipalveluistasi
- Service ID on palvelun nimen alla pienellä fontilla
- Esimerkki: `service_abc1234` tai `gmail_service_123`

**Template ID:**
- Vasen valikko → **Email Templates**  
- Näet listan templateistasi
- Template ID on jokaisen templaten nimen alla
- Esimerkki: `template_xyz5678` tai `contact_form_123`
- TAI klikkaa templatea auki → ID näkyy oikeassa yläkulmassa

### Step 5: Päivitä koodi (kun sinulla on kaikki ID:t)
Avaa `JavaScript/script.js` ja korvaa nämä kolme arvoa:

```javascript
// Rivi ~235 - Korvaa YOUR_PUBLIC_KEY
emailjs.init('yoW4TRKQG3tzOcdQ9'); // ← Sinulla on jo oikea Public Key!

// Rivi ~286 - Korvaa YOUR_SERVICE_ID
const serviceID = 'service_yzdjwob'; // ← Liitä Service ID tähän

// Rivi ~287 - Korvaa YOUR_TEMPLATE_ID
const templateID = 'template_4vxbn27'; // ← Liitä Template ID tähän
```

## 🔍 Nopea tarkistuslista ennen testaamista

✅ Public Key lisätty koodiin (sinulla jo valmiina: `yoW4TRKQG3tzOcdQ9`)  
⬜ Service ID löydetty EmailJS → Email Services -sivulta  
⬜ Service ID lisätty koodiin (`script.js` rivi ~286)  
⬜ Template ID löydetty EmailJS → Email Templates -sivulta  
⬜ Template ID lisätty koodiin (`script.js` rivi ~287)  
⬜ Template sisältö ja Settings tallennettu EmailJS:ssä

## 🧪 Testaus

1. Avaa verkkosivusi (paikallisesti tai palvelimella)
2. Täytä yhteydenottolomake
3. Lähetä lomake
4. Tarkista molemmat sähköpostit:
   - jan.kokkonen1@gmail.com
   - info.etputki@gmail.com

## 📋 Templaten parametrit

The form sends these parameters to EmailJS:
- `from_name` - Name from form
- `from_email` - Email from form
- `phone` - Phone number
- `address` - Address (or "Ei annettu" if empty)
- `service` - Selected service (or "Ei valittu" if empty)
- `message` - Message text
- `to_email` - Both your email addresses

## 🎯 Features Included

✅ Email sent to both addresses simultaneously
✅ Form validation before sending
✅ Loading spinner during submission
✅ Success message after sending
✅ Auto-redirect to thank you page
✅ Error handling with user-friendly messages
✅ Character counter for message field
✅ Progress bar showing form completion

## 🆓 Free Tier Limits

- **200 emails per month** (free plan)
- Perfect for a business contact form
- Can upgrade if you need more

## 🔒 Security

- Your public key is safe to use in client-side code
- No API keys exposed
- GDPR compliant
- Spam protection included

## 📞 Support

If you need help, EmailJS has excellent documentation:
- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [Gmail Integration Guide](https://www.emailjs.com/docs/examples/gmail/)

## ❓ Troubleshooting

**Problem:** Emails not arriving
- Check spam folder
- Verify Service ID, Template ID, and Public Key are correct
- Check EmailJS dashboard for error logs

**Problem:** "User not found" error
- Make sure you initialized EmailJS with correct Public Key
- Check that the Public Key is from the correct account

**Problem:** Template errors
- Make sure all template parameters match (case-sensitive)
- Verify template is saved and published in EmailJS dashboard
