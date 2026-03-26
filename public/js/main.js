document.addEventListener('DOMContentLoaded', () => {
    updateWelcome();
    
    // WELCOME MESSAGE LOGIC
    function updateWelcome() {
        const msgEl = document.getElementById('welcome-msg');
        if (!msgEl) return;
        const hour = new Date().getHours();
        let greeting = "GOOD NIGHT";
        if (hour < 12) greeting = "GOOD MORNING";
        else if (hour < 18) greeting = "GOOD AFTERNOON";
        else greeting = "GOOD EVENING";
        
        // Only show welcome on the Home tab
        msgEl.innerText = `${greeting}, YAANS-COAT`;
    }

    document.addEventListener('click', (e) => {
        // --- TAB SWITCHING ---
        const tab = e.target.closest('.tab');
        if (tab) {
            document.querySelectorAll('.tab, .view').forEach(el => el.classList.remove('active'));
            tab.classList.add('active');
            const target = document.getElementById(tab.dataset.target);
            if (target) target.classList.add('active');
            
            // Hide welcome message if not on home
            const welcome = document.getElementById('welcome-msg');
            if(welcome) welcome.style.display = (tab.dataset.target === 'home') ? 'block' : 'none';
        }

        // --- SETTINGS BUTTON FIX ---
        if (e.target.id === 'open-settings' || e.target.closest('#open-settings')) {
            const settingsBox = document.getElementById('settings-box');
            if(settingsBox) settingsBox.classList.add('active');
        }

        if (e.target.id === 'close-settings' || e.target.closest('#close-settings')) {
            document.getElementById('settings-box').classList.remove('active');
        }

        // --- SETTINGS SIDEBAR NAV ---
        const sNav = e.target.closest('.s-nav');
        if (sNav) {
            document.querySelectorAll('.s-nav, .settings-content').forEach(el => el.classList.remove('active'));
            sNav.classList.add('active');
            const pane = document.getElementById(sNav.dataset.pane);
            if (pane) pane.classList.add('active');
        }
    });
});
