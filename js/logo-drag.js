// ===================================
// Logo Wheel Drag Functionality
// ===================================

(function() {
    const logoWheel = document.querySelector('.logo-wheel');
    const logoWheelContainer = document.querySelector('.logo-wheel-container');

    if (!logoWheel || !logoWheelContainer) return;

    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let animationId = null;
    let lastX = 0;
    let lastTime = 0;

    // Store the original animation state
    const originalAnimation = window.getComputedStyle(logoWheel).animation;

    // Mouse down event
    logoWheelContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - logoWheelContainer.offsetLeft;
        scrollLeft = logoWheelContainer.scrollLeft;
        lastX = e.pageX;
        lastTime = Date.now();
        velocity = 0;

        // Pause the auto-scroll animation
        logoWheel.style.animationPlayState = 'paused';
        logoWheelContainer.style.cursor = 'grabbing';

        // Cancel any ongoing momentum animation
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }

        e.preventDefault();
    });

    // Mouse leave event
    logoWheelContainer.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            logoWheelContainer.style.cursor = 'grab';
            applyMomentum();
        }
    });

    // Mouse up event
    logoWheelContainer.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            logoWheelContainer.style.cursor = 'grab';
            applyMomentum();
        }
    });

    // Mouse move event
    logoWheelContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        e.preventDefault();
        const x = e.pageX - logoWheelContainer.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed multiplier

        // Calculate velocity for momentum
        const currentTime = Date.now();
        const timeDelta = currentTime - lastTime;
        if (timeDelta > 0) {
            velocity = (e.pageX - lastX) / timeDelta;
        }

        lastX = e.pageX;
        lastTime = currentTime;

        // Apply the scroll
        logoWheelContainer.scrollLeft = scrollLeft - walk;
    });

    // Apply momentum scrolling after release
    function applyMomentum() {
        const friction = 0.95; // Friction coefficient
        const minVelocity = 0.1; // Minimum velocity threshold

        function animate() {
            if (Math.abs(velocity) > minVelocity) {
                logoWheelContainer.scrollLeft -= velocity * 30;
                velocity *= friction;
                animationId = requestAnimationFrame(animate);
            } else {
                // Resume auto-scroll animation after momentum stops
                logoWheel.style.animationPlayState = 'running';
                animationId = null;
            }
        }

        if (Math.abs(velocity) > minVelocity) {
            animate();
        } else {
            // Resume auto-scroll animation immediately if no momentum
            logoWheel.style.animationPlayState = 'running';
        }
    }

    // Handle the infinite scroll effect
    // We have 3 sets of 10 logos (30 total)
    // Each logo is 180px + 60px gap = 240px total width
    // One set = 10 * 240px = 2400px
    const oneSetWidth = 10 * (180 + 60); // 2400px

    logoWheelContainer.addEventListener('scroll', () => {
        const scrollLeft = logoWheelContainer.scrollLeft;

        // When scrolled past first set (left), jump to second set
        if (scrollLeft <= 0) {
            logoWheelContainer.scrollLeft = oneSetWidth;
        }
        // When scrolled past second set (right), jump back to second set start
        else if (scrollLeft >= oneSetWidth * 2) {
            logoWheelContainer.scrollLeft = oneSetWidth;
        }
    });

    // Touch support for mobile devices
    let touchStartX = 0;
    let touchScrollLeft = 0;

    logoWheelContainer.addEventListener('touchstart', (e) => {
        isDragging = true;
        touchStartX = e.touches[0].pageX - logoWheelContainer.offsetLeft;
        touchScrollLeft = logoWheelContainer.scrollLeft;
        lastX = e.touches[0].pageX;
        lastTime = Date.now();
        velocity = 0;

        logoWheel.style.animationPlayState = 'paused';

        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }, { passive: true });

    logoWheelContainer.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            applyMomentum();
        }
    }, { passive: true });

    logoWheelContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const x = e.touches[0].pageX - logoWheelContainer.offsetLeft;
        const walk = (x - touchStartX) * 2;

        const currentTime = Date.now();
        const timeDelta = currentTime - lastTime;
        if (timeDelta > 0) {
            velocity = (e.touches[0].pageX - lastX) / timeDelta;
        }

        lastX = e.touches[0].pageX;
        lastTime = currentTime;

        logoWheelContainer.scrollLeft = touchScrollLeft - walk;
    }, { passive: true });

    // Set initial cursor style
    logoWheelContainer.style.cursor = 'grab';
})();
