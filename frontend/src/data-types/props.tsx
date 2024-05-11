export interface Astronaut {
  id: number;
  name: string;
  image: string;
  dateOfBirth: Date;
  onDuty: boolean;
  country: string;
  salary: number;
}

export interface Agency {
  id: number;
  name: string;
  mail: string;
  logo: string;
  isApproved: boolean;
}

export interface Company {
  id: number;
  name: string;
  mail: string;
  country: string;
  logo: string;
  budget: number;
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
