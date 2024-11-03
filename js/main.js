// ============= FORM VALIDATION AND SUBMISSION =============
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', validateAndSubmitForm);
    }
});

function validateAndSubmitForm(event) {
    event.preventDefault();
    
    // Reset previous errors
    hideAllErrors();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid = true;

    // Validate name
    if (!name) {
        showError('name', 'Please enter your name');
        isValid = false;
    } else if (name.length < 2) {
        showError('name', 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Validate email
    if (!email) {
        showError('email', 'Please enter your email');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('email', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate message
    if (!message) {
        showError('message', 'Please enter your message');
        isValid = false;
    } else if (message.length < 10) {
        showError('message', 'Message must be at least 10 characters long');
        isValid = false;
    }

    if (isValid) {
        // Show success message
        showSuccessMessage();
        // Reset form
        contactForm.reset();
    }
}

function showError(fieldId, message) {
    const errorSpan = document.getElementById(fieldId + 'Error');
    const field = document.getElementById(fieldId);
    
    if (errorSpan && field) {
        errorSpan.textContent = message;
        errorSpan.classList.remove('hidden');
        field.classList.add('border-red-500');
    }
}

function hideAllErrors() {
    ['name', 'email', 'message'].forEach(fieldId => {
        const errorSpan = document.getElementById(fieldId + 'Error');
        const field = document.getElementById(fieldId);
        
        if (errorSpan && field) {
            errorSpan.classList.add('hidden');
            field.classList.remove('border-red-500');
        }
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showSuccessMessage() {
    const successDiv = document.createElement('div');
    successDiv.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg transform translate-y-0 opacity-100 transition-all duration-500';
    successDiv.textContent = 'Message sent successfully!';
    document.body.appendChild(successDiv);

    setTimeout(() => {
        successDiv.classList.add('opacity-0', 'translate-y-full');
        setTimeout(() => successDiv.remove(), 500);
    }, 3000);
}

// ============= SMOOTH SCROLLING =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobileMenu');
            if (mobileMenu && !mobileMenu.classList.contains('translate-x-full')) {
                mobileMenu.classList.add('translate-x-full');
            }
        }
    });
});

// ============= SCROLL ANIMATIONS =============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('opacity-0', 'translate-y-10', 'transition-all', 'duration-700');
    observer.observe(section);
});

// ============= MOBILE MENU TOGGLE =============
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('translate-x-full');
    });
}

// ============= THEME TOGGLE =============
const themeToggleBtn = document.getElementById('themeToggle');
const html = document.documentElement;

if (themeToggleBtn) {
    // Check for saved theme preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    // Toggle theme
    themeToggleBtn.addEventListener('click', () => {
        html.classList.toggle('dark');
        
        // Save preference
        localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
    });
}

// ============= SCROLL TO TOP BUTTON =============
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '↑';
scrollToTopButton.className = 'fixed bottom-8 right-8 bg-blue-600 text-white w-10 h-10 rounded-full opacity-0 transition-opacity duration-300 hover:bg-blue-700 focus:outline-none';
document.body.appendChild(scrollToTopButton);

window.addEventListener('scroll', () => {
    console.log('Scroll event triggered');
    if (window.scrollY > 100) {
        scrollToTopButton.classList.remove('opacity-0');
        scrollToTopButton.classList.add('opacity-100');
    } else {
        scrollToTopButton.classList.remove('opacity-100');
        scrollToTopButton.classList.add('opacity-0');
    }
});

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});