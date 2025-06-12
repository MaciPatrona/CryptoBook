// Header Scroll Effect
const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile Navigation Toggle with Animation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scrolling with Offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking a link
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// Form Submission Handler with Animation
const emailForm = document.getElementById('email-form');
if (emailForm) {
    emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        const button = this.querySelector('button');
        
        // Add loading animation
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Изпращане...';
        button.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            // Show success message with animation
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Благодарим ви! Ще получите книгата на посочения имейл адрес.</p>
            `;
            
            // Add success message styles
            successMessage.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #2ecc71;
                color: white;
                padding: 1rem 2rem;
                border-radius: 5px;
                display: flex;
                align-items: center;
                gap: 1rem;
                box-shadow: 0 3px 10px rgba(0,0,0,0.2);
                animation: slideIn 0.5s ease-out;
                z-index: 1000;
            `;
            
            document.body.appendChild(successMessage);
            
            // Reset form
            this.reset();
            button.innerHTML = 'Изтегли PDF';
            button.disabled = false;
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.style.animation = 'slideOut 0.5s ease-out';
                setTimeout(() => successMessage.remove(), 500);
            }, 3000);
        }, 1500);
    });
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll to Top Button with Animation
const createScrollTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-top';
    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            button.style.display = 'block';
            setTimeout(() => button.style.opacity = '1', 10);
        } else {
            button.style.opacity = '0';
            setTimeout(() => button.style.display = 'none', 300);
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
};

// Initialize scroll to top button
createScrollTopButton();

// Enhanced Animation for Topic Cards
const animateOnScroll = () => {
    const cards = document.querySelectorAll('.topic-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add staggered animation for icons
                const icon = entry.target.querySelector('i');
                if (icon) {
                    setTimeout(() => {
                        icon.style.transform = 'scale(1) rotate(0)';
                    }, 200);
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        
        const icon = card.querySelector('i');
        if (icon) {
            icon.style.transform = 'scale(0) rotate(-180deg)';
            icon.style.transition = 'all 0.5s ease-out';
        }
        
        // Add delay based on index
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
};

// Parallax Effect for Hero Section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = `${scrolled * 0.5}px`;
});

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
}); 