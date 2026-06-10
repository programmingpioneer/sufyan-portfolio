// 1. Grab the essential elements from the DOM
const themeBtn = document.getElementById('theme-btn');
const body = document.body;

// Make sure the button actually exists before running logic (fail-safe)
if (themeBtn) {
    const icon = themeBtn.querySelector('i');

    // 2. Check the browser's local storage to see if dark mode was saved previously
    const currentTheme = localStorage.getItem('portfolio-theme');
    
    // If it was saved as dark, apply it immediately on page load
    if (currentTheme === 'dark') {
        body.classList.add('dark-mode');
        icon.classList.replace('fa-moon', 'fa-sun'); // Change moon to sun icon
    }

    // 3. Listen for the button click to toggle the theme
    themeBtn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        // 4. Update the icon and save the preference in local storage
        if (body.classList.contains('dark-mode')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('portfolio-theme', 'dark'); // Save dark state
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('portfolio-theme', 'light'); // Save light state
        }
    });  
    // =========================================
// HAMBURGER MENU ENGINE
// =========================================
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        // Menu ko slide in/out karo
        navLinks.classList.toggle('active');
        
        // Icon change logic (Bars to Cross)
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.replace('fa-bars', 'fa-times');
        } else {
            icon.classList.replace('fa-times', 'fa-bars');
        }
    });

    // Jab kisi link par click ho toh menu wapas band ho jaye
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.replace('fa-times', 'fa-bars');
        });
    });
}
    

} else {
    console.log("Dark mode button not found on this page.");
}