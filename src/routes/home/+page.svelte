<script>
    import Header from '../components/Header.svelte';
    import HeroSection from './sections/hero-section.svelte';
    import SecondSection from './sections/second-section.svelte';
    import ThirdSection from './sections/new-third-section.svelte';
    import ThirdOverlay from './sections/intro-third-overlay.svelte';
    import ThirdIntro from './sections/intro-third.svelte';
    import FourthSection from './sections/fourth-section.svelte';
    import FifthSection from './sections/fifth-section.svelte';
    import SixthSection from './sections/sixth-section.svelte';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { ScrollSmoother } from 'gsap/ScrollSmoother';

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    onMount(() => {
        let mm = gsap.matchMedia();
        ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 2,           
            effects: true,         
            normalizeScroll: true  
        });



    })
</script>

<Header />

<div id="smooth-wrapper">
    <div id="smooth-content">
        
        <HeroSection />
        <SecondSection />
        <ThirdOverlay /> 
        <ThirdIntro /> 
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <SixthSection />

    </div>
</div>

<div class="follower">
    <p>Click me to copy!</p>
</div>

<div class="hover-text">[ CODE X ART ]</div>

<div class="easter-egg"><h6>Wow easter egg yarn? XD</h6></div>
<style>
    .follower{
        border-radius: 20px;
        height: fit-content;
        width: fit-content;
        position: fixed;
        background: rgb(106, 106, 255);
        padding: 0.5rem;
        top: 0;
        left: 0;
        pointer-events: none;
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .hover-text{
    position: fixed;
    z-index: 100000;
    background: #ffbc95;
    color: white;
    font-family: 'Horizon';
    font-size: 1rem;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    pointer-events: none;
    padding: 10px;
    border-radius: 50px;
    opacity: 0;
}

.easter-egg{
    position: fixed;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    background: #ffbc95;
    border-radius: 50px;
    padding: 15px;
        opacity: 0;
}

.easter-egg h6{ 
    color: #222222;
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 1rem;
    font-weight: 300;
    width: 20vw;
    text-align: center;

 }

</style>