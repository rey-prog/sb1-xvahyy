import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Certifications() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 p-4">
        <h1 className="text-2xl font-bold text-white">Certifications</h1>
      </header>
      <main className="container mx-auto p-4">
        <Button className="bg-gradient-to-r from-blue-700 to-blue-500 text-white mb-4">
          Upload New Certification
        </Button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CertificationCard title="Advanced Open Water" expiry="2024-12-31" />
          <CertificationCard title="Rescue Diver" expiry="2023-10-15" />
          {/* Add more certification cards as needed */}
        </div>
      </main>
    </div>
  );
}

function CertificationCard({ title, expiry }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Expiry: {expiry}</p>
        <Button variant="outline" className="mt-2">View Details</Button>
      </CardContent>
    </Card>
  );
}