document.addEventListener("DOMContentLoaded", () => {

    // --- 1. INIT LENIS (Smooth Scroll) ---
    // This smoothes the vertical scroll, which also smoothes the horizontal calculation
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true
    });
    
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
    gsap.registerPlugin(ScrollTrigger);


    // --- 2. MASTER ANIMATION TIMELINE (Load Sequence) ---
    const masterTl = gsap.timeline();

    // Preloader Bar Loop (Happens immediately)
    gsap.to(".loader-bar", {
        height: "30px",
        duration: 0.4,
        stagger: { each: 0.1, yoyo: true, repeat: -1 },
        ease: "power1.inOut"
    });

    // Preloader Exit & Hero Entry (Happens when page is fully loaded)
    window.addEventListener("load", () => {
        masterTl.to(".loader-text", { y: -50, opacity: 0, duration: 0.5, delay: 1 })
            .to(".preloader", { 
                yPercent: -100, 
                duration: 1.2, 
                ease: "power4.inOut" 
            }, "-=0.2")
            .to(".word-mask", {
                y: "0%",
                duration: 1.5,
                stagger: 0.15,
                ease: "power4.out"
            }, "-=0.8");
    });


    // --- 3. NAVBAR MUSIC VISUALIZER ---
    const vizBars = document.querySelectorAll('.viz-bar');
    vizBars.forEach((bar) => {
        gsap.to(bar, {
            height: "20px",
            duration: "random(0.2, 0.5)",
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            delay: "random(0, 0.2)"
        });
    });


    // --- 4. CARD HOVER INTERACTION (Vertical & Horizontal) ---
    const cards = document.querySelectorAll('.card-wrapper');
    cards.forEach(card => {
        // We look for elements relative to 'this' card
        // Note: The horizontal cards use a simpler structure in this updated HTML,
        // so we check if elements exist before animating.
        const img = card.querySelector('img'); // Updated selector for generic img
        const overlay = card.querySelector('.play-overlay');
        const icon = card.querySelector('.play-icon-circle');
        
        if(img && overlay && icon) {
            const hoverTl = gsap.timeline({ paused: true });
            
            hoverTl.to(img, { scale: 1.05, duration: 0.4, ease: "power2.out" }, 0)
                .to(overlay, { opacity: 1, duration: 0.3 }, 0)
                .fromTo(icon, 
                    { y: 50, scale: 0.8 }, 
                    { y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, 0.1);

            card.addEventListener('mouseenter', () => hoverTl.play());
            card.addEventListener('mouseleave', () => hoverTl.reverse());
        }
    });


    // --- 5. VERTICAL PARALLAX (Only for Content Section) ---
    gsap.utils.toArray('.content-section .artist-card').forEach(card => {
        const img = card.querySelector('.artist-img');
        if (img) {
            gsap.to(img, {
                yPercent: 15,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        }
    });

    // Text Fade Up Animation
    gsap.utils.toArray('.text-anim').forEach(text => {
        gsap.from(text, {
            y: 50,
            opacity: 0,
            duration: 1,
            scrollTrigger: {
                trigger: text,
                start: "top 85%",
            }
        });
    });


    // --- 6. MAGNETIC BUTTON ---
    const magnetBtn = document.querySelector('.magnetic-btn');
    if (magnetBtn) {
        magnetBtn.addEventListener('mousemove', (e) => {
            const bound = magnetBtn.getBoundingClientRect();
            const centerX = bound.left + bound.width / 2;
            const centerY = bound.top + bound.height / 2;
            gsap.to(magnetBtn, {
                x: (e.clientX - centerX) * 0.3,
                y: (e.clientY - centerY) * 0.3,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        magnetBtn.addEventListener('mouseleave', () => {
            gsap.to(magnetBtn, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
        });
    }


    // --- 7. HORIZONTAL SCROLL LOGIC (Vanilla JS) ---
    const section = document.querySelector(".horizontal-scroll-section");
    const track = document.querySelector(".scroll-track");

    if(section && track) {
        function animateHorizontal() {
            // 1. Get dimensions
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;
            
            // 2. Calculate scroll position
            const scrollY = window.scrollY;

            // 3. Calculate percentage (0 to 1) of the section scrolled
            let percentage = (scrollY - sectionTop) / (sectionHeight - windowHeight);

            // 4. Clamp percentage between 0 and 1
            percentage = Math.max(0, Math.min(percentage, 1));

            // 5. Calculate distance to move (Track Width - Viewport Width)
            const trackWidth = track.scrollWidth;
            const maxScroll = trackWidth - window.innerWidth;

            // 6. Move the track
            const x = percentage * maxScroll;

            track.style.transform = `translate3d(-${x}px, 0, 0)`;

            // 7. Loop
            requestAnimationFrame(animateHorizontal);
        }

        // Start loop
        animateHorizontal();
    }

});