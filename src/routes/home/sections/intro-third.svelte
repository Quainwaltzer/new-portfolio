<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    onMount(()=>{
        gsap.set('.bg-upper', { clipPath: 'inset(0 0 0% 0)' });
        gsap.set('.bg-lower', { clipPath: 'inset(0% 0 0 0)' });
        ScrollTrigger.create({
            trigger: '.intro-third-wrapper',
            start: 'top top',
            end: '+=300%',
            pin: true,
            pinSpacing: true,
            anticipatePin: true
        })

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.intro-third-wrapper',
                start: 'center bottom',
                end: '+=350%',
                scrub: 1,
            }
        });

        tl.from('.upper-tagline', { x: '-200%' })
          .from('.lower-tagline', { x: '200%'}, '<')

          .to('.bg-upper', { clipPath: 'inset(0 0 100% 0)' })
          .to('.bg-lower', { clipPath: 'inset(100% 0 0 0)' });
    });

</script>

<div class="intro-third-wrapper">

    <div class="tagline-wrapper">
        <div class="upper-tagline">
            <div class="white-bg bg-upper"></div>
            <h1 class="tagline-1">What </h1>
            <h1 class="tagline-2">I </h1>
            <h1 class="tagline-3">Bring</h1>
        </div>
        <div class="lower-tagline">
            <div class="white-bg bg-lower"></div>
            <h1 class="tagline-4">To</h1>
            <h1 class="tagline-5">The</h1>
            <h1 class="tagline-6">Table</h1>
        </div>
    </div>

    <div class="overlay-transition-0"></div>
</div>

<style>
    .intro-third-wrapper{
        height: 100vh;
        width:100%;
        background: linear-gradient(to bottom, #111111 0%, #1a100f 60%, #251716 100%);
                background-image: 
        linear-gradient(rgba(255, 96, 48, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 96, 48, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    background-position: center center;
    position: relative;
    }

    .tagline-wrapper{
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: center;
    }

    .upper-tagline, .lower-tagline{
        color: #ffbc95;
        font-family: 'Horizon';
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .upper-tagline h1, .lower-tagline h1{
        margin: 0 0.5rem;
        font-size: 4rem;
    }

    .upper-tagline{
        transform: translate(-40%,-5%);
    }

    .lower-tagline{
        transform: translate(40%, 5%);

    }

    .white-bg{
        background: #ffbc95;
        position: absolute;
        height: 100%;
        width: 100%;
    }

    .overlay-transition-0{
        content: '';
        position: absolute;
        display: block;
        bottom: 0;
        height: 60vh;
        width: 100%;
        background: linear-gradient(to bottom, transparent 0%, #f1000039 100%);
        z-index: 100000;
        transform: translate3d(0, 0, 0);
        will-change: transform, opacity;

        backface-visibility: hidden;
        
        content-visibility: auto; 
        contain-intrinsic-size: 0 75vh;

    }
</style>