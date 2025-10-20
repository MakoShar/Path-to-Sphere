// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for sphere
window.addEventListener('mousemove', (e) => {
    const sphere = document.querySelector('.sphere-card');
    if (sphere) {
        const x = (window.innerWidth - e.pageX) / 100;
        const y = (window.innerHeight - e.pageY) / 100;
        
        sphere.style.transform = `translateX(${x}px) translateY(${y}px)`;
    }
});

// Animated number counter for stats
function animateCounter() {
    const statsNumber = document.querySelector('.stats-number');
    if (!statsNumber) return;
    
    const target = 1200;
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            statsNumber.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            statsNumber.textContent = target + '+';
        }
    };
    
    // Start animation when stats card is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter();
                observer.disconnect();
            }
        });
    });
    
    const statsCard = document.querySelector('.stats-card');
    if (statsCard) {
        observer.observe(statsCard);
    }
}

// Button ripple effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    animateCounter();
    
    // Add entrance animations
    const elements = document.querySelectorAll('.hero-title, .hero-description, .badge, .cta-buttons');
    elements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

// Menu icon interaction
const menuIcon = document.querySelector('.menu-icon');
if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('active');
        // Add your menu toggle logic here
    });
}

// Hover effect on sphere image
const sphereImage = document.querySelector('.sphere-image');
if (sphereImage) {
    sphereImage.addEventListener('mouseenter', () => {
        sphereImage.style.filter = 'brightness(1.1) contrast(1.05)';
    });
    
    sphereImage.addEventListener('mouseleave', () => {
        sphereImage.style.filter = 'brightness(1) contrast(1)';
    });
}
