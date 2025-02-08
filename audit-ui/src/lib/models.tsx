export interface AuditRequest {
  contract_code: string;
  language: string;
  model: string;
}

// export enum Severity {
//   critical,
//   high,
//   medium,
//   low,
// }

export interface Vulnerability {
  name: string;
  severity: string;
  description: string;
  location: string;
  impacted_code: string;
  recommendations: string;
}

export interface VulnerabilityReport {
  vulnerabilities: Vulnerability[];
}

export interface AuditResponse {
  report: VulnerabilityReport;
  _id: string;
}

export interface AuditErrorResponse {
  error: string;
}

export interface FixRequest {
  contract_code: string;
  language: string;
  model: string;
  vulnerabilities: Vulnerability[];
}

export interface FixResponse {
  code: string;
}

export interface ChatRequest {
  text: string;
  model: string;
}

export interface ChatResponse {
  text: string;
}

export interface HistoryRequest {
  id: string;
}

export interface HistoryResponse {
  report: Vulnerability[];
}
