document.addEventListener('DOMContentLoaded', () => {

    /* ==================================
       0. Preloader Sequence
    ================================== */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        document.body.classList.add('locked-scroll');
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.classList.remove('locked-scroll');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 3000); // 3 seconds total
    }

    /* ==================================
       1. Custom Cursor Logic
    ================================== */
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');

    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';

            // Add a little delay for the follower for a smooth trailing effect
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 50);
        });
    }

    /* ==================================
       2. Navigation Scrolled State
    ================================== */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* ==================================
       3. Scroll Reveal Animations
    ================================== */
    const revealElements = document.querySelectorAll('.reveal-up');

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target); // Only animate once
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* ==================================
       4. Phone Mockup Parallax
    ================================== */
    const phoneMockup = document.querySelector('.iphone-mockup');
    const heroSection = document.querySelector('.hero-story');

    if (phoneMockup && heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 40;
            const y = (window.innerHeight / 2 - e.pageY) / 40;

            // Base rotation (-15deg Y, 5deg X) + mouse offset
            phoneMockup.style.transform = `rotateY(${-15 + x}deg) rotateX(${5 + y}deg)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            // Reset to default on leave
            phoneMockup.style.transform = `rotateY(-15deg) rotateX(5deg)`;
        });
    }
});

/* ==================================
    5. Phone Mockup Live Time
================================== */
function updatePhoneTime() {
    const timeElements = document.querySelectorAll('.phone-time-dynamic');
    if (timeElements.length > 0) {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        timeElements.forEach(el => el.textContent = strTime);
    }
}
updatePhoneTime();
setInterval(updatePhoneTime, 10000);

/* ==================================
    6. Universal Tilt Effect (App Store Style)
================================== */
const tiltElements = document.querySelectorAll('.tilt-effect');

tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate rotation based on cursor position (-5deg to 5deg)
        const xRotation = 10 * ((y - rect.height / 2) / rect.height);
        const yRotation = -10 * ((x - rect.width / 2) / rect.width);

        // Apply transform
        el.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale3d(1.02, 1.02, 1.02)`;
        el.style.zIndex = '10';

        // Add dynamic shine effect if child .shine exists
        const shine = el.querySelector('.shine');
        if (shine) {
            shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, transparent 80%)`;
        }
    });

    el.addEventListener('mouseleave', () => {
        // Reset transform
        el.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        el.style.zIndex = '1';

        const shine = el.querySelector('.shine');
        if (shine) {
            shine.style.background = 'transparent';
        }
    });
});

/* ==================================
    7. iMessage Interface Logic
================================== */
document.addEventListener('DOMContentLoaded', () => {
    const imessageForm = document.querySelector('.imessage-input form');
    const chatArea = document.querySelector('.imessage-chat');

    if (imessageForm && chatArea) {
        imessageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = imessageForm.querySelector('input');
            const text = input.value;
            if (text.trim() === '') return;

            // Remove typing indicator temporarily
            const typingIndicator = chatArea.querySelector('.msg.sent[style*="opacity"]');
            if (typingIndicator) typingIndicator.style.display = 'none';

            // Create new sent message
            const newMsg = document.createElement('div');
            newMsg.className = 'msg sent';
            newMsg.textContent = text;
            chatArea.appendChild(newMsg);

            // Re-append typing indicator at the end
            if (typingIndicator) {
                typingIndicator.style.display = 'block';
                chatArea.appendChild(typingIndicator);
            }

            // Clear input and scroll down
            input.value = '';
            chatArea.scrollTop = chatArea.scrollHeight;
        });
    }
});

