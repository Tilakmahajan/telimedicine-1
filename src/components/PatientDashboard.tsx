import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  FileText, 
  Clock, 
  Video, 
  Pill, 
  User,
  Phone,
  Mail,
  ArrowRight
} from "lucide-react";

type ViewType = 'home' | 'patient-dashboard' | 'doctor-dashboard' | 'book-appointment' | 'video-call';

interface PatientDashboardProps {
  onNavigate: (view: ViewType) => void;
}

const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    date: "Today",
    time: "2:30 PM",
    type: "Video Call",
    status: "confirmed"
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "Cardiologist",
    date: "Tomorrow",
    time: "10:00 AM",
    type: "Video Call", 
    status: "pending"
  }
];

const recentVisits = [
  {
    id: 1,
    doctor: "Dr. Emily Davis",
    date: "Dec 5, 2024",
    diagnosis: "Annual Checkup",
    prescription: "Multivitamins"
  },
  {
    id: 2,
    doctor: "Dr. James Wilson",
    date: "Nov 28, 2024", 
    diagnosis: "Cold & Flu",
    prescription: "Rest and fluids"
  }
];

export const PatientDashboard = ({ onNavigate }: PatientDashboardProps) => {
  return (
    <div className="min-h-screen bg-secondary/10 pt-24 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, John!</h1>
              <p className="text-muted-foreground">Your health dashboard</p>
            </div>
            <Button 
              onClick={() => onNavigate('book-appointment')}
              className="gradient-primary"
            >
              <Calendar className="mr-2" size={16} />
              Book Appointment
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Actions */}
              <Card className="p-6 shadow-card">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col gap-2"
                    onClick={() => onNavigate('video-call')}
                  >
                    <Video size={24} />
                    <span className="text-sm">Start Call</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-24 flex-col gap-2"
                    onClick={() => onNavigate('book-appointment')}
                  >
                    <Calendar size={24} />
                    <span className="text-sm">Book</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <FileText size={24} />
                    <span className="text-sm">Records</span>
                  </Button>
                  <Button variant="outline" className="h-24 flex-col gap-2">
                    <Pill size={24} />
                    <span className="text-sm">Prescriptions</span>
                  </Button>
                </div>
              </Card>

              {/* Upcoming Appointments */}
              <Card className="p-6 shadow-card">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Upcoming Appointments</h2>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onNavigate('book-appointment')}
                  >
                    View All <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <Card key={appointment.id} className="p-4 border-l-4 border-l-primary">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{appointment.doctor}</h3>
                            <Badge variant="outline" className="text-xs">
                              {appointment.specialty}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar size={14} />
                              {appointment.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              {appointment.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Video size={14} />
                              {appointment.type}
                            </span>
                          </div>
                        </div>
                        <Button 
                          size="sm"
                          onClick={() => onNavigate('video-call')}
                        >
                          Join
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              {/* Recent Visits */}
              <Card className="p-6 shadow-card">
                <h2 className="text-xl font-semibold mb-6">Recent Medical History</h2>
                <div className="space-y-4">
                  {recentVisits.map((visit) => (
                    <div key={visit.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium mb-1">{visit.doctor}</div>
                        <div className="text-sm text-muted-foreground mb-1">{visit.date}</div>
                        <div className="text-sm">
                          <span className="font-medium">Diagnosis:</span> {visit.diagnosis}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Prescription:</span> {visit.prescription}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <FileText size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Patient Info */}
              <Card className="p-6 shadow-card">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold">John Doe</h3>
                    <p className="text-sm text-muted-foreground">Patient ID: #12345</p>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-muted-foreground" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-muted-foreground" />
                    <span>tiakmahajan1610@email.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    <span>DOB: Jan 15, 1985</span>
                  </div>
                </div>
              </Card>

              {/* Health Metrics */}
              <Card className="p-6 shadow-card">
                <h3 className="font-semibold mb-4">Health Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Blood Pressure</span>
                    <span className="text-sm font-medium">120/80</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Heart Rate</span>
                    <span className="text-sm font-medium">72 bpm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Weight</span>
                    <span className="text-sm font-medium">175 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">BMI</span>
                    <span className="text-sm font-medium">24.2</span>
                  </div>
                </div>
              </Card>

              {/* Emergency Contact */}
              <Card className="p-6 shadow-card border-emergency-red/20">
                <h3 className="font-semibold text-emergency-red mb-4">Emergency</h3>
                <Button 
                  variant="destructive" 
                  className="w-full mb-2"
                  size="lg"
                >
                  Call 911
                </Button>
                <Button variant="outline" className="w-full" size="sm">
                  Emergency Room Locations
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};