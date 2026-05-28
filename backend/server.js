require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const jsforce = require("jsforce");
const crypto = require("crypto");

const app = express();
let codeVerifier = crypto.randomBytes(32).toString("hex");

function base64URLEncode(str) {
  return str
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

const codeChallenge = base64URLEncode(
  crypto.createHash("sha256").update(codeVerifier).digest()
);
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.SF_CLIENT_ID;
const CLIENT_SECRET = process.env.SF_CLIENT_SECRET;

const REDIRECT_URI =
  "http://localhost:5000/oauth/callback";

const LOGIN_URL = "https://login.salesforce.com";

let conn;

// Home
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Login Route
app.get("/auth/login", (req, res) => {

  const authUrl =
    `${LOGIN_URL}/services/oauth2/authorize` +
    `?response_type=code` +
    `&client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&code_challenge=${codeChallenge}` +
    `&code_challenge_method=S256`;

  res.redirect(authUrl);

});

// OAuth Callback
app.get("/oauth/callback", async (req, res) => {

  const { code } = req.query;

  try {

    const tokenResponse = await axios.post(
      `${LOGIN_URL}/services/oauth2/token`,
      null,
      {
        params: {
          grant_type: "authorization_code",
  client_id: CLIENT_ID,
  client_secret: CLIENT_SECRET,
  redirect_uri: REDIRECT_URI,
  code,
  code_verifier: codeVerifier,
        },
      }
    );

    conn = new jsforce.Connection({
      instanceUrl: tokenResponse.data.instance_url,
      accessToken: tokenResponse.data.access_token,
    });

    res.send("Salesforce Login Successful");

  } catch (error) {

    console.error(error);
    res.status(500).send("OAuth Failed");
  }
});

// Get Validation Rules
app.get("/validation-rules", async (req, res) => {

  try {

    const result = await conn.tooling.query(`
      SELECT Id,
             ValidationName,
             Active
      FROM ValidationRule
    `);

    res.json(result.records);

  } catch (error) {

    console.error(error);
    res.status(500).send(error);
  }
});

// Toggle Rule
app.patch("/toggle-rule/:id", async (req, res) => {

  try {

    const id = req.params.id;
    const { active } = req.body;

    console.log(
      `Rule ${id} changed to ${active}`
    );

    res.json({
      success: true,
      id,
      active,
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});