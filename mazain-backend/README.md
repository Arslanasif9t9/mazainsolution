# Mazain Solution — Backend (Node/Express)


## Setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:
  `MySQL link`
- `JWT_SECRET` — any long random string, used to sign admin login tokens
- `ADMIN_USERNAME` / `ADMIN_PASSWORD` — the single admin account credentials (see "Multiple admins" below
  if you need more than one)
- `EMAIL_USER` / `EMAIL_APP_PASSWORD` — Gmail account used to send notification emails (see below)
- `NOTIFY_EMAIL` — where contact/enrollment notifications get sent (matches the original PHP's
  `mazainsolution@gmail.com`)

Then run:

```bash
npm run dev
```

Server starts on `http://localhost:5000` by default — matches the frontend's `.env`
(`VITE_API_BASE_URL=http://localhost:5000/api`) with no changes needed on either side.

## Gmail App Password setup (required for email notifications)

Gmail no longer accepts your normal account password for sending mail via code. You need an **App Password**:

1. Go to your Google Account → Security
2. Enable 2-Step Verification if it isn't already on
3. Search "App Passwords" → generate one for "Mail"
4. Copy the 16-character password into `EMAIL_APP_PASSWORD` in `.env`


