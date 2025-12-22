import { chromium, BrowserContext } from 'playwright';
import path from 'path';

async function run() {
    console.log('🚀 Playwright Starting (Persistent Context Mode)...');

    // ログイン情報を保存するディレクトリ 📂
    const userDataDir = path.join(process.cwd(), 'user_data');

    const context = await chromium.launchPersistentContext(userDataDir, {
        headless: false, // GUIを表示✨
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--window-size=1280,720'
        ],
        viewport: { width: 1280, height: 720 }
    });

    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

    try {
        // 1. Xの投稿画面を開く 🐦
        console.log('👉 Navigating to X...');
        // 一時停止する前に確実にページが開くのを待つよ💖
        await page.goto('https://x.com/compose/post', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        // 2. ユーザーが操作できるように一時停止 🛑
        console.log('✋ PAUSED. Please interact via VNC.');
        console.log('💡 Once logged in, it will be saved to ./user_data! ✨');

        await page.pause();

        // ポーズ解除後にスクリーンショットを撮るよ📸
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
        await context.close(); // PersistentContextを閉じるよ💅
    }
}

run().catch(console.error);
