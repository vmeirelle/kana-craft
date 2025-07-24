import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, AlertCircle, RotateCcw, Settings } from "lucide-react";
import { QuizStats } from "@/hooks/useQuizEngine";

interface ResultsScreenProps {
  stats: QuizStats;
  onRestart: () => void;
  onBackToSettings: () => void;
}

export const ResultsScreen = ({ stats, onRestart, onBackToSettings }: ResultsScreenProps) => {
  const accuracy = stats.totalQuestions > 0 ? Math.round((stats.correctFirstTry / stats.totalQuestions) * 100) : 0;
  const totalMistakes = stats.totalMistakes;
  const mistakeCharacters = Object.entries(stats.characterMistakes).sort(([,a], [,b]) => b - a);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl mx-auto p-8 shadow-[--shadow-elegant] border-0 bg-gradient-to-br from-card to-accent/20">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3 mb-4">
              <TrendingUp className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">Quiz Complete!</h1>
            </div>
            <p className="text-muted-foreground">Here's how you performed</p>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-3 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">{stats.totalQuestions}</div>
              <div className="text-sm text-muted-foreground">Total Questions</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-success">{stats.correctFirstTry}</div>
              <div className="text-sm text-muted-foreground">Correct First Try</div>
            </div>
            
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">{accuracy}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
          </div>

          {/* Mistakes Section */}
          {totalMistakes > 0 && (
            <Card className="p-6 bg-gradient-to-br from-card to-destructive/5 border-destructive/20">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold text-destructive">
                  <AlertCircle className="h-5 w-5" />
                  Characters to Review ({totalMistakes} total mistakes)
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {mistakeCharacters.map(([character, count]) => (
                    <div 
                      key={character}
                      className="flex items-center justify-between p-3 bg-white/50 rounded-lg border border-destructive/20"
                    >
                      <div className="text-2xl">{character}</div>
                      <Badge variant="destructive" className="text-xs">
                        {count} mistake{count > 1 ? 's' : ''}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Perfect Score Message */}
          {totalMistakes === 0 && (
            <Card className="p-6 bg-gradient-to-br from-card to-success/5 border-success/20">
              <div className="text-center space-y-2">
                <div className="text-2xl">🎉</div>
                <div className="text-lg font-semibold text-success">Perfect Score!</div>
                <div className="text-sm text-muted-foreground">
                  You got every character correct on the first try!
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              onClick={onBackToSettings}
              variant="outline"
              className="flex-1"
            >
              <Settings className="h-4 w-4 mr-2" />
              Change Settings
            </Button>
            
            <Button
              onClick={onRestart}
              variant="gradient"
              className="flex-1"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Quiz Again
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};