import { useState } from "react";
import { useQuizState } from "@/hooks/useQuizState";
import { QuizCard } from "@/components/QuizCard";
import { QuizSettings } from "@/components/QuizSettings";
import { QuizStats } from "@/components/QuizStats";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Settings, BarChart3 } from "lucide-react";

const Index = () => {
  const {
    settings,
    currentQuestion,
    userAnswer,
    stats,
    showResult,
    lastResult,
    setUserAnswer,
    submitAnswer,
    startNewQuestion,
    resetQuiz,
    updateSettings,
  } = useQuizState();

  const [activeTab, setActiveTab] = useState("quiz");

  const handleNext = () => {
    startNewQuestion();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20">
      <div className="container max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-primary">Kana Quiz</h1>
          </div>
          <p className="text-muted-foreground">
            Master Japanese hiragana and katakana characters
          </p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="quiz" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              Quiz
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quiz" className="space-y-6">
            <QuizCard
              question={currentQuestion}
              userAnswer={userAnswer}
              onAnswerChange={setUserAnswer}
              onSubmit={submitAnswer}
              onNext={handleNext}
              onReset={resetQuiz}
              showResult={showResult}
              lastResult={lastResult}
            />
            
            {/* Quick Stats */}
            {stats.total > 0 && (
              <div className="text-center text-sm text-muted-foreground">
                Score: {stats.correct}/{stats.total} ({Math.round((stats.correct / stats.total) * 100)}%)
              </div>
            )}
          </TabsContent>

          <TabsContent value="settings">
            <QuizSettings
              settings={settings}
              onSettingsChange={updateSettings}
            />
          </TabsContent>

          <TabsContent value="stats">
            <QuizStats stats={stats} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
