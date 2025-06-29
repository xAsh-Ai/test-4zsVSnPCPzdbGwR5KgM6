// Modern JavaScript for Interactive Website

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Website loaded successfully!');
    
    // Initialize interactive elements
    initializeButtons();
    addScrollEffects();
    setupResponsiveFeatures();
});

// Button Interactions
function initializeButtons() {
    const welcomeBtn = document.getElementById('welcomeBtn');
    
    if (welcomeBtn) {
        welcomeBtn.addEventListener('click', function() {
            // Create a fun click effect
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show welcome message
            showWelcomeMessage();
        });
        
        // Add hover sound effect (visual feedback)
        welcomeBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        welcomeBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
}

// Welcome Message Function
function showWelcomeMessage() {
    // Create a temporary message element
    const message = document.createElement('div');
    message.textContent = '🎉 Welcome to your new website! Start customizing it now.';
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.5s ease-out;
        font-weight: 600;
    `;
    
    // Add animation keyframes
    if (!document.getElementById('dynamic-styles')) {
        const style = document.createElement('style');
        style.id = 'dynamic-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(message);
    
    // Remove message after 4 seconds
    setTimeout(() => {
        message.style.animation = 'slideOut 0.5s ease-out';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 500);
    }, 4000);
}

// Scroll Effects
function addScrollEffects() {
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax effect for background
        document.body.style.backgroundPosition = `center ${rate}px`;
    });
}

// Responsive Features
function setupResponsiveFeatures() {
    // Handle window resize
    window.addEventListener('resize', function() {
        console.log('Window resized to:', window.innerWidth, 'x', window.innerHeight);
    });
    
    // Touch device detection
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        console.log('Touch device detected');
    }
}

// Utility Functions
function getRandomColor() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function createParticleEffect(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: ${getRandomColor()};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
        left: ${x}px;
        top: ${y}px;
    `;
    
    document.body.appendChild(particle);
    
    // Animate particle
    const animation = particle.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(0)`, opacity: 0 }
    ], {
        duration: 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    });
    
    animation.onfinish = () => particle.remove();
}

// Add click particle effect to the page
document.addEventListener('click', function(e) {
    createParticleEffect(e.clientX, e.clientY);
});

// Console welcome message
console.log(`
🌟 Welcome to your new website!
🛠️  Ready to customize? Start editing the files:
   📄 index.html - Structure
   🎨 style.css - Styling  
   ⚡ script.js - Interactivity
   
🚀 Happy coding!
`);