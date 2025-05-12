import AuthenticatedLayout from '@/components/layout/AuthenticatedLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, Bed, BedDouble, TrendingUp, DollarSign, CalendarDays, BarChart3, PieChartIcon } from 'lucide-react';
import { mockHotelStats, mockBookings, mockRooms } from '@/lib/data';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChartConfig, ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Separator } from '@/components/ui/separator';

const StatCard = ({ title, value, icon: Icon, description, trend, unit }: { title: string, value: string | number, icon: React.ElementType, description?: string, trend?: string, unit?: string }) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-5 w-5 text-primary" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-foreground">{value}{unit && <span className="text-xl">{unit}</span>}</div>
      {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
      {trend && <p className="text-xs text-green-500 pt-1">{trend}</p>}
    </CardContent>
  </Card>
);

const roomTypeData = mockRooms.reduce((acc, room) => {
  const type = room.type;
  const existingType = acc.find(item => item.name === type);
  if (existingType) {
    existingType.value += 1;
  } else {
    acc.push({ name: type, value: 1, fill: `var(--color-${type.toLowerCase()})` });
  }
  return acc;
}, [] as { name: string; value: number; fill: string }[]);


const roomTypeChartConfig = roomTypeData.reduce((acc, item) => {
    acc[item.name.toLowerCase() as keyof ChartConfig] = { label: item.name, color: item.fill };
    return acc;
}, {} as ChartConfig);


const occupancyData = [
  { month: 'Jan', occupied: 65, available: 35 },
  { month: 'Feb', occupied: 70, available: 30 },
  { month: 'Mar', occupied: 80, available: 20 },
  { month: 'Apr', occupied: 75, available: 25 },
  { month: 'May', occupied: 85, available: 15 },
  { month: 'Jun', occupied: 90, available: 10 },
];

const barChartConfig = {
  occupied: { label: "Occupied", color: "hsl(var(--chart-1))" },
  available: { label: "Available", color: "hsl(var(--chart-2))" },
} satisfies ChartConfig;


export default function DashboardPage() {
  const stats = mockHotelStats;

  return (
    <AuthenticatedLayout pageTitle="Dashboard Overview">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Occupancy Rate" value={stats.occupancyRate} unit="%" icon={TrendingUp} description={`${stats.occupiedRooms} of ${stats.totalRooms} rooms`} />
        <StatCard title="Available Rooms" value={stats.availableRooms} icon={Bed} description={`Out of ${stats.totalRooms} total rooms`} />
        <StatCard title="Upcoming Check-ins" value={stats.upcomingCheckIns} icon={CalendarDays} description="In the next 7 days" />
        <StatCard title="Revenue (This Month)" value={`$${stats.totalRevenueMonth.toLocaleString()}`} icon={DollarSign} description="Projected monthly earnings" />
      </div>

      <Separator className="my-8" />

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><BarChart3 className="mr-2 h-5 w-5 text-primary"/>Monthly Occupancy Trend</CardTitle>
            <CardDescription>Occupied vs. Available rooms over the past 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] p-2">
             <ChartContainer config={barChartConfig} className="w-full h-full">
              <BarChart accessibilityLayer data={occupancyData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Legend />
                <Bar dataKey="occupied" fill="var(--color-occupied)" radius={4} />
                <Bar dataKey="available" fill="var(--color-available)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center"><PieChartIcon className="mr-2 h-5 w-5 text-primary"/>Room Type Distribution</CardTitle>
            <CardDescription>Breakdown of rooms by their type.</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] flex items-center justify-center p-2">
            <ChartContainer config={roomTypeChartConfig} className="w-full h-full aspect-square">
                <PieChart>
                   <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={roomTypeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={"80%"} labelLine={false} 
                        label={({ percent, name }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                        {roomTypeData.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Legend />
                </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
