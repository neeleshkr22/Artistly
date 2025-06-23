"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, MessageSquare, CheckCircle, XCircle, Clock } from "lucide-react"
import { initializeGSAP, staggerAnimation } from "@/lib/gsap-animations"

// Mock data for artist submissions
const artistSubmissions = [
  {
    id: 1,
    name: "Emma Wilson",
    category: ["Singer", "Songwriter"],
    location: "Seattle, WA",
    feeRange: "$600-1200",
    status: "pending",
    submittedAt: "2024-01-15",
    email: "emma.wilson@email.com",
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    category: ["DJ", "Producer"],
    location: "Phoenix, AZ",
    feeRange: "$400-800",
    status: "approved",
    submittedAt: "2024-01-14",
    email: "carlos.rodriguez@email.com",
  },
  {
    id: 3,
    name: "Lily Chen",
    category: ["Dancer", "Choreographer"],
    location: "San Francisco, CA",
    feeRange: "$500-1000",
    status: "rejected",
    submittedAt: "2024-01-13",
    email: "lily.chen@email.com",
  },
  {
    id: 4,
    name: "Michael Johnson",
    category: ["Speaker"],
    location: "Denver, CO",
    feeRange: "$1500-3000",
    status: "pending",
    submittedAt: "2024-01-12",
    email: "michael.johnson@email.com",
  },
]

// Mock data for booking requests
const bookingRequests = [
  {
    id: 1,
    eventPlanner: "Sarah Events Co.",
    artist: "Sarah Johnson",
    eventDate: "2024-02-15",
    eventType: "Wedding",
    status: "pending",
    budget: "$800-1000",
    location: "New York, NY",
  },
  {
    id: 2,
    eventPlanner: "Corporate Events Inc.",
    artist: "David Thompson",
    eventDate: "2024-02-20",
    eventType: "Corporate Event",
    status: "confirmed",
    budget: "$2000-2500",
    location: "Chicago, IL",
  },
  {
    id: 3,
    eventPlanner: "Party Planners LLC",
    artist: "Marcus Chen",
    eventDate: "2024-02-18",
    eventType: "Birthday Party",
    status: "declined",
    budget: "$500-700",
    location: "Los Angeles, CA",
  },
]

export default function DashboardPage() {
  const [submissions, setSubmissions] = useState(artistSubmissions)
  const [requests, setRequests] = useState(bookingRequests)

  useEffect(() => {
    initializeGSAP()
    staggerAnimation(".stats-card", 0.1)
  }, [])

  const handleStatusChange = (id: number, newStatus: string, type: "submission" | "request") => {
    if (type === "submission") {
      setSubmissions((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)))
    } else {
      setRequests((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)))
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
      case "confirmed":
        return (
          <Badge variant="outline" className="text-green-600 border-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
      case "declined":
        return (
          <Badge variant="outline" className="text-red-600 border-red-600">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const stats = {
    totalArtists: submissions.filter((s) => s.status === "approved").length,
    pendingApplications: submissions.filter((s) => s.status === "pending").length,
    activeBookings: requests.filter((r) => r.status === "confirmed").length,
    pendingRequests: requests.filter((r) => r.status === "pending").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Manager Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">Manage artist applications and booking requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="stats-card gsap-scale-in bg-card/80 backdrop-blur-md shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Artists</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalArtists}</div>
              <p className="text-xs text-muted-foreground">Active on platform</p>
            </CardContent>
          </Card>

          <Card className="stats-card gsap-scale-in bg-card/80 backdrop-blur-md shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingApplications}</div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>

          <Card className="stats-card gsap-scale-in bg-card/80 backdrop-blur-md shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Bookings</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeBookings}</div>
              <p className="text-xs text-muted-foreground">Confirmed events</p>
            </CardContent>
          </Card>

          <Card className="stats-card gsap-scale-in bg-card/80 backdrop-blur-md shadow-lg border-0 hover:shadow-xl transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingRequests}</div>
              <p className="text-xs text-muted-foreground">Need response</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="applications">Artist Applications</TabsTrigger>
            <TabsTrigger value="bookings">Booking Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="applications">
            <Card className="bg-card shadow-lg">
              <CardHeader>
                <CardTitle className="text-foreground">Artist Applications</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Review and manage artist applications to join the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Fee Range</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">{submission.name}</TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {submission.category.map((cat) => (
                              <Badge key={cat} variant="secondary" className="text-xs">
                                {cat}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>{submission.location}</TableCell>
                        <TableCell>{submission.feeRange}</TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell>{submission.submittedAt}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {submission.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChange(submission.id, "approved", "submission")}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Approve
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleStatusChange(submission.id, "rejected", "submission")}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Booking Requests</CardTitle>
                <CardDescription>Manage booking requests from event planners</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event Planner</TableHead>
                      <TableHead>Artist</TableHead>
                      <TableHead>Event Date</TableHead>
                      <TableHead>Event Type</TableHead>
                      <TableHead>Budget</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.eventPlanner}</TableCell>
                        <TableCell>{request.artist}</TableCell>
                        <TableCell>{request.eventDate}</TableCell>
                        <TableCell>{request.eventType}</TableCell>
                        <TableCell>{request.budget}</TableCell>
                        <TableCell>{getStatusBadge(request.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            {request.status === "pending" && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleStatusChange(request.id, "confirmed", "request")}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  Confirm
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => handleStatusChange(request.id, "declined", "request")}
                                >
                                  Decline
                                </Button>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
