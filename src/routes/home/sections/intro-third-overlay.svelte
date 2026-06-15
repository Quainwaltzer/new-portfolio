<script>
    import { onMount } from 'svelte';
    import gsap from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { SplitText } from 'gsap/SplitText';
    import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';
    onMount(()=>{
        gsap.registerPlugin(ScrollTrigger, SplitText);

        gsap.to('.intro-third-overlay', {
            y: '-75vh',
            ease: 'none',
            duration: 0.1,
            scrollTrigger: {
                trigger: '.intro-third-wrapper',
                start: 'top bottom',
                end: '+=100%',
                scrub: true,
                markers: false,
            }
        });

    const element = document.querySelector('.hover-text');
    const containerWrapper = document.querySelector('.intro-third-overlay');
    const anotherOne = document.querySelector('body');
    gsap.set(element, {opacity: 0});
    let xSetter = gsap.quickTo(element, "x", {duration: 0.6, ease: "power3"});
    let ySetter = gsap.quickTo(element, "y", {duration: 0.6, ease: "power3"});

    function onMouseMove(e){
        xSetter(e.clientX);
        ySetter(e.clientY);
    }

    containerWrapper.addEventListener("mouseenter", (e) => {
       document.documentElement.style.setProperty('cursor', 'none', 'important');
        document.body.style.setProperty('cursor', 'none', 'important');
        containerWrapper.style.setProperty('cursor', 'none', 'important');
        gsap.to(element, {opacity: 1, delay: 0.1, duration: 0.3, overwrite: "auto", });
        gsap.to(element, { fontFamily: 'Horizon', duration: 2, scrambleText: {
                text: "[CODE X ART]",
                chars: "<>?_+!@#$%^&*()",
                revealDelay: 1
        }});

        gsap.to(element, { fontFamily: 'Plus Jakarta Sans', delay: 5, duration: 2, scrambleText: {
                text: "Click me?",
                chars: "<>?_+!@#$%^&*()",
                revealDelay: 1
        }});

        gsap.to(element, { fontFamily: 'Horizon', delay: 9, duration: 2, scrambleText: {
                text: "[CODE X ART]",
                chars: "<>?_+!@#$%^&*()",
                revealDelay: 1
        }});

        containerWrapper.addEventListener("click", (e)=>{
            gsap.set('.easter-egg', { transformOrigin: "50% 50%" });
            gsap.to('.easter-egg', {
                keyframes: [
                    { rotation: -10, x: -5, duration: 0.03, ease: "none" },
                    { rotation: 8,   x: 4,  duration: 0.03, ease: "none" },
                    { rotation: -7,  x: -3, duration: 0.03, ease: "none" },
                    { rotation: 6,   x: 3,  duration: 0.03, ease: "none" },
                    { rotation: -4,  x: -2, duration: 0.03, ease: "none" },
                    { rotation: 3,   x: 1,  duration: 0.03, ease: "none" },
                    { rotation: -1,  x: -1, duration: 0.03, ease: "none" },
                    { rotation: 0,   x: 0,  duration: 0.15, ease: "power4.out" }
                ]
            });
            gsap.to('.easter-egg', { opacity: 1, duration: 3});
            gsap.to('.easter-egg', { opacity: 0, delay: 6, duration: 3});
        });

        window.addEventListener("mousemove", onMouseMove);
    });

    containerWrapper.addEventListener("mouseleave", () => {
        document.documentElement.style.removeProperty('cursor', 'none', 'important');
        document.body.style.removeProperty('cursor', 'none', 'important');
        containerWrapper.style.removeProperty('cursor', 'none', 'important');
        gsap.to(element, { opacity: 0, duration: 0.3, overwrite: "auto"});
        window.removeEventListener("mousemove", onMouseMove);
    });

    gsap.set('.first-line', { clipPath: 'inset(0 0 100% 0)' });
    gsap.set('.second-line', { clipPath: 'inset(100% 0 0 0)' });
    gsap.set('.third-line', { clipPath: 'inset(0% 0% 0 100%)' });
    gsap.set('.scan-line', { top: '0%', width: '0%', clipPath: 'inset(0 0% 0 0%)' });
    gsap.set('.scan-line-2', { clipPath: 'inset(50% 0% 50% 0%)' });
    gsap.set(['.fourth-line', '.fourth-line-outline'], { scale: 0 });
    // 2. CREATE A CLEAN TIMELINE WITH NO EMBEDDED DELAYS
    const tl = gsap.timeline({ paused: true });

    ScrollTrigger.create({
        trigger: '.intro-third-wrapper',
        start: 'center-=100 bottom',
        end: 'center-=80 bottom',
        toggleActions: 'none none none none',
        markers: false,
        onEnter: () => {
            tl.timeScale(1);
            tl.play();
        },
        onLeaveBack: () => {
            tl.timeScale(3);
            tl.reverse();
        }
    });

    // 3. BUILD THE STEPS (Using normal .to() since states are already set above)
    tl.to('.scan-line', { width: '50%', duration: 0.5})
      .to('.first-line', { clipPath: 'inset(0 0 0% 0)', duration: 1 })
      .to('.scan-line', { top: '100%', duration: 1 }, '<')
      
      .to('.scan-line', { width: '40%', duration: 0.5})
      // Step 2: Clear Line 1 out
      .to('.first-line', { clipPath: 'inset(0 0 100% 0)', duration: 1 }, '+=0.5') // Global timeline delay instead of local tween delay
      .to('.scan-line', { top: '0%', duration: 1 }, '<')
      
      // Step 3: Bring Line 2 in
      .to('.second-line', { clipPath: 'inset(0% 0 0 0)', duration: 1 }, '<')
      
      // Step 4: Scan Line Modifications
      .to('.scan-line', { clipPath: 'inset(0 50% 0 50%)', duration: 1 })
      .to('.scan-line-2', { clipPath: 'inset(0% 0% 0% 0%)', duration: 1 })
      .set('.scan-line-2', { })
      .to('.scan-line-2', { left: '20%', duration: 1 })
      
      // Step 5: Transition Line 2 to Line 3
      .to('.second-line', { opacity: 0, duration: 0.4 }, '<-=1')
      .to('.third-line', { clipPath: 'inset(0% 0% 0 0%)', duration: 1 }, '<+=1')

      .to('.scan-line-2', { clipPath: 'inset(50% 0% 50% 0%)', duration: 1 })
      .to('.third-line', { scale: 0, duration: 0.3, ease: 'power2.in' }, '<')

      .to('.fourth-line', { scale: 1.2, ease: 'power2.out', duration: 1})
      .to('.fourth-line-outline', { scale: 1.2, ease: 'power2.out', duration: 1}, '<')

      .fromTo('.outline-1', {y: 0}, { y: -25, ease: 'power2.out', duration: 0.5})
      .fromTo('.outline-2', {y: 0}, { y: 25, ease: 'power2.out', duration: 0.5}, '<')

      .set('.outline-3', { y: -25 })
      .set('.outline-4', { y: 25 })

      .to('.outline-3', { y: -65, ease: 'power2.out', duration: 0.5}, '<-=0.1')
      .to('.outline-4', { y: 65, ease: 'power2.out', duration: 0.5}, '<')

      .set('.outline-5', { y: -65 })
      .set('.outline-6', { y: 65 })

      .to('.outline-5', { y: -105, ease: 'power2.out', duration: 0.5}, '<-=0.1')
      .to('.outline-6', { y: 105, ease: 'power2.out', duration: 0.5}, '<')

      .to('.fourth-line', { keyframes: [
        { scale: 1.8,  duration: 2, ease: 'power2.out' }, // Part 1: Burst large
        { scale: 1, y: 0, duration: 0.5, ease: 'power2.in' }     // Part 2: Snap back down
        ], duration: 2.5})

        // --- Original Pair 1 (.outline-1 and .outline-2) ---
        .to('.outline-1', { keyframes: [
        { scale: 1.6, duration: 2, ease: 'power2.out' },
        { scale: 1, duration: 0.5, ease: 'power2.in' },
        { y: 0, duration: 0.3, ease: 'power2.in' },
        ], duration: 2.5 }, '<')

        .to('.outline-2', { keyframes: [
        { scale: 1.6, duration: 2, ease: 'power2.out' },
        { scale: 1, duration: 0.5, ease: 'power2.in' },
        { y: 0, duration: 0.3, ease: 'power2.in' },
        ], duration: 2.5 }, '<')

        // --- Original Pair 2 (.outline-3 and .outline-4) ---
        .to('.outline-3', { keyframes: [
        { scale: 1.4, y: -55, duration: 2, ease: 'power2.out' },
        { scale: 1, duration: 0.5, ease: 'power2.in' },
        { y: 0, duration: 0.3, ease: 'power2.in' },
        ], duration: 2.5 }, '<+=0.02')

        .to('.outline-4', { keyframes: [
        { scale: 1.4, y: 55, duration: 2, ease: 'power2.out' },
        { scale: 1, duration: 0.5, ease: 'power2.in' },
        { y: 0, duration: 0.3, ease: 'power2.in' },
        ], duration: 2.5 }, '<') // Uses '<' to snap perfectly to .outline-3's start time

        // --- Original Pair 3 (.outline-5 and .outline-6) ---
        .to('.outline-5', { keyframes: [
        { scale: 1.2, y: -85, duration: 2, ease: 'power2.out' },
        { scale: 1, duration: 0.5, ease: 'power2.in' },
        { y: 0, duration: 0.3, ease: 'power2.in' },
        ], duration: 2.5 }, '<+=0.02')

        .to('.outline-6', { keyframes: [
        { scale: 1.2, y: 85, duration: 2, ease: 'power2.out' },
        { scale: 1, duration: 0.5, ease: 'power2.in' },
        { y: 0, duration: 0.3, ease: 'power2.in' },
        ], duration: 2.5 }, '<') // Uses '<' to snap perfectly to .outline-5's start time
    });

</script>

<div class="intro-third-overlay">
    <div class="third-overlay">
        <div class="text-wrapper">
            <div class="mask">
                <div class="scan-line"></div>
                <div class="scan-line-2"></div>
                <h1 class="first-line">The best products balance art and engineering.</h1>
            </div>
            <div class="mask mask-2">
                <h1 class="second-line">Beautiful interfaces get attention,</h1>
            </div>
            <div class="mask mask-3">
                <h1 class="third-line">Reliable systems build trust,</h1>
            </div>
            <div class="mask mask-last">
                <h1 class="fourth-line-outline outline-5">I build both.</h1>
                <h1 class="fourth-line-outline outline-3">I build both.</h1>
                <h1 class="fourth-line-outline outline-1">I build both.</h1>
                <h1 class="fourth-line">I build both.</h1>
                <h1 class="fourth-line-outline outline-2">I build both.</h1>
                <h1 class="fourth-line-outline outline-4">I build both.</h1>
                <h1 class="fourth-line-outline outline-6">I build both.</h1>
            </div>
        </div>
    </div>


</div>

<style>

    .hide-native-cursor,
    .hide-native-cursor * {
        cursor: none !important;
    }


    .intro-third-overlay{
        height: 75vh;
        width: 100%;
        position: absolute;
        z-index: 1000000;
        border: 1px solid rgba(255, 96, 48, 0.15); /* Soft glowing trim */
        box-shadow:
        /* Layer 1: Dark structural ambient occlusion beneath the box base */
        0px 4px 6px rgba(17, 10, 9, 0.556),
        /* Layer 2: Deeper, wider soft dispersion cast shadow */
        0px 12px 24px rgba(17, 10, 9, 0.471),
        /* Layer 3: Massive, smooth falloff shadow that sinks into the floor */
        0px 24px 48px rgba(11, 5, 4, 0.386),
        /* Layer 4: The Core Back-Bleed (A subtle warm orange back-glow reflection) */
        0px 0px 40px rgba(255, 96, 48, 0.411);
    }

    .third-overlay{
        height: 100%;
        width: 100%;
background: radial-gradient(
    circle at 50% 50%, 
    #ff6030 0%, 
    #7a2e1c 30%,  /* Intermediate rich terracotta bridge */
    #2a1310 65%,  /* Deep burnt ember */
    #110a09 100%  /* Pure premium dark-mode void */
);
        position: relative;
    }

    .text-wrapper{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5%;
    }

    .mask{
        position: absolute;
        font-family: 'Plus Jakarta Sans';
        color: ivory;
        font-size: 2rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    

    .scan-line {
        position: absolute;
        top: 0;

        width: 80%;
        height: 3px;
        background: #ffffff;
        /* Layered glow effect for light emission texture */
            filter: drop-shadow(0 0 8px #ffffff) 
            drop-shadow(0 0 30px rgba(255, 70, 70, 0.8)) 
            drop-shadow(0 0 80px rgba(255, 70, 70, 0.4));
        z-index: 10;
        overflow: visible;
        transform-origin: center center;
    }

    .scan-line-2{
        position: absolute;
        left: 80%;
        top: 0;

        width: 3px;
        height: 100%;
        background: #ffffff;
        /* Layered glow effect for light emission texture */
        box-shadow: 
            0 0 12px rgba(255, 70, 70, 0.8),  /* Intense red/orange inner core glow */
            0 0 30px rgba(255, 70, 70, 0.4),  /* Mid radius dispersion */
            0 0 70px rgba(255, 70, 70, 0.15); /* Wide ambient light spread */
        z-index: 10;

        transform-origin: center center;
    }

    .first-line{
        clip-path: inset(0 0 100% 0);

        width: 50%;
        text-shadow: 
        0px 2px 4px rgba(17, 10, 9, 0.4),
        0px 8px 16px rgba(17, 10, 9, 0.3);
    }

    .second-line{
        clip-path: inset(100% 0 0 0);
        width: 50%;
        text-shadow: 
        0px 2px 4px rgba(17, 10, 9, 0.4),
        0px 8px 16px rgba(17, 10, 9, 0.3);
        height: 100%;
        overflow: visible !important;
    }

    .third-line{
        clip-path: inset(0 100% 0 0);
        width: 100%;
        text-shadow: 
        0px 2px 4px rgba(17, 10, 9, 0.4),
        0px 8px 16px rgba(17, 10, 9, 0.3),;
                overflow: visible !important;
    }


    .mask-last{
        width: 100%;
    }

    .fourth-line{
        position: absolute;
        font-family: 'Plus Jakarta Sans', sans-serif;
        color: ivory;
        z-index: 1;
    }

    .fourth-line-outline{
        position: absolute;
        font-family: 'Plus Jakarta Sans', sans-serif;
        -webkit-text-stroke: 2px #111111;
        color: transparent;
        z-index: 0;
    }

</style>