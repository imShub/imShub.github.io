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

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
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

    if (phoneLockScreen && phoneHomeScreen) {
        const unlockPhone = () => {
            phoneLockScreen.style.transform = 'translateY(-100%)';
            phoneHomeScreen.style.opacity = '1';
            phoneHomeScreen.style.transform = 'scale(1)';
            phoneHomeScreen.style.pointerEvents = 'all';
        };
        // Simple click event is better for mobile to avoid scroll trapping
        phoneLockScreen.addEventListener('click', unlockPhone);
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
                    reply = "Ah, Flutter. The supreme UI toolkit! Shubham breathes Widgets and StateManagement. 💙";
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
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.add('active');
            chatbotToggle.style.display = 'none';
        });

        closeChatbot.addEventListener('click', () => {
            chatbotWindow.classList.remove('active');
            setTimeout(() => {
                chatbotToggle.style.display = 'flex';
            }, 300); // Wait for transition
        });
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
                    reply = "Ah, Flutter. The supreme UI toolkit! Shubham breathes Widgets and StateManagement. 💙";
                } else if (lowerText.includes('skill')) {
                    reply = "He's a wizard with Flutter, Dart, Firebase, and UI/UX design. Basically, if it runs on a screen, he can build it!";
                }

                responseMsg.innerHTML = reply;
                chatbotMessages.appendChild(responseMsg);
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }, 1200);
        });
    }

    // Global function for prompt chips in floating chatbot
    window.sendFloatingMsg = function (text) {
        if (!floatingChatForm) return;
        const input = floatingChatForm.querySelector('input');
        input.value = text;
        floatingChatForm.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    };
});
