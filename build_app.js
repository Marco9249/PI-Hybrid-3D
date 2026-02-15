/**
 * PI-HYBRID Mobile App Builder
 * ============================
 * This script sets up a Capacitor-based Android project
 * Run: node build_app.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const APP_DIR = path.join(ROOT, 'mobile-app');

console.log('');
console.log('╔═══════════════════════════════════════════════╗');
console.log('║     PI-HYBRID MOBILE APP BUILDER              ║');
console.log('╚═══════════════════════════════════════════════╝');
console.log('');

// Step 1: Create mobile-app directory structure
console.log('[1/6] Creating project structure...');
if (!fs.existsSync(APP_DIR)) fs.mkdirSync(APP_DIR);
if (!fs.existsSync(path.join(APP_DIR, 'www'))) fs.mkdirSync(path.join(APP_DIR, 'www'));

// Step 2: Copy all web files to www/
console.log('[2/6] Copying web files...');
const filesToCopy = fs.readdirSync(ROOT).filter(f => {
    const skip = ['mobile-app', '.git', '.agent', 'node_modules', 'Archive', 'Pages',
        'build_app.js', 'SETUP_MOBILE_APP.bat', 'BUILD_APK.bat',
        'generate_icons.html', 'FIX_EVERYTHING.bat', 'UPDATE_INTERFACE.bat',
        'UPDATE_REPO.bat', 'UPLOAD_TO_GITHUB.bat', 'DEPLOY_LATEST_RESEARCH.bat',
        '🚀_FINALIZE_AND_CLEAN.bat', '🚀_PUSH_ALL_UPDATES.bat', 'main',
        '.gitignore', 'CONTRIBUTING.md', 'LICENSE', 'README.md'];
    return !skip.includes(f) && !f.endsWith('.bat');
});

function copyRecursive(src, dest) {
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        fs.readdirSync(src).forEach(child => {
            copyRecursive(path.join(src, child), path.join(dest, child));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

filesToCopy.forEach(f => {
    const src = path.join(ROOT, f);
    const dest = path.join(APP_DIR, 'www', f);
    copyRecursive(src, dest);
    console.log('  Copied:', f);
});

// Step 3: Copy icons from Desktop if available
console.log('[3/6] Setting up icons...');
const desktopIconsDir = path.join(APP_DIR, 'www', 'assets');
if (!fs.existsSync(desktopIconsDir)) fs.mkdirSync(desktopIconsDir, { recursive: true });

const desktop = path.join(require('os').homedir(), 'Desktop');
['icon-192.png', 'icon-512.png'].forEach(icon => {
    const src = path.join(desktop, icon);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(desktopIconsDir, icon));
        console.log('  Copied icon from Desktop:', icon);
    }
});

// Step 4: Create package.json
console.log('[4/6] Creating package.json...');
const pkg = {
    name: "pi-hybrid-mobile",
    version: "1.0.0",
    description: "PI-Hybrid Solar Intelligence Mobile App",
    main: "index.js",
    scripts: {
        "build": "npx cap sync"
    }
};
fs.writeFileSync(path.join(APP_DIR, 'package.json'), JSON.stringify(pkg, null, 2));

// Step 5: Install Capacitor
console.log('[5/6] Installing Capacitor (this may take a minute)...');
try {
    execSync('npm install @capacitor/core @capacitor/cli @capacitor/android', {
        cwd: APP_DIR,
        stdio: 'inherit'
    });
} catch (e) {
    console.log('  Warning: Capacitor install had issues, continuing...');
}

// Step 6: Initialize Capacitor
console.log('[6/6] Initializing Capacitor...');
const capConfig = {
    appId: "com.pihybrid.solar",
    appName: "PI-Hybrid Solar",
    webDir: "www",
    server: {
        androidScheme: "https"
    },
    android: {
        buildOptions: {
            signingType: "apksigner"
        }
    }
};
fs.writeFileSync(path.join(APP_DIR, 'capacitor.config.json'), JSON.stringify(capConfig, null, 2));

try {
    execSync('npx cap add android', { cwd: APP_DIR, stdio: 'inherit' });
    execSync('npx cap sync', { cwd: APP_DIR, stdio: 'inherit' });
} catch (e) {
    console.log('  Note: Android platform setup requires Android SDK.');
    console.log('  The web files are ready in mobile-app/www/');
}

console.log('');
console.log('╔═══════════════════════════════════════════════╗');
console.log('║  BUILD COMPLETE!                              ║');
console.log('║                                               ║');
console.log('║  Files are in: mobile-app/www/                ║');
console.log('║                                               ║');
console.log('║  To build APK without Android Studio:         ║');
console.log('║  Upload mobile-app/ to Appetize.io            ║');
console.log('║  or use GitHub Actions for cloud build        ║');
console.log('╚═══════════════════════════════════════════════╝');
