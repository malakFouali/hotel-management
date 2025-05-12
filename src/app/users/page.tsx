import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUsers } from '@/lib/data';
import type { User } from '@/types';
import { format, parseISO } from 'date-fns';
import { PlusCircle, Edit3, ShieldCheck, MoreVertical, UserCog2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const getUserInitials = (user: User) => `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();

export default function UsersPage() {
  const users = mockUsers.sort((a,b) => parseISO(b.createdAt).getTime() - parseISO(a.createdAt).getTime());

  return (
    <AuthenticatedLayout pageTitle="Staff Management">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Staff Members</CardTitle>
            <CardDescription>Manage staff accounts and their access roles.</CardDescription>
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Add New Staff
          </Button>
        </CardHeader>
        <CardContent>
          {users.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Joined On</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                           <AvatarImage src={`https://i.pravatar.cc/150?u=${user.email}`} alt={`${user.firstName} ${user.lastName}`} />
                           <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.firstName} {user.lastName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="capitalize">
                        <ShieldCheck className="mr-1 h-3 w-3"/>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.isActive ? 'default' : 'destructive'} 
                             className={`${user.isActive ? 'bg-green-500 hover:bg-green-600 text-white' : ''} capitalize`}>
                        {user.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(parseISO(user.createdAt), 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit3 className="mr-2 h-4 w-4" /> Edit User
                          </DropdownMenuItem>
                           <DropdownMenuItem className="text-destructive focus:text-destructive-foreground focus:bg-destructive">
                            <UserCog2 className="mr-2 h-4 w-4" /> Deactivate
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
              <UserCog2 className="w-16 h-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">No Staff Members Found</h2>
              <p className="text-muted-foreground mb-4">
                There are no staff members registered yet. Add a new staff member to manage application access.
              </p>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New Staff
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AuthenticatedLayout>
  );
}
