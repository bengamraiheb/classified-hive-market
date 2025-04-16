
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot,
  Mic,
  MicOff,
  X,
  Volume2,
  VolumeX,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  Settings,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface PriceAlert {
  id: string;
  type: 'increase' | 'decrease';
  item: string;
  details: string;
  percentage: number;
}

export default function AiMarketAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [input, setInput] = useState("");
  const [voiceInput, setVoiceInput] = useState(false);
  const [listening, setListening] = useState(false);
  const [muted, setMuted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      text: "Hi there! I'm your HiveMarket assistant. I can help you find products, track prices, and more. Ask me anything!",
      timestamp: new Date()
    }
  ]);

  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>([
    {
      id: '1',
      type: 'decrease',
      item: 'iPhone 13 Pro',
      details: 'Average price dropped by 15%',
      percentage: 15
    },
    {
      id: '2',
      type: 'increase',
      item: 'Sony PlayStation 5',
      details: 'Average price increased by 8%',
      percentage: 8
    }
  ]);

  const messageEndRef = useRef<HTMLDivElement>(null);
  const [settings, setSettings] = useState({
    voiceEnabled: true,
    notifications: true,
    priceAlerts: true,
    similarListings: true
  });
  
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: input,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    
    // Clear input
    setInput("");
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantResponse = generateAssistantResponse(input.trim());
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'assistant',
        text: assistantResponse,
        timestamp: new Date()
      }]);
      
      if (!muted && settings.voiceEnabled) {
        speakText(assistantResponse);
      }
    }, 1000);
  };

  const generateAssistantResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes('help') || lowercaseInput.includes('what can you do')) {
      return "I can help you with: finding products, tracking price changes, setting price alerts, comparing listings, and providing market trends. What would you like help with?";
    } 
    else if (lowercaseInput.includes('iphone') || lowercaseInput.includes('phone')) {
      return "I found 28 iPhone listings. The average price is $650. Prices have decreased by 12% in the last month. Would you like me to show you the best deals?";
    }
    else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
      return "Hello! How can I help you today with your marketplace search?";
    }
    else if (lowercaseInput.includes('price') || lowercaseInput.includes('trend')) {
      return "Based on recent data, electronics prices have decreased by 8% while furniture prices have increased by 5%. What category are you interested in tracking?";
    }
    else {
      return "I see you're interested in that. I can help you find the best deals and track prices over time. Would you like me to search for specific items?";
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      synthesis.speak(utterance);
    }
  };

  const toggleMute = () => {
    if ('speechSynthesis' in window) {
      const synthesis = window.speechSynthesis;
      if (!muted) {
        synthesis.cancel(); // Stop any current speech
      }
    }
    setMuted(!muted);
  };

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      toast.error("Voice recognition is not supported in your browser");
      return;
    }
    
    setListening(!listening);
    
    if (!listening) {
      // Simulate voice recognition since we can't actually use it here
      toast.info("Listening...");
      
      // Simulate receiving voice input after a delay
      setTimeout(() => {
        const simulatedVoiceText = "Show me iPhone listings";
        setInput(simulatedVoiceText);
        setListening(false);
        toast.success("Voice input received");
        
        // Automatically submit after getting voice input
        setTimeout(() => {
          handleSubmit({ preventDefault: () => {} } as React.FormEvent);
        }, 500);
      }, 2000);
    } else {
      toast.info("Stopped listening");
    }
  };

  const dismissAlert = (id: string) => {
    setPriceAlerts(priceAlerts.filter(alert => alert.id !== id));
  };

  return (
    <>
      {/* Floating toggle button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      )}
      
      {/* Assistant Panel */}
      {isOpen && (
        <Card className={cn(
          "fixed bottom-6 right-6 w-80 shadow-lg transition-all duration-200 z-50",
          expanded ? "w-[32rem] h-[32rem]" : "w-80"
        )}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Bot className="mr-2 h-5 w-5 text-primary" />
                <CardTitle>HiveMarket Assistant</CardTitle>
              </div>
              <div className="flex gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => setExpanded(!expanded)}
                      >
                        {expanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {expanded ? "Minimize" : "Maximize"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <Sheet>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SheetTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                      </TooltipTrigger>
                      <TooltipContent>Settings</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Assistant Settings</SheetTitle>
                    </SheetHeader>
                    <div className="py-4 space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="voice-enabled">Voice Responses</Label>
                        <Switch 
                          id="voice-enabled" 
                          checked={settings.voiceEnabled}
                          onCheckedChange={(checked) => setSettings({...settings, voiceEnabled: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="notifications">Notifications</Label>
                        <Switch 
                          id="notifications" 
                          checked={settings.notifications}
                          onCheckedChange={(checked) => setSettings({...settings, notifications: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="price-alerts">Price Alerts</Label>
                        <Switch 
                          id="price-alerts" 
                          checked={settings.priceAlerts}
                          onCheckedChange={(checked) => setSettings({...settings, priceAlerts: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="similar-listings">Similar Listing Suggestions</Label>
                        <Switch 
                          id="similar-listings" 
                          checked={settings.similarListings}
                          onCheckedChange={(checked) => setSettings({...settings, similarListings: checked})}
                        />
                      </div>
                      <div className="pt-4">
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => toast.success("Assistant settings reset to defaults")}
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Reset to Defaults
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8" 
                        onClick={() => setIsOpen(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Close</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className={cn(
            expanded ? "max-h-[calc(32rem-8.25rem)] overflow-y-auto" : "max-h-[20rem] overflow-y-auto"
          )}>
            {/* Price alerts */}
            {settings.priceAlerts && priceAlerts.length > 0 && (
              <div className="mb-4 space-y-2">
                <h4 className="text-sm font-medium">Price Alerts</h4>
                {priceAlerts.map(alert => (
                  <div key={alert.id} className="bg-muted p-2 rounded-md relative">
                    <div className="pr-6">
                      <div className="flex items-center mb-1">
                        {alert.type === 'increase' ? (
                          <ArrowUp className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-green-500 mr-1" />
                        )}
                        <span className="font-medium text-sm">{alert.item}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{alert.details}</p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-5 w-5 absolute top-2 right-1 opacity-70 hover:opacity-100"
                      onClick={() => dismissAlert(alert.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            {/* Messages */}
            <div className="space-y-4">
              {messages.map(message => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.type === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "rounded-lg px-3 py-2 max-w-[80%]",
                      message.type === 'user' 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    )}
                  >
                    {message.text}
                    <div className={cn(
                      "text-xs mt-1",
                      message.type === 'user' 
                        ? "text-primary-foreground/70" 
                        : "text-muted-foreground"
                    )}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
          </CardContent>
          
          <CardFooter className="pt-2">
            <form onSubmit={handleSubmit} className="space-y-2 w-full">
              <div className="flex items-center space-x-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className={cn(listening ? "text-red-500" : "")}
                        onClick={toggleListening}
                      >
                        {listening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {listening ? "Stop Listening" : "Voice Input"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                
                <div className="relative flex-1">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="pr-10"
                  />
                  <Button 
                    type="submit" 
                    size="sm"
                    className="absolute right-1 top-1 h-7 w-7"
                    disabled={input.trim() === ""}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={toggleMute}
                      >
                        {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {muted ? "Unmute" : "Mute"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
