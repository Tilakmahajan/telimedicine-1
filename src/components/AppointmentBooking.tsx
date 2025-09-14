import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { 
  User, 
  Star, 
  Clock, 
  Video,
  ArrowLeft,
  Check,
  Calendar as CalendarIcon
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ViewType = 'home' | 'patient-dashboard' | 'doctor-dashboard' | 'book-appointment' | 'video-call';

interface AppointmentBookingProps {
  onNavigate: (view: ViewType) => void;
}

const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "General Medicine",
    rating: 4.9,
    reviews: 156,
    experience: "8 years",
    available: true,
    nextAvailable: "Today 2:30 PM",
    price: 50
  },
  {
    id: 2,
    name: "Dr. Michael Chen", 
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 203,
    experience: "12 years", 
    available: true,
    nextAvailable: "Tomorrow 10:00 AM",
    price: 120
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialty: "Dermatologist", 
    rating: 4.9,
    reviews: 98,
    experience: "6 years",
    available: false,
    nextAvailable: "Dec 18, 2:00 PM", 
    price: 100
  }
];

const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
];

export const AppointmentBooking = ({ onNavigate }: AppointmentBookingProps) => {
  const [step, setStep] = useState(1);
  const [selectedDoctor, setSelectedDoctor] = useState<typeof doctors[0] | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [symptoms, setSymptoms] = useState("");
  const { toast } = useToast();

  const handleBooking = () => {
    toast({
      title: "Appointment Booked!",
      description: `Your appointment with ${selectedDoctor?.name} is confirmed for ${selectedDate?.toDateString()} at ${selectedTime}.`,
    });
    onNavigate('patient-dashboard');
  };

  const renderStep1 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Choose Your Doctor</h2>
      <div className="space-y-6">
        {doctors.map((doctor) => (
          <Card 
            key={doctor.id}
            className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-elevated ${
              selectedDoctor?.id === doctor.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedDoctor(doctor)}
          >
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="text-primary" size={32} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-semibold">{doctor.name}</h3>
                    <Badge variant="outline" className="mb-2">{doctor.specialty}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${doctor.price}</div>
                    <div className="text-sm text-muted-foreground">per consultation</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-500 fill-current" size={16} />
                    <span>{doctor.rating} ({doctor.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{doctor.experience} experience</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Video size={16} />
                    <span>Video consultation</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Badge variant={doctor.available ? "default" : "secondary"}>
                      {doctor.available ? "Available" : "Busy"}
                    </Badge>
                    <span className="ml-2 text-sm text-muted-foreground">
                      Next available: {doctor.nextAvailable}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Choose Date</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => date < new Date()}
            className="rounded-md border"
          />
        </Card>
        
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Available Times</h3>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((time) => (
              <Button
                key={time}
                variant={selectedTime === time ? "default" : "outline"}
                onClick={() => setSelectedTime(time)}
                className="justify-center"
              >
                {time}
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6">Appointment Details</h2>
      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Describe Your Symptoms</h3>
          <Textarea
            placeholder="Please describe your symptoms or reason for the appointment..."
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={6}
            className="mb-4"
          />
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Emergency Contact</label>
              <Input placeholder="Phone number" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Insurance Provider</label>
              <Input placeholder="Insurance company name" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Appointment Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Doctor:</span>
              <span className="font-medium">{selectedDoctor?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Specialty:</span>
              <span>{selectedDoctor?.specialty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date:</span>
              <span>{selectedDate?.toDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Time:</span>
              <span>{selectedTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Type:</span>
              <span>Video Consultation</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total Cost:</span>
                <span>${selectedDoctor?.price}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-secondary/10 pt-24 pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="ghost" 
              onClick={() => step === 1 ? onNavigate('home') : setStep(step - 1)}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Book Appointment</h1>
              <p className="text-muted-foreground">Step {step} of 3</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {i < step ? <Check size={16} /> : i}
                  </div>
                  {i < 3 && <div className={`w-16 h-1 ${i < step ? 'bg-primary' : 'bg-muted'}`} />}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <div></div>
            <div className="space-x-4">
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && !selectedDoctor) ||
                    (step === 2 && (!selectedDate || !selectedTime))
                  }
                  className="gradient-primary"
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  onClick={handleBooking}
                  className="gradient-primary"
                >
                  <CalendarIcon className="mr-2" size={16} />
                  Confirm Booking
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};