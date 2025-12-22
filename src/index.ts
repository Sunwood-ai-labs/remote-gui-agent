import { chromium, Page } from 'playwright';
import path from 'path';
import fs from 'fs';

async function run() {
    console.log('🚀 Playwright Starting...');

    const browser = await chromium.launch({
        headless: false, // GUIを表示するためにfalseにするよ✨
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--window-size=1280,720'
        ]
    });

    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });

    const page = await context.newPage();

    try {
        // 1. Xの投稿画面を開く 🐦
        console.log('👉 Navigating to X...');
        await page.goto('https://x.com/compose/post', {
            waitUntil: 'domcontentloaded', // 少し早めに切り上げるよ✨
            timeout: 60000 // 余裕を持って1分待つね💖 
        });

        // ログインが必要な場合は、ここでユーザーがVNC越しに操作するのを待つよ！
        console.log('💡 Please login via VNC if needed.');

        // 投稿用画像があるか確認
        const uploadDir = path.join(process.cwd(), 'uploads');
        const files = fs.readdirSync(uploadDir).filter((f: string) => !f.startsWith('.'));

        if (files.length > 0) {
            const filePath = path.join(uploadDir, files[0]);
            console.log(`📸 Found image: ${files[0]}. Attaching...`);

            // setInputFiles相当で画像添付
            const fileInput = await page.waitForSelector('input[data-testid="fileInput"]', { timeout: 60000 });
            await fileInput.setInputFiles(filePath);
            console.log('✅ Image attached!');
        } else {
            console.log('⚠️ No images found in ./uploads. Skipping attachment.');
        }

        // 投稿内容の入力（仮）
        await page.fill('div[data-testid="tweetTextarea_0"]', 'Hello from Playwright! ✨ #MVP #Automation');

        // 2. 投稿直前に承認で止まる 🛑
        console.log('✋ PAUSED for approval. Please check the VNC screen.');
        console.log('💡 Press "Unpause" in the Playwright inspector or wait for manual action.');

        // MVPなので、ここではシンプルに「投稿ボタンが押される」か「タイムアウト」まで待つか、
        // あるいは page.pause() を使いたいけど、headless環境での挙動を考慮して
        // 今回は「ユーザーが投稿ボタンを押すのを待つ」 or 「操作を待つ」ロジックにするね。
        await page.pause();

        // 3. 投稿後の成功確認 🏆
        console.log('🎉 Resuming... Checking for success.');

        // スクリーンショット保存
        const logPath = path.join(process.cwd(), 'logs', `post_${Date.now()}.png`);
        await page.screenshot({ path: logPath });
        console.log(`📸 Screenshot saved: ${logPath}`);

        // 成功確認（URL取得など）
        fs.appendFileSync(path.join(process.cwd(), 'logs', 'exec.log'), `${new Date().toISOString()}: Posted successfully (maybe)!\n`);

    } catch (error) {
        console.error('❌ Error occurred:', error);
        const errorLogPath = path.join(process.cwd(), 'logs', `error_${Date.now()}.png`);
        await page.screenshot({ path: errorLogPath });
    } finally {
        console.log('🏁 Closing browser in 10 seconds...');
        await new Promise(resolve => setTimeout(resolve, 10000));
        await browser.close();
    }
}

run().catch(console.error);
