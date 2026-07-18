document.addEventListener('DOMContentLoaded', () => {
    
    // --- Elements ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    
    const blueprintPanel = document.getElementById('blueprint-panel');
    const panelOverlay = document.getElementById('panel-overlay');
    
    const openBlueprintBtns = [
        document.getElementById('toggle-blueprint-btn'),
        document.getElementById('mobile-blueprint-btn'),
        document.getElementById('hero-blueprint-btn')
    ];
    const closeBlueprintBtn = document.getElementById('close-blueprint-btn');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    const orderButtons = document.querySelectorAll('.btn-icon');

    // --- Mobile Nav Drawer Control ---
    menuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('open');
        menuToggle.classList.toggle('active');
        
        // Accessibility updates
        menuToggle.setAttribute('aria-expanded', isOpen);
        mobileNav.setAttribute('aria-hidden', !isOpen);
    });

    // Close mobile nav when link is clicked
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', false);
            mobileNav.setAttribute('aria-hidden', true);
        });
    });

    // --- Blueprint Side Panel Controls ---
    const openPanel = () => {
        blueprintPanel.classList.add('open');
        panelOverlay.classList.add('visible');
        blueprintPanel.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };

    const closePanel = () => {
        blueprintPanel.classList.remove('open');
        panelOverlay.classList.remove('visible');
        blueprintPanel.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Re-enable background scrolling
    };

    openBlueprintBtns.forEach(btn => {
        if (btn) btn.addEventListener('click', openPanel);
    });

    if (closeBlueprintBtn) closeBlueprintBtn.addEventListener('click', closePanel);
    if (panelOverlay) panelOverlay.addEventListener('click', closePanel);

    // Escape key closes panel
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && blueprintPanel.classList.contains('open')) {
            closePanel();
        }
    });

    // --- Product Category Filter Logic ---
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Transition effect - fade out first, then toggle display, then fade in
                if (category === 'all' || cardCategory === category) {
                    card.classList.remove('hidden');
                    // Trigger reflow to restart animation
                    void card.offsetWidth;
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    // Delay display: none until transition completes
                    setTimeout(() => {
                        if (button.classList.contains('active') && button.getAttribute('data-category') !== 'all' && cardCategory !== button.getAttribute('data-category')) {
                            card.classList.add('hidden');
                        }
                    }, 250);
                }
            });
        });
    });

    // --- Premium Interactive Toast Notifications for Ordering ---
    // Create toast container dynamically
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    Object.assign(toastContainer.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: '1000',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    });
    document.body.appendChild(toastContainer);

    const showToast = (message) => {
        const toast = document.createElement('div');
        toast.textContent = message;
        Object.assign(toast.style, {
            backgroundColor: '#A5856F', // Mocha Mousse primary
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '8px',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '0.9rem',
            fontWeight: '600',
            boxShadow: '0 4px 15px rgba(44, 38, 33, 0.25)',
            transform: 'translateY(50px)',
            opacity: '0',
            transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        });

        toastContainer.appendChild(toast);

        // Trigger animation
        setTimeout(() => {
            toast.style.transform = 'translateY(0)';
            toast.style.opacity = '1';
        }, 50);

        // Remove toast after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateY(-20px)';
            toast.style.opacity = '0';
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 3000);
    };

    orderButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const productName = e.target.closest('.product-card').querySelector('h3').textContent;
            showToast(`🛒 ${productName} added to your basket!`);
        });
    });

});
