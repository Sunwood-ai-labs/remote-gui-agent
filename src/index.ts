import { chromium } from 'playwright';
import path from 'path';

async function run() {
    console.log('🚀 Playwright Starting (Stealth Mode enabled 🎭)...');

    // ログイン情報を保存するディレクトリ 📂
    const userDataDir = path.join(process.cwd(), 'user_data');

    // ステルス設定を盛り込んだコンテキストの起動 ✨
    const context = await chromium.launchPersistentContext(userDataDir, {
        headless: false, // GUI表示✨
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36', // 本物のChromeを装うよ🕵️‍♀️
        viewport: { width: 1280, height: 720 },
        ignoreDefaultArgs: ['--enable-automation'], // 「自動化中」フラグを消すよ🤫
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-blink-features=AutomationControlled', // navigator.webdriver を隠蔽！💖
            '--window-size=1280,720'
        ]
    });

    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

    try {
        // 1. Google/Xなどのページを開く 🐦
        // まずはGoogleログインが通るか試してみてね！💖
        console.log('👉 Navigating to Google Login (for testing stealth)...');
        await page.goto('https://accounts.google.com/', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        // 2. ユーザーが操作できるように一時停止 🛑
        console.log('✋ PAUSED for login. Please check the VNC screen.');
        console.log('💡 Stealth mode is active! Try signing in to Google now. ✨');

        await page.pause();

        // 投稿画面に移動したい場合はこちら
        // console.log('👉 Navigating to X...');
        // await page.goto('https://x.com/compose/post', { waitUntil: 'domcontentloaded' });
        // await page.pause();

        const logPath = path.join(process.cwd(), 'logs', `manual_check_${Date.now()}.png`);
        await page.screenshot({ path: logPath });
        console.log(`📸 Screenshot saved: ${logPath}`);

    } catch (error) {
        console.error('❌ Error occurred:', error);
        const errorLogPath = path.join(process.cwd(), 'logs', `error_${Date.now()}.png`);
        await page.screenshot({ path: errorLogPath });
    } finally {
        console.log('🏁 Closing browser in 10 seconds...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        await context.close();
    }
}

run().catch(console.error);
