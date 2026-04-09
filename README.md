# broker-web (MVP)

High-converting Indian stock-broking marketing site + onboarding funnel + demo trading web app.

## Quick start

```bash
npm install
npm run dev
```

Open: http://localhost:3000

## What’s included
- Marketing site (`/`) + compliance pages (`/compliance/*`)
- Open Account wizard (`/open-account`) with mock OTP + KYC draft/submit
- Authenticated demo trading app (`/app/*`) with mock quotes and mock order placement
- Basic security headers + API rate limiting + audit logging

## Notes
- OTP is returned in the response **only for demo**. Remove `otp_demo` before production.
- Replace all `{{...}}` placeholders in compliance pages with your real SEBI/DP/KMP details.

## Deploy
- Push this repository to GitHub and deploy to Vercel.

## License
MIT
