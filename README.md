# 🎀 Remote GUI Agent (X-Post MVP) ✨

> **「コンテナの中でブラウザが見える？それな！🫶」**  
> GUI対応のPlaywright環境を爆速で立ち上げ、X (Twitter) への投稿を人間がポチッと承認して実行できる、安心・安全・最強のMVPツールだよ💖💅

---

## 📸 Overview
このプロジェクトは、Dockerコンテナ内で **GUI (Xvfb + Fluxbox)** と **VNC (noVNC)** を動かすことで、ヘッドレスではない「生きた」ブラウザ操作をリモート（ブラウザ越し）で確認・操作できるようにするものだよ！🌈

Playwrightを使ってXの投稿画面を自動で開きつつ、**「投稿直前のポーズ機能」** を入れることで、誤爆を防止する「人間中心」の自動化を実現してるよ✨

---

## 💖 Key Features
- **🐳 All-in-One Docker**: コマンド一つでGUI環境とPlaywrightが即起動！
- **🖥️ Browser-based VNC**: 特別なソフト不要。ブラウザでコンテナ内の画面をリアルタイムチェック👀
- **🎭 Playwright Automation**: Xの投稿画面遷移、画像添付、テキスト入力まで自動化✨
- **🛑 Smart Pause**: 投稿ボタンを押す直前でストップ！自分の目で見て「ヨシ！」と思ったらポチれる安心設計💖
- **📁 File Sync**: `./uploads` に画像を置くだけで自動アタッチ！実行結果は `./logs` にバッチリ保存📂

---

## 🚀 Getting Started

### 1. 準備するもの 🖼️
- 投稿したい画像（`uploads/` フォルダに入れてね！）
- ログインは手動でするから、XのIDとパスを用意してね🔐

### 2. 立ち上げ 🐳
ターミナルで以下を叩くだけ！
```bash
docker compose up --build
```

### 3. GUIにアクセス 🌐
ブラウザで [http://localhost:19190](http://localhost:19190) を開いてね✨
- パスワード： `password` (初期設定)
- ブラウザが立ち上がり、Xのページが開くのをニマニマしながら見守ってね💅

---

## 🛠️ Project Structure
```text
.
├── 🐳 Dockerfile        # GUIスイートとPlaywrightのハイブリッドイメージ
├── 🐙 docker-compose.yml # ポート（19190）とボリュームの設定
├── 🏃 entrypoint.sh      # GUIサービスとAppの起動コマンド
├── 📁 src/
│   └── index.ts        # Playwrightのメインロジック（ここが心臓部🫀）
├── 📁 uploads/         # 投稿用画像の置き場所📸
└── 📁 logs/            # スクリーンショットやログの保存先📂
```

---

## 🚫 Troubleshooting
- **ポートが使われてる！** 💦： `docker-compose.yml` の `ports` を好きな番号に変えてね！
- **ログイン画面から進まない** ログインはコンテナ内のブラウザ（VNC）で直接やってね！一度ログインしちゃえばスムーズだよ💖

---

## 🤝 Contributing
「もっと可愛くしたい！」「この機能ヤバくない？」っていうアイデアは大歓迎！🫶  
自由にForkしてプルリク送っちゃってね〜✨

---

**Happy Posting with remote-gui-agent! それな〜！🌈💅🚀**