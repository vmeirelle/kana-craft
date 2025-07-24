export interface KanaData {
  hiragana: string;
  katakana: string;
  romaji: string;
  row: string;
}

export const kanaData: KanaData[] = [
  // A-line
  { hiragana: "あ", katakana: "ア", romaji: "a", row: "a" },
  { hiragana: "い", katakana: "イ", romaji: "i", row: "a" },
  { hiragana: "う", katakana: "ウ", romaji: "u", row: "a" },
  { hiragana: "え", katakana: "エ", romaji: "e", row: "a" },
  { hiragana: "お", katakana: "オ", romaji: "o", row: "a" },
  
  // KA-line
  { hiragana: "か", katakana: "カ", romaji: "ka", row: "ka" },
  { hiragana: "き", katakana: "キ", romaji: "ki", row: "ka" },
  { hiragana: "く", katakana: "ク", romaji: "ku", row: "ka" },
  { hiragana: "け", katakana: "ケ", romaji: "ke", row: "ka" },
  { hiragana: "こ", katakana: "コ", romaji: "ko", row: "ka" },
  
  // SA-line
  { hiragana: "さ", katakana: "サ", romaji: "sa", row: "sa" },
  { hiragana: "し", katakana: "シ", romaji: "shi", row: "sa" },
  { hiragana: "す", katakana: "ス", romaji: "su", row: "sa" },
  { hiragana: "せ", katakana: "セ", romaji: "se", row: "sa" },
  { hiragana: "そ", katakana: "ソ", romaji: "so", row: "sa" },
  
  // TA-line
  { hiragana: "た", katakana: "タ", romaji: "ta", row: "ta" },
  { hiragana: "ち", katakana: "チ", romaji: "chi", row: "ta" },
  { hiragana: "つ", katakana: "ツ", romaji: "tsu", row: "ta" },
  { hiragana: "て", katakana: "テ", romaji: "te", row: "ta" },
  { hiragana: "と", katakana: "ト", romaji: "to", row: "ta" },
  
  // NA-line
  { hiragana: "な", katakana: "ナ", romaji: "na", row: "na" },
  { hiragana: "に", katakana: "ニ", romaji: "ni", row: "na" },
  { hiragana: "ぬ", katakana: "ヌ", romaji: "nu", row: "na" },
  { hiragana: "ね", katakana: "ネ", romaji: "ne", row: "na" },
  { hiragana: "の", katakana: "ノ", romaji: "no", row: "na" },
  
  // HA-line
  { hiragana: "は", katakana: "ハ", romaji: "ha", row: "ha" },
  { hiragana: "ひ", katakana: "ヒ", romaji: "hi", row: "ha" },
  { hiragana: "ふ", katakana: "フ", romaji: "fu", row: "ha" },
  { hiragana: "へ", katakana: "ヘ", romaji: "he", row: "ha" },
  { hiragana: "ほ", katakana: "ホ", romaji: "ho", row: "ha" },
  
  // MA-line
  { hiragana: "ま", katakana: "マ", romaji: "ma", row: "ma" },
  { hiragana: "み", katakana: "ミ", romaji: "mi", row: "ma" },
  { hiragana: "む", katakana: "ム", romaji: "mu", row: "ma" },
  { hiragana: "め", katakana: "メ", romaji: "me", row: "ma" },
  { hiragana: "も", katakana: "モ", romaji: "mo", row: "ma" },
  
  // YA-line
  { hiragana: "や", katakana: "ヤ", romaji: "ya", row: "ya" },
  { hiragana: "ゆ", katakana: "ユ", romaji: "yu", row: "ya" },
  { hiragana: "よ", katakana: "ヨ", romaji: "yo", row: "ya" },
  
  // RA-line
  { hiragana: "ら", katakana: "ラ", romaji: "ra", row: "ra" },
  { hiragana: "り", katakana: "リ", romaji: "ri", row: "ra" },
  { hiragana: "る", katakana: "ル", romaji: "ru", row: "ra" },
  { hiragana: "れ", katakana: "レ", romaji: "re", row: "ra" },
  { hiragana: "ろ", katakana: "ロ", romaji: "ro", row: "ra" },
  
  // WA-line
  { hiragana: "わ", katakana: "ワ", romaji: "wa", row: "wa" },
  { hiragana: "を", katakana: "ヲ", romaji: "wo", row: "wa" },
  { hiragana: "ん", katakana: "ン", romaji: "n", row: "wa" },
];

export const rowNames = {
  a: "A-line (あ・い・う・え・お)",
  ka: "KA-line (か・き・く・け・こ)",
  sa: "SA-line (さ・し・す・せ・そ)",
  ta: "TA-line (た・ち・つ・て・と)",
  na: "NA-line (な・に・ぬ・ね・の)",
  ha: "HA-line (は・ひ・ふ・へ・ほ)",
  ma: "MA-line (ま・み・む・め・も)",
  ya: "YA-line (や・ゆ・よ)",
  ra: "RA-line (ら・り・る・れ・ろ)",
  wa: "WA-line (わ・を・ん)",
} as const;

export type KanaMode = "hiragana" | "katakana" | "mixed";
export type KanaRow = keyof typeof rowNames;