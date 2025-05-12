import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, FileTextIcon } from 'lucide-react';

// This is a placeholder page. Actual invoice generation would be complex.
export default function InvoicesPage() {
  return (
    <AuthenticatedLayout pageTitle="Invoice Management">
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Invoices</CardTitle>
            <CardDescription>Generate and manage client invoices.</CardDescription>
          </div>
          <Button disabled> {/* Disabled as it's a placeholder */}
            <PlusCircle className="mr-2 h-4 w-4" /> Generate New Invoice
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center h-[50vh] text-center border-2 border-dashed rounded-lg p-8">
            <FileTextIcon className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Invoice Management Coming Soon</h2>
            <p className="text-muted-foreground mb-4">
              This section will allow you to create, view, and manage invoices for client bookings.
              Currently, this feature is under development.
            </p>
            <Button disabled variant="outline">View Sample Invoice</Button>
          </div>
        </CardContent>
      </Card>
    </AuthenticatedLayout>
  );
}
