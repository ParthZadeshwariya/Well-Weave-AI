import { useState, useEffect } from "react";
import ThoughtInput from "./ThoughtInput";
import MindGraph from "./MindGraph";
import ChatGuide from "./ChatGuide"; // New import
import { thoughtAnalyzer, ThoughtNode, ThoughtEntry } from "./ThoughtAnalyzer";
import { useToast } from "@/hooks/use-toast";
import ErrorBoundary from "./ErrorBoundary";

const JournalInterface = () => {
  const [nodes, setNodes] = useState<ThoughtNode[]>([]);
  const [entries, setEntries] = useState<ThoughtEntry[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedNode, setSelectedNode] = useState<ThoughtNode | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    console.log('Current Nodes State:', nodes);
  }, [nodes]);

  const handleAddEntry = async (text: string) => {
    setIsAnalyzing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const entryId = `entry-${Date.now()}`;
      const analysis = await thoughtAnalyzer.analyzeText(text, entryId);
      console.log('Analysis Result:', analysis);
      const updatedNodes = thoughtAnalyzer.mergeNodes(nodes, analysis.nodes);
      console.log('Updated Nodes:', updatedNodes);
      setNodes(updatedNodes);
      setEntries(prev => {
        const newEntries = [...prev, analysis.entry];
        console.log('New State - Nodes:', updatedNodes, 'Entries:', newEntries);
        return newEntries;
      });
      toast({
        title: "Thoughts woven into your mind graph",
        description: `Found ${analysis.nodes.length} new concepts and connections.`,
      });
    } catch (error) {
      console.error('handleAddEntry Error:', error);
      toast({
        title: "Analysis failed",
        description: "There was an error processing your thoughts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleNodeClick = (node: ThoughtNode) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  return (
    <div className="space-y-8">
      <ThoughtInput 
        onAddEntry={handleAddEntry}
        isAnalyzing={isAnalyzing}
      />
      <ErrorBoundary>
        <MindGraph 
          nodes={nodes}
          entries={entries}
          onNodeClick={handleNodeClick}
        />
      </ErrorBoundary>
      <ChatGuide graphContext={{ nodes, entries }} /> {/* New chat component */}
      {entries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">{entries.length}</div>
            <div className="text-sm text-muted-foreground">Journal Entries</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">{nodes.length}</div>
            <div className="text-sm text-muted-foreground">Mind Concepts</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-primary">
              {nodes.reduce((sum, node) => sum + node.connections.length, 0) / 2}
            </div>
            <div className="text-sm text-muted-foreground">Connections</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalInterface;