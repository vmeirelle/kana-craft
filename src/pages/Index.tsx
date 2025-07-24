import { useState, useEffect } from "react";
import { useQuizSettings } from "@/hooks/useQuizSettings";
import { useQuizEngine } from "@/hooks/useQuizEngine";
import { SettingsScreen } from "@/components/SettingsScreen";
import { KanaQuizCard } from "@/components/KanaQuizCard";
import { KanjiQuizCard } from "@/components/KanjiQuizCard";
import { ResultsScreen } from "@/components/ResultsScreen";

type AppState = "settings" | "quiz" | "results";

const Index = () => {
  const { settings, updateSettings, isReady } = useQuizSettings();
  const quizEngine = useQuizEngine(settings);
  const [appState, setAppState] = useState<AppState>("settings");

  // Reset to settings when quiz is not active
  useEffect(() => {
    if (!quizEngine.isQuizActive && !quizEngine.isQuizComplete) {
      setAppState("settings");
    } else if (quizEngine.isQuizComplete) {
      setAppState("results");
    } else if (quizEngine.isQuizActive) {
      setAppState("quiz");
    }
  }, [quizEngine.isQuizActive, quizEngine.isQuizComplete]);

  const handleStartQuiz = () => {
    quizEngine.startQuiz();
    setAppState("quiz");
  };

  const handleResetToSettings = () => {
    quizEngine.resetQuiz();
    setAppState("settings");
  };

  const handleRestartQuiz = () => {
    quizEngine.startQuiz();
    setAppState("quiz");
  };

  if (!isReady) {
    return <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20" />;
  }

  if (appState === "settings") {
    return (
      <SettingsScreen
        settings={settings}
        onSettingsChange={updateSettings}
        onStartQuiz={handleStartQuiz}
      />
    );
  }

  if (appState === "results") {
    return (
      <ResultsScreen
        stats={quizEngine.stats}
        onRestart={handleRestartQuiz}
        onBackToSettings={handleResetToSettings}
      />
    );
  }

  if (appState === "quiz" && quizEngine.currentQuestion) {
    if (settings.quizType === "kana") {
      return (
        <KanaQuizCard
          question={quizEngine.currentQuestion}
          userAnswer={quizEngine.userAnswer}
          onAnswerChange={quizEngine.setUserAnswer}
          onSubmit={quizEngine.submitAnswer}
          onReset={handleResetToSettings}
          showResult={quizEngine.showResult}
          lastResult={quizEngine.lastResult}
          questionsRemaining={quizEngine.questionsRemaining}
        />
      );
    } else {
      return (
        <KanjiQuizCard
          question={quizEngine.currentQuestion}
          userAnswer={quizEngine.userAnswer}
          onAnswerChange={quizEngine.setUserAnswer}
          onSubmit={quizEngine.submitAnswer}
          onReset={handleResetToSettings}
          showResult={quizEngine.showResult}
          lastResult={quizEngine.lastResult}
          questionsRemaining={quizEngine.questionsRemaining}
        />
      );
    }
  }

  return <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20" />;
};

export default Index;
