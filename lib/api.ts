import { DiveData, DepthData, UserData } from '@/types';

// Simulated API call to fetch user data
export async function fetchUserData(): Promise<UserData> {
  // In a real application, this would be an API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'John Doe',
        totalDives: 10,
        totalDiveTime: 156,
        maxDepthReached: 40,
        diveData: [
          { month: 'Jan', dives: 8 },
          { month: 'Feb', dives: 12 },
          { month: 'Mar', dives: 15 },
          { month: 'Apr', dives: 10 },
          { month: 'May', dives: 18 },
          { month: 'Jun', dives: 24 },
        ],
        depthData: [
          { month: 'Jan', depth: 25 },
          { month: 'Feb', depth: 30 },
          { month: 'Mar', depth: 35 },
          { month: 'Apr', depth: 28 },
          { month: 'May', depth: 32 },
          { month: 'Jun', depth: 40 },
        ],
        upcomingDive: {
          title: 'Coral Reef Survey',
          date: '2023-07-20',
          time: '09:00 AM',
          expectedDepth: 25,
        },
        certifications: [
          { name: 'Advanced Open Water', status: 'valid', expiryDate: '2024-12-31' },
          { name: 'Rescue Diver', status: 'valid', expiryDate: '2023-10-15' },
          { name: 'Nitrox Diver', status: 'expired', expiryDate: '2023-05-01' },
        ],
      });
    }, 1000); // Simulate network delay
  });
}