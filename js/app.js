document.addEventListener('DOMContentLoaded', () => {

    /* ==================================
       0. Preloader Sequence
    ================================== */
    const preloader = document.getElementById('preloader');
    if (preloader) {
        document.body.classList.add('locked-scroll');
        setTimeout(() => {
            preloader.classList.add('hidden');
            preloader.style.pointerEvents = 'none'; // Allow instant interaction behind it
            document.body.classList.remove('locked-scroll');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 3000); // 3 seconds total
    }

    /* ==================================
       1. Custom Cursor Logic (Ideatic Experience)
    ================================== */
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    const hoverTargets = document.querySelectorAll('.hover-target, a, button, .fingerprint-scanner, .project-card, .skill-node');

    if (cursor && cursorFollower && !('ontouchstart' in window)) {
        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let ringX = 0, ringY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth physics-based trailing
        const renderCursor = () => {
            dotX += (mouseX - dotX) * 0.25;
            dotY += (mouseY - dotY) * 0.25;
            ringX += (mouseX - ringX) * 0.12;
            ringY += (mouseY - ringY) * 0.12;

            cursor.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;
            cursorFollower.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

            requestAnimationFrame(renderCursor);
        };
        renderCursor();

        // Magnetic hover effects
        const targets = [...hoverTargets, ...document.querySelectorAll('.btn-primary, .btn-secondary')];
        targets.forEach(target => {
            target.addEventListener('mouseenter', () => {
                cursor.classList.add('hover-active');
                cursorFollower.classList.add('hover-active');
            });
            target.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover-active');
                cursorFollower.classList.remove('hover-active');
            });
        });
    } else {
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
    }

    // Fallback for dynamically added targets or missing selectors
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.hover-target, a, button')) {
            cursor?.classList.add('hover-active');
            cursorFollower?.classList.add('hover-active');
        } else {
            cursor?.classList.remove('hover-active');
            cursorFollower?.classList.remove('hover-active');
        }
    });



    /* ==================================
       2. Navigation Scrolled State & Mobile Menu
    ================================== */
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking links on mobile
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.add('fa-bars');
            });
        });
    }

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

    /* ==================================
       4.5 Phone Unlock Interaction
    ================================== */
    const phoneLockScreen = document.getElementById('phoneLockScreen');
    const phoneHomeScreen = document.getElementById('phoneHomeScreen');
    const fingerprintScanner = document.querySelector('.fingerprint-scanner');

    if (phoneLockScreen && phoneHomeScreen) {
        const unlockPhone = (e) => {
            if (e) {
                if (e.cancelable) e.preventDefault();
                e.stopPropagation();
            }

            // Guaranteed immediate state change
            phoneLockScreen.style.pointerEvents = 'none';
            phoneLockScreen.style.cursor = 'default';

            // Professional feedback sequence
            if (fingerprintScanner) {
                fingerprintScanner.style.transform = 'scale(0.8) rotate(5deg)';
                fingerprintScanner.style.background = 'rgba(39, 201, 63, 0.5)';
                fingerprintScanner.style.borderColor = '#27C93F';
                fingerprintScanner.style.boxShadow = '0 0 40px rgba(39, 201, 63, 0.6)';
            }

            setTimeout(() => {
                phoneLockScreen.style.transform = 'translateY(-110%)';
                phoneHomeScreen.style.opacity = '1';
                phoneHomeScreen.style.transform = 'scale(1)';
                phoneHomeScreen.style.pointerEvents = 'all';
            }, 100);
        };

        // Aggressive click/touch capturing
        phoneLockScreen.addEventListener('click', unlockPhone);
        phoneLockScreen.addEventListener('touchstart', unlockPhone, { passive: false });

        if (fingerprintScanner) {
            fingerprintScanner.addEventListener('click', unlockPhone);
            fingerprintScanner.addEventListener('touchstart', unlockPhone, { passive: false });
        }
    }

    /* ==================================
       4.6 Flutter Fireworks Easter Egg
    ================================== */
    const easterEggBtn = document.getElementById('easterEggBtn');
    if (easterEggBtn) {
        easterEggBtn.addEventListener('click', (e) => {
            const rect = easterEggBtn.getBoundingClientRect();
            const startX = rect.left + rect.width / 2;
            const startY = rect.top + rect.height / 2;

            for (let i = 0; i < 20; i++) {
                const particle = document.createElement('i');
                particle.className = 'devicon-flutter-plain flutter-particle';

                // Randomize trajectory
                const angle = (Math.random() * Math.PI) - (Math.PI / 2); // Upwards arc
                const velocity = 100 + Math.random() * 200;
                const endX = Math.sin(angle) * velocity;
                const endY = -Math.cos(angle) * velocity - (Math.random() * 100);

                particle.style.left = startX + 'px';
                particle.style.top = startY + 'px';
                particle.style.setProperty('--end-x', endX);
                particle.style.setProperty('--end-y', endY);

                // Add slight randomness to animation duration to make it feel natural
                particle.style.animationDuration = (2 + Math.random()) + 's';

                document.body.appendChild(particle);

                // Clean up after animation
                setTimeout(() => {
                    particle.remove();
                }, 3000);
            }
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
    7. iMessage Interface Logic (Chatbot)
================================== */
document.addEventListener('DOMContentLoaded', () => {
    const imessageForm = document.querySelector('.imessage-input form');
    const chatArea = document.querySelector('.imessage-chat');

    // Page View Counter Logic
    let pageViews = localStorage.getItem('shubham_page_views') || 1337;
    pageViews = parseInt(pageViews) + 1;
    localStorage.setItem('shubham_page_views', pageViews);

    const footer = document.querySelector('.premium-footer p');
    if (footer) {
        const viewCounterHtml = `<br><span style="font-size: 0.8rem; color: #666;">Profile loaded <b style="color:var(--accent-cyan);">${pageViews}</b> times by amazing people!</span>`;
        footer.insertAdjacentHTML('beforeend', viewCounterHtml);
    }

    if (imessageForm && chatArea) {
        imessageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = imessageForm.querySelector('input');
            const text = input.value.trim();
            if (text === '') return;

            // Remove typing indicator temporarily
            const typingIndicator = chatArea.querySelector('.msg.sent[style*="opacity"]');
            if (typingIndicator) typingIndicator.style.display = 'none';

            // Create new sent message
            const newMsg = document.createElement('div');
            newMsg.className = 'msg sent';
            newMsg.textContent = text;
            chatArea.appendChild(newMsg);

            // Re-append typing indicator & show it for bot "typing"
            if (typingIndicator) {
                typingIndicator.textContent = "Shubham is typing...";
                typingIndicator.style.display = 'block';
                typingIndicator.style.alignSelf = 'flex-start'; // Move to left side
                typingIndicator.style.background = 'transparent'; // No blue background
                typingIndicator.style.color = '#fff';
                chatArea.appendChild(typingIndicator);
            }

            // Clear input and scroll down
            input.value = '';
            chatArea.scrollTop = chatArea.scrollHeight;

            // Generate Chatbot Response
            setTimeout(() => {
                const responseMsg = document.createElement('div');
                responseMsg.className = 'msg received';

                const lowerText = text.toLowerCase();
                let reply = "That's cool! Send me an email at <strong>waghmareshubham132@gmail.com</strong> if you want to chat more serious biz. 🚀";

                if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
                    reply = "Yooo! What's good? I'm Shubham's automated clone. He's probably busy writing some clean Flutter code rn. What can I help you with?";
                } else if (lowerText.includes('job') || lowerText.includes('hiring') || lowerText.includes('work') || lowerText.includes('opportunity')) {
                    reply = "Oh yeah, the main man is ALWAYS open to epic opportunities! Especially if it involves Flutter or building cool mobile apps. You hiring? 👀";
                } else if (lowerText.includes('where') || lowerText.includes('live') || lowerText.includes('location')) {
                    reply = "He's based out of Mumbai, mostly vibing in a dark room illuminated only by his IDE theme. Typical developer habitat! 🦇💻";
                } else if (lowerText.includes('roast') || lowerText.includes('joke')) {
                    reply = "I'd roast you, but my creator told me to be professional... Just kidding, your last app crashed on launch didn't it? (Sorry, it's just a joke! 😂)";
                } else if (lowerText.includes('flutter')) {
                    reply = "Ah, Flutter. The supreme UI toolkit! Shubham breathes Widgets and StateManagement! 💙";
                } else if (lowerText.includes('skill') || lowerText.includes('stack')) {
                    reply = "He's a wizard with <b>Flutter, Dart, Firebase, and UI/UX Architecture</b>. Basically, if it runs on a screen, he can build it perfectly! 🔥";
                } else if (lowerText.includes('experience') || lowerText.includes('work')) {
                    reply = "Right now he's rocking it as a Junior Flutter Developer at Summit Technology. Previously, he built 'Azume' and 'DigiFarmer' which actually won State Level awards! 🏆";
                } else if (lowerText.includes('education') || lowerText.includes('study') || lowerText.includes('college')) {
                    reply = "He holds a degree in <b>Artificial Intelligence & Data Science</b> from Vidyavardhini's College of Engineering (2021-2025). Smart guy! 🧠";
                }

                responseMsg.innerHTML = reply;

                // Hide typing indicator before showing response
                if (typingIndicator) {
                    typingIndicator.style.display = 'none';
                    // Reset styling back to user typing style for later
                    typingIndicator.textContent = "Typing a new message...";
                    typingIndicator.style.alignSelf = 'flex-end';
                    typingIndicator.style.background = '#02569B';
                }

                chatArea.appendChild(responseMsg);
                chatArea.scrollTop = chatArea.scrollHeight;
            }, 1800); // Simulated delay
        });
    }
});

/* ==================================
    8. Floating Chatbot Logic
================================== */
document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbot = document.getElementById('closeChatbot');
    const floatingChatForm = document.getElementById('floatingChatForm');
    const chatbotMessages = document.getElementById('chatbotMessages');

    if (chatbotToggle && chatbotWindow && closeChatbot) {
        const openChat = (e) => {
            if (e) e.preventDefault();
            chatbotWindow.classList.add('active');
            chatbotToggle.style.display = 'none';
        };

        const closeChat = (e) => {
            if (e) e.preventDefault();
            chatbotWindow.classList.remove('active');
            setTimeout(() => {
                chatbotToggle.style.display = 'flex';
            }, 300); // Wait for transition
        };

        chatbotToggle.addEventListener('click', openChat);
        chatbotToggle.addEventListener('touchstart', openChat, { passive: false });

        closeChatbot.addEventListener('click', closeChat);
        closeChatbot.addEventListener('touchstart', closeChat, { passive: false });
    }


    if (floatingChatForm && chatbotMessages) {
        floatingChatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = floatingChatForm.querySelector('input');
            const text = input.value.trim();
            if (text === '') return;

            // Add user message
            const newMsg = document.createElement('div');
            newMsg.className = 'msg sent';
            newMsg.textContent = text;
            newMsg.style.alignSelf = 'flex-end';
            newMsg.style.background = '#02569B';
            newMsg.style.color = '#fff';
            newMsg.style.borderRadius = '20px';
            newMsg.style.borderBottomRightRadius = '5px';
            chatbotMessages.appendChild(newMsg);

            input.value = '';
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            // Typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.className = 'msg received typing';
            typingIndicator.textContent = "Shubham is typing...";
            typingIndicator.style.opacity = '0.7';
            typingIndicator.style.fontStyle = 'italic';
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            // Generate Chatbot Response
            setTimeout(() => {
                chatbotMessages.removeChild(typingIndicator);

                const responseMsg = document.createElement('div');
                responseMsg.className = 'msg received';

                const lowerText = text.toLowerCase();
                let reply = "That's cool! Send me an email at <strong>waghmareshubham132@gmail.com</strong> if you want to chat more serious biz. 🚀";

                if (lowerText.includes('hi') || lowerText.includes('hello') || lowerText.includes('hey')) {
                    reply = "Yooo! What's good? I'm Shubham's automated clone. He's probably busy writing some clean Flutter code rn. What can I help you with?";
                } else if (lowerText.includes('job') || lowerText.includes('hiring') || lowerText.includes('work') || lowerText.includes('opportunity')) {
                    reply = "Oh yeah, the main man is ALWAYS open to epic opportunities! Especially if it involves Flutter or building cool mobile apps. You hiring? 👀";
                } else if (lowerText.includes('where') || lowerText.includes('live') || lowerText.includes('location')) {
                    reply = "He's based out of Mumbai, mostly vibing in a dark room illuminated only by his IDE theme. Typical developer habitat! 🦇💻";
                } else if (lowerText.includes('roast') || lowerText.includes('joke')) {
                    reply = "I'd roast you, but my creator told me to be professional... Just kidding, your last app crashed on launch didn't it? (Sorry, it's just a joke! 😂)";
                } else if (lowerText.includes('flutter')) {
                    reply = "Ah, Flutter. The supreme UI toolkit! Shubham breathes Widgets and StateManagement! 💙";
                } else if (lowerText.includes('skill') || lowerText.includes('stack')) {
                    reply = "He's a wizard with <b>Flutter, Dart, Firebase, and UI/UX Architecture</b>. Basically, if it runs on a screen, he can build it perfectly! 🔥";
                } else if (lowerText.includes('experience') || lowerText.includes('work')) {
                    reply = "Right now he's rocking it as a Junior Flutter Developer at Summit Technology. Previously, he built 'Azume' and 'DigiFarmer' which actually won State Level awards! 🏆";
                } else if (lowerText.includes('education') || lowerText.includes('study') || lowerText.includes('college')) {
                    reply = "He holds a degree in <b>Artificial Intelligence & Data Science</b> from Vidyavardhini's College of Engineering (2021-2025). Smart guy! 🧠";
                }

                responseMsg.innerHTML = reply;
                chatbotMessages.appendChild(responseMsg);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 1200);
        });
    }

    // Global function for prompt chips in floating chatbot
    // Using a more robust listener approach
    const setupChips = () => {
        const chips = document.querySelectorAll('.chat-prompt-chip');
        chips.forEach(chip => {
            const handleChip = (e) => {
                if (e && e.cancelable) e.preventDefault(); // CRITICAL: Stop mobile from firing touchstart + click consecutively
                const msg = chip.getAttribute('data-msg');
                if (msg) window.sendFloatingMsg(msg);
            };
            chip.addEventListener('click', handleChip);
            chip.addEventListener('touchstart', handleChip, { passive: false }); // Changed to false to allow preventDefault
        });
    };

    window.sendFloatingMsg = (text) => {
        const input = floatingChatForm.querySelector('input');
        if (!input) return;
        input.value = text;

        // Use a generic event trigger for better compatibility
        const event = new Event('submit', { cancelable: true, bubbles: true });
        floatingChatForm.dispatchEvent(event);
    };

    setupChips();
});

/* ==================================
    8. Live Visitor & Uptime Simulator
================================== */
function initLiveStats() {
    const counterEl = document.getElementById('visitTotal');
    const uptimeEl = document.getElementById('visitCounter');

    // Simple Local visit counter simulation
    let visits = localStorage.getItem('portfolio_visits') || 254;
    visits = parseInt(visits) + 1;
    localStorage.setItem('portfolio_visits', visits);

    // Format counter (000XXX)
    counterEl.textContent = String(visits).padStart(5, '0');

    // System Uptime Clock
    let totalSeconds = 0;
    setInterval(() => {
        totalSeconds++;
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        uptimeEl.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }, 1000);
}

/* ==================================
    9. Quick Look PDF Viewer
================================== */
function initPdfViewer() {
    const resumeBtn = document.getElementById('resumeBtn');
    const pdfModal = document.getElementById('pdfModal');
    const closePdf = document.getElementById('closePdf');
    const pdfBackdrop = document.getElementById('pdfBackdrop');

    if (!pdfModal) return;

    const showModal = (e) => {
        if (e) e.preventDefault();
        pdfModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock scrolling
    };

    if (resumeBtn) {
        resumeBtn.addEventListener('click', showModal);
        resumeBtn.addEventListener('touchstart', showModal, { passive: false });
    }

    const hideModal = (e) => {
        if (e && e.cancelable) e.preventDefault();
        pdfModal.classList.remove('active');
        document.body.style.overflow = ''; // Unlock scrolling
    };

    if (closePdf) {
        closePdf.addEventListener('click', hideModal);
        closePdf.addEventListener('touchstart', hideModal, { passive: false });
    }

    if (pdfBackdrop) {
        pdfBackdrop.addEventListener('click', hideModal);
        // Note: keeping touchstart off backdrop to prevent accidental closures while scrolling edge cases
        pdfBackdrop.addEventListener('touchstart', hideModal, { passive: false });
    }


    // Close on ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideModal();
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initLiveStats();
    initPdfViewer();
});
