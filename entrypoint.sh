#!/bin/bash
set -e

# 前回の残骸があれば削除するよ 🧹
rm -f /tmp/.X99-lock

# Xvfb (仮想ディスプレイ) の起動 🖥️
echo "Starting Xvfb..."
Xvfb :99 -screen 0 ${SCREEN_WIDTH}x${SCREEN_HEIGHT}x${SCREEN_DEPTH} &
X_PID=$!
sleep 2

# fluxbox (ウィンドウマネージャ) の起動 🪟
echo "Starting Fluxbox..."
fluxbox &
FLUX_PID=$!
sleep 2

# x11vnc (VNCサーバ) の起動 🛰️
echo "Starting x11vnc..."
x11vnc -display :99 -forever -passwd ${VNC_PASSWORD:-password} -shared -rfbport 5900 &
VNC_PID=$!
sleep 2

# noVNC (ブラウザ用VNCクライアント) の起動 🌐
echo "Starting noVNC..."
/usr/share/novnc/utils/novnc_proxy --vnc localhost:5900 --listen 8080 &
NOVNC_PID=$!
sleep 2

echo "GUI Setup Complete! 🌈"
echo "Access noVNC at http://localhost:19190 (mapped from 8080)"

# TypeScriptの実行 🚀
echo "Starting Playwright script..."
npx ts-node src/index.ts

# アプリが終了してもコンテナを維持したい場合はここを調整してね
# 今回はログが見たいから、少し待ってから終了するよ
echo "App finished. Waiting 60s for logs..."
sleep 60
