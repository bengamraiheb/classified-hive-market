
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Paperclip, MoreHorizontal, Inbox, Search } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Messages() {
  const [activeChat, setActiveChat] = useState<string | null>("1");
  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] = useState([
    {
      id: "1", 
      user: { name: "Michael Brown", avatar: "/placeholder.svg", isOnline: true },
      lastMessage: "Hi, I'm interested in your iPhone listing. Is it still available?",
      timestamp: "12:45 PM",
      unread: true,
      listing: { id: "123", title: "iPhone 13 Pro Max", price: 799, image: "/placeholder.svg" }
    },
    {
      id: "2", 
      user: { name: "Sarah Johnson", avatar: "/placeholder.svg", isOnline: false },
      lastMessage: "Thanks for the info! I'll think about it.",
      timestamp: "Yesterday",
      unread: false,
      listing: { id: "456", title: "Sony PlayStation 5", price: 450, image: "/placeholder.svg" }
    },
    {
      id: "3", 
      user: { name: "David Williams", avatar: "/placeholder.svg", isOnline: true },
      lastMessage: "Is the price negotiable?",
      timestamp: "Apr 14",
      unread: false,
      listing: { id: "789", title: "Mountain Bike", price: 350, image: "/placeholder.svg" }
    }
  ]);

  const [messages, setMessages] = useState([
    { id: "1", senderId: "other", text: "Hi, I'm interested in your iPhone listing. Is it still available?", timestamp: "12:45 PM" },
    { id: "2", senderId: "me", text: "Yes, it's still available!", timestamp: "12:46 PM" },
    { id: "3", senderId: "other", text: "Great! What's the lowest price you'd accept?", timestamp: "12:47 PM" },
    { id: "4", senderId: "me", text: "I could go down to $750 if you can pick it up today.", timestamp: "12:48 PM" },
    { id: "5", senderId: "other", text: "That works for me. Can I see it first?", timestamp: "12:50 PM" },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageInput.trim() === "") return;
    
    const newMessage = {
      id: String(messages.length + 1),
      senderId: "me",
      text: messageInput,
      timestamp: "Just now"
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput("");
  };

  const noConversations = conversations.length === 0;
  const activeConversation = conversations.find(conv => conv.id === activeChat);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Messages</h1>

      <div className="border rounded-lg overflow-hidden bg-background">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Conversations sidebar */}
          <div className="border-r">
            <Tabs defaultValue="all" className="w-full">
              <div className="p-4 border-b">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                </TabsList>
              </div>
              
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search messages..." 
                    className="pl-8"
                  />
                </div>
              </div>

              <TabsContent value="all" className="m-0">
                <div className="divide-y">
                  {conversations.map((conversation) => (
                    <div 
                      key={conversation.id}
                      onClick={() => setActiveChat(conversation.id)}
                      className={`p-4 cursor-pointer hover:bg-accent ${activeChat === conversation.id ? 'bg-accent' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                            <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                          </Avatar>
                          {conversation.user.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-medium truncate">{conversation.user.name}</p>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {conversation.timestamp}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm truncate text-muted-foreground">
                              {conversation.lastMessage}
                            </p>
                            {conversation.unread && (
                              <Badge className="ml-2">New</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {noConversations && (
                    <div className="p-8 text-center">
                      <Inbox className="w-12 h-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No messages yet</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        When you contact a seller, your conversations will appear here
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="unread" className="m-0">
                <div className="divide-y">
                  {conversations.filter(c => c.unread).map((conversation) => (
                    <div 
                      key={conversation.id}
                      onClick={() => setActiveChat(conversation.id)}
                      className={`p-4 cursor-pointer hover:bg-accent ${activeChat === conversation.id ? 'bg-accent' : ''}`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                          <AvatarFallback>{conversation.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <p className="font-medium truncate">{conversation.user.name}</p>
                            <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                              {conversation.timestamp}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm truncate text-muted-foreground">
                              {conversation.lastMessage}
                            </p>
                            <Badge className="ml-2">New</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {!conversations.some(c => c.unread) && (
                    <div className="p-8 text-center">
                      <h3 className="text-lg font-medium">No unread messages</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        You're all caught up!
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Chat area */}
          <div className="col-span-2 flex flex-col h-[75vh]">
            {activeChat && activeConversation ? (
              <>
                {/* Chat header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={activeConversation.user.avatar} alt={activeConversation.user.name} />
                      <AvatarFallback>{activeConversation.user.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{activeConversation.user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {activeConversation.user.isOnline ? "Online" : "Offline"}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Listing reference */}
                <div className="p-4 border-b bg-accent/30">
                  <div className="flex items-center">
                    <div className="h-12 w-12 mr-4">
                      <img
                        src={activeConversation.listing.image}
                        alt={activeConversation.listing.title}
                        className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{activeConversation.listing.title}</p>
                      <p className="text-primary font-semibold">${activeConversation.listing.price}</p>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.senderId === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div 
                        className={`max-w-[75%] rounded-lg px-4 py-2 ${
                          message.senderId === "me" 
                            ? "bg-primary text-primary-foreground" 
                            : "bg-muted"
                        }`}
                      >
                        <p>{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.senderId === "me" 
                            ? "text-primary-foreground/70" 
                            : "text-muted-foreground"
                        }`}>{message.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <Button 
                      type="button"
                      size="icon" 
                      variant="ghost"
                    >
                      <Paperclip className="h-5 w-5" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Inbox className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium">Select a conversation</h3>
                <p className="mt-2 text-sm text-muted-foreground max-w-md">
                  Choose a conversation from the list or start a new one by contacting a seller
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
