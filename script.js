```javascript
document.addEventListener('DOMContentLoaded', () => {
    const particleEffect = document.querySelector('.particle-effect');
    if (particleEffect) {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('span');
            particle.classList.add('particle');
            particle.style.setProperty('--i', i);
            particleEffect.appendChild(particle);
        }
    }

    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    let mobileMenuOpen = false;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            mobileNav.style.display = mobileMenuOpen ? 'none' : 'block';
            mobileMenuOpen = !mobileMenuOpen;
        });
    }

    const navLinks = {
        'games': 'games.html',
        'tournaments': 'tournaments.html',
        'education': 'education.html',
        'career': 'career.html',
        'leaderboards': 'leaderboards.html'
    };

    document.querySelectorAll('nav ul li a,.nav-icons a').forEach(link => {
        link.addEventListener('click', e => {
            const href = link.getAttribute('href');
            if (href.startsWith('#') && navLinks[href.substring(1)]) {
                e.preventDefault();
                window.location.href = navLinks[href.substring(1)];
            }
        });
    });

    const exploreGamesBtn = document.querySelector('.explore-games');
    if (exploreGamesBtn) {
        exploreGamesBtn.addEventListener('click', () => {
            window.location.href = 'games.html';
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            if (anchor.getAttribute('href') === '#') return;

            const targetElement = document.querySelector(anchor.getAttribute('href'));
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.reveal-on-scroll,.game-card,.tournament-card,.roadmap-phase,.phase-card');
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;

            if (elementPosition < screenPosition) {
                const delay = element.dataset.delay || 0;
                setTimeout(() => {
                    element.classList.add('reveal-visible');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    };

    document.querySelectorAll('.reveal-on-scroll, .game-card, .tournament-card, .roadmap-phase,.phase-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });

    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 300);

    document.querySelectorAll('nav ul li a').forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('pop-in');

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const linkPage = link.getAttribute('href');

        if (linkPage === currentPage) {
            link.classList.add('active');
        }

        link.addEventListener('mouseenter', () => {
            const icon = link.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bounce');
                setTimeout(() => icon.classList.remove('fa-bounce'), 1000);
            }
        });
    });

    const showModal = (type) => {
        const modal = document.createElement('div');
        modal.className ='modal';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        modal.style.zIndex = '1000';

        const modalContent = document.createElement('div');
        modalContent.className ='modal-content';
        modalContent.style.backgroundColor = '#1E1E1E';
        modalContent.style.padding = '2rem';
        modalContent.style.borderRadius = '8px';
        modalContent.style.width = '90%';
        modalContent.style.maxWidth = '400px';
        modalContent.style.position ='relative';

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '&times;';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '10px';
        closeBtn.style.right = '10px';
        closeBtn.style.backgroundColor = 'transparent';
        closeBtn.style.border = 'none';
        closeBtn.style.color = 'white';
        closeBtn.style.fontSize = '1.5rem';
        closeBtn.style.cursor = 'pointer';

        closeBtn.addEventListener('click', () => document.body.removeChild(modal));

        const modalTitle = document.createElement('h2');
        modalTitle.style.marginBottom = '1.5rem';
        modalTitle.style.textAlign = 'center';

        const form = document.createElement('form');

        if (type ==='signin') {
            modalTitle.textContent = 'Sign In';

            const emailLabel = document.createElement('label');
            emailLabel.textContent = 'Email';
            emailLabel.style.display = 'block';
            emailLabel.style.marginBottom = '0.5rem';

            const emailInput = document.createElement('input');
            emailInput.type = 'email';
            emailInput.placeholder = 'Enter your email';
            emailInput.style.width = '100%';
            emailInput.style.padding = '0.75rem';
            emailInput.style.marginBottom = '1rem';
            emailInput.style.backgroundColor = '#333333';
            emailInput.style.border = 'none';
            emailInput.style.borderRadius = '4px';
            emailInput.style.color = 'white';

            const passwordLabel = document.createElement('label');
            passwordLabel.textContent = 'Password';
            passwordLabel.style.display = 'block';
            passwordLabel.style.marginBottom = '0.5rem';

            const passwordInput = document.createElement('input');
            passwordInput.type = 'password';
            passwordInput.placeholder = 'Enter your password';
            passwordInput.style.width = '100%';
            passwordInput.style.padding = '0.75rem';
            passwordInput.style.marginBottom = '1.5rem';
            passwordInput.style.backgroundColor = '#333333';
            passwordInput.style.border = 'none';
            passwordInput.style.borderRadius = '4px';
            passwordInput.style.color = 'white';

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Sign In';
            submitButton.style.width = '100%';
            submitButton.style.padding = '0.75rem';
            submitButton.style.backgroundColor = '#FF5733';
            submitButton.style.color = 'white';
            submitButton.style.border = 'none';
            submitButton.style.borderRadius = '4px';
            submitButton.style.cursor = 'pointer';
            submitButton.style.marginBottom = '1rem';

            const forgotPasswordLink = document.createElement('a');
            forgotPasswordLink.textContent = 'Forgot Password?';
            forgotPasswordLink.href = '#';
            forgotPasswordLink.style.display = 'block';
            forgotPasswordLink.style.textAlign = 'center';
            forgotPasswordLink.style.color = '#BBBBBB';
            forgotPasswordLink.style.textDecoration = 'none';

            form.appendChild(emailLabel);
            form.appendChild(emailInput);
            form.appendChild(passwordLabel);
            form.appendChild(passwordInput);
            form.appendChild(submitButton);
            form.appendChild(forgotPasswordLink);
        } else {
            modalTitle.textContent = 'Join GameRise';

            const nameLabel = document.createElement('label');
            nameLabel.textContent = 'Full Name';
            nameLabel.style.display = 'block';
            nameLabel.style.marginBottom = '0.5rem';

            const nameInput = document.createElement('input');
            nameInput.type = 'text';
            nameInput.placeholder = 'Enter your full name';
            nameInput.style.width = '100%';
            nameInput.style.padding = '0.75rem';
            nameInput.style.marginBottom = '1rem';
            nameInput.style.backgroundColor = '#333333';
            nameInput.style.border = 'none';
            nameInput.style.borderRadius = '4px';
            nameInput.style.color = 'white';

            const emailLabel = document.createElement('label');
            emailLabel.textContent = 'Email';
            emailLabel.style.display = 'block';
            emailLabel.style.marginBottom = '0.5rem';

            const emailInput = document.createElement('input');
            emailInput.type = 'email';
            emailInput.placeholder = 'Enter your email';
            emailInput.style.width = '100%';
            emailInput.style.padding = '0.75rem';
            emailInput.style.marginBottom = '1rem';
            emailInput.style.backgroundColor = '#333333';
            emailInput.style.border = 'none';
            emailInput.style.borderRadius = '4px';
            emailInput.style.color = 'white';

            const passwordLabel = document.createElement('label');
            passwordLabel.textContent = 'Password';
            passwordLabel.style.display = 'block';
            passwordLabel.style.marginBottom = '0.5rem';

            const passwordInput = document.createElement('input');
            passwordInput.type = 'password';
            passwordInput.placeholder = 'Create a password';
            passwordInput.style.width = '100%';
            passwordInput.style.padding = '0.75rem';
            passwordInput.style.marginBottom = '1.5rem';
            passwordInput.style.backgroundColor = '#333333';
            passwordInput.style.border = 'none';
            passwordInput.style.borderRadius = '4px';
            passwordInput.style.color = 'white';

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Create Account';
            submitButton.style.width = '100%';
            submitButton.style.padding = '0.75rem';
            submitButton.style.background = 'linear-gradient(135deg, #FF5733 0%, #C932FF 100%)';
            submitButton.style.color = 'white';
            submitButton.style.border = 'none';
            submitButton.style.borderRadius = '4px';
            submitButton.style.cursor = 'pointer';
            submitButton.style.marginBottom = '1rem';

            const termsText = document.createElement('p');
            termsText.innerHTML = 'By joining, you agree to our <a href="#terms" style="color: #FF5733;">Terms of Service</a> and <a href="#privacy" style="color: #FF5733;">Privacy Policy</a>';
            termsText.style.fontSize = '0.8rem';
            termsText.style.textAlign = 'center';
            termsText.style.color = '#BBBBBB';

            form.appendChild(nameLabel);
            form.appendChild(nameInput);
            form.appendChild(emailLabel);
            form.appendChild(emailInput);
            form.appendChild(passwordLabel);
            form.appendChild(passwordInput);
            form.appendChild(submitButton);
            form.appendChild(termsText);
        }

        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(form);

        modal.appendChild(modalContent);

        document.body.appendChild(modal);

        modal.addEventListener('click', e => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    };

    const signInBtn = document.querySelector('.sign-in');
    const joinBtn = document.querySelector('.join');
    const joinNowBtn = document.querySelector('.join-now');
    const startJourneyBtn = document.querySelector('.start-journey');

    if (signInBtn) {
        signInBtn.addEventListener('click', e => {
            e.preventDefault();
            showModal('signin');
        });
    }

    if (joinBtn) {
        joinBtn.addEventListener('click', e => {
            e.preventDefault();
            showModal('join');
        });
    }

    if (joinNowBtn) {
        joinNowBtn.addEventListener('click', e => {
            e.preventDefault();
            showModal('join');
        });
    }

    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', e => {
            e.preventDefault();
            showModal('join');
        });
    }

    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.querySelector('.overlay').style.background = 'linear-gradient(to top, rgba(255, 87, 51, 0.7), transparent)';
        });

        card.addEventListener('mouseleave', () => {
            card.querySelector('.overlay').style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)';
        });
    });

    document.querySelectorAll('.register-btn').forEach(button => {
        button.addEventListener('click', e => {
            e.preventDefault();

            const originalText = button.textContent;
            button.textContent = 'Registered!';
            button.style.backgroundColor = '#4CAF50';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.backgroundColor = '';
            }, 2000);
        });
    });
});
```