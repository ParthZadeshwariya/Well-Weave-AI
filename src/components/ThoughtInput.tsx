import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Type, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ThoughtInputProps {
  onAddEntry: (text: string) => void;
  isAnalyzing: boolean;
}

const ThoughtInput = ({ onAddEntry, isAnalyzing }: ThoughtInputProps) => {
  const [inputText, setInputText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [inputMode, setInputMode] = useState<"text" | "voice">("text");
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const { toast } = useToast();

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      const chunks: BlobPart[] = [];
      
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        
        // For now, we'll use a simple placeholder for speech-to-text
        // In a real implementation, you'd send this to a speech-to-text service
        const placeholder = "This is a placeholder for speech-to-text. Your voice would be converted to text here and then analyzed for emotional patterns, relationships, and key concepts.";
        setInputText(placeholder);
        
        toast({
          title: "Voice recorded",
          description: "Your voice has been processed. Click send to analyze.",
        });
      };
      
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Recording failed",
        description: "Please allow microphone access to record voice notes.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const handleSubmit = () => {
    if (!inputText.trim()) {
      toast({
        title: "Empty input",
        description: "Please write something or record a voice note first.",
        variant: "destructive",
      });
      return;
    }
    
    onAddEntry(inputText.trim());
    setInputText("");
  };

  return (
    <Card className="card-neural p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Pour Your Thoughts</h3>
        <div className="flex gap-2">
          <Button
            variant={inputMode === "text" ? "glass" : "outline"}
            size="sm"
            onClick={() => setInputMode("text")}
            className="flex items-center gap-2"
          >
            <Type className="w-4 h-4" />
            Write
          </Button>
          <Button
            variant={inputMode === "voice" ? "glass" : "outline"}
            size="sm"
            onClick={() => setInputMode("voice")}
            className="flex items-center gap-2"
          >
            <Mic className="w-4 h-4" />
            Speak
          </Button>
        </div>
      </div>

      {inputMode === "text" ? (
        <Textarea
          placeholder="Let your thoughts flow freely... What's on your mind? How are you feeling? What patterns do you notice in your day?"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="min-h-32 bg-background/50 border-border/50 focus:border-primary/50"
          disabled={isAnalyzing}
        />
      ) : (
        <div className="flex flex-col items-center space-y-4 py-8">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
            isRecording ? 'bg-destructive shadow-glow neural-pulse' : 'bg-primary'
          }`}>
            {isRecording ? (
              <MicOff className="w-8 h-8 text-white" />
            ) : (
              <Mic className="w-8 h-8 text-white" />
            )}
          </div>
          
          {isRecording ? (
            <div className="text-center space-y-2">
              <p className="text-lg font-medium">Recording...</p>
              <p className="text-sm text-muted-foreground">Speak freely about your thoughts and feelings</p>
              <Button variant="destructive" onClick={stopRecording} className="mt-4">
                Stop Recording
              </Button>
            </div>
          ) : (
            <div className="text-center space-y-2">
              <p className="text-lg font-medium">Ready to listen</p>
              <p className="text-sm text-muted-foreground">Click to start recording your voice</p>
              <Button variant="glass" onClick={startRecording} className="mt-4">
                Start Recording
              </Button>
            </div>
          )}
        </div>
      )}

      {inputText && (
        <div className="flex justify-end">
          <Button 
            onClick={handleSubmit}
            disabled={isAnalyzing}
            className="flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            {isAnalyzing ? "Analyzing..." : "Weave Thoughts"}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ThoughtInput;