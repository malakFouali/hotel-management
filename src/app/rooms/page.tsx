import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockRooms } from '@/lib/data';
import type { Room } from '@/types';
import Image from 'next/image';
import { DollarSign, Bed, Users, Search, Filter, PlusCircle } from 'lucide-react';

const RoomCard = ({ room }: { room: Room }) => (
  <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <div className="relative h-56 w-full">
      <Image 
        src={room.imageUrl} 
        alt={room.name} 
        layout="fill" 
        objectFit="cover" 
        data-ai-hint={`${room.type} room interior`}
      />
       <Badge 
        variant={room.status === 'Available' ? 'default' : room.status === 'Occupied' ? 'destructive' : 'secondary'}
        className={`absolute top-3 right-3 capitalize ${room.status === 'Available' ? 'bg-green-500 hover:bg-green-600 text-white' : ''}`}
      >
        {room.status}
      </Badge>
    </div>
    <CardHeader>
      <CardTitle className="text-xl">{room.name}</CardTitle>
      <CardDescription>Room {room.roomNumber} - {room.type}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <p className="text-sm text-muted-foreground mb-3 h-16 overflow-hidden">{room.description}</p>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="flex items-center text-primary font-semibold">
          <DollarSign className="mr-1 h-4 w-4" /> ${room.pricePerNight} / night
        </span>
        <span className="flex items-center text-muted-foreground">
          <Users className="mr-1 h-4 w-4" /> Capacity: {room.capacity}
        </span>
      </div>
      <div className="space-x-1">
        {room.amenities.slice(0, 3).map(amenity => (
          <Badge key={amenity} variant="outline" className="text-xs">{amenity}</Badge>
        ))}
        {room.amenities.length > 3 && <Badge variant="outline" className="text-xs">+{room.amenities.length - 3} more</Badge>}
      </div>
    </CardContent>
    <CardFooter className="border-t pt-4">
      <Button variant="outline" className="w-full">View Details</Button>
    </CardFooter>
  </Card>
);

export default function RoomsPage() {
  // Add filtering logic here in a real app
  const rooms = mockRooms;

  return (
    <AuthenticatedLayout pageTitle="Room Management">
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search rooms by name or number..." className="pl-10" />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select defaultValue="all">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="Available">Available</SelectItem>
              <SelectItem value="Occupied">Occupied</SelectItem>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-types">
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-types">All Types</SelectItem>
              <SelectItem value="Single">Single</SelectItem>
              <SelectItem value="Double">Double</SelectItem>
              <SelectItem value="Suite">Suite</SelectItem>
              <SelectItem value="Deluxe">Deluxe</SelectItem>
            </SelectContent>
          </Select>
           <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filters
          </Button>
           <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Room
          </Button>
        </div>
      </div>
      
      {rooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center border-2 border-dashed rounded-lg p-8">
            <BedDouble className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">No Rooms Found</h2>
            <p className="text-muted-foreground mb-4">
              It seems there are no rooms matching your criteria, or no rooms have been added yet.
            </p>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Room
            </Button>
          </div>
      )}
    </AuthenticatedLayout>
  );
}
