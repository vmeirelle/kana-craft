import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, RotateCcw } from "lucide-react";
import { Question } from "@/hooks/useQuizEngine";

interface KanaQuizCardProps {
  question: Question;
  userAnswer: string;
  onAnswerChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  showResult: boolean;
  lastResult: "correct" | "incorrect" | null;
  questionsRemaining: number;
}

export const KanaQuizCard = ({
  question,
  userAnswer,
  onAnswerChange,
  onSubmit,
  onReset,
  showResult,
  lastResult,
  questionsRemaining,
}: KanaQuizCardProps) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !showResult) {
      onSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20 flex items-center justify-center p-4">
      <Card className={`w-full max-w-md mx-auto p-8 shadow-[--shadow-medium] border-0 transition-all duration-500 ${
        showResult
          ? lastResult === "correct"
            ? "bg-gradient-to-br from-success/20 to-success/5 ring-2 ring-success/30"
            : "bg-gradient-to-br from-destructive/20 to-destructive/5 ring-2 ring-destructive/30"
          : "bg-gradient-to-br from-card to-accent/20"
      }`}>
        <div className="text-center space-y-6">
          {/* Progress */}
          <div className="text-sm text-muted-foreground">
            {questionsRemaining} questions remaining
          </div>

          {/* Kana Display */}
          <div className="py-8">
            <div className="text-8xl font-light text-primary mb-2 select-none">
              {question.character}
            </div>
            <div className="text-sm text-muted-foreground capitalize">
              {question.mode}
            </div>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <Input
              value={userAnswer}
              onChange={(e) => onAnswerChange(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type romaji here..."
              className="text-center text-lg py-3 bg-white/50 border-2 focus:border-primary"
              disabled={showResult}
              autoFocus
            />

            {/* Result Display */}
            {showResult && (
              <div className="space-y-3">
                <div className={`flex items-center justify-center gap-2 text-lg font-medium ${
                  lastResult === "correct" ? "text-success" : "text-destructive"
                }`}>
                  {lastResult === "correct" ? (
                    <>
                      <CheckCircle2 className="h-5 w-5" />
                      Correct!
                    </>
                  ) : (
                    <>
                      <XCircle className="h-5 w-5" />
                      Incorrect
                    </>
                  )}
                </div>
                
                {lastResult === "incorrect" && (
                  <div className="text-sm text-muted-foreground">
                    Correct answer: <span className="font-medium text-foreground">{question.correctAnswer}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onReset}
              variant="outline"
              size="sm"
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Back to Settings
            </Button>
            
            {!showResult && (
              <Button
                onClick={onSubmit}
                disabled={!userAnswer.trim()}
                variant="gradient"
                className="flex-1"
              >
                Submit
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};