// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Typewriter effect (only on home page)
const dynamicText = document.getElementById('dynamic-text');
if (dynamicText) {
    const words = ["Python Apps", "Full‑Stack Web", "Clean UI", "Database Systems"];
    let i = 0, j = 0, currentWord = "", isDeleting = false;
    function type() {
        currentWord = words[i];
        if (isDeleting) {
            dynamicText.textContent = currentWord.substring(0, j-1);
            j--;
            if (j === 0) {
                isDeleting = false;
                i = (i + 1) % words.length;
            }
        } else {
            dynamicText.textContent = currentWord.substring(0, j+1);
            j++;
            if (j === currentWord.length) isDeleting = true;
        }
        setTimeout(type, isDeleting ? 80 : 120);
    }
    type();
}