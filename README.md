# 写メ日記メーカー（Vercel公開向け）

初心者でも「URLを開くだけで使える」形を目指した、シンプルなNext.jsアプリです。

## これでできること
- 日記タイプを選ぶ
- 気分やキャラを選ぶ
- ボタンを押す
- 写メ日記のタイトル・本文・ハッシュタグを生成する

## まず必要なもの
- GitHubアカウント
- Vercelアカウント
- OpenAIのAPIキー

## いちばん簡単な公開方法

### 1. GitHubにコードを置く
- このフォルダ一式をGitHubにアップロード

### 2. Vercelにログイン
- VercelでGitHub連携
- 「Add New Project」または「New Project」を押す
- このリポジトリを選ぶ

### 3. 環境変数を入れる
Vercelの設定画面で以下を追加
- Key: `OPENAI_API_KEY`
- Value: あなたのOpenAI APIキー

### 4. Deployを押す
- 数十秒〜数分でURLが発行される
- そのURLを開けば使える

## ローカルで動かしたい場合
```bash
npm install
cp .env.example .env.local
# .env.local に APIキーを入れる
npm run dev
```

## 今後追加しやすい機能
- 女の子ごとのキャラ保存
- 店舗ごとのNGワード設定
- 生成履歴保存
- LINE用の短文生成
- 口コミ返信生成
