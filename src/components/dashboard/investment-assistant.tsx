"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Loader2, MessageSquare, X } from "lucide-react";
import { getInvestmentAdvice } from "@/ai/flows/investment-advice-chat";
import { autoTriggerFeedback } from "@/ai/flows/auto-trigger-feedback";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface Message {
  sender: "user" | "bot";
  text: string;
}

export default function InvestmentAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hello! I'm your AI Investment Assistant. Ask me anything about stocks, markets, or financial performance.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      let response;
      if (input.toLowerCase().includes("review") || input.toLowerCase().includes("infosys") || input.toLowerCase().includes("reliance")) {
        const stockMatch = input.match(/(?:review|invest in|performance of)\s+([A-Z]+)/i);
        const stockTicker = stockMatch ? stockMatch[1] : (input.toLowerCase().includes("infosys") ? "INFY" : "RELIANCE");
        
        const feedback = await autoTriggerFeedback({ stockTicker });
        response = { advice: feedback.review };
      } else {
        response = await getInvestmentAdvice({ query: input });
      }

      const botMessage: Message = { sender: "bot", text: response.advice };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      const errorMessage: Message = { sender: "bot", text: "Sorry, I encountered an error. Please try again." };
      setMessages((prev) => [...prev, errorMessage]);
      toast({
        title: "Error",
        description: "Failed to get a response from the AI assistant.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={cn("transition-all duration-300", isOpen ? "opacity-100" : "opacity-0 pointer-events-none translate-y-4")}>
        <Card className="flex flex-col h-[60vh] w-96 shadow-xl">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <Bot />
              <CardTitle className="font-headline text-lg">Shravya Finlytics AI</CardTitle>
            </div>
             <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
             </Button>
          </CardHeader>
          <CardContent className="flex-1 overflow-hidden">
            <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-start gap-3",
                      message.sender === "user" ? "justify-end" : ""
                    )}
                  >
                    {message.sender === "bot" && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          <Bot className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-3 text-sm",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      )}
                    >
                      <p>{message.text}</p>
                    </div>
                    {message.sender === "user" && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          <User className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <Avatar className="w-8 h-8">
                        <AvatarFallback>
                          <Bot className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., Should I invest in Infosys?"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
      <div className="flex justify-end mt-2">
        <Button onClick={() => setIsOpen(!isOpen)} size="icon" className="h-14 w-14 rounded-full shadow-lg">
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </Button>
      </div>
    </div>
  );
}
