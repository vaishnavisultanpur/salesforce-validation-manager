# Salesforce Validation Rule Manager

A full-stack Salesforce integration project developed for the Associate Software Engineer assignment.

This application connects a React frontend with Salesforce using OAuth 2.0 authentication and allows users to:

- Login to Salesforce
- Fetch Validation Rules from Salesforce
- View Active/Inactive status
- Toggle validation rules from the UI

---

# Features

## Salesforce OAuth 2.0 Authentication
- Secure Salesforce login integration
- Connected App / External Client App configuration
- PKCE-based OAuth flow

## Validation Rule Management
- Fetch validation rules using Salesforce Tooling API
- Display validation rule list
- Show Active / Inactive status
- Toggle validation rule state

## Full Stack Architecture
- React frontend
- Node.js + Express backend
- Salesforce API integration using JSForce

---

# Tech Stack

## Frontend
- React.js
- Axios

## Backend
- Node.js
- Express.js
- JSForce
- Axios

## Salesforce
- OAuth 2.0
- Tooling API
- Connected App / External Client App

---

# Project Structure

```bash
salesforce-validation-manager/

├── backend/
│   ├── server.js
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.js
│   ├── package.json
│
├── README.md
