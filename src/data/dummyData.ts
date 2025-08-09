// ダミーデータ定義

export interface LearningTopic {
  id: number;
  title: string;
  category: string;
  description: string;
  difficulty: '初級' | '中級' | '上級';
  tags: string[];
  estimatedTime: string;
  materials: string[];
  objectives: string[];
}

export interface LearningMaterial {
  id: number;
  title: string;
  type: 'video' | 'document' | 'interactive' | 'quiz';
  category: string;
  description: string;
  duration: string;
  thumbnail: string;
  difficulty: '初級' | '中級' | '上級';
  completedBy: number;
  rating: number;
}

export interface PortfolioItem {
  id: number;
  title: string;
  type: 'report' | 'presentation' | 'essay' | 'project' | 'video';
  status: '完成' | '作成中' | '下書き' | '提出済み';
  date: string;
  category: string;
  progress: number;
  description: string;
  tags: string[];
  fileSize?: string;
}

export interface ActivityData {
  date: string;
  count: number;
}

// 探究学習トピック
export const LEARNING_TOPICS: LearningTopic[] = [
  {
    id: 1,
    title: 'SDGsと持続可能な未来社会',
    category: '社会科学',
    description: '持続可能な開発目標について学び、地域や世界の課題解決策を探究します',
    difficulty: '中級',
    tags: ['SDGs', '環境', '社会問題', '国際協力'],
    estimatedTime: '4週間',
    materials: ['国連SDGs資料', '環境データ', '企業事例'],
    objectives: ['SDGsの理解', '問題分析力', 'ソリューション提案'],
  },
  {
    id: 2,
    title: 'AIと人間社会の共生',
    category: 'テクノロジー',
    description: '人工知能技術が社会に与える影響と、人間との共生について考察します',
    difficulty: '上級',
    tags: ['AI', '技術革新', '倫理', '未来社会'],
    estimatedTime: '6週間',
    materials: ['AI技術資料', '倫理ガイドライン', '専門家インタビュー'],
    objectives: ['AI技術の理解', '社会影響分析', '倫理的思考'],
  },
  {
    id: 3,
    title: '地域創生と観光まちづくり',
    category: '地域研究',
    description: '地方創生の課題と、観光を通じた地域活性化の方策を研究します',
    difficulty: '初級',
    tags: ['地方創生', '観光', 'まちづくり', '地域活性化'],
    estimatedTime: '3週間',
    materials: ['地域データ', '成功事例', 'フィールドワーク'],
    objectives: ['地域課題の理解', 'データ分析', '提案力'],
  },
  {
    id: 4,
    title: '食文化と健康科学',
    category: '生活科学',
    description: '日本の伝統的な食文化と現代の健康科学を結びつけて探究します',
    difficulty: '中級',
    tags: ['食文化', '健康', '栄養学', '伝統'],
    estimatedTime: '4週間',
    materials: ['栄養データ', '文化資料', '実験キット'],
    objectives: ['食文化の理解', '科学的分析', '健康提案'],
  },
  {
    id: 5,
    title: '宇宙開発と人類の未来',
    category: '科学技術',
    description: '宇宙開発技術の現状と、人類の宇宙進出について探究します',
    difficulty: '上級',
    tags: ['宇宙', '科学技術', '未来', '探査'],
    estimatedTime: '8週間',
    materials: ['宇宙機関資料', '最新研究', 'シミュレーション'],
    objectives: ['宇宙科学の理解', '技術分析', '未来予測'],
  },
  {
    id: 6,
    title: 'デジタルアートと表現',
    category: '芸術・表現',
    description: 'デジタル技術を活用した新しい芸術表現について学び、作品を制作します',
    difficulty: '中級',
    tags: ['デジタルアート', '表現', 'クリエイティブ', '技術'],
    estimatedTime: '5週間',
    materials: ['制作ソフトウェア', 'アート資料', 'チュートリアル'],
    objectives: ['デジタル表現技法', '創造性開発', '作品制作'],
  },
];

// 学習教材
export const LEARNING_MATERIALS: LearningMaterial[] = [
  {
    id: 1,
    title: 'SDGs入門：17の目標を知ろう',
    type: 'video',
    category: '導入',
    description: 'SDGsの基本概念と17の目標について分かりやすく解説します',
    duration: '15分',
    thumbnail: '📹',
    difficulty: '初級',
    completedBy: 1250,
    rating: 4.8,
  },
  {
    id: 2,
    title: 'データ分析の基礎',
    type: 'interactive',
    category: 'スキル',
    description: 'Excelやスプレッドシートを使った基本的なデータ分析手法を学習',
    duration: '45分',
    thumbnail: '📊',
    difficulty: '初級',
    completedBy: 980,
    rating: 4.6,
  },
  {
    id: 3,
    title: 'プレゼンテーション作成術',
    type: 'document',
    category: 'スキル',
    description: '効果的なプレゼンテーション資料の作成方法とコツ',
    duration: '30分',
    thumbnail: '📝',
    difficulty: '中級',
    completedBy: 756,
    rating: 4.7,
  },
  {
    id: 4,
    title: 'AI倫理クイズ',
    type: 'quiz',
    category: 'テクノロジー',
    description: 'AI技術の倫理的な課題について理解度をチェック',
    duration: '10分',
    thumbnail: '🧠',
    difficulty: '中級',
    completedBy: 643,
    rating: 4.4,
  },
  {
    id: 5,
    title: 'フィールドワーク実践ガイド',
    type: 'video',
    category: '調査手法',
    description: '効果的なフィールドワークの計画と実施方法',
    duration: '25分',
    thumbnail: '🎥',
    difficulty: '中級',
    completedBy: 432,
    rating: 4.9,
  },
  {
    id: 6,
    title: '論文の書き方基礎',
    type: 'document',
    category: 'ライティング',
    description: 'アカデミックライティングの基本構造と執筆のコツ',
    duration: '60分',
    thumbnail: '✍️',
    difficulty: '中級',
    completedBy: 867,
    rating: 4.5,
  },
];

// ポートフォリオアイテム
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: 'SDGsプロジェクト：地域の水質改善提案',
    type: 'report',
    status: '完成',
    date: '2024-12-15',
    category: '探究レポート',
    progress: 1.0,
    description: '地域河川の水質調査を基に、改善策を提案したレポート',
    tags: ['SDGs', '環境', '水質', 'データ分析'],
    fileSize: '2.3MB',
  },
  {
    id: 2,
    title: 'AI技術の社会への影響 - プレゼン資料',
    type: 'presentation',
    status: '作成中',
    date: '2024-12-10',
    category: '発表資料',
    progress: 0.75,
    description: 'AI技術が雇用や社会構造に与える影響について分析',
    tags: ['AI', 'テクノロジー', '社会分析', '未来予測'],
    fileSize: '8.7MB',
  },
  {
    id: 3,
    title: '○○大学 志望理由書',
    type: 'essay',
    status: '下書き',
    date: '2024-12-05',
    category: '志望理由書',
    progress: 0.4,
    description: '工学部情報工学科への志望理由と学習計画',
    tags: ['大学受験', '志望理由書', '情報工学'],
  },
  {
    id: 4,
    title: '地域観光促進アプリ企画書',
    type: 'project',
    status: '提出済み',
    date: '2024-11-28',
    category: 'プロジェクト',
    progress: 1.0,
    description: '地域の隠れた名所を紹介するモバイルアプリの企画提案',
    tags: ['地域創生', 'アプリ開発', '観光', 'UI/UX'],
    fileSize: '5.1MB',
  },
  {
    id: 5,
    title: '探究学習成果発表動画',
    type: 'video',
    status: '完成',
    date: '2024-11-20',
    category: '発表動画',
    progress: 1.0,
    description: '1年間の探究学習の成果をまとめた発表動画',
    tags: ['発表', '動画制作', '成果報告'],
    fileSize: '125MB',
  },
  {
    id: 6,
    title: '食品ロス削減プロジェクト計画書',
    type: 'report',
    status: '作成中',
    date: '2024-12-01',
    category: '社会課題',
    progress: 0.6,
    description: '学校給食での食品ロス削減に向けた具体的な提案',
    tags: ['食品ロス', 'SDGs', '学校', '社会貢献'],
    fileSize: '1.8MB',
  },
];

// GitHub風草グラフ用のアクティビティデータ
export const ACTIVITY_DATA: ActivityData[] = (() => {
  const data: ActivityData[] = [];
  const startDate = new Date('2024-06-01');
  const endDate = new Date('2024-12-31');
  
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    // ランダムな学習アクティビティを生成
    const dayOfWeek = d.getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    
    // 平日は学習アクティビティが多く、週末は少なめに設定
    const baseActivity = isWeekend ? 0.3 : 0.8;
    const randomFactor = Math.random();
    
    let count = 0;
    if (randomFactor < 0.2) count = 0;
    else if (randomFactor < 0.4) count = Math.floor(baseActivity * 1 + Math.random() * 1);
    else if (randomFactor < 0.7) count = Math.floor(baseActivity * 2 + Math.random() * 2);
    else if (randomFactor < 0.9) count = Math.floor(baseActivity * 3 + Math.random() * 3);
    else count = Math.floor(baseActivity * 4 + Math.random() * 4);
    
    data.push({
      date: d.toISOString().split('T')[0],
      count: Math.max(0, count),
    });
  }
  
  return data;
})();

export const ACHIEVEMENTS = [
  { title: '探究学習コンテスト 最優秀賞', date: '2024-12-15', type: '受賞', icon: '🏆' },
  { title: 'SDGsプレゼンテーション大会 優秀賞', date: '2024-11-30', type: '受賞', icon: '🥈' },
  { title: '地域フィールドワーク プロジェクト完了', date: '2024-11-15', type: '完了', icon: '✅' },
  { title: 'AI技術セミナー 参加証明', date: '2024-10-20', type: '参加', icon: '📜' },
  { title: 'データサイエンス基礎コース 修了', date: '2024-10-05', type: '資格', icon: '🎓' },
];

export const LEARNING_STATS = {
  totalStudyTime: 156, // hours
  completedProjects: 8,
  activeDays: 89,
  currentStreak: 12,
  longestStreak: 23,
  averageSessionTime: 45, // minutes
  topCategories: [
    { name: '社会科学', hours: 45, percentage: 29 },
    { name: 'テクノロジー', hours: 38, percentage: 24 },
    { name: '地域研究', hours: 32, percentage: 21 },
    { name: '生活科学', hours: 25, percentage: 16 },
    { name: 'その他', hours: 16, percentage: 10 },
  ],
};