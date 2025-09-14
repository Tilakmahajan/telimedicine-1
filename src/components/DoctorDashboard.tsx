import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Users, 
  Clock, 
  Video, 
  FileText, 
  User,
  Phone,
  MessageSquare,
  ArrowRight,
  Activity
} from "lucide-react";

type ViewType = 'home' | 'patient-dashboard' | 'doctor-dashboard' | 'book-appointment' | 'video-call';

interface DoctorDashboardProps {
  onNavigate: (view: ViewType) => void;
}

const todayAppointments = [
  {
    id: 1,
    patient: "Tilak Mahajan",
    time: "2:30 PM",
    type: "Video Call",
    condition: "Follow-up checkup",
    status: "confirmed"
  },
  {
    id: 2,
    patient: "Sarah Wilson",
    time: "3:15 PM", 
    type: "Video Call",
    condition: "Cold symptoms",
    status: "waiting"
  },
  {
    id: 3,
    patient: "Michael Johnson",
    time: "4:00 PM",
    type: "Video Call", 
    condition: "Prescription refill",
    status: "upcoming"
  }
];

const pendingTasks = [
  {
    id: 1,
    task: "Review lab results for Emma Chen",
    priority: "High",
    time: "2 hours ago"
  },
  {
    id: 2,
    task: "Approve prescription refill for David Miller", 
    priority: "Medium",
    time: "4 hours ago"
  },
  {
    id: 3,
    task: "Follow up with Lisa Garcia",
    priority: "Low",
    time: "1 day ago"
  }
];

export const DoctorDashboard = ({ onNavigate }: DoctorDashboardProps) => {
  return (
    <div className="min-h-screen bg-secondary/10 pt-24 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Good afternoon, Dr. Johnson!</h1>
              <p className="text-muted-foreground">You have 8 appointments today</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">
                <MessageSquare className="mr-2" size={16} />
                Messages
              </Button>
              <Button 
                onClick={() => onNavigate('video-call')}
                className="gradient-primary"
              >
                <Video className="mr-2" size={16} />
                Start Call
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Users className="text-primary" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">156</div>
                  <div className="text-sm text-muted-foreground">Total Patients</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="bg-trust-blue/10 p-3 rounded-lg">
                  <Calendar className="text-trust-blue" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">8</div>
                  <div className="text-sm text-muted-foreground">Today's Appointments</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="bg-care-teal/10 p-3 rounded-lg">
                  <Activity className="text-care-teal" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">4.9</div>
                  <div className="text-sm text-muted-foreground">Patient Rating</div>
                </div>
              </div>
            </Card>
            
            <Card className="p-6 shadow-card">
              <div className="flex items-center gap-4">
                <div className="bg-secondary p-3 rounded-lg">
                  <Clock className="text-foreground" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold">32h</div>
                  <div className="text-sm text-muted-foreground">This Week</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Today's Schedule */}
              <Card className="p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Today's Schedule</h2>
                  <Button variant="ghost" size="sm">
                    View All <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {todayAppointments.map((appointment) => (
                    <Card key={appointment.id} className="p-4 border-l-4 border-l-primary">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                            <User size={16} />
                          </div>
                          <div>
                            <div className="font-medium">{appointment.patient}</div>
                            <div className="text-sm text-muted-foreground">
                              {appointment.condition}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-2 mb-1">
                            <Clock size={14} />
                            <span className="text-sm font-medium">{appointment.time}</span>
                          </div>
                          <Badge 
                            variant={appointment.status === 'waiting' ? 'default' : 'outline'}
                            className="text-xs"
                          >
                            {appointment.status}
                          </Badge>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => onNavigate('video-call')}
                          disabled={appointment.status === 'upcoming'}
                        >
                          {appointment.status === 'waiting' ? 'Join' : 'Start'}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Pending Tasks */}
              <Card className="p-6 shadow-card">
                <h2 className="text-xl font-semibold mb-6">Pending Tasks</h2>
                <div className="space-y-4">
                  {pendingTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium mb-1">{task.task}</div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'outline'}
                            className="text-xs"
                          >
                            {task.priority}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{task.time}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Complete
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Doctor Profile */}
              <Card className="p-6 shadow-card">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Dr. Sarah Johnson</h3>
                    <p className="text-sm text-muted-foreground">General Medicine</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-muted-foreground" />
                    <span>+1 (555) 987-6543</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span>Available: 8 AM - 6 PM</span>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-6 shadow-card">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2" size={16} />
                    Create Prescription
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2" size={16} />
                    Patient Records
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2" size={16} />
                    Schedule Management
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2" size={16} />
                    Patient Messages
                  </Button>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6 shadow-card">
                <h3 className="font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-4 text-sm">
                  <div className="border-l-2 border-primary pl-3">
                    <div className="font-medium">Completed consultation</div>
                    <div className="text-muted-foreground">with Tilak - 1 hour ago</div>
                  </div>
                  <div className="border-l-2 border-care-teal pl-3">
                    <div className="font-medium">Reviewed lab results</div>
                    <div className="text-muted-foreground">for Emma Chen - 2 hours ago</div>
                  </div>
                  <div className="border-l-2 border-trust-blue pl-3">
                    <div className="font-medium">Sent prescription</div>
                    <div className="text-muted-foreground">to pharmacy - 3 hours ago</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};