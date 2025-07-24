export interface KanjiData {
  kanji: string;
  meaning: string;
  kana: string;
  romaji: string;
  difficulty: number; // 1-4, where 1 is most common
}

export const kanjiData: KanjiData[] = [
  // Most common kanji (1-10)
  { kanji: "人", meaning: "person", kana: "ひと", romaji: "hito", difficulty: 1 },
  { kanji: "日", meaning: "day, sun", kana: "ひ", romaji: "hi", difficulty: 1 },
  { kanji: "国", meaning: "country", kana: "くに", romaji: "kuni", difficulty: 1 },
  { kanji: "年", meaning: "year", kana: "とし", romaji: "toshi", difficulty: 1 },
  { kanji: "大", meaning: "big", kana: "おおきい", romaji: "ookii", difficulty: 1 },
  { kanji: "十", meaning: "ten", kana: "じゅう", romaji: "juu", difficulty: 1 },
  { kanji: "二", meaning: "two", kana: "に", romaji: "ni", difficulty: 1 },
  { kanji: "本", meaning: "book, origin", kana: "ほん", romaji: "hon", difficulty: 1 },
  { kanji: "中", meaning: "inside, middle", kana: "なか", romaji: "naka", difficulty: 1 },
  { kanji: "長", meaning: "long", kana: "ながい", romaji: "nagai", difficulty: 1 },

  // Common kanji (11-20)
  { kanji: "出", meaning: "exit, go out", kana: "でる", romaji: "deru", difficulty: 2 },
  { kanji: "三", meaning: "three", kana: "さん", romaji: "san", difficulty: 2 },
  { kanji: "同", meaning: "same", kana: "おなじ", romaji: "onaji", difficulty: 2 },
  { kanji: "時", meaning: "time", kana: "とき", romaji: "toki", difficulty: 2 },
  { kanji: "政", meaning: "politics", kana: "せい", romaji: "sei", difficulty: 2 },
  { kanji: "事", meaning: "thing, matter", kana: "こと", romaji: "koto", difficulty: 2 },
  { kanji: "自", meaning: "self", kana: "じ", romaji: "ji", difficulty: 2 },
  { kanji: "社", meaning: "company", kana: "しゃ", romaji: "sha", difficulty: 2 },
  { kanji: "一", meaning: "one", kana: "いち", romaji: "ichi", difficulty: 2 },
  { kanji: "方", meaning: "direction, way", kana: "ほう", romaji: "hou", difficulty: 2 },

  // More kanji (21-40)
  { kanji: "学", meaning: "study", kana: "がく", romaji: "gaku", difficulty: 3 },
  { kanji: "生", meaning: "life, student", kana: "せい", romaji: "sei", difficulty: 3 },
  { kanji: "地", meaning: "earth, land", kana: "ち", romaji: "chi", difficulty: 3 },
  { kanji: "市", meaning: "city", kana: "し", romaji: "shi", difficulty: 3 },
  { kanji: "業", meaning: "business", kana: "ぎょう", romaji: "gyou", difficulty: 3 },
  { kanji: "新", meaning: "new", kana: "あたらしい", romaji: "atarashii", difficulty: 3 },
  { kanji: "場", meaning: "place", kana: "ば", romaji: "ba", difficulty: 3 },
  { kanji: "問", meaning: "question", kana: "もん", romaji: "mon", difficulty: 3 },
  { kanji: "手", meaning: "hand", kana: "て", romaji: "te", difficulty: 3 },
  { kanji: "力", meaning: "power", kana: "ちから", romaji: "chikara", difficulty: 3 },
  { kanji: "言", meaning: "say, word", kana: "いう", romaji: "iu", difficulty: 3 },
  { kanji: "高", meaning: "high", kana: "たかい", romaji: "takai", difficulty: 3 },
  { kanji: "体", meaning: "body", kana: "からだ", romaji: "karada", difficulty: 3 },
  { kanji: "世", meaning: "world", kana: "よ", romaji: "yo", difficulty: 3 },
  { kanji: "見", meaning: "see", kana: "みる", romaji: "miru", difficulty: 3 },
  { kanji: "今", meaning: "now", kana: "いま", romaji: "ima", difficulty: 3 },
  { kanji: "家", meaning: "house", kana: "いえ", romaji: "ie", difficulty: 3 },
  { kanji: "間", meaning: "interval, between", kana: "あいだ", romaji: "aida", difficulty: 3 },
  { kanji: "子", meaning: "child", kana: "こ", romaji: "ko", difficulty: 3 },
  { kanji: "分", meaning: "minute, divide", kana: "ぶん", romaji: "bun", difficulty: 3 },

  // Advanced kanji (41-50)
  { kanji: "何", meaning: "what", kana: "なに", romaji: "nani", difficulty: 4 },
  { kanji: "小", meaning: "small", kana: "ちいさい", romaji: "chiisai", difficulty: 4 },
  { kanji: "前", meaning: "before, front", kana: "まえ", romaji: "mae", difficulty: 4 },
  { kanji: "後", meaning: "after, behind", kana: "あと", romaji: "ato", difficulty: 4 },
  { kanji: "女", meaning: "woman", kana: "おんな", romaji: "onna", difficulty: 4 },
  { kanji: "男", meaning: "man", kana: "おとこ", romaji: "otoko", difficulty: 4 },
  { kanji: "水", meaning: "water", kana: "みず", romaji: "mizu", difficulty: 4 },
  { kanji: "火", meaning: "fire", kana: "ひ", romaji: "hi", difficulty: 4 },
  { kanji: "木", meaning: "tree, wood", kana: "き", romaji: "ki", difficulty: 4 },
  { kanji: "金", meaning: "money, gold", kana: "きん", romaji: "kin", difficulty: 4 },
];

export const getKanjiByCount = (count: 10 | 20 | 40 | 50): KanjiData[] => {
  return kanjiData.slice(0, count);
};

export type KanjiMode = "meaning" | "kana" | "romaji";
export type QuizBehavior = "one-try" | "repeat-until-correct";
export type QuizType = "kana" | "kanji";