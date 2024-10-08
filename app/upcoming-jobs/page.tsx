import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function UpcomingJobs() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 p-4">
        <h1 className="text-2xl font-bold text-white">Upcoming Jobs</h1>
      </header>
      <main className="container mx-auto p-4">
        <Button className="bg-gradient-to-r from-blue-700 to-blue-500 text-white mb-4">
          Add New Job
        </Button>
        <div className="space-y-4">
          <JobCard 
            title="Underwater Welding"
            date="2023-08-15"
            location="Gulf of Mexico"
            duration="2 weeks"
          />
          <JobCard 
            title="Pipeline Inspection"
            date="2023-09-01"
            location="North Sea"
            duration="10 days"
          />
          {/* Add more JobCard components as needed */}
        </div>
      </main>
    </div>
  );
}

function JobCard({ title, date, location, duration }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4" />
          <span>{duration}</span>
        </div>
        <Button variant="outline" className="mt-4">View Details</Button>
      </CardContent>
    </Card>
  );
}