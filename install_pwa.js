
window.addEventListener('load', () => {
    // Check if running as standalone app
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
        // App is already installed and running
        console.log('Running in App Mode');
    } else {
        // App is running in browser
        // Check if PWA install is supported
        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            const deferredPrompt = e;

            // Create a custom install button/banner
            const installBtn = document.createElement('div');
            installBtn.style.cssText = `
                position: fixed;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 10000;
                background: linear-gradient(135deg, #06b6d4, #8b5cf6);
                padding: 15px 30px;
                border-radius: 30px;
                box-shadow: 0 10px 30px rgba(6,182,212,0.5);
                font-family: 'Outfit', sans-serif;
                font-weight: bold;
                color: white;
                cursor: pointer;
                text-transform: uppercase;
                letter-spacing: 1px;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: float 3s ease-in-out infinite;
            `;
            installBtn.innerHTML = '📲 Install Mobile App';

            installBtn.onclick = () => {
                // Hide the app provided install promotion
                installBtn.style.display = 'none';
                // Show the install prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
            };

            document.body.appendChild(installBtn);
        });
    }
});
