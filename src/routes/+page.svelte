<script>
    import Header from './components/Header.svelte';
    import HeroSection from './sections/hero-section.svelte';
    import SecondSection from './sections/second-section.svelte';
    import ThirdSection from './sections/third-section.svelte';
    import FourthSection from './sections/fourth-section.svelte';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { ScrollSmoother } from 'gsap/ScrollSmoother';

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
    onMount(() => {
        const smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.5,           
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
    </div>
</div>

<style>
    
</style>