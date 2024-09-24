import { backendUrl } from "./config";

// Function for making unauthenticated POST requests
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });

    // Handle both JSON and non-JSON responses
    const formattedResponse = await response.json();
    return formattedResponse;
};

// Function for making authenticated POST requests
export const makeAuthenticatedPOSTRequest = async (route, body) => {
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });

    let formattedResponse;
    try {
        formattedResponse = await response.json();
    } catch (error) {
        formattedResponse = { error: await response.text() }; // Handle non-JSON response
    }

    return formattedResponse;
};

// Function for making authenticated GET requests
export const makeAuthenticatedGETRequest = async (route) => {
    const token = getToken();

    console.log("Token: ", token);
    const response = await fetch(backendUrl + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    let formattedResponse;
    try {
        formattedResponse = await response.json();
    } catch (error) {
        formattedResponse = { error: await response.text() }; // Handle non-JSON response
    }

    return formattedResponse;
};

// Helper function to get the token from cookies
const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    
    if (!accessToken) {
        throw new Error('No token found. Please log in again.');
    }

    return accessToken;
};