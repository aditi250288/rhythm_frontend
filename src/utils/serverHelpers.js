import { backendUrl } from "./config";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
  try {
    const url = `${backendUrl}${route}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in makeUnauthenticatedPOSTRequest:", error);
    throw error;
  }
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
  try {
    const token = getToken();
    if (!token) {
      throw new Error("No authentication token found");
    }
    const url = `${backendUrl}${route}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in makeAuthenticatedPOSTRequest:", error);
    throw error;
  }
};

export const makeAuthenticatedGETRequest = async (route) => {
  try {
    const token = getToken();
    console.log("Token:", token); // Check if the token is being retrieved correctly
    if (!token) {
      throw new Error("No authentication token found");
    }
    const url = `${backendUrl}${route}`; // Ensure the URL is correct
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in makeAuthenticatedGETRequest:", error);
    throw error;
  }
};

const getToken = () => {
  try {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "token") {
        return value;
      }
    }
    return null;
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};
