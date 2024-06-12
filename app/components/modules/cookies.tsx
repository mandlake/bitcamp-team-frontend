"use server";

// Import necessary modules
import { cookies } from "next/headers";

// Function to retrieve access token from cookie
const getAccessToken = () => {
  try {
    const setCookie = cookies();
    if (setCookie.has("accessToken")) {
      const cookie = setCookie.get("accessToken");
      console.log("cookie retrieved: ", cookie?.name, cookie?.value); // Mask sensitive information if needed
      return cookie;
    } else {
      console.log("accessToken is not found");
      return "";
    }
  } catch (error) {
    console.error("Error accessing cookie:", error);
    return error; // Return null in case of errors
  }
};

export { getAccessToken };
