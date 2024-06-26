export interface CreateHealthRecordProps {
  astronautId: number;
  onClose: () => void;
}

export interface HealthRecordDetailsProps {
  healthRecordId: number;
  onClose: () => void;
}

export interface FireAstronautProps {
  astronautId: number;
  onClose: () => void;
}

export interface RegisterExpertProps {
  companyId: number;
  onClose: () => void;
}

export interface ApproveAgencyProps {
  agencyId: number;
  onClose: () => void;
}

export interface CreateMissionProps {
  companyId: number;
  onClose: () => void;
}

export interface SubmitBidProps {
  fromCompanyId: number;
  toCompanyId: number | undefined;
  missionId: number | undefined;
  onClose: () => void;
}

export interface SubmitBidErrorProps {
  onClose: () => void;
}

export interface AddPlatformProps {
  companyId: number;
  onClose: () => void;
}

export interface FilterProps {
  onClose: () => void;
  onFilter: (filters: FilterValues) => void;
}
export interface FilterValues {
  country?: string;
  minYear?: number;
  maxYear?: number;
  minCost?: number;
  maxCost?: number;
  minAge?: number;
  maxAge?: number;
  minSalary?: number;
  maxSalary?: number;
  onMission?: boolean;
  minBudget?: number;
  maxBudget?: number;
  onDuty?: boolean;
  minCreateDate?: string;
  maxCreateDate? : string;
  minPerformDate?: string;
  maxPerformDate?: string;
  isApproved?: boolean;
}
