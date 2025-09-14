import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "General Consultation",
    description: "Comprehensive medical consultations for common health concerns and routine checkups.",
    price: "$50",
    duration: "30 min",
    features: [
      "Video consultation",
      "Digital prescription", 
      "Medical record access",
      "Follow-up messages"
    ],
    popular: false
  },
  {
    title: "Specialist Consultation",
    description: "Expert consultations with specialists including cardiologists, dermatologists, and more.",
    price: "$120",
    duration: "45 min",
    features: [
      "Specialist video call",
      "Detailed diagnosis",
      "Treatment plan",
      "Lab test recommendations",
      "Priority scheduling"
    ],
    popular: true
  },
  {
    title: "Mental Health Support",
    description: "Professional mental health counseling and therapy sessions with licensed therapists.",
    price: "$80",
    duration: "60 min",
    features: [
      "Licensed therapist",
      "Confidential sessions",
      "Flexible scheduling",
      "Ongoing support",
      "Crisis intervention"
    ],
    popular: false
  }
];

export const Services = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Healthcare Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our range of professional healthcare services designed 
              to meet your specific medical needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.title}
                className={`p-8 shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-up relative ${
                  service.popular ? 'ring-2 ring-primary' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {service.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-primary">{service.price}</span>
                    <span className="text-muted-foreground">/ {service.duration}</span>
                  </div>
                </div>
                
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full ${
                    service.popular 
                      ? 'gradient-primary' 
                      : 'variant-outline border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                  }`}
                >
                  Book Consultation
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};