"use server";

import { ChatRequest, ChatResponse } from "./models";

const CHAT_URL = process.env.SERVER_URL + "/chat";
const model = "gpt-4o-mini";

export const callChatApi = async (text: string): Promise<string> => {
  if (!process.env.SERVER_URL)
    throw "Invalid environment variable (server URL)";

  const controller = new AbortController();
  const timeoutSeconds = 3_600_000; // 1 hour
  const timeout = setTimeout(() => controller.abort(), timeoutSeconds);

  try {
    const request: ChatRequest = {
      text,
      model,
    };

    console.log("Calling chat.");

    const response = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      signal: controller.signal,
    });

    if (!response.ok) {
      const status = response.status;
      const statusText = response.statusText;
      console.log(status, statusText);
      const txt = await response.text();
      throw new Error("Response was not OK. " + txt);
    }

    const result: ChatResponse = await response.json();
    console.log("Chat response", result);
    return result?.text;
  } finally {
    clearTimeout(timeout); // Clear the timeout to avoid memory leaks
  }
};
