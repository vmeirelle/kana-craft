import { useState, useEffect } from "react";
import { KanaMode, KanaRow } from "@/data/kanaData";
import { KanjiMode, QuizBehavior, QuizType } from "@/data/kanjiData";

export interface QuizSettings {
  quizType: QuizType;
  // Kana settings
  kanaMode: KanaMode;
  selectedRows: KanaRow[];
  // Kanji settings  
  kanjiMode: KanjiMode;
  kanjiCount: 10 | 20 | 40 | 50;
  // Quiz behavior
  behavior: QuizBehavior;
}

const defaultSettings: QuizSettings = {
  quizType: "kana",
  kanaMode: "hiragana",
  selectedRows: ["a", "ka"],
  kanjiMode: "meaning",
  kanjiCount: 10,
  behavior: "one-try",
};

export const useQuizSettings = () => {
  const [settings, setSettings] = useState<QuizSettings>(defaultSettings);
  const [isReady, setIsReady] = useState(false);

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem("kana-quiz-settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error("Failed to load settings:", error);
      }
    }
    setIsReady(true);
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    if (isReady) {
      localStorage.setItem("kana-quiz-settings", JSON.stringify(settings));
    }
  }, [settings, isReady]);

  const updateSettings = (newSettings: Partial<QuizSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return {
    settings,
    updateSettings,
    isReady,
  };
};