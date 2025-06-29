// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Smooth Scrolling
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // Typing Animation for Hero Section
    const codeElement = document.getElementById('typing-code');
    const codeText = `# 파이썬으로 시작하는 프로그래밍
def hello_python():
    print("Hello, Python!")
    return "Welcome to Python Academy"

# 데이터 분석 예제
import pandas as pd
import numpy as np

data = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie'],
    'score': [95, 87, 92]
})

print(data.head())

# 머신러닝 예제
from sklearn.linear_model import LinearRegression
model = LinearRegression()
model.fit(X_train, y_train)

hello_python()`;

    let i = 0;
    function typeWriter() {
        if (i < codeText.length) {
            codeElement.textContent += codeText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Restart animation after 3 seconds
            setTimeout(() => {
                codeElement.textContent = '';
                i = 0;
                typeWriter();
            }, 3000);
        }
    }
    
    if (codeElement) {
        typeWriter();
    }

    // Scroll Animation for Cards
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards
    const cards = document.querySelectorAll('.feature-card, .course-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Counter Animation for Stats
    const stats = document.querySelectorAll('.stat h3');
    const statsSection = document.querySelector('.about');
    
    let statsAnimated = false;
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateStats();
            }
        });
    }, { threshold: 0.5 });
    
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    function animateStats() {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent);
            const increment = target / 100;
            let current = 0;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                stat.textContent = Math.floor(current) + (stat.textContent.includes('+') ? '+' : '') + (stat.textContent.includes('%') ? '%' : '');
            }, 20);
        });
    }

    // Contact Form Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                alert('모든 필드를 입력해주세요.');
                return;
            }
            
            // Simulate form submission
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '전송 중...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('문의가 성공적으로 전송되었습니다!');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }

    // Course Card Hover Effects
    const courseCards = document.querySelectorAll('.course-card');
    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Navbar Background on Scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    // Button Click Effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
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
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Course Detail Modal (placeholder)
    const courseButtons = document.querySelectorAll('.course-card .btn');
    courseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const courseTitle = this.closest('.course-card').querySelector('h3').textContent;
            alert(`${courseTitle} 강의에 대한 자세한 정보를 준비 중입니다!`);
        });
    });

    // Hero Buttons Actions
    const heroButtons = document.querySelectorAll('.hero-buttons .btn');
    heroButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.textContent.includes('강의 시작')) {
                document.querySelector('#courses').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (this.textContent.includes('무료 체험')) {
                alert('무료 체험 신청 페이지로 이동합니다!');
            }
        });
    });

    // Add CSS for ripple effect
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
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .nav-menu.active {
            display: flex;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            height: calc(100vh - 70px);
            background: rgba(255, 255, 255, 0.98);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            backdrop-filter: blur(10px);
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
    `;
    document.head.appendChild(style);

    // Initialize AOS (Animate On Scroll) alternative
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('[data-aos]');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('aos-animate');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial call

    console.log('Python Academy website loaded successfully! 🐍');
});