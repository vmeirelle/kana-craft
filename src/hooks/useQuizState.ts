import { useState, useCallback, useEffect } from "react";
import { KanaData, QuizMode, KanaRow, kanaData } from "@/data/kanaData";

export interface QuizQuestion {
  kana: string;
  romaji: string;
  type: "hiragana" | "katakana";
}

export interface Mistake {
  kana: string;
  correctAnswer: string;
  userAnswer: string;
  type: "hiragana" | "katakana";
}

export interface QuizStats {
  correct: number;
  total: number;
  mistakes: Mistake[];
}

export interface QuizSettings {
  mode: QuizMode;
  selectedRows: KanaRow[];
}

export const useQuizState = () => {
  const [settings, setSettings] = useState<QuizSettings>({
    mode: "hiragana",
    selectedRows: ["a", "ka"],
  });
  
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [stats, setStats] = useState<QuizStats>({
    correct: 0,
    total: 0,
    mistakes: [],
  });
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<"correct" | "incorrect" | null>(null);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("kana-quiz-settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem("kana-quiz-settings", JSON.stringify(settings));
  }, [settings]);

  const getFilteredKana = useCallback((): KanaData[] => {
    return kanaData.filter(kana => settings.selectedRows.includes(kana.row as KanaRow));
  }, [settings.selectedRows]);

  const generateQuestion = useCallback((): QuizQuestion => {
    const availableKana = getFilteredKana();
    const randomKana = availableKana[Math.floor(Math.random() * availableKana.length)];
    
    let kana: string;
    let type: "hiragana" | "katakana";
    
    if (settings.mode === "hiragana") {
      kana = randomKana.hiragana;
      type = "hiragana";
    } else if (settings.mode === "katakana") {
      kana = randomKana.katakana;
      type = "katakana";
    } else {
      // Mixed mode
      type = Math.random() > 0.5 ? "hiragana" : "katakana";
      kana = type === "hiragana" ? randomKana.hiragana : randomKana.katakana;
    }
    
    return {
      kana,
      romaji: randomKana.romaji,
      type,
    };
  }, [settings.mode, getFilteredKana]);

  const startNewQuestion = useCallback(() => {
    const question = generateQuestion();
    setCurrentQuestion(question);
    setUserAnswer("");
    setShowResult(false);
    setLastResult(null);
  }, [generateQuestion]);

  const submitAnswer = useCallback(() => {
    if (!currentQuestion || !userAnswer.trim()) return;

    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.romaji.toLowerCase();
    
    setStats(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
      mistakes: isCorrect 
        ? prev.mistakes 
        : [...prev.mistakes, {
            kana: currentQuestion.kana,
            correctAnswer: currentQuestion.romaji,
            userAnswer: userAnswer.trim(),
            type: currentQuestion.type,
          }],
    }));

    setLastResult(isCorrect ? "correct" : "incorrect");
    setShowResult(true);
  }, [currentQuestion, userAnswer]);

  const resetQuiz = useCallback(() => {
    setStats({
      correct: 0,
      total: 0,
      mistakes: [],
    });
    setShowResult(false);
    setLastResult(null);
    startNewQuestion();
  }, [startNewQuestion]);

  const updateSettings = useCallback((newSettings: Partial<QuizSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  // Initialize with first question
  useEffect(() => {
    if (settings.selectedRows.length > 0) {
      startNewQuestion();
    }
  }, [settings.selectedRows, settings.mode, startNewQuestion]);

  return {
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
  };
};