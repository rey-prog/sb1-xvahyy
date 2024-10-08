import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function LogDive() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-gradient-to-r from-blue-700 to-blue-500 p-4">
        <h1 className="text-2xl font-bold text-white">Log New Dive</h1>
      </header>
      <main className="container mx-auto p-4">
        <form className="space-y-4">
          <Input type="date" placeholder="Date" />
          <Input type="time" placeholder="Time" />
          <Input type="number" placeholder="Depth (meters)" />
          <Input type="number" placeholder="Duration (minutes)" />
          <Input placeholder="Location" />
          <Textarea placeholder="Notes" />
          <Button type="submit" className="bg-gradient-to-r from-blue-700 to-blue-500 text-white w-full">
            Log Dive
          </Button>
        </form>
      </main>
    </div>
  );
}