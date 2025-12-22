#!/bin/bash
set -e

# 前回の残骸があれば削除するよ 🧹
rm -f /tmp/.X lock /tmp/.X99-lock

# Xvfb (仮想ディスプレイ) の起動 🖥️
echo "Starting Xvfb..."
Xvfb :99 -screen 0 ${SCREEN_WIDTH:-1280}x${SCREEN_HEIGHT:-720}x${SCREEN_DEPTH:-24} -ac -listen tcp &
sleep 2

# fluxbox (ウィンドウマネージャ) の起動 🪟
echo "Starting Fluxbox..."
DISPLAY=:99 fluxbox &
sleep 2

# x11vnc (VNCサーバ) の起動 🛰️
echo "Starting x11vnc..."
x11vnc -display :99 -forever -passwd ${VNC_PASSWORD:-password} -shared -rfbport 5900 &
sleep 2

# noVNC (ブラウザ用VNCクライアント) の起動 🌐
echo "Starting noVNC..."
/usr/share/novnc/utils/novnc_proxy --vnc localhost:5900 --listen 8080 &

echo "GUI Setup Complete! 🌈"
echo "Access noVNC at http://localhost:29190 (mapped from 8080)"

# コンテナを維持するために待機
wait
