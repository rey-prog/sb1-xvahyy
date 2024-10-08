export interface DiveData {
  month: string;
  dives: number;
}

export interface DepthData {
  month: string;
  depth: number;
}

export interface UpcomingDive {
  title: string;
  date: string;
  time: string;
  expectedDepth: number;
}

export interface Certification {
  name: string;
  status: 'valid' | 'expired';
  expiryDate: string;
}

export interface UserData {
  name: string;
  totalDives: number;
  totalDiveTime: number;
  maxDepthReached: number;
  diveData: DiveData[];
  depthData: DepthData[];
  upcomingDive: UpcomingDive;
  certifications: Certification[];
}