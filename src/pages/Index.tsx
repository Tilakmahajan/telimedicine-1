import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Services } from "@/components/Services";
import { PatientDashboard } from "@/components/PatientDashboard";
import { DoctorDashboard } from "@/components/DoctorDashboard";
import { AppointmentBooking } from "@/components/AppointmentBooking";
import { VideoConsultation } from "@/components/VideoConsultation";
import { Navigation } from "@/components/Navigation";
import { useState } from "react";

type ViewType = 'home' | 'patient-dashboard' | 'doctor-dashboard' | 'book-appointment' | 'video-call';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const renderView = () => {
    switch (currentView) {
      case 'patient-dashboard':
        return <PatientDashboard onNavigate={setCurrentView} />;
      case 'doctor-dashboard':
        return <DoctorDashboard onNavigate={setCurrentView} />;
      case 'book-appointment':
        return <AppointmentBooking onNavigate={setCurrentView} />;
      case 'video-call':
        return <VideoConsultation onNavigate={setCurrentView} />;
      default:
        return (
          <>
            <Hero onNavigate={setCurrentView} />
            <Features />
            <Services />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentView={currentView} onNavigate={setCurrentView} />
      {renderView()}
    </div>
  );
};

export default Index;