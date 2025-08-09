# 産経エデュケーション - 探究学習支援アプリ

<div align="center">
  <img src="./assets/icon.png" alt="産経エデュケーション" width="120" height="120">
  <h2>探究学習必修化対応 総合学習支援アプリ</h2>
  <p>Claude Code + Expo で開発されたクロスプラットフォーム教育アプリ</p>
</div>

## 🚀 プロジェクト概要

産経エデュケーションは、探究学習必修化・大学入試改革に対応した中高生・教師向けの学習支援アプリです。AI技術を活用して、テーマ発見から志望理由書作成まで、探究学習の全工程を総合的にサポートします。

### 🎯 主要機能

- **🔍 探究学習ガイド**: テーマ発見から発表まで段階的サポート
- **🤖 AI学習支援**: 志望理由書・小論文の添削とフィードバック
- **📁 ポートフォリオ管理**: 学習成果の整理と自己PR作成
- **📊 進捗管理**: 学習状況の可視化と目標管理
- **👥 ロール別機能**: 生徒・教師それぞれに最適化された機能

### 🛠 技術スタック

- **開発支援**: Claude Code (AI支援開発)
- **フレームワーク**: Expo + React Native
- **言語**: TypeScript
- **UI**: React Native Paper
- **状態管理**: Redux Toolkit
- **ナビゲーション**: React Navigation
- **ビルド**: EAS (Expo Application Services)

## 🏗 アーキテクチャ

```
SanKeiEducation/
├── src/
│   ├── components/          # 共通コンポーネント
│   ├── screens/            # 画面コンポーネント
│   │   ├── HomeScreen.tsx
│   │   ├── ExploreScreen.tsx
│   │   ├── AIAssistantScreen.tsx
│   │   ├── PortfolioScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── LoginScreen.tsx
│   ├── store/              # Redux設定
│   ├── types/              # TypeScript型定義
│   └── utils/              # ユーティリティ関数
├── assets/                 # アイコン・画像
├── App.tsx                 # メインアプリコンポーネント
├── app.json               # Expo設定
├── eas.json               # EAS Build設定
└── package.json           # 依存関係
```

## 🚦 開発環境セットアップ

### 前提条件

- Node.js 18.0.0以降
- npm または yarn
- Expo CLI
- EAS CLI (App Store配布用)

### インストール

```bash
# リポジトリクローン
git clone [リポジトリURL]
cd SanKeiEducation

# 依存関係インストール
npm install

# Expo開発サーバー起動
npm start
```

### 開発モード実行

```bash
# iOS シミュレータで実行
npm run ios

# Android エミュレータで実行
npm run android

# Web ブラウザで実行
npm run web
```

## 📱 App Store申請準備

### 1. アプリメタデータ
- ✅ アプリ名: 産経エデュケーション
- ✅ Bundle ID: com.sankei.education
- ✅ カテゴリ: 教育
- ✅ 年齢制限: 4+（すべての年齢対象）

### 2. 必要なアセット
- [ ] アプリアイコン (1024x1024px)
- [ ] スプラッシュスクリーン各サイズ
- [ ] App Store スクリーンショット
  - iPhone 6.5インチ (1290x2796px) x5
  - iPad Pro 12.9インチ (2732x2048px) x5

### 3. 法的文書
- ✅ [プライバシーポリシー](./privacy-policy.md)
- ✅ [利用規約](./terms-of-service.md)
- ✅ [App Store メタデータ](./app-store-metadata.md)

### 4. EAS Build設定

```bash
# EAS初期化 (要Expoアカウント)
eas init

# iOS用プロダクションビルド
eas build --platform ios --profile production

# App Store申請
eas submit --platform ios
```

### 5. App Store Connect設定

1. **アプリ情報設定**
   - アプリ名・説明文
   - キーワード・カテゴリ
   - 対象年齢・価格設定

2. **プライバシー情報**
   - データ収集・利用の詳細
   - 第三者共有の範囲
   - データセキュリティ対策

3. **App Review情報**
   - デモアカウント提供
   - 審査ノート・特記事項
   - 連絡先情報

## 🔧 開発ワークフロー

### Claude Code活用例

```typescript
// Claude Codeによるコンポーネント生成例
const ExploreTopicCard = ({ topic, onSelect }: TopicCardProps) => {
  return (
    <Card style={styles.card} onPress={() => onSelect(topic.id)}>
      <Card.Content>
        <Title>{topic.title}</Title>
        <Paragraph>{topic.description}</Paragraph>
        <Chip>{topic.category}</Chip>
      </Card.Content>
    </Card>
  );
};
```

### Git ワークフロー

```bash
# feature ブランチ作成
git checkout -b feature/ai-assistant

# 変更をコミット
git add .
git commit -m "feat: AI学習支援機能を追加"

# メインブランチにマージ
git checkout main
git merge feature/ai-assistant
```

## 🧪 テスト

### 単体テスト
```bash
# Jest実行
npm test

# カバレッジレポート
npm run test:coverage
```

### E2Eテスト
```bash
# Detox実行 (設定後)
npm run e2e:ios
npm run e2e:android
```

## 📊 パフォーマンス目標

- **アプリ起動時間**: 3秒以内
- **画面遷移**: 1秒以内
- **AI応答時間**: 5秒以内
- **メモリ使用量**: 150MB以下
- **バッテリー消費**: 最小化

## 🔐 セキュリティ

- SSL/TLS暗号化通信
- Expo SecureStore活用
- 生体認証対応
- データ暗号化保存
- 定期的脆弱性スキャン

## 🌍 多言語対応

現在: 日本語のみ
将来対応予定: 英語、中国語、韓国語

## 📄 ライセンス

© 2025 産経新聞社 All Rights Reserved.

本アプリケーションは産経新聞社の知的財産です。無断での複製・配布・修正を禁じます。

## 🤝 コントリビューション

### 開発チーム

- **企画・設計**: 産経新聞社教育事業部
- **開発**: システム開発チーム (Claude Code活用)
- **品質保証**: QAチーム
- **UI/UX**: デザインチーム

### 開発ガイドライン

1. **コードスタイル**: ESLint + Prettier設定に従う
2. **コミット**: Conventional Commits準拠
3. **TypeScript**: 型安全性を重視
4. **テスト**: 主要機能のテストカバレッジ80%以上

## 📞 サポート・お問い合わせ

### 技術的な問い合わせ
- **Email**: dev-support@education.sankei.com
- **Slack**: #sankei-education-dev

### 一般的な問い合わせ
- **Email**: support@education.sankei.com  
- **電話**: 03-XXXX-XXXX (平日 9:00-18:00)
- **Webサイト**: https://education.sankei.com

## 📈 リリース履歴

### v1.0.0 (2025年8月9日)
- 🎉 初回リリース
- ✨ 基本機能実装 (探究学習・AI支援・ポートフォリオ)
- 🔐 認証システム実装
- 📱 iOS・Android対応

### 今後の予定
- v1.1.0: オフライン機能強化
- v1.2.0: AR/VR学習コンテンツ
- v1.3.0: 多言語対応

---

<div align="center">
  <p>🚀 <strong>Claude Code + Expo で実現する次世代教育アプリ</strong> 🚀</p>
  <p>探究学習の未来を、AIと共に創造する</p>
</div>