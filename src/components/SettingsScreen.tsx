import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { QuizSettings } from "@/hooks/useQuizSettings";
import { KanaMode, KanaRow, rowNames } from "@/data/kanaData";
import { KanjiMode, QuizBehavior, QuizType } from "@/data/kanjiData";
import { Play, BookOpen, Languages } from "lucide-react";

interface SettingsScreenProps {
  settings: QuizSettings;
  onSettingsChange: (settings: Partial<QuizSettings>) => void;
  onStartQuiz: () => void;
}

export const SettingsScreen = ({ settings, onSettingsChange, onStartQuiz }: SettingsScreenProps) => {
  const canStart = settings.quizType === "kana" 
    ? settings.selectedRows.length > 0 
    : true;

  const handleRowToggle = (row: KanaRow, checked: boolean) => {
    const newRows = checked
      ? [...settings.selectedRows, row]
      : settings.selectedRows.filter(r => r !== row);
    
    onSettingsChange({ selectedRows: newRows });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-secondary/20 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-8 shadow-[--shadow-elegant] border-0 bg-gradient-to-br from-card to-accent/20">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold text-primary">Japanese Quiz</h1>
            </div>
            <p className="text-muted-foreground">Configure your quiz settings and start learning</p>
          </div>

          {/* Quiz Type Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold text-foreground">Quiz Type</Label>
            <RadioGroup 
              value={settings.quizType} 
              onValueChange={(value: QuizType) => onSettingsChange({ quizType: value })}
              className="grid grid-cols-2 gap-4"
            >
              <Label className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 hover:bg-accent/30 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
                <RadioGroupItem value="kana" />
                <div className="flex items-center gap-2">
                  <Languages className="h-5 w-5" />
                  <span className="font-medium">Kana (Hiragana/Katakana)</span>
                </div>
              </Label>
              <Label className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 hover:bg-accent/30 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
                <RadioGroupItem value="kanji" />
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  <span className="font-medium">Kanji</span>
                </div>
              </Label>
            </RadioGroup>
          </div>

          {/* Kana Settings */}
          {settings.quizType === "kana" && (
            <div className="space-y-6">
              {/* Kana Mode */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-foreground">Kana Type</Label>
                <RadioGroup 
                  value={settings.kanaMode} 
                  onValueChange={(value: KanaMode) => onSettingsChange({ kanaMode: value })}
                  className="grid grid-cols-3 gap-3"
                >
                  <Label className="flex items-center justify-center space-x-2 cursor-pointer p-3 rounded-md border hover:bg-accent/30 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
                    <RadioGroupItem value="hiragana" />
                    <span className="text-sm">Hiragana</span>
                  </Label>
                  <Label className="flex items-center justify-center space-x-2 cursor-pointer p-3 rounded-md border hover:bg-accent/30 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
                    <RadioGroupItem value="katakana" />
                    <span className="text-sm">Katakana</span>
                  </Label>
                  <Label className="flex items-center justify-center space-x-2 cursor-pointer p-3 rounded-md border hover:bg-accent/30 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
                    <RadioGroupItem value="mixed" />
                    <span className="text-sm">Mixed</span>
                  </Label>
                </RadioGroup>
              </div>

              {/* Kana Rows */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium text-foreground">Kana Rows</Label>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => onSettingsChange({ selectedRows: Object.keys(rowNames) as KanaRow[] })}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 px-2"
                    >
                      All
                    </Button>
                    <Button
                      onClick={() => onSettingsChange({ selectedRows: [] })}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 px-2"
                    >
                      None
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {Object.entries(rowNames).map(([row, name]) => (
                    <Label
                      key={row}
                      className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-accent/30 transition-colors text-sm"
                    >
                      <Checkbox
                        checked={settings.selectedRows.includes(row as KanaRow)}
                        onCheckedChange={(checked) => 
                          handleRowToggle(row as KanaRow, checked as boolean)
                        }
                      />
                      <span className="flex-1">{name}</span>
                    </Label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Kanji Settings */}
          {settings.quizType === "kanji" && (
            <div className="space-y-6">
              {/* Kanji Mode */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-foreground">Quiz Mode</Label>
                <RadioGroup 
                  value={settings.kanjiMode} 
                  onValueChange={(value: KanjiMode) => onSettingsChange({ kanjiMode: value })}
                  className="space-y-2"
                >
                  <Label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md border hover:bg-accent/30 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
                    <RadioGroupItem value="meaning" />
                    <div>
                      <div className="font-medium">English Meaning</div>
                      <div className="text-xs text-muted-foreground">See kanji, type English meaning</div>
                    </div>
                  </Label>
                  <Label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md border hover:bg-accent/30 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
                    <RadioGroupItem value="kana" />
                    <div>
                      <div className="font-medium">Japanese Reading (Kana)</div>
                      <div className="text-xs text-muted-foreground">See kanji, type kana reading</div>
                    </div>
                  </Label>
                  <Label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md border hover:bg-accent/30 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
                    <RadioGroupItem value="romaji" />
                    <div>
                      <div className="font-medium">Romaji Reading</div>
                      <div className="text-xs text-muted-foreground">See kanji, type romaji reading</div>
                    </div>
                  </Label>
                </RadioGroup>
              </div>

              {/* Kanji Count */}
              <div className="space-y-3">
                <Label className="text-base font-medium text-foreground">Number of Kanji</Label>
                <Select
                  value={settings.kanjiCount.toString()}
                  onValueChange={(value) => onSettingsChange({ kanjiCount: parseInt(value) as 10 | 20 | 40 | 50 })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 most common</SelectItem>
                    <SelectItem value="20">20 most common</SelectItem>
                    <SelectItem value="40">40 most common</SelectItem>
                    <SelectItem value="50">50 most common</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Quiz Behavior */}
          <div className="space-y-3">
            <Label className="text-base font-medium text-foreground">Quiz Behavior</Label>
            <RadioGroup 
              value={settings.behavior} 
              onValueChange={(value: QuizBehavior) => onSettingsChange({ behavior: value })}
              className="space-y-2"
            >
              <Label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md border hover:bg-accent/30 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
                <RadioGroupItem value="one-try" />
                <div>
                  <div className="font-medium">One try per character</div>
                  <div className="text-xs text-muted-foreground">Each character appears once, whether correct or not</div>
                </div>
              </Label>
              <Label className="flex items-center space-x-3 cursor-pointer p-3 rounded-md border hover:bg-accent/30 transition-colors data-[state=checked]:border-primary data-[state=checked]:bg-primary/5">
                <RadioGroupItem value="repeat-until-correct" />
                <div>
                  <div className="font-medium">Repeat until all correct</div>
                  <div className="text-xs text-muted-foreground">Incorrect answers return to the queue until mastered</div>
                </div>
              </Label>
            </RadioGroup>
          </div>

          {/* Start Button */}
          <Button
            onClick={onStartQuiz}
            disabled={!canStart}
            size="lg"
            variant="gradient"
            className="w-full py-4 text-lg"
          >
            <Play className="h-5 w-5 mr-2" />
            Start Quiz
          </Button>

          {!canStart && settings.quizType === "kana" && (
            <p className="text-center text-sm text-muted-foreground">
              Please select at least one kana row to start
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};