import { Button } from "@/components/ui/button";
import { Heart, Calendar, Video, Users, Home } from "lucide-react";

type ViewType = 'home' | 'patient-dashboard' | 'doctor-dashboard' | 'book-appointment' | 'video-call';

interface NavigationProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
}

export const Navigation = ({ currentView, onNavigate }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Heart className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">MediCare+</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                currentView === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Home size={16} />
              Home
            </button>
            
            <button
              onClick={() => onNavigate('patient-dashboard')}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                currentView === 'patient-dashboard' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Users size={16} />
              Patient Portal
            </button>
            
            <button
              onClick={() => onNavigate('doctor-dashboard')}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                currentView === 'doctor-dashboard' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Users size={16} />
              Doctor Portal
            </button>
            
            <button
              onClick={() => onNavigate('book-appointment')}
              className={`flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary ${
                currentView === 'book-appointment' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Calendar size={16} />
              Book Appointment
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              onClick={() => onNavigate('video-call')}
              className="hidden sm:flex items-center gap-2"
            >
              <Video size={16} />
              Join Call
            </Button>
            
            <Button className="gradient-primary">
              Login
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};