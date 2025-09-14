import { Card } from "@/components/ui/card";
import { 
  Stethoscope, 
  FileText, 
  Pill, 
  Calendar, 
  MessageSquare, 
  Shield,
  Clock,
  CreditCard,
  Users
} from "lucide-react";

const features = [
  {
    icon: Stethoscope,
    title: "Expert Diagnosis",
    description: "Get professional medical diagnosis from certified doctors with years of experience.",
    color: "text-primary"
  },
  {
    icon: FileText,
    title: "Medical Records",
    description: "Access and manage your complete medical history and health records securely.",
    color: "text-trust-blue"
  },
  {
    icon: Pill,
    title: "Digital Prescriptions",
    description: "Receive electronic prescriptions that can be sent directly to your pharmacy.",
    color: "text-care-teal"
  },
  {
    icon: Calendar,
    title: "Flexible Scheduling",
    description: "Book appointments that fit your schedule with 24/7 availability.",
    color: "text-primary"
  },
  {
    icon: MessageSquare,
    title: "Secure Messaging",
    description: "Communicate with your healthcare providers through encrypted messaging.",
    color: "text-trust-blue"
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "Your health data is protected with enterprise-grade security measures.",
    color: "text-care-teal"
  },
  {
    icon: Clock,
    title: "Same-Day Care",
    description: "Get medical attention when you need it with same-day appointments.",
    color: "text-primary"
  },
  {
    icon: CreditCard,
    title: "Insurance Accepted",
    description: "We accept most insurance plans and offer transparent pricing.",
    color: "text-trust-blue"
  },
  {
    icon: Users,
    title: "Family Accounts",
    description: "Manage healthcare for your entire family from one convenient account.",
    color: "text-care-teal"
  }
];

export const Features = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Complete Healthcare Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need for quality healthcare, delivered through our 
              state-of-the-art telemedicine platform.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="p-6 shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-up border-0 bg-background"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className="bg-secondary p-3 rounded-lg">
                    <feature.icon className={`${feature.color}`} size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};