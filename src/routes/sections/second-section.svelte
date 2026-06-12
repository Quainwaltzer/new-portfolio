<script>
    import FloatingLines from '$lib/components/FloatingLines.svelte';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    let sectionTagline;
    let overallWrapper;
    let floatingLinesContainer;


    onMount (() =>{
            gsap.registerPlugin(ScrollTrigger);
        changeTextColor();

        scrollingThird();
        
    });

    function changeTextColor(){
        gsap.from(sectionTagline,{
            opacity: 0,
            scrollTrigger:{
                trigger: overallWrapper,
                start: 'top center',
                end: 'center center+=10',
                scrub: 1,
                markers: false,
            }
        });

         gsap.from(sectionTagline,{
            color: '#2d0000',
            delay: 3,
            scrollTrigger:{
                trigger: overallWrapper,
                start: 'top center',
                end: 'center center+=10',
                scrub: 3,
                markers: false,
            }
        });
    }

    function floatingAppear(){
        gsap.from(floatingLinesContainer, {
            opacity: 0,
            duration: 1.5,
            ease: 'power2.inOut',
            scrollTrigger: {
                trigger: overallWrapper,
                start: 'center bottom+=10',
                end: 'center bottom',
                scrub: 1,
                markers: false,
            }
        });
    }

    function scrollingThird(){
       const tl = gsap.timeline({
            scrollTrigger: {
                trigger: overallWrapper,
                start: 'top top',
                end: '+=100%',
                scrub: 1.5,
                markers: false,
                pin: true,
                pinSpacing: false,
            }
        });

        tl.to(sectionTagline, {
            scale: 0.8
        });
    }

</script>

<div class="overall-wrapper-second" bind:this={overallWrapper}>
<div class="divider"></div>
    <div class="floating-lines-container" bind:this={floatingLinesContainer}>
        <FloatingLines 
            animationSpeed={0.6} 
            enabledWaves={['middle', 'bottom']} lineCount={[3, 2]}           lineDistance={[4]}
            linesGradient={['#ef1c00', '#c10000', '#ff0004']} 
            mixBlendMode='plus-lighter'
        />
    </div>

    <h1 class="section-tagline" bind:this={sectionTagline}>Architecting sleek frontends that dance and robust backends that don't crash.</h1>
</div>

<style>
    .divider{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 30vh;
        background: linear-gradient(to bottom, #251716 0%,  transparent 100%);
        z-index: 99999;
    }
    .overall-wrapper-second {
        width: 100%;
        height: 100vh;
        background-color: #111111;
        padding: 4vw 16vw;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden !important;
        position: relative;
    }  

    .floating-lines-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        filter: blur(10px);
    }

    .floating-lines-container :global(canvas) {
        pointer-events: auto !important;
    }

    .section-tagline{
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 5vw;
        color: #ffbc95;
        text-align: left;
        z-index: 10000;
        pointer-events: none;
    }
</style>