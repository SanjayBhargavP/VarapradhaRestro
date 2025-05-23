'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingBag, 
  Calendar, 
  Clock, 
  User, 
  LogOut, 
  Home, 
  Settings, 
  CreditCard,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Users
} from 'lucide-react';
import { formatPrice, formatDate, orderStatusMap, reservationStatusMap } from '@/lib/utils';

// Sample user data
const user = {
  name: 'Rahul Mehta',
  email: 'rahul.mehta@example.com',
  phone: '+91 9876543210',
};

// Sample orders
const orders = [
  {
    id: 'ORD123456',
    date: new Date('2023-06-15'),
    total: 1240,
    status: 'DELIVERED',
    items: [
      { name: 'Butter Chicken', quantity: 1, price: 320 },
      { name: 'Paneer Butter Masala', quantity: 2, price: 280 },
      { name: 'Butter Naan', quantity: 4, price: 60 },
    ],
  },
  {
    id: 'ORD123457',
    date: new Date('2023-06-10'),
    total: 850,
    status: 'DELIVERED',
    items: [
      { name: 'Hyderabadi Chicken Biryani', quantity: 2, price: 350 },
      { name: 'Gulab Jamun', quantity: 2, price: 120 },
    ],
  },
  {
    id: 'ORD123458',
    date: new Date('2023-06-05'),
    total: 560,
    status: 'CANCELLED',
    items: [
      { name: 'Veg Pulao', quantity: 1, price: 220 },
      { name: 'Dal Makhani', quantity: 1, price: 220 },
      { name: 'Butter Naan', quantity: 2, price: 60 },
    ],
  },
];

// Sample reservations
const reservations = [
  {
    id: 'RES123456',
    date: new Date('2023-06-20'),
    time: '7:30 PM',
    partySize: 4,
    status: 'CONFIRMED',
  },
  {
    id: 'RES123457',
    date: new Date('2023-06-12'),
    time: '8:00 PM',
    partySize: 2,
    status: 'COMPLETED',
  },
  {
    id: 'RES123458',
    date: new Date('2023-06-01'),
    time: '6:30 PM',
    partySize: 6,
    status: 'CANCELLED',
  },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('orders');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED':
      case 'COMPLETED':
      case 'CONFIRMED':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'CANCELLED':
        return <XCircle className="h-5 w-5 text-destructive" />;
      default:
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:col-span-1"
          >
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>My Account</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center space-x-3">
                    <User className="h-10 w-10 text-primary bg-primary/10 p-2 rounded-full" />
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </div>
                
                <nav className="space-y-1">
                  <Button
                    variant={activeTab === 'orders' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('orders')}
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    My Orders
                  </Button>
                  <Button
                    variant={activeTab === 'reservations' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('reservations')}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    My Reservations
                  </Button>
                  <Button
                    variant={activeTab === 'profile' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('profile')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button
                    variant={activeTab === 'addresses' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('addresses')}
                  >
                    <Home className="mr-2 h-4 w-4" />
                    Addresses
                  </Button>
                  <Button
                    variant={activeTab === 'payment' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('payment')}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Button>
                  <Button
                    variant={activeTab === 'settings' ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => setActiveTab('settings')}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-3"
          >
            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Card key={order.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="bg-secondary/50 p-4 flex justify-between items-center">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(order.date)}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(order.status)}
                              <span className={`text-sm ${
                                order.status === 'DELIVERED' || order.status === 'COMPLETED' || order.status === 'CONFIRMED'
                                  ? 'text-green-500'
                                  : order.status === 'CANCELLED'
                                  ? 'text-destructive'
                                  : 'text-amber-500'
                              }`}>
                                {orderStatusMap[order.status as keyof typeof orderStatusMap]}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="space-y-2 mb-4">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex justify-between">
                                  <span>
                                    {item.quantity} x {item.name}
                                  </span>
                                  <span>{formatPrice(item.price * item.quantity)}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex justify-between font-medium pt-2 border-t border-border">
                              <span>Total</span>
                              <span className="text-primary">{formatPrice(order.total)}</span>
                            </div>
                          </div>
                          <div className="bg-secondary/30 p-3 flex justify-end">
                            <Button variant="outline" size="sm">
                              View Details <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No orders yet</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't placed any orders yet. Start ordering your favorite dishes!
                      </p>
                      <Button asChild>
                        <Link href="/menu">Browse Menu</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'reservations' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Reservations</h2>
                {reservations.length > 0 ? (
                  <div className="space-y-4">
                    {reservations.map((reservation) => (
                      <Card key={reservation.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="bg-secondary/50 p-4 flex justify-between items-center">
                            <div>
                              <p className="font-medium">{reservation.id}</p>
                              <p className="text-sm text-muted-foreground">
                                {formatDate(reservation.date)} at {reservation.time}
                              </p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(reservation.status)}
                              <span className={`text-sm ${
                                reservation.status === 'CONFIRMED' || reservation.status === 'COMPLETED'
                                  ? 'text-green-500'
                                  : reservation.status === 'CANCELLED'
                                  ? 'text-destructive'
                                  : 'text-amber-500'
                              }`}>
                                {reservationStatusMap[reservation.status as keyof typeof reservationStatusMap]}
                              </span>
                            </div>
                          </div>
                          <div className="p-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <Users className="h-5 w-5 text-primary mr-2" />
                                <span>{reservation.partySize} {reservation.partySize === 1 ? 'Person' : 'People'}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-5 w-5 text-primary mr-2" />
                                <span>{reservation.time}</span>
                              </div>
                            </div>
                          </div>
                          <div className="bg-secondary/30 p-3 flex justify-end">
                            <Button variant="outline" size="sm">
                              View Details <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium mb-2">No reservations yet</h3>
                      <p className="text-muted-foreground mb-4">
                        You haven't made any table reservations yet. Reserve a table for your next visit!
                      </p>
                      <Button asChild>
                        <Link href="/reservation">Make a Reservation</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold mb-6">My Profile</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                        <p className="font-medium">{user.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                        <p className="font-medium">{user.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                      <Button className="mt-4">Edit Profile</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {(activeTab === 'addresses' || activeTab === 'payment' || activeTab === 'settings') && (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
                <p className="text-muted-foreground mb-6">
                  This feature is currently under development and will be available soon.
                </p>
                <Button variant="outline" onClick={() => setActiveTab('orders')}>
                  Go Back to Orders
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}