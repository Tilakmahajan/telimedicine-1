import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, Video, Shield, Clock } from "lucide-react";
import heroImage from "@/assets/telemedicine-hero.jpg";

type ViewType = 'home' | 'patient-dashboard' | 'doctor-dashboard' | 'book-appointment' | 'video-call';

interface HeroProps {
  onNavigate: (view: ViewType) => void;
}

export const Hero = ({ onNavigate }: HeroProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-primary">Healthcare</span><br />
              <span className="text-gradient">At Your Fingertips</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Connect with certified doctors from the comfort of your home. 
              Schedule appointments, get prescriptions, and access your medical 
              records securely through our advanced telemedicine platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                onClick={() => onNavigate('book-appointment')}
                className="gradient-primary text-lg px-8 py-3 shadow-soft hover:shadow-elevated transition-all duration-300"
              >
                <Calendar className="mr-2" size={20} />
                Book Appointment
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={() => onNavigate('video-call')}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-3 transition-all duration-300"
              >
                <Video className="mr-2" size={20} />
                Start Video Call
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">100k+</div>
                <div className="text-sm text-muted-foreground">Patients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.9★</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
          
          <div className="grid gap-6 animate-slide-up">
            <Card className="p-6 shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Video className="text-primary" size={24} />
                </div>
                <h3 className="text-lg font-semibold">Video Consultations</h3>
              </div>
              <p className="text-muted-foreground">
                High-quality video calls with doctors using our secure, encrypted platform.
              </p>
            </Card>
            
            <Card className="p-6 shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-care-teal/10 p-3 rounded-lg">
                  <Clock className="text-care-teal" size={24} />
                </div>
                <h3 className="text-lg font-semibold">Instant Appointments</h3>
              </div>
              <p className="text-muted-foreground">
                Book appointments and get same-day consultations with available doctors.
              </p>
            </Card>
            
            <Card className="p-6 shadow-card hover:shadow-elevated transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-trust-blue/10 p-3 rounded-lg">
                  <Shield className="text-trust-blue" size={24} />
                </div>
                <h3 className="text-lg font-semibold">Secure & Private</h3>
              </div>
              <p className="text-muted-foreground">
                HIPAA-compliant platform ensuring your medical data is always protected.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};