
document.addEventListener('DOMContentLoaded', function() {
    // Add particle effects to hero section
    const particleEffect = document.querySelector('.particle-effect');
    if (particleEffect) {
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('span');
            particle.classList.add('particle');
            particle.style.setProperty('--i', i);
            particleEffect.appendChild(particle);
        }
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    let mobileMenuOpen = false;

    // Add mobile menu functionality
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            if (mobileMenuOpen) {
                mobileNav.style.display = 'none';
                mobileMenuOpen = false;
            } else {
                mobileNav.style.display = 'block';
                mobileMenuOpen = true;
            }
        });
    }
    
    // Feature navigation
    const navLinks = {
        'games': 'games.html',
        'tournaments': 'tournaments.html',
        'education': 'education.html',
        'career': 'career.html',
        'leaderboards': 'leaderboards.html'
    };
    
    // Add click handlers for navigation items
    document.querySelectorAll('nav ul li a, .nav-icons a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                const target = href.substring(1);
                if (navLinks[target]) {
                    e.preventDefault();
                    window.location.href = navLinks[target];
                }
            }
        });
    });
    
    // Add navigation for the explore games button
    const exploreGamesBtn = document.querySelector('.explore-games');
    if (exploreGamesBtn) {
        exploreGamesBtn.addEventListener('click', function() {
            window.location.href = 'games.html';
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (this.getAttribute('href') === '#') return;
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.reveal-on-scroll, .game-card, .tournament-card, .roadmap-phase, .phase-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                // Add delay for staggered animation if specified
                const delay = element.dataset.delay || 0;
                setTimeout(() => {
                    element.classList.add('reveal-visible');
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, delay);
            }
        });
    };

    // Add initial styles for animation
    document.querySelectorAll('.reveal-on-scroll, .game-card, .tournament-card, .roadmap-phase, .phase-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.7s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    });

    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger once on load
    setTimeout(animateOnScroll, 300);
    
    // Add animation to navigation links
    document.querySelectorAll('nav ul li a').forEach((link, index) => {
        link.style.animationDelay = `${index * 0.1}s`;
        link.classList.add('pop-in');
        
        // Add active class based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
        
        // Add hover animation
        link.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bounce');
                setTimeout(() => {
                    icon.classList.remove('fa-bounce');
                }, 1000);
            }
        });
    });

    // Modal functionality for sign in and join buttons
    const signInBtn = document.querySelector('.sign-in');
    const joinBtn = document.querySelector('.join');
    const joinNowBtn = document.querySelector('.join-now');
    const startJourneyBtn = document.querySelector('.start-journey');
    
    const showModal = function(type) {
        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';
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
        
        // Create modal content
        const modalContent = document.createElement('div');
        modalContent.className = 'modal-content';
        modalContent.style.backgroundColor = '#1E1E1E';
        modalContent.style.padding = '2rem';
        modalContent.style.borderRadius = '8px';
        modalContent.style.width = '90%';
        modalContent.style.maxWidth = '400px';
        modalContent.style.position = 'relative';
        
        // Close button
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
        
        closeBtn.addEventListener('click', function() {
            document.body.removeChild(modal);
        });
        
        // Modal title
        const modalTitle = document.createElement('h2');
        modalTitle.style.marginBottom = '1.5rem';
        modalTitle.style.textAlign = 'center';
        
        // Form
        const form = document.createElement('form');
        
        // Different content based on modal type
        if (type === 'signin') {
            modalTitle.textContent = 'Sign In';
            
            // Email input
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
            
            // Password input
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
            
            // Submit button
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
            
            // Forgot password link
            const forgotPasswordLink = document.createElement('a');
            forgotPasswordLink.textContent = 'Forgot Password?';
            forgotPasswordLink.href = '#';
            forgotPasswordLink.style.display = 'block';
            forgotPasswordLink.style.textAlign = 'center';
            forgotPasswordLink.style.color = '#BBBBBB';
            forgotPasswordLink.style.textDecoration = 'none';
            
            // Append elements to form
            form.appendChild(emailLabel);
            form.appendChild(emailInput);
            form.appendChild(passwordLabel);
            form.appendChild(passwordInput);
            form.appendChild(submitButton);
            form.appendChild(forgotPasswordLink);
        } else {
            modalTitle.textContent = 'Join GameRise';
            
            // Name input
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
            
            // Email input
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
            
            // Password input
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
            
            // Submit button
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
            
            // Terms agreement
            const termsText = document.createElement('p');
            termsText.innerHTML = 'By joining, you agree to our <a href="#terms" style="color: #FF5733;">Terms of Service</a> and <a href="#privacy" style="color: #FF5733;">Privacy Policy</a>';
            termsText.style.fontSize = '0.8rem';
            termsText.style.textAlign = 'center';
            termsText.style.color = '#BBBBBB';
            
            // Append elements to form
            form.appendChild(nameLabel);
            form.appendChild(nameInput);
            form.appendChild(emailLabel);
            form.appendChild(emailInput);
            form.appendChild(passwordLabel);
            form.appendChild(passwordInput);
            form.appendChild(submitButton);
            form.appendChild(termsText);
        }
        
        // Append elements to modal content
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(modalTitle);
        modalContent.appendChild(form);
        
        // Append modal content to modal
        modal.appendChild(modalContent);
        
        // Append modal to body
        document.body.appendChild(modal);
        
        // Close modal when clicking outside of content
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    };
    
    // Add event listeners for buttons
    if (signInBtn) {
        signInBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('signin');
        });
    }
    
    if (joinBtn) {
        joinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('join');
        });
    }
    
    if (joinNowBtn) {
        joinNowBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('join');
        });
    }
    
    if (startJourneyBtn) {
        startJourneyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showModal('join');
        });
    }

    // Game card hover effects
    document.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.overlay').style.background = 'linear-gradient(to top, rgba(255, 87, 51, 0.7), transparent)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.querySelector('.overlay').style.background = 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)';
        });
    });

    // Tournament register button effect
    document.querySelectorAll('.register-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const originalText = this.textContent;
            this.textContent = 'Registered!';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
});
