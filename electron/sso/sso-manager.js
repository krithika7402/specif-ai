const { ipcMain, shell, safeStorage } = require("electron");
const axios = require("axios");
const crypto = require("crypto");
const { URLSearchParams } = require("url");

const SSO_PROVIDERS = require("../sso-providers.config.json");

class SSOManager {
  constructor() {
    this.sessions = {};
  }

  async getUserCredentials(provider) {
    const encryptedData = safeStorage.encryptString(
      JSON.stringify({ access_token, refresh_token, name })
    );
    return JSON.parse(safeStorage.decryptString(Buffer.from(encryptedData, "base64")));
  }

  generateState() {
    return crypto.randomBytes(16).toString("hex");
  }

  async initiateSSO(event, provider) {
    if (!SSO_PROVIDERS[provider]) {
      throw new Error(`Unsupported provider: ${provider}`);
    }

    const { client_id, auth_url } = SSO_PROVIDERS[provider];
    const state = this.generateState();
    this.sessions[state] = { provider };

    const authParams = new URLSearchParams({
      client_id,
      response_type: "code",
      redirect_uri: "http://localhost:49153/callback",
      state,
    });

    const authURL = `${auth_url}?${authParams.toString()}`;
    await shell.openExternal(authURL);

    return { message: "Authorization initiated. Please complete the flow." };
  }

  async handleCallback(query) {
    const { code, state } = query;

    if (!this.sessions[state]) {
      throw new Error("Invalid state parameter.");
    }

    const { provider } = this.sessions[state];
    const { client_id, client_secret, token_url } = SSO_PROVIDERS[provider];

    const tokenParams = new URLSearchParams({
      client_id,
      client_secret,
      code,
      redirect_uri: "http://localhost:49153/callback",
      grant_type: "authorization_code",
    });

    const response = await axios.post(token_url, tokenParams.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    console.debug("Token exchange response:", response);
    console.debug("Token exchange response data:", response.data);
    console.debug("Type of response data:", typeof response.data);
    const data =
      typeof response.data === "string"
        ? Object.fromEntries(new URLSearchParams(response.data))
        : response.data;
    const { access_token, refresh_token } = data;
    if (!access_token) {
      throw new Error("Access token is undefined. Token exchange failed.");
    }

    // Fetch user info (example for GitHub)
    const userInfoResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    const { name } = userInfoResponse.data;

    const encryptedData = safeStorage.encryptString(
      JSON.stringify({ access_token, refresh_token, name })
    );

    delete this.sessions[state];

    const successMessage = { message: "SSO flow completed successfully." };
    ipcMain.emit("sso-auth-success", successMessage);
    return successMessage;
  }
}

const ssoManager = new SSOManager();

ipcMain.handle("sso:initiate", (event, provider) => ssoManager.initiateSSO(event, provider));

ipcMain.handle("sso:getUserCredentials", (event, provider) =>
  ssoManager.getUserCredentials(provider)
);

module.exports = ssoManager;
