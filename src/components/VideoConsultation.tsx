import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  MessageSquare, 
  Settings,
  User,
  FileText,
  Camera,
  ArrowLeft,
  Send
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ViewType = 'home' | 'patient-dashboard' | 'doctor-dashboard' | 'book-appointment' | 'video-call';

interface VideoConsultationProps {
  onNavigate: (view: ViewType) => void;
}

export const VideoConsultation = ({ onNavigate }: VideoConsultationProps) => {
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isCallActive, setIsCallActive] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'Dr. Johnson', message: 'Hello Tilak! How are you feeling today?', time: '10:30 AM' },
    { id: 2, sender: 'You', message: 'Hi Doctor, I\'ve been having some headaches lately.', time: '10:31 AM' }
  ]);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate connection process
    const timer = setTimeout(() => {
      setConnectionStatus('connected');
      setIsCallActive(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Call duration timer
    let interval: NodeJS.Timeout;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    setConnectionStatus('disconnected');
    toast({
      title: "Call Ended",
      description: `Consultation completed. Duration: ${formatTime(callDuration)}`,
    });
    onNavigate('patient-dashboard');
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'You',
        message: chatMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setChatMessage("");
    }
  };

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onNavigate('patient-dashboard')}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Video Consultation</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge 
                    variant={connectionStatus === 'connected' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {connectionStatus}
                  </Badge>
                  {isCallActive && <span>Duration: {formatTime(callDuration)}</span>}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Settings size={16} />
              </Button>
              <Button variant="outline" size="sm">
                <FileText size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6 h-[calc(100vh-180px)]">
          {/* Video Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Doctor's Video */}
            <Card className="relative h-2/3 bg-gradient-to-br from-primary/5 to-accent/5 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {connectionStatus === 'connecting' ? (
                  <div className="text-center">
                    <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Connecting to Dr. Johnson...</p>
                  </div>
                ) : connectionStatus === 'connected' ? (
                  <>
                    <div className="w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <User className="text-primary" size={48} />
                        </div>
                        <h3 className="text-xl font-semibold">Dr. Sarah Johnson</h3>
                        <p className="text-muted-foreground">General Medicine</p>
                      </div>
                    </div>
                    
                    {/* Video overlay info */}
                    <div className="absolute top-4 left-4">
                      <Badge>Dr. Johnson</Badge>
                    </div>
                    
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge variant="outline" className="bg-background/80">
                        <Video size={12} className="mr-1" />
                        HD
                      </Badge>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <p className="text-muted-foreground">Call ended</p>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Patient's Video (Picture-in-Picture) */}
            <Card className="relative h-1/3 bg-gradient-to-br from-secondary/50 to-muted/50 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {isVideoOn ? (
                  <>
                    <div className="w-full h-full bg-gradient-to-br from-secondary/30 to-muted/30 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-2 mx-auto">
                          <User className="text-muted-foreground" size={24} />
                        </div>
                        <p className="text-sm text-muted-foreground">You</p>
                      </div>
                    </div>
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="text-xs">You</Badge>
                    </div>
                  </>
                ) : (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-2 mx-auto">
                      <VideoOff className="text-muted-foreground" size={20} />
                    </div>
                    <p className="text-sm text-muted-foreground">Camera off</p>
                  </div>
                )}
              </div>
            </Card>
            
            {/* Call Controls */}
            <div className="flex justify-center gap-4">
              <Button
                variant={isAudioOn ? "default" : "destructive"}
                size="lg"
                className="rounded-full w-12 h-12 p-0"
                onClick={() => setIsAudioOn(!isAudioOn)}
              >
                {isAudioOn ? <Mic size={20} /> : <MicOff size={20} />}
              </Button>
              
              <Button
                variant={isVideoOn ? "default" : "secondary"}
                size="lg" 
                className="rounded-full w-12 h-12 p-0"
                onClick={() => setIsVideoOn(!isVideoOn)}
              >
                {isVideoOn ? <Video size={20} /> : <VideoOff size={20} />}
              </Button>
              
              <Button
                variant="destructive"
                size="lg"
                className="rounded-full w-12 h-12 p-0"
                onClick={handleEndCall}
              >
                <Phone size={20} />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                className="rounded-full w-12 h-12 p-0"
              >
                <Camera size={20} />
              </Button>
            </div>
          </div>
          
          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-full flex flex-col">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2">
                  <MessageSquare size={20} />
                  <h3 className="font-semibold">Chat</h3>
                </div>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {chatMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col gap-1 ${
                      msg.sender === 'You' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="text-xs text-muted-foreground">
                      {msg.sender} • {msg.time}
                    </div>
                    <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      msg.sender === 'You'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="text-sm"
                  />
                  <Button size="sm" onClick={sendMessage}>
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};