import { useState, useCallback, useMemo, useEffect } from "react";
import { KanaData, kanaData } from "@/data/kanaData";
import { KanjiData, getKanjiByCount } from "@/data/kanjiData";
import { QuizSettings } from "./useQuizSettings";

export interface Question {
  id: string;
  character: string;
  correctAnswer: string;
  type: "kana" | "kanji";
  mode?: string;
  attempts: number;
}

export interface QuizResult {
  question: Question;
  userAnswer: string;
  isCorrect: boolean;
  attempts: number;
}

export interface QuizStats {
  totalQuestions: number;
  correctFirstTry: number;
  totalMistakes: number;
  characterMistakes: Record<string, number>;
  results: QuizResult[];
}

export const useQuizEngine = (settings: QuizSettings) => {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState<"correct" | "incorrect" | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [queue, setQueue] = useState<Question[]>([]);
  const [stats, setStats] = useState<QuizStats>({
    totalQuestions: 0,
    correctFirstTry: 0,
    totalMistakes: 0,
    characterMistakes: {},
    results: [],
  });

  const questionsPool = useMemo(() => {
    if (settings.quizType === "kana") {
      const filteredKana = kanaData.filter(kana => 
        settings.selectedRows.includes(kana.row as any)
      );
      
      return filteredKana.map((kana): Question => {
        let character: string;
        let correctAnswer: string;
        
        if (settings.kanaMode === "hiragana") {
          character = kana.hiragana;
        } else if (settings.kanaMode === "katakana") {
          character = kana.katakana;
        } else {
          // Mixed mode
          character = Math.random() > 0.5 ? kana.hiragana : kana.katakana;
        }
        
        correctAnswer = kana.romaji;
        
        return {
          id: `${character}-${kana.romaji}`,
          character,
          correctAnswer,
          type: "kana",
          mode: settings.kanaMode,
          attempts: 0,
        };
      });
    } else {
      const kanjiSet = getKanjiByCount(settings.kanjiCount);
      
      return kanjiSet.map((kanji): Question => {
        let correctAnswer: string;
        
        switch (settings.kanjiMode) {
          case "meaning":
            correctAnswer = kanji.meaning;
            break;
          case "kana":
            correctAnswer = kanji.kana;
            break;
          case "romaji":
            correctAnswer = kanji.romaji;
            break;
        }
        
        return {
          id: `${kanji.kanji}-${settings.kanjiMode}`,
          character: kanji.kanji,
          correctAnswer,
          type: "kanji",
          mode: settings.kanjiMode,
          attempts: 0,
        };
      });
    }
  }, [settings]);

  const shuffleArray = <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const startQuiz = useCallback(() => {
    const shuffled = shuffleArray(questionsPool);
    setQueue(shuffled);
    setCurrentQuestion(shuffled[0] || null);
    setIsQuizActive(true);
    setIsQuizComplete(false);
    setStats({
      totalQuestions: shuffled.length,
      correctFirstTry: 0,
      totalMistakes: 0,
      characterMistakes: {},
      results: [],
    });
    setUserAnswer("");
    setShowResult(false);
    setLastResult(null);
  }, [questionsPool]);

  const submitAnswer = useCallback(() => {
    if (!currentQuestion || !userAnswer.trim()) return;

    const isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    const updatedQuestion = { ...currentQuestion, attempts: currentQuestion.attempts + 1 };
    
    const result: QuizResult = {
      question: updatedQuestion,
      userAnswer: userAnswer.trim(),
      isCorrect,
      attempts: updatedQuestion.attempts,
    };

    setStats(prev => {
      const newStats = { ...prev };
      newStats.results.push(result);
      
      if (isCorrect && updatedQuestion.attempts === 1) {
        newStats.correctFirstTry++;
      }
      
      if (!isCorrect) {
        newStats.totalMistakes++;
        newStats.characterMistakes[currentQuestion.character] = 
          (newStats.characterMistakes[currentQuestion.character] || 0) + 1;
      }
      
      return newStats;
    });

    setLastResult(isCorrect ? "correct" : "incorrect");
    setShowResult(true);

    if (isCorrect) {
      // Remove from queue and advance
      setTimeout(() => {
        setQueue(prev => prev.slice(1));
      }, 1500);
    } else if (settings.behavior === "repeat-until-correct") {
      // Put back at end of queue
      setTimeout(() => {
        setQueue(prev => [...prev.slice(1), updatedQuestion]);
      }, 2000);
    } else {
      // One try mode - just advance
      setTimeout(() => {
        setQueue(prev => prev.slice(1));
      }, 2000);
    }
  }, [currentQuestion, userAnswer, settings.behavior]);

  const nextQuestion = useCallback(() => {
    const nextQueue = queue.slice(1);
    
    if (nextQueue.length === 0) {
      setIsQuizComplete(true);
      setIsQuizActive(false);
      setCurrentQuestion(null);
    } else {
      setCurrentQuestion(nextQueue[0]);
    }
    
    setUserAnswer("");
    setShowResult(false);
    setLastResult(null);
  }, [queue]);

  // Auto advance to next question
  useEffect(() => {
    if (showResult && lastResult === "correct") {
      const timer = setTimeout(nextQuestion, 1500);
      return () => clearTimeout(timer);
    } else if (showResult && lastResult === "incorrect") {
      const timer = setTimeout(nextQuestion, 2000);
      return () => clearTimeout(timer);
    }
  }, [showResult, lastResult, nextQuestion]);

  const resetQuiz = useCallback(() => {
    setIsQuizActive(false);
    setIsQuizComplete(false);
    setCurrentQuestion(null);
    setQueue([]);
    setUserAnswer("");
    setShowResult(false);
    setLastResult(null);
    setStats({
      totalQuestions: 0,
      correctFirstTry: 0,
      totalMistakes: 0,
      characterMistakes: {},
      results: [],
    });
  }, []);

  return {
    currentQuestion,
    userAnswer,
    showResult,
    lastResult,
    isQuizActive,
    isQuizComplete,
    stats,
    questionsRemaining: queue.length,
    setUserAnswer,
    submitAnswer,
    startQuiz,
    resetQuiz,
    nextQuestion,
  };
};