import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { QuizMode, KanaRow, rowNames } from "@/data/kanaData";
import { QuizSettings as QuizSettingsType } from "@/hooks/useQuizState";
import { Settings } from "lucide-react";

interface QuizSettingsProps {
  settings: QuizSettingsType;
  onSettingsChange: (settings: Partial<QuizSettingsType>) => void;
}

export const QuizSettings = ({ settings, onSettingsChange }: QuizSettingsProps) => {
  const modes: { value: QuizMode; label: string }[] = [
    { value: "hiragana", label: "Hiragana Only" },
    { value: "katakana", label: "Katakana Only" },
    { value: "mixed", label: "Mixed Mode" },
  ];

  const handleRowToggle = (row: KanaRow, checked: boolean) => {
    const newRows = checked
      ? [...settings.selectedRows, row]
      : settings.selectedRows.filter(r => r !== row);
    
    onSettingsChange({ selectedRows: newRows });
  };

  const selectAllRows = () => {
    const allRows: KanaRow[] = Object.keys(rowNames) as KanaRow[];
    onSettingsChange({ selectedRows: allRows });
  };

  const clearAllRows = () => {
    onSettingsChange({ selectedRows: [] });
  };

  return (
    <Card className="w-full max-w-md mx-auto p-6 shadow-[--shadow-soft] border-0 bg-gradient-to-br from-card to-secondary/30">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-2 text-lg font-semibold text-primary">
          <Settings className="h-5 w-5" />
          Quiz Settings
        </div>

        {/* Quiz Mode */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">Quiz Mode</Label>
          <div className="grid grid-cols-1 gap-2">
            {modes.map((mode) => (
              <Label
                key={mode.value}
                className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <input
                  type="radio"
                  name="quiz-mode"
                  value={mode.value}
                  checked={settings.mode === mode.value}
                  onChange={() => onSettingsChange({ mode: mode.value })}
                  className="h-4 w-4 text-primary"
                />
                <span className="text-sm">{mode.label}</span>
              </Label>
            ))}
          </div>
        </div>

        {/* Kana Rows */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium text-foreground">Kana Rows</Label>
            <div className="flex gap-2">
              <Button
                onClick={selectAllRows}
                variant="outline"
                size="sm"
                className="text-xs h-7 px-2"
              >
                All
              </Button>
              <Button
                onClick={clearAllRows}
                variant="outline"
                size="sm"
                className="text-xs h-7 px-2"
              >
                None
              </Button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {Object.entries(rowNames).map(([row, name]) => (
              <Label
                key={row}
                className="flex items-center space-x-3 cursor-pointer p-2 rounded-md hover:bg-accent/30 transition-colors"
              >
                <Checkbox
                  checked={settings.selectedRows.includes(row as KanaRow)}
                  onCheckedChange={(checked) => 
                    handleRowToggle(row as KanaRow, checked as boolean)
                  }
                />
                <span className="text-sm flex-1">{name}</span>
              </Label>
            ))}
          </div>
        </div>

        {/* Selection Summary */}
        <div className="text-xs text-muted-foreground text-center p-3 bg-accent/20 rounded-lg">
          {settings.selectedRows.length === 0 
            ? "No rows selected" 
            : `${settings.selectedRows.length} row${settings.selectedRows.length === 1 ? '' : 's'} selected`
          }
        </div>
      </div>
    </Card>
  );
};