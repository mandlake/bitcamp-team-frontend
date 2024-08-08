export interface Date {
  id: number;
  year?: string;
  month?: string;
  day?: string;
}

export interface ISerialNumber {
  id: number;
  serialNumber?: string;
  caseNumber?: string;
  caseName?: string;
}
export interface CaseLaw {
  serialNumber: string;
  caseName: string;
  caseNumber: string;
  dateOfDecision: string;
}

export interface CaseLawDetail {
  id: number;
  caseLaw: CaseLaw;
  court: string;
  caseType: string;
  summary: string;
  detail: string;
}

export interface UserStats {
  id: number;
  date: string;
  newUserCount: number;
  increaseRate: number;
}

export interface SearchCriteriaDto {
  keyword: string;
  dateRange?: {
    startDate: string;
    endDate: string;
  };
}
