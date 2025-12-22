FROM mcr.microsoft.com/playwright:v1.57.0-noble

# GUI環境に必要なパッケージのインストール ✨
RUN apt-get update && apt-get install -y \
    xvfb \
    fluxbox \
    x11vnc \
    novnc \
    websockify \
    net-tools \
    && rm -rf /var/lib/apt/lists/*

# 作業ディレクトリの設定 📂
WORKDIR /app

# package.jsonなどのコピー（キャッシュ利用のため）
COPY package*.json ./
RUN npm install

# アプリケーションコードのコピー
COPY . .

# noVNCのWebインターフェースへのシンボリックリンク作成
RUN ln -s /usr/share/novnc/vnc.html /usr/share/novnc/index.html

# 実行権限の付与 🏃‍♀️
RUN chmod +x entrypoint.sh

# 環境変数の設定
ENV DISPLAY=:99
ENV SCREEN_WIDTH=1280
ENV SCREEN_HEIGHT=720
ENV SCREEN_DEPTH=24

# ポートの開放: 8080 (noVNC)
EXPOSE 8080

ENTRYPOINT ["./entrypoint.sh"]
