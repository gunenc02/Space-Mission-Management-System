export interface Astronaut {
  userId: number;
  name: string;
  image: string;
  dateOfBirth: Date;
  onDuty: boolean;
  country: string;
  salary: number;
}

export interface Agency {
  userId: number;
  name: string;
  userMail: string;
  logo: string;
  approved: boolean;
}

export interface Company {
  userId: number;
  name: string;
  userMail: string;
  country: string;
  logo: string;
  money: number;
}

export interface SpaceMission {
  id: number;
  missionName: string;
  image: string;
  objective: string;
  budget: number;
  createDate: Date;
  performDate: Date;
  platformId: number;
  creatorId: number;
  performerId: number;
  performStatus: string;
}

export interface Platform {
  id: number;
  platformName: string;
  productionYear: number;
  image: string;
  costPerLaunch: number;
}

export interface HealthRecord {
  id: number;
  astronautId: number;
  expertId: number;
  date: Date;
  availabilityForMission: boolean;
  weight: number;
  height: number;
  heartRate: number;
  bloodPressure: number;
  vaccinations: string;
  notes: string;
}

export interface SpaceMissionForListing {
  id: number;
  missionName: string;
  companyName: string;
  status: string;
  startDate: Date;
  endDate: Date;
  image: string;
}

export interface Expert {
  id: number;
  userMail: string;
  userRole: string;
  name: string;
  companyName: string;
  companyLogo: string;
}

export interface Transaction {
  id: number;
  fromCompanyId: number;
  toCompanyId: number;
  transactionAmount: number;
  transactionDate: Date;
}

export interface HealthRecordForListing {
  id: number;
  date: Date;
  astronautName: string;
  notes: string;
}
