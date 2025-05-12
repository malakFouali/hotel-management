import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { mockBookings, mockRooms, mockClients } from '@/lib/data';
import type { Booking } from '@/types';
import { format, parseISO } from 'date-fns';
import { PlusCircle, Edit3, Trash2, MoreVertical, CalendarDays } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const getRoomName = (roomId: string) => mockRooms.find(r => r.id === roomId)?.name || 'Unknown Room';
const getClientName = (clientId: string) => {
  const client = mockClients.find(c => c.id === clientId);
  return client ? `${client.firstName} ${client.lastName}` : 'Unknown Client';
};

export default function BookingsPage() {
  const bookings = mockBookings.sort((a,b) => parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime());

  const getStatusBadgeVariant = (status: Booking['status']) => {
    switch (status) {
      case 'Confirmed': return 'default'; // default is primary, can be changed to success-like
      case 'Pending': return 'secondary';
      case 'Cancelled': return 'destructive';
      case 'Completed': return 'outline';
      default: return 'outline';
    }
  };
  
  const getStatusBadgeColor = (status: Booking['status']) => {
     switch (status) {
      case 'Confirmed': return 'bg-green-500 hover:bg-green-600 text-white';
      case 'Pending': return 'bg-yellow-500 hover:bg-yellow-600 text-black';
      default: return '';
    }
  }

  return (
    <AuthenticatedLayout pageTitle="Booking Management">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>View, manage, and create new room reservations.</CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create New Booking
          </Button>
        </CardHeader>
        <CardContent>
          {bookings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>
                  <TableHead>Room</TableHead>
                  <TableHead>Check-in</TableHead>
                  <TableHead>Check-out</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{getClientName(booking.clientId)}</TableCell>
                    <TableCell>{getRoomName(booking.roomId)}</TableCell>
                    <TableCell>{format(parseISO(booking.checkInDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>{format(parseISO(booking.checkOutDate), 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="text-center">{booking.numberOfGuests}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(booking.status)} className={getStatusBadgeColor(booking.status) + ' capitalize'}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>${booking.totalAmount.toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit3 className="mr-2 h-4 w-4" /> Modify
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">
                            <Trash2 className="mr-2 h-4 w-4" /> Cancel
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center h-[40vh] text-center border-2 border-dashed rounded-lg p-8">
              <CalendarDays className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Bookings Yet</h2>
              <p className="text-muted-foreground mb-4">
                It looks like there are no bookings in the system. Start by creating a new one.
              </p>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Booking
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AuthenticatedLayout>
  );
}
