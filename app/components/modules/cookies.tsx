"use server";

// Import necessary modules
import { cookies } from "next/headers";

// Function to retrieve access token from cookie
const getAccessToken = () => {
  try {
    const setCookie = cookies();
    if (setCookie.has("accessToken")) {
      const cookie = setCookie.get("accessToken");
      return cookie;
    } else {
      return "";
    }
  } catch (error) {
    console.error("Error accessing cookie:", error);
    return error; // Return null in case of errors
  }
};

export { getAccessToken };
