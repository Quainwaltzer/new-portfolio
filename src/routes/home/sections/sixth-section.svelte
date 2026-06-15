<script>
    import finalHero from '$lib/assets/final-hero.webp';
    import finalHeroOverlay from '$lib/assets/final-hero-overlay.png';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { onMount } from 'svelte';

    function initScrollAnimations() {
        // 🟢 TRIGGER 1: Strict Pinning Control
        // This holds the background solid once it fills the screen
        ScrollTrigger.create({
            trigger: '.sixth-section-wrapper',
            start: 'top top',
            end: '+=50%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            markers: false // Distinct markers
        });

        // 🟢 TRIGGER 2: The Text Scrubber
        // This starts long before (when the section enters the bottom of the screen)
        // and ends at the exact same point the pin releases
        gsap.timeline({
            scrollTrigger: {
                trigger: '.sixth-section-wrapper',
                start: 'top bottom', // 🚀 Starts scrubbing way early!
                end: '+=150%', // 🚀 Keeps animating through the pin duration
                scrub: 1,
                markers: false
            }
        })
        .from('img', {scale: 1.2, ease: 'none'}, 0)
        .fromTo('.h1_1', { x: '100vw' }, { x: '-30vw', ease: 'none' }, 0)
        .fromTo('.h1_2', { x: '-100vw' }, { x: '30vw', ease: 'none' }, 0);
    }

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);
        initScrollAnimations();
    });
</script>

<div class="sixth-section-wrapper">
    <div class="hero-overlay">
        <img class="img_1" src={finalHero} alt="">
        <img class="img_2" src={finalHeroOverlay} alt="">
        <h1 class="h1_1">Form always</h1>
        <h1 class="h1_2">follows function.</h1>

        <div class="metrics-grid">
            <div class="metric-card">
                <span class="bracket-num">[ 5+ Frameworks ]</span>
                <p class="metric-desc">Full-Stack Mastery</p>
            </div>
            <div class="metric-card">
                <span class="bracket-num">[ 20+ UI Layouts ]</span>
                <p class="metric-desc">Artistry & Code</p>
            </div>
            <div class="metric-card">
                <span class="bracket-num">[ 99% Perf Score ]</span>
                <p class="metric-desc">Optimized Systems</p>
            </div>
        </div>

        <div class="credits">
            <div class="text-wrappers">
                <div class="credits-1">
                    <h1>Inspired by:</h1>
                    <h1>Juan Mora's Portfolio</h1>
                </div>
                <div class="credits-2">
                    <h1>This portfolio is made with:</h1>
                    <h1>Svelte</h1>
                    <h1>GSAP</h1>
                    <h1>Figma</h1>
                    <h1>Three.js</h1>
                    <h1>OGL</h1>
                </div>
            </div>
        </div>

    </div>

</div>

<style>

    .credits{
        position: absolute;
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9;
    }

    .text-wrappers{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 2%;
    }

    .credits-1, .credits-2{
        display: flex;
        flex-flow: column;
    }

    .credits-1 h1, .credits-2 h1{
        font-size: 1rem !important;
    }

    .credits-1{
        align-items: flex-start;
    }

    .credits-2{
        align-items: flex-end;
    }


    .sixth-section-wrapper{
        height: 100vh;
        width: 100%;
        background: #fffff0;
        position: relative;
        overflow: hidden;
    }

    .hero-overlay{
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background: #ff5e00;
        
    }

    .hero-overlay img{

        width: 100%;
        height: auto;
        
    }

    .img_1{
        mix-blend-mode: multiply;
        position: absolute;
        z-index: 1;
    }

    .img_2{
        position: absolute;
        
        z-index: 3;
    }

    .hero-overlay h1{
        font-size: 10rem;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: #ffbc95;
    }

    .h1_1{
        position: absolute;
        z-index: 2;
        top: 20%;
    }

    .h1_2{
        position: absolute;
        z-index: 4;
        bottom: 20%;
    }

    .metrics-grid {
        position: absolute;
        z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    max-width: 900px;
    margin: 3rem auto 0 auto; /* Drops it perfectly below your main paragraph period */
    width: 100%;
}

.metric-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex: 1;
}

.bracket-num {
    font-family: 'Space Mono', 'Courier New', monospace;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: #ffa26c; /* That gorgeous soft cream peach from your shirt/glow */
    text-shadow: 0 0 10px rgba(255, 96, 48, 0.2); /* Whisper of atomic back-glow */
}

.metric-desc {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 400;
    color: ivory;
    opacity: 0.7;
    margin-top: 0.5rem;
    letter-spacing: 0.05em;
}
</style>