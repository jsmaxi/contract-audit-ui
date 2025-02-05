import {
  AuditErrorResponse,
  AuditRequest,
  AuditResponse,
  VulnerabilityReport,
} from "./models";

const URL = "http://127.0.0.1:8080/audit";

const controller = new AbortController();
const timeoutSeconds = 3_600_000; // 1 hour
const _ = setTimeout(() => controller.abort(), timeoutSeconds);

export const callApi = async (
  code: string,
  model: string,
  language: string
): Promise<VulnerabilityReport> => {
  const request: AuditRequest = {
    contract_code: code,
    language,
    model,
  };

  const response = await fetch(URL, {
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

function tryParseIntoError(txt: string): string {
  try {
    const errorResponse: AuditErrorResponse = JSON.parse(txt);
    return errorResponse?.error;
  } catch (parseError) {
    console.warn("Failed to parse error JSON, returning raw.", parseError);
    return txt;
  }
}
