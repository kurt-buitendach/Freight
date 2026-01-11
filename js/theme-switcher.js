/**
 * Hexagon Freight - Theme Switcher
 * Modern color themes for the website
 */

const themes = {
    default: {
        name: 'Sunset Orange',
        primary: '#FF4800',
        primaryRgb: '255, 72, 0',
        secondary: '#F2F2F4',
        dark: '#1F1F2E',
        icon: 'fa-sun'
    },
    ocean: {
        name: 'Ocean Blue',
        primary: '#007CC7',
        primaryRgb: '0, 124, 199',
        secondary: '#E8F4F8',
        dark: '#12232E',
        icon: 'fa-water'
    },
    forest: {
        name: 'Forest Green',
        primary: '#2E7D5A',
        primaryRgb: '46, 125, 90',
        secondary: '#E8F5E9',
        dark: '#1B3D2F',
        icon: 'fa-leaf'
    },
    midnight: {
        name: 'Midnight',
        primary: '#6C5CE7',
        primaryRgb: '108, 92, 231',
        secondary: '#F0EEFF',
        dark: '#1A1A2E',
        icon: 'fa-moon'
    },
    ember: {
        name: 'Ember Red',
        primary: '#C1432E',
        primaryRgb: '193, 67, 46',
        secondary: '#FDF2F0',
        dark: '#2C2C2C',
        icon: 'fa-fire'
    },
    teal: {
        name: 'Modern Teal',
        primary: '#00A8A8',
        primaryRgb: '0, 168, 168',
        secondary: '#E6F7F7',
        dark: '#1A3A3A',
        icon: 'fa-gem'
    }
};

// Apply theme to CSS variables and all elements
function applyTheme(themeName) {
    const theme = themes[themeName] || themes.default;
    const root = document.documentElement;

    // Set CSS custom properties
    root.style.setProperty('--primary', theme.primary);
    root.style.setProperty('--secondary', theme.secondary);
    root.style.setProperty('--dark', theme.dark);
    root.style.setProperty('--primary-rgb', theme.primaryRgb);

    // Modern shadow variables that adapt to theme
    root.style.setProperty('--shadow-primary', `0 8px 24px rgba(${theme.primaryRgb}, 0.25)`);
    root.style.setProperty('--shadow-primary-lg', `0 12px 32px rgba(${theme.primaryRgb}, 0.3)`);

    // Apply to all elements with Bootstrap/template classes
    applyToElements(theme);

    // Save preference
    localStorage.setItem('hexagon-theme', themeName);

    // Update active state in UI
    updateThemeUI(themeName);
}

// Apply theme colors to all relevant elements
function applyToElements(theme) {
    // Primary background elements
    const bgPrimarySelectors = [
        '.bg-primary',
        '.btn-primary',
        '.jumbotron',
        '.back-to-top'
    ];

    bgPrimarySelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.style.setProperty('background-color', theme.primary, 'important');
            if (selector === '.btn-primary') {
                el.style.setProperty('border-color', theme.primary, 'important');
            }
        });
    });

    // Primary text elements
    document.querySelectorAll('.text-primary').forEach(el => {
        el.style.setProperty('color', theme.primary, 'important');
    });

    // Dark background elements
    document.querySelectorAll('.bg-dark').forEach(el => {
        el.style.setProperty('background-color', theme.dark, 'important');
    });

    // Secondary background elements
    document.querySelectorAll('.bg-secondary').forEach(el => {
        el.style.setProperty('background-color', theme.secondary, 'important');
    });

    // Border elements
    document.querySelectorAll('.border-primary').forEach(el => {
        el.style.setProperty('border-color', theme.primary, 'important');
    });

    // Links in footer and other areas
    document.querySelectorAll('a.text-primary, .text-primary a').forEach(el => {
        el.style.setProperty('color', theme.primary, 'important');
    });

    // Nav link active/hover states - add CSS rule
    updateDynamicCSS(theme);

    // Update theme toggle button
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.style.background = `linear-gradient(135deg, ${theme.primary} 0%, ${theme.dark} 100%)`;
    }

    // Update service cards headers
    document.querySelectorAll('.d-flex.align-items-center.justify-content-center.bg-primary').forEach(el => {
        el.style.setProperty('background-color', theme.primary, 'important');
    });

    // Blog date circles
    document.querySelectorAll('.position-absolute.bg-primary.rounded-circle').forEach(el => {
        el.style.setProperty('background-color', theme.primary, 'important');
    });

    // Update btn-outline-light hover for hero section
    document.querySelectorAll('.btn-outline-light').forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.setProperty('background-color', theme.primary, 'important');
            this.style.setProperty('border-color', theme.primary, 'important');
        });
        el.addEventListener('mouseleave', function() {
            this.style.removeProperty('background-color');
            this.style.setProperty('border-color', '#fff', 'important');
        });
    });
}

// Add dynamic CSS rules for hover states and other pseudo-elements
function updateDynamicCSS(theme) {
    // Remove existing dynamic style if present
    let dynamicStyle = document.getElementById('theme-dynamic-css');
    if (dynamicStyle) {
        dynamicStyle.remove();
    }

    // Create new style element
    dynamicStyle = document.createElement('style');
    dynamicStyle.id = 'theme-dynamic-css';
    dynamicStyle.textContent = `
        /* CSS Variables */
        :root {
            --primary: ${theme.primary};
            --primary-rgb: ${theme.primaryRgb};
            --secondary: ${theme.secondary};
            --dark: ${theme.dark};
        }

        /* Primary Backgrounds */
        .bg-primary {
            background-color: ${theme.primary} !important;
        }

        /* Buttons */
        .btn-primary {
            background-color: ${theme.primary} !important;
            border-color: ${theme.primary} !important;
        }

        .btn-primary:hover,
        .btn-primary:focus,
        .btn-primary:active {
            background-color: ${theme.dark} !important;
            border-color: ${theme.dark} !important;
        }

        /* Text Primary */
        .text-primary {
            color: ${theme.primary} !important;
        }

        /* Dark Backgrounds */
        .bg-dark {
            background-color: ${theme.dark} !important;
        }

        /* Secondary Backgrounds */
        .bg-secondary {
            background-color: ${theme.secondary} !important;
        }

        /* Border Primary */
        .border-primary {
            border-color: ${theme.primary} !important;
        }

        /* Navigation - Active and Hover States */
        .navbar-light .navbar-nav .nav-link:hover,
        .navbar-light .navbar-nav .nav-link.active {
            color: #fff !important;
            background: ${theme.primary} !important;
        }

        .navbar-nav .nav-link:hover,
        .navbar-nav .nav-link.active {
            color: #fff !important;
        }

        /* Jumbotron */
        .jumbotron {
            background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                        url('../img/carousel-1.jpg') center center no-repeat !important;
            background-size: cover !important;
        }

        /* Feature Icons */
        .far.fa-dot-circle {
            color: ${theme.primary} !important;
        }

        /* Text on primary background - always white for readability */
        .bg-primary,
        .bg-primary h1,
        .bg-primary h2,
        .bg-primary h3,
        .bg-primary h4,
        .bg-primary h5,
        .bg-primary h6,
        .bg-primary p,
        .bg-primary span,
        .bg-primary .text-dark {
            color: #fff !important;
        }

        /* Icons on primary background - always white */
        .bg-primary .fa-plane,
        .bg-primary .fa-ship,
        .bg-primary .fa-truck,
        .bg-primary .fa-store,
        .bg-primary .fa-phone-alt,
        .bg-primary .fa-envelope,
        .bg-primary .fa-map-marker-alt,
        .bg-primary .fa-clock,
        .bg-primary .fas,
        .bg-primary .far,
        .bg-primary .fab {
            color: #fff !important;
        }

        /* Navbar brand icon */
        .navbar-brand .fa-truck {
            color: ${theme.primary} !important;
        }

        /* Footer icons - keep white */
        .bg-dark .fa-map-marker-alt,
        .bg-dark .fa-phone-alt,
        .bg-dark .fa-envelope,
        .bg-dark .fa-clock,
        .bg-dark .fa-angle-right {
            color: inherit !important;
        }

        /* Social icons in footer */
        .bg-dark .fab {
            color: inherit !important;
        }

        /* Topbar icons */
        .bg-dark .fa-facebook-f,
        .bg-dark .fa-twitter,
        .bg-dark .fa-linkedin-in,
        .bg-dark .fa-instagram,
        .bg-dark .fa-youtube {
            color: inherit !important;
        }

        /* Footer Links */
        .bg-dark a:hover {
            color: ${theme.primary} !important;
        }

        /* Read More Links */
        a.border-bottom {
            color: ${theme.primary} !important;
            border-color: ${theme.primary} !important;
        }

        a.border-bottom:hover {
            color: ${theme.dark} !important;
        }

        /* Blog Bookmark */
        .far.fa-bookmark {
            color: ${theme.primary} !important;
        }

        /* Back to Top */
        .back-to-top {
            background-color: ${theme.primary} !important;
        }

        .back-to-top:hover {
            background-color: ${theme.dark} !important;
        }

        /* Social Buttons */
        .btn-outline-light:hover {
            background-color: ${theme.primary} !important;
            border-color: ${theme.primary} !important;
        }

        /* Theme Panel */
        .theme-option.active {
            border-color: ${theme.primary} !important;
        }

        .theme-option.active::after {
            background: ${theme.primary} !important;
        }

        #theme-toggle {
            background: ${theme.primary} !important;
        }

        #theme-panel h5 i {
            color: ${theme.primary} !important;
        }
    `;

    document.head.appendChild(dynamicStyle);
}

// Update the UI to show active theme
function updateThemeUI(themeName) {
    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.theme === themeName) {
            btn.classList.add('active');
        }
    });
}

// Toggle theme panel
function toggleThemePanel() {
    const panel = document.getElementById('theme-panel');
    const toggleBtn = document.getElementById('theme-toggle');
    panel.classList.toggle('open');
    toggleBtn.classList.toggle('panel-open');
}

// Initialize theme switcher
function initThemeSwitcher() {
    // Load saved theme or default
    const savedTheme = localStorage.getItem('hexagon-theme') || 'default';

    // Apply theme immediately
    applyTheme(savedTheme);

    // Add click handlers to theme options
    document.querySelectorAll('.theme-option').forEach(btn => {
        btn.addEventListener('click', () => {
            applyTheme(btn.dataset.theme);
        });
    });

    // Add click handler to toggle button
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleThemePanel);
    }

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        const panel = document.getElementById('theme-panel');
        const toggle = document.getElementById('theme-toggle');
        if (panel && toggle && !panel.contains(e.target) && !toggle.contains(e.target)) {
            panel.classList.remove('open');
            toggle.classList.remove('panel-open');
        }
    });
}

// Run on DOM ready or immediately if already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThemeSwitcher);
} else {
    initThemeSwitcher();
}
