// ========== Add 'js' class for scroll-reveal gating ==========
document.documentElement.classList.add('js');

// ========== THEME TOGGLE (Dark/Light) ==========
(function () {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Load saved theme from localStorage (or default dark)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.className = 'fas fa-sun';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            const current = document.documentElement.getAttribute('data-theme');
            if (current === 'light') {
                // Switch to dark
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                if (themeIcon) themeIcon.className = 'fas fa-moon';
            } else {
                // Switch to light
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                if (themeIcon) themeIcon.className = 'fas fa-sun';
            }
        });
    }
})();

document.addEventListener('DOMContentLoaded', function () {

    // ========== MOBILE MENU TOGGLE ==========
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function () {
            navLinks.classList.toggle('active');
        });
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => navLinks.classList.remove('active'));
        });
    }

    // ========== NAVBAR SCROLL EFFECT ==========
    const header = document.querySelector('header');
    if (header) {
        const onScrollNav = () => {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', onScrollNav);
        onScrollNav();
    }

    // ========== TYPEWRITER EFFECT (Home only) ==========
    const dynamicText = document.getElementById('dynamic-text');
    if (dynamicText) {
        const words = ["Python Apps", "Full-Stack Web", "Clean UI", "Database Systems"];
        let i = 0, j = 0, currentWord = "", isDeleting = false;
        function type() {
            currentWord = words[i];
            if (isDeleting) {
                dynamicText.textContent = currentWord.substring(0, j - 1);
                j--;
                if (j === 0) {
                    isDeleting = false;
                    i = (i + 1) % words.length;
                }
            } else {
                dynamicText.textContent = currentWord.substring(0, j + 1);
                j++;
                if (j === currentWord.length) {
                    isDeleting = true;
                    return setTimeout(type, 1500);
                }
            }
            setTimeout(type, isDeleting ? 80 : 120);
        }
        type();
    }

    // ========== SCROLL REVEAL (supports .reveal, .reveal-left, .reveal-right) ==========
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (revealEls.length && 'IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        revealEls.forEach(el => revealObserver.observe(el));
    } else {
        revealEls.forEach(el => el.classList.add('revealed'));
    }

    // ========== ANIMATED COUNTERS ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length) {
        const animateCounter = (el) => {
            const target = parseInt(el.getAttribute('data-target'), 10) || 0;
            const duration = 1800;
            const startTime = performance.now();
            function update(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(eased * target);
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            }
            requestAnimationFrame(update);
        };
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        statNumbers.forEach(el => counterObserver.observe(el));
    }

    // ========== SKILL BARS FILL ON SCROLL ==========
    const skillFills = document.querySelectorAll('.skill-fill');
    if (skillFills.length) {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const width = entry.target.getAttribute('data-width') || '0';
                    entry.target.style.width = width + '%';
                    skillObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        skillFills.forEach(el => skillObserver.observe(el));
    }

    // ========== 3D TILT ON CARDS ==========
    const tiltCards = document.querySelectorAll('.project-card, .stat-card');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function (e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
        });
        card.addEventListener('mouseleave', function () {
            card.style.transform = '';
        });
    });

    // ========== RIPPLE EFFECT ON BUTTONS ==========
    const rippleButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            const rect = btn.getBoundingClientRect();
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            btn.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    // ========== PROJECT FILTER ==========
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterBtns.length && projectCards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter');
                projectCards.forEach(card => {
                    const categories = (card.getAttribute('data-category') || '').split(' ');
                    if (filter === 'all' || categories.includes(filter)) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });
            });
        });
    }

    // ========== FOOTER ACCORDION (mobile only) ==========
    const footerHeadings = document.querySelectorAll('.footer-heading');
    if (footerHeadings.length) {
        footerHeadings.forEach(heading => {
            heading.addEventListener('click', function () {
                if (window.innerWidth <= 768) {
                    const col = heading.closest('.footer-col');
                    if (col) {
                        col.classList.toggle('open');
                    }
                }
            });
        });
    }

    // ========== CONTACT FORM (native submit + reply-to) ==========
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const msgInput = document.getElementById('message');
        const replyToField = document.getElementById('replyto-field');

        const setError = (input, errId, show) => {
            const errEl = document.getElementById(errId);
            if (errEl) errEl.style.display = show ? 'block' : 'none';
            if (input) input.style.borderColor = show ? '#f87171' : '';
        };

        contactForm.addEventListener('submit', function (e) {
            // Set reply-to to user's email so replies go to them directly
            if (replyToField && emailInput) {
                replyToField.value = emailInput.value.trim();
            }

            let valid = true;

            // Name validation
            if (!nameInput.value.trim()) {
                setError(nameInput, 'name-error', true);
                valid = false;
            } else {
                setError(nameInput, 'name-error', false);
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                setError(emailInput, 'email-error', true);
                valid = false;
            } else {
                setError(emailInput, 'email-error', false);
            }

            // Message validation
            if (!msgInput.value.trim()) {
                setError(msgInput, 'message-error', true);
                valid = false;
            } else {
                setError(msgInput, 'message-error', false);
            }

            // If invalid, block submit. If valid, native submit to Formspree happens.
            if (!valid) {
                e.preventDefault();
            }
        });
    }

    // ========== BACK TO TOP + PROGRESS RING ==========
    const backToTop = document.querySelector('.back-to-top');
    const ringProgress = document.querySelector('.ring-progress');
    if (backToTop) {
        const circumference = 138;
        const onScrollTop = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            if (scrollTop > 200) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }

            if (ringProgress) {
                ringProgress.style.strokeDashoffset = circumference - (percent / 100) * circumference;
            }
        };
        window.addEventListener('scroll', onScrollTop);
        onScrollTop();

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// ========== PRELOADER FADE OUT ==========
window.addEventListener('load', function () {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 400);
    }
});

// ========== REVEAL FALLBACK (safety net) ==========
setTimeout(function () {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(function (el) {
        el.classList.add('revealed');
    });
}, 2500);

// ========== PROJECT DETAIL MODAL ==========
const PROJECTS_DATA = {
    grade: {
        title: "Student Grade Manager",
        icon: "📊",
        problem: "Manual grade calculation was repetitive and error-prone — teachers spent hours sorting records and producing result sheets by hand.",
        solution: "Built a Python console tool that reads student records from files, validates every entry, and instantly generates sorted result sheets and performance summaries.",
        features: [
            "File I/O for reading student records",
            "Input validation to prevent bad data",
            "Auto-sorted result sheets",
            "Performance summary generation"
        ],
        challenges: "Handling malformed input files was tricky — some records had missing fields or wrong data types. I had to design validation that failed gracefully without crashing.",
        learnings: [
            "Defensive programming matters",
            "File parsing needs careful edge-case handling",
            "Clean console UX is underrated"
        ],
        tech: ["Python", "File I/O", "Data Validation"],
        github: "https://github.com/programmingpioneer",
        live: "https://grade-management-system-iffr.onrender.com"
    },
    docodive: {
        title: "DocoDive – Cloud Programming Library",
        icon: "☁️",
        problem: "Traditional digital libraries have heavy server costs and weak security — books are hard to distribute freely at scale.",
        solution: "Built a full community library on free-tier cloud services with uploads, reviews, discussions, and moderation — zero infrastructure cost.",
        features: [
            "Serverless database (TiDB)",
            "Object storage for PDFs (Cloudflare R2)",
            "Email verification (Brevo)",
            "Community moderation workflow"
        ],
        challenges: "Staying within free-tier limits forced careful architecture decisions — PDFs stream to object storage, emails trigger async, and sessions map cleanly to DB states.",
        learnings: [
            "Cloud-native means decoupling, not just deploying",
            "Free tiers are enough if designed well",
            "Security matters more than scale"
        ],
        tech: ["Python", "Flask", "TiDB", "Cloudflare R2", "Brevo"],
        github: "https://github.com/programmingpioneer/docodive",
        live: "https://docodive.programmingpioneer.com"
    },
    attendance: {
        title: "Automated Attendance Tracker",
        icon: "📅",
        problem: "Paper attendance sheets were chaotic and hard to analyze — no easy way to see per-student rates or trends.",
        solution: "Built a data-driven pipeline: feed a raw CSV and get per-student attendance rates, automated alerts, and visual charts instantly.",
        features: [
            "CSV processing pipeline",
            "Per-student attendance rates",
            "Automated alerts",
            "Data visualization"
        ],
        challenges: "Real-world CSVs were inconsistent — extra spaces, duplicate rows, and missing columns. Normalizing the data before processing was the hardest part.",
        learnings: [
            "Data cleaning comes before analysis",
            "Normalize before you analyze",
            "Charts make insights obvious"
        ],
        tech: ["Python", "CSV Processing", "Data Visualisation"],
        github: "https://github.com/programmingpioneer",
        live: "https://student-attendance-tracker-dsen.onrender.com"
    },
    quiz: {
        title: "Interactive Quiz Engine",
        icon: "🧠",
        problem: "Static quizzes felt boring and lacked real-time feedback — no score tracking or time pressure.",
        solution: "Built a browser-based quiz engine with dynamic question rendering, a countdown timer, and instant score updates.",
        features: [
            "Dynamic question rendering",
            "Countdown timer",
            "Instant score updates",
            "DOM manipulation"
        ],
        challenges: "Managing timer state alongside user answers was tricky — pausing, skipping, and scoring had to stay in sync without bugs.",
        learnings: [
            "State management in vanilla JS",
            "Timers need cleanup",
            "DOM updates must be efficient"
        ],
        tech: ["JavaScript", "DOM Manipulation", "Timer Logic"],
        github: "https://github.com/programmingpioneer",
        live: "https://synapse-assessment-portal.onrender.com/"
    }
};

const modalOverlay = document.getElementById('modal-overlay');
const modalVisual = document.getElementById('modal-visual');
const modalTitle = document.getElementById('modal-title');
const modalProblem = document.getElementById('modal-problem');
const modalSolution = document.getElementById('modal-solution');
const modalFeatures = document.getElementById('modal-features');
const modalChallenges = document.getElementById('modal-challenges');
const modalLearnings = document.getElementById('modal-learnings');
const modalTech = document.getElementById('modal-tech');
const modalGithub = document.getElementById('modal-github');
const modalLive = document.getElementById('modal-live');
const modalClose = document.getElementById('modal-close');

function openModal(key) {
    const data = PROJECTS_DATA[key];
    if (!data || !modalOverlay) return;

    if (modalVisual) modalVisual.textContent = data.icon || '📁';
    modalTitle.textContent = data.title;
    modalProblem.textContent = data.problem;
    modalSolution.textContent = data.solution;

    if (modalChallenges) modalChallenges.textContent = data.challenges || '';

    modalFeatures.innerHTML = '';
    data.features.forEach(f => {
        const li = document.createElement('li');
        li.textContent = f;
        modalFeatures.appendChild(li);
    });

    if (modalLearnings) {
        modalLearnings.innerHTML = '';
        data.learnings.forEach(l => {
            const li = document.createElement('li');
            li.textContent = l;
            modalLearnings.appendChild(li);
        });
    }

    modalTech.innerHTML = '';
    data.tech.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tech-tag';
        span.textContent = t;
        modalTech.appendChild(span);
    });

    modalGithub.href = data.github;
    modalLive.href = data.live;

    modalOverlay.classList.add('active');
    document.body.classList.add('modal-open');
    modalOverlay.scrollTop = 0;   // ← NAYI line, modal top se dikhe
}

function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Attach to all details buttons
document.querySelectorAll('.details-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        openModal(this.getAttribute('data-project'));
    });
});

// Close on X, overlay click, Escape
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modalOverlay) {
    modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) closeModal();
    });
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
});