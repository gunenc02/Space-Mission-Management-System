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
  toCompanyId: number;
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
  minYear?: number;
  maxYear?: number;
  minCost?: number;
  maxCost?: number;
}
