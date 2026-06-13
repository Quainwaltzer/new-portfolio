<script>
    import Header from '../components/Header.svelte';
    import HeroSection from './sections/hero-section.svelte';
    import SecondSection from './sections/second-section.svelte';
    import ThirdSection from './sections/third-section.svelte';
    import FourthSection from './sections/fourth-section.svelte';
    import FifthSection from './sections/fifth-section.svelte';
    import SixthSection from './sections/sixth-section.svelte';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { ScrollSmoother } from 'gsap/ScrollSmoother';

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    onMount(() => {
        const smoother = ScrollSmoother.create({
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
        <ThirdSection />
        <FourthSection />
        <FifthSection />
        <SixthSection />

    </div>
</div>

<div class="follower">
    <p>Click me to copy!</p>
</div>

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
</style>