import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockClients, mockBookings } from '@/lib/data';
import type { Client } from '@/types';
import { format, parseISO } from 'date-fns';
import { PlusCircle, Edit3, Eye, MoreVertical, Users2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const getClientInitials = (client: Client) => `${client.firstName[0]}${client.lastName[0]}`.toUpperCase();
const countClientBookings = (clientId: string) => mockBookings.filter(b => b.clientId === clientId).length;

export default function ClientsPage() {
  const clients = mockClients.sort((a,b) => parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime());

  return (
    <AuthenticatedLayout pageTitle="Client Management">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>All Clients</CardTitle>
            <CardDescription>Manage client profiles and view their booking history.</CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Client
          </Button>
        </CardHeader>
        <CardContent>
          {clients.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Total Bookings</TableHead>
                  <TableHead>Loyalty Tier</TableHead>
                  <TableHead>Member Since</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                           <AvatarImage src={`https://i.pravatar.cc/150?u=${client.email}`} alt={`${client.firstName} ${client.lastName}`} />
                           <AvatarFallback>{getClientInitials(client)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{client.firstName} {client.lastName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell className="text-center">{countClientBookings(client.id)}</TableCell>
                    <TableCell>
                      <Badge variant={client.loyaltyTier === 'Gold' ? 'default' : client.loyaltyTier === 'Silver' ? 'secondary' : 'outline'}
                             className={`${client.loyaltyTier === 'Gold' ? 'bg-yellow-500 text-black' : client.loyaltyTier === 'Silver' ? 'bg-gray-400 text-black' : ''} capitalize`}>
                        {client.loyaltyTier || 'N/A'}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(parseISO(client.createdAt), 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                           <DropdownMenuItem asChild>
                            <Link href={`/clients/${client.id}`}>
                              <Eye className="mr-2 h-4 w-4" /> View Profile
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit3 className="mr-2 h-4 w-4" /> Edit Client
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
              <Users2 className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Clients Found</h2>
              <p className="text-muted-foreground mb-4">
                There are no clients registered yet. Add a new client to get started.
              </p>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Client
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AuthenticatedLayout>
  );
}
