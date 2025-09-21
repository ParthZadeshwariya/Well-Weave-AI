import { useState, useRef, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { ThoughtNode, ThoughtEntry, thoughtAnalyzer } from "./ThoughtAnalyzer";
import TextareaAutosize from "react-textarea-autosize"; // Optional for auto-resize

interface ChatGuideProps {
  graphContext: { nodes: ThoughtNode[]; entries: ThoughtEntry[] };
}

const ChatGuide = ({ graphContext }: ChatGuideProps) => {
  type ChatMessage = { role: 'user' | 'assistant'; content: string };
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hi! I'm your AI wellness guide. Ask about your mind graph or for advice." },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [...messages, { role: 'user' as const, content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await thoughtAnalyzer.chatWithGuide(input, graphContext, newMessages);
      setMessages([...newMessages, { role: 'assistant' as const, content: response }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: "Sorry, something went wrong. Try again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="card-neural p-6 space-y-4">
      <h3 className="text-xl font-semibold">Chat with Your AI Guide</h3>
      <div className="h-64 overflow-y-auto space-y-4 pr-4 border border-border/50 rounded-lg p-4 bg-background/50">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3/4 p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-white' : 'bg-muted'}`}>
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <TextareaAutosize
          minRows={1}
          maxRows={5}
          placeholder="Ask about your graph or for advice..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
          className="flex-1 bg-background/50 border-border/50 focus:border-primary/50"
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </Card>
  );
};

export default ChatGuide;