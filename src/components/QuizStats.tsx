import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, AlertCircle, Eye, EyeOff } from "lucide-react";
import { QuizStats as QuizStatsType, Mistake } from "@/hooks/useQuizState";
import { useState } from "react";

interface QuizStatsProps {
  stats: QuizStatsType;
}

export const QuizStats = ({ stats }: QuizStatsProps) => {
  const [showMistakes, setShowMistakes] = useState(false);
  
  const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
  
  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      {/* Main Stats Card */}
      <Card className="p-6 shadow-[--shadow-soft] border-0 bg-gradient-to-br from-card to-accent/20">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lg font-semibold text-primary">
            <TrendingUp className="h-5 w-5" />
            Quiz Statistics
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-success">{stats.correct}</div>
              <div className="text-xs text-muted-foreground">Correct</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-bold text-destructive">{stats.total - stats.correct}</div>
              <div className="text-xs text-muted-foreground">Incorrect</div>
            </div>
            
            <div className="space-y-1">
              <div className="text-2xl font-bold text-primary">{accuracy}%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Target className="h-4 w-4" />
            {stats.total} total questions
          </div>
        </div>
      </Card>

      {/* Mistakes Section */}
      {stats.mistakes.length > 0 && (
        <Card className="p-6 shadow-[--shadow-soft] border-0 bg-gradient-to-br from-card to-destructive/5">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-lg font-semibold text-destructive">
                <AlertCircle className="h-5 w-5" />
                Mistakes ({stats.mistakes.length})
              </div>
              
              <Button
                onClick={() => setShowMistakes(!showMistakes)}
                variant="outline"
                size="sm"
                className="h-8"
              >
                {showMistakes ? (
                  <>
                    <EyeOff className="h-4 w-4 mr-1" />
                    Hide
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </>
                )}
              </Button>
            </div>
            
            {showMistakes && (
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {stats.mistakes.map((mistake, index) => (
                  <MistakeItem key={index} mistake={mistake} />
                ))}
              </div>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};

const MistakeItem = ({ mistake }: { mistake: Mistake }) => (
  <div className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-destructive/20">
    <div className="flex items-center gap-3">
      <div className="text-2xl">{mistake.kana}</div>
      <div className="space-y-1">
        <Badge variant="outline" className="text-xs capitalize">
          {mistake.type}
        </Badge>
        <div className="text-xs text-muted-foreground">
          You: <span className="text-destructive font-medium">{mistake.userAnswer}</span>
        </div>
      </div>
    </div>
    
    <div className="text-right">
      <div className="text-sm font-medium text-success">{mistake.correctAnswer}</div>
      <div className="text-xs text-muted-foreground">Correct</div>
    </div>
  </div>
);