"use server";

import {
  AuditErrorResponse,
  AuditRequest,
  AuditResponse,
  FixRequest,
  FixResponse,
  Vulnerability,
  VulnerabilityReport,
} from "./models";

const AUDIT_URL = process.env.SERVER_URL + "/audit";
const FIX_URL = process.env.SERVER_URL + "/fix";

const controller = new AbortController();
const timeoutSeconds = 3_600_000; // 1 hour
const _ = setTimeout(() => controller.abort(), timeoutSeconds);

export const callAuditApi = async (
  code: string,
  model: string,
  language: string
): Promise<VulnerabilityReport> => {
  if (!process.env.SERVER_URL)
    throw "Invalid environment variable (server URL)";

  const request: AuditRequest = {
    contract_code: code,
    language,
    model,
  };

  console.log("Calling audit.", model, language);

  const response = await fetch(AUDIT_URL, {
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
    const parsed = tryParseIntoError(txt);
    throw new Error("Response was not OK. " + parsed);
  }

  const result: AuditResponse = await response.json();
  console.log(
    "Vulnerabilities report",
    result?.report?.vulnerabilities?.length,
    result
  );
  return result?.report;
};

export const callFixApi = async (
  code: string,
  model: string,
  language: string,
  vulnerabilities: Vulnerability[]
): Promise<string> => {
  if (!process.env.SERVER_URL)
    throw "Invalid environment variable (server URL)";

  const request: FixRequest = {
    contract_code: code,
    language,
    model,
    vulnerabilities,
  };

  console.log("Calling fix.", model, language);

  const response = await fetch(FIX_URL, {
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
    const parsed = tryParseIntoError(txt);
    throw new Error("Response was not OK. " + parsed);
  }

  const result: FixResponse = await response.json();
  console.log("Code Fix", result);
  return result?.code;
};

function tryParseIntoError(txt: string): string {
  try {
    const errorResponse: AuditErrorResponse = JSON.parse(txt);
    return errorResponse?.error;
  } catch (parseError) {
    console.warn("Failed to parse error JSON, returning raw.", parseError);
    return txt;
  }
}
