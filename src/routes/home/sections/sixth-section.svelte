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
            end: '+=150%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            markers: { startColor: "green", endColor: "red", label: "PIN" } // Distinct markers
        });

        // 🟢 TRIGGER 2: The Text Scrubber
        // This starts long before (when the section enters the bottom of the screen)
        // and ends at the exact same point the pin releases
        gsap.timeline({
            scrollTrigger: {
                trigger: '.sixth-section-wrapper',
                start: 'top bottom', // 🚀 Starts scrubbing way early!
                end: 'bottom+=150% bottom', // 🚀 Keeps animating through the pin duration
                scrub: 1,
                markers: { startColor: "orange", endColor: "purple", label: "TEXT" }
            }
        })
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
    </div>
</div>

<style>

    .sixth-section-wrapper{
        margin-top: 25vh;
        height: 100vh;
        width: 100%;
        background: #fffff0;
    }

    .hero-overlay{
        position: relative;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .hero-overlay img{
        width: 100%;
        height: auto;
    }

    .img_1{
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
</style>