<script>
    import image1 from '$lib/assets/image-1.png';
    import image2 from '$lib/assets/image-2.png';
    import image3 from '$lib/assets/image-3.png';
    import image4 from '$lib/assets/image-4.png';
    import image5 from '$lib/assets/image-5.png';
    import image6 from '$lib/assets/image-6.png';

    const images = [image1, image2, image3, image4, image5, image6];
    const projectTitle = ["Valentines Website", "Valentines Invitation", "Regional Analysis", "Open iT Chatbot", "Buoy", "TypeRushArena"];
    
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
    import { SplitText } from 'gsap/SplitText';
    import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
    import {MotionPathPlugin} from 'gsap/MotionPathPlugin';
    import Dither from '$lib/components/Dither.svelte';
    import GridScan from '$lib/components/GridScan.svelte';
    import LightPillar from '$lib/components/LightPillar.svelte';
   

    function removeGlobalShadowViewport(){
        gsap.to('.global-shadow-viewport', {
            opacity: 0,
            scrollTrigger: {
                trigger: '.fourth-section-wrapper',
                start: 'top bottom',
                end: 'top+=100 bottom-=20',
                
            }
        })
    }

    function setupSvg() {
        gsap.set('.traceable-path', { drawSVG: '0%' });
        gsap.set('.centered-vector-graphic', {
            transformOrigin: '50% 50%',
            display: 'none'
        });
    }

    function createTimeline() {
        gsap.set('.dither-background', {display: 'none', opacity: 0});
        gsap.set('.vignette-overlay', {display: 'none', opacity: 0});
        return gsap.timeline({
            scrollTrigger: {
                trigger: '.fourth-section-wrapper',
                start: 'top top',
                end: '+=700%',
                scrub: 1,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                markers: false,

                onLeave: () =>
                    gsap.set('.centered-vector-graphic', {
                        display: 'none'
                    }),

                onEnterBack: () =>
                    gsap.set('.centered-vector-graphic', {
                        display: 'block'
                    })
            }
        });
    }

    function addSvgAnimation(tl) {
        gsap.set('.centered-vector-graphic', {display: 'block'});
        tl.to('#Ellipse-1', {
            drawSVG: '100%',
            duration: 2,
            ease: 'none'
        })
        .to(['#Line-1', '#Line-2'], {
            drawSVG: '100%',
            duration: 2,
            ease: 'none',
            stagger: 0.2
        }, '-=0.2')

        .to('#Ellipse-1_2', {
            drawSVG: '100%',
            duration: 2,
            ease: 'none'
        }, '-=1')

        .to(['#Line-1_2', '#Line-2_2'], {
            drawSVG: '100%',
            duration: 2,
            ease: 'none',
            stagger: 0.2
        }, '-=0.2')

        .to('#Ellipse-1_3', {
            drawSVG: '100%',
            duration: 2,
            ease: 'none'
        }, '-=1')

        .to(['#Line-1_3', '#Line-2_3'], {
            drawSVG: '100%',
            duration: 2,
            ease: 'none',
            stagger: 0.2
        }, '-=0.2');

        tl.to('.centered-vector-graphic', {
            scale: 13,
            duration: tl.duration() + 6,
            ease: 'none'
        }, 0)

        .set('.centered-vector-graphic', {
            display: 'none'
        });
    }

    function addQuestionAnimation(tl) {
        const splitQuestion = SplitText.create('.question', {
            type: 'chars'
        });

        tl.from('.question', {
            scale: 0,
            duration: tl.duration() + 6,
            ease: 'none'
        }, 0);

        tl.fromTo(splitQuestion.chars, {
            filter: 'blur(10px)',
            opacity: 0
        }, {
            filter: 'blur(0px)',
            opacity: 1,
            duration: tl.duration(),
            stagger: {
                each: 0.5,
                from: 'random'
            }
        }, 0);
    }

    function addImageAnimation(tl) {
        const images = document.querySelectorAll('.images .image-card');

        tl.to('.question-wrapper', {
            filter: 'blur(10px)',
            duration: 1
        })
        .to('.question-wrapper',{
            opacity: 0,
            duration: 2,
        })
        .to('.dither-background', {display: 'block', opacity: 1, duration: 6, ease: 'power2.inOut'})
        .fromTo(images, {
            x: () => window.innerWidth,
            y: () => window.innerHeight,
            rotate: '5deg'
        }, {
            x: () => -window.innerWidth,
            y: () => -window.innerHeight,
            rotate: '-10deg',
            duration: tl.duration(),
            ease: 'power2.inOut',
            stagger: 4
        }, '-=20');
    }

    function setupImageHover() {
        const images = document.querySelectorAll('.images img');
        const imagesContainer = document.querySelectorAll('.image-card');

        images.forEach((img, i) => {
            imagesContainer[i].addEventListener('mouseenter', () =>
                gsap.to(img, {
                    y: -0,
                    scale: 1,
                    filter: 'blur(1px)',
                    rotateX: '70deg',
                    duration: 0.5,
                    ease: 'power1.out'
                })
            );

            imagesContainer[i].addEventListener('mouseleave', () =>
                gsap.to(img, {
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    rotateX: '0deg',
                    duration: 0.5,
                    ease: 'power1.in'
                })
            );
        });
    }

    function setupGlowingDot() {
       gsap.to('.border', {
        "--rotation": "360deg",
        duration: 4,
        ease: "none", // This is the key for constant speed
        repeat: -1    // -1 tells GSAP to repeat infinitely
       })
    }

    function setupOverlay(){
        gsap.to('.vignette-overlay', {
            opacity: 1,
            duration: 1,
            display: 'block',
            scrollTrigger: {
                trigger: '.question-wrapper',
                start: 'top bottom',
                end: 'top+=20 bottom-=10',
                toggleActions: 'play none none reverse',
                markers: true
            }
           
        })
    }

    onMount(() => {
         gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, MotionPathPlugin);
        removeGlobalShadowViewport();
        setupSvg();

        const tl = createTimeline();

        addSvgAnimation(tl);
        addQuestionAnimation(tl);
        addImageAnimation(tl);
        setupImageHover();
        setupGlowingDot();
        setupOverlay();

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    });
</script>

<div class="fourth-section-wrapper">
    
    <svg viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg" class="centered-vector-graphic">
        <defs>
                <filter id="neon-glow" filterUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080">
                    <feGaussianBlur stdDeviation="2 " result="coloredBlur"/>
                    <feGaussianBlur stdDeviation="2" result="intenseBlur"/>
                    
                    <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="intenseBlur"/>
                        <feMergeNode in="SourceGraphic"/> 
                    </feMerge>
                </filter>
        </defs>


        <g id="Plugin-file-cover-1">
            <g id="Group-1">
                <circle class="traceable-path" id="Ellipse-1" cx="960" cy="540" r="130.5" stroke="white" stroke-width="5"/>
                <line class="traceable-path" id="Line-1" x1="959.949" y1="409.5" x2="1919.95" y2="409.5" stroke="white" stroke-width="5"/>
                <line class="traceable-path" id="Line-2" y1="670.5" x1="960" y2="670.5" stroke="white" stroke-width="5"/>
            </g>

            <g id="Group-2">
                <circle class="traceable-path" id="Ellipse-1_2" cx="959.995" cy="540.441" r="107.941" stroke="white" stroke-width="5"/>
                <line class="traceable-path" id="Line-1_2" x1="959.953" y1="432.5" x2="1750.76" y2="432.5" stroke="white" stroke-width="5"/>
                <line class="traceable-path" id="Line-2_2" x2="169.191" y1="647.5" x1="959.996" y2="647.5" stroke="white" stroke-width="5"/>
            </g>

            <g id="Group-3">
                <circle class="traceable-path" id="Ellipse-1_3" cx="959.992" cy="540.82" r="88.5057" stroke="white" stroke-width="5"/>
                <line class="traceable-path" id="Line-1_3" x1="959.957" y1="452.315" x2="1605" y2="452.315" stroke="white" stroke-width="5"/>
                <line class="traceable-path" id="Line-2_3" x2="314.949" y1="627.685" x1="959.992" y2="627.685" stroke="white" stroke-width="5"/>
            </g>
        </g>
    </svg>

    <div class="question-wrapper">
        <h1 class="question">Want to know more about me and my works?</h1>
    </div>

    <div class="dither-background">
          <LightPillar topColor="#ff8a3d" bottomColor="#FFB089" quality='low'/>
    </div>

    <div class="images">
    {#each images as image, i}
        <div class="image-card">
                <div class="border"></div>
                <img src={image} alt="" />
                    
                <div class="text">
                    
                        <h1>{projectTitle[i]}</h1>

                </div>
        </div>
    {/each}
    </div>

    <div class="vignette-overlay"></div>
</div>


<style>

    .dither-background{
        height: 100vh;
        width: 100%;
        position: absolute;
        filter: blur(0px);
        z-index: 10000;
        inset: 0;
        pointer-events: none;
        box-shadow: inset 0 0 100px 50px black;
    }

    

    .vignette-overlay{
        content: "";
        position: absolute;
        height: 100vh;
        width: 100%;
        display: block;
        z-index: 999999;
        pointer-events: none;
        box-shadow: inset 0 0 100px 50px black;
    }

    .dither-background :global(canvas){
        pointer-events: auto !important;
    }

    .fourth-section-wrapper {
        height: 100vh;
        width: 100%;
        background: #111111;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        box-sizing: border-box;
    }

    .centered-vector-graphic{
        position: absolute;
    }
    .traceable-path {
        filter: url(#neon-glow);
        stroke-width: 5px;
        stroke-linecap: round;
        stroke-linejoin: round;
        will-change: filter, transform;
    }

    /* 💡 Assign different neon colors to your layer loops */
    #Group-1 .traceable-path { stroke: #ff3e00; } /* Outer: Vibrant Coral Neon */
    #Group-2 .traceable-path { stroke: #ff8a4c; } /* Middle: Electric Orange */
    #Group-3 .traceable-path { stroke: #ffb089; } /* Inner: Warm Peach Neon */

    .question-wrapper{
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4vw 16vw;
    }

    .question{
        color: #ff8a4c;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 4rem;
        text-align: center;
    }

    .images{
        position: absolute;
        height: 100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 99999;
        pointer-events: none;
    }

    .images .image-card{
        width: 40%;
        position: absolute;
        z-index: 999;
        pointer-events: auto;
        perspective: 1000px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid rgba(0,0,0,0.5);
        border-radius: 20px;
        box-shadow: 0 0 100px 10px black;
    }

    .image-card img{
        width: 100%;
        display: block;
        position: relative;
        z-index: 2;
        border-radius: 20px;
        transform-style: preserve-3d;
        transform-origin: top center;
    }

    .image-card .text{
        background: rgb(18, 18, 18);
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        border-radius: 20px;
    }

    .text h1{
        font-family: 'Horizon';
        color: ivory;
    }

    .border{
        content: '';
        --rotation: 0deg;
        position: absolute;
        height: 102%;
        width: 101%;
        border-radius: 20px;
        background: conic-gradient(
            from var(--rotation), 
            #050000, /* Pitch Black / Void */
            #660000, /* Dark Crimson */
            #ff2200, /* Aggressive Neon Orange */
            #1a0000, /* Fading Charcoal */
            #050000  /* Close loop */
        );
        opacity: 0.5;
        will-change: transform; /* Important for performance */
        border: 1px solid rgba(0,0,0,0.7);
    }


</style>