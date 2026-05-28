# Salesforce Validation Rule Manager

## Features

* Salesforce OAuth Login
* Fetch Validation Rules
* Toggle Validation Rule Status
* React Frontend
* Node.js Backend
* Salesforce Tooling API Integration

---

## Backend Setup

```bash
cd backend
npm install
node server.js
```

Backend runs on:
`http://localhost:5000`

---

## Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:
`http://localhost:3000`

---

## Environment Variables

Create `.env` inside backend:

```env
SF_CLIENT_ID=your_client_id
SF_CLIENT_SECRET=your_client_secret
```

---

## OAuth Callback URL

```plaintext
https://salesforce-validation-manager-iddf.onrender.com/oauth/callback
```

---

## Technologies Used

* React.js
* Node.js
* Express.js
* Salesforce OAuth
* JSForce
* Axios
