<script>
    import { untrack } from 'svelte';
    import { goto } from '$app/navigation';
    import image1 from '$lib/assets/image-1.png';
    import image2 from '$lib/assets/image-2.png';
    import image3 from '$lib/assets/image-3.png';
    import image4 from '$lib/assets/image-4.png';
    import image5 from '$lib/assets/image-5.png';
    import image6 from '$lib/assets/image-6.png';
    import Icon from '@iconify/svelte';
    const images = [image1, image2, image3, image4, image5, image6];
    const projectTitle = ["Valentines Website", "Valentines Invitation", "Regional Analysis", "Open iT Chatbot", "Buoy", "TypeRushArena"];
    const projects = [
        {
        title: projectTitle[0],
        image: images[0],
        technologies: ['logos:html-5', 'logos:css-3', 'logos:javascript', 'simple-icons:gsap', 'logos:greensock']
        },
        {
        title: projectTitle[1],
        image: images[1],
        technologies: ['logos:html-5', 'logos:css-3', 'logos:javascript', 'simple-icons:gsap', 'logos:greensock']
        },
        {
        title: projectTitle[2],
        image: images[2],
        technologies: ['logos:python', 'logos:pandas', 'logos:numpy', 'logos:matplotlib-icon', 'logos:seaborn']
        },
        {
        title: projectTitle[3],
        image: images[3],
        technologies: ['logos:c-sharp', 'logos:dotnet', 'logos:sass', 'devicon:blazor', 'logos:javascript', 'logos:python']
        },
        {
        title: projectTitle[4],
        image: images[4],
        technologies: ['logos:dart', 'logos:flutter', 'logos:firebase']
        },
        {
        title: projectTitle[5],
        image: images[5],
        technologies: ['logos:android-icon', 'devicon:androidstudio', 'logos:java']
        },
    ];

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

    function setPin(){
        ScrollTrigger.create({
            trigger: '.fourth-section-wrapper',
            start: 'top top',
            end: '+=600%',
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
        }
        )
    }

    function createTimeline() {
        gsap.set('.dither-background', {display: 'none', opacity: 0});
        gsap.set('.vignette-overlay', {display: 'none', opacity: 0});
        return gsap.timeline({
            scrollTrigger: {
                trigger: '.fourth-section-wrapper',
                start: 'center bottom',
                end: '+=600%',
                scrub: 1,
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
            duration: 12,
            ease: 'power2.inOut',
            stagger: { amount: 5 }
        }, '-=6');
    }

    function setupImageHover() {
        const images = document.querySelectorAll('.images img');
        const imagesContainer = document.querySelectorAll('.image-card');

        images.forEach((img, i) => {
            imagesContainer[i].addEventListener('mouseenter', () => {
                gsap.to(img, {
                    y: -0,
                    scale: 1,
                    filter: 'blur(1px)',
                    rotateX: '75deg',
                    duration: 0.5,
                    ease: 'power1.out',
                    overwrite: 'auto',
                });

                gsap.set(img, {pointerEvents: 'none'});
            });

            imagesContainer[i].addEventListener('mouseleave', () => {
                gsap.set(img, {pointerEvents: 'auto'});
                gsap.to(img, {
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                    rotateX: '0deg',
                    delay: 0.4,
                    duration: 0.5,
                    ease: 'power1.in',
                    overwrite: 'auto',
                });
            });
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
                markers: false
            }
           
        })
    }

    function fadeOut(targetPath){

        gsap.to('#smooth-wrapper', {opacity: 0, filter: 'blur(10px)', duration: 1,
            ease: 'power2.in',onComplete: () => { goto(targetPath); }})
    }

    onMount(() => {
         gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, MotionPathPlugin);
        removeGlobalShadowViewport();
        setupSvg();
        setPin();
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
          <LightPillar topColor="#ff8a3d" bottomColor="#FFB089" quality='low' rotationSpeed={1} noiseIntensity={0}/>
    </div>

    <div class="images">
    {#each projects as project}
        <div class="image-card">
            <img src={project.image} alt="" />
            <div class="border"></div>
            <div class="text">
                <h1>{project.title}</h1>

                <div class="technologies">
                    <h6>Built With:</h6>
                    <div class="stack-list">
                          {#each project.technologies as icon}
                            <Icon {icon} width="32" height="32" class="iconify"/>
                        {/each}
                    </div>
                    <button onclick={fadeOut('/projects')}>View Projects</button>
                </div>
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
        overflow: hidden;
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
        transform: scaleZ(2);
        transform-origin: top center;
    }

    .image-card .text{
        background: rgba(18, 18, 18, 0.014);
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        border-radius: 20px;
        background-image: url(data:image/png;base64,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);

    }

    .text h1{
        font-family: 'Horizon';
        color: ivory;
        margin-top: 80px;
    }

    .technologies {
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 10px;
        color: ivory;
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .technologies h6{
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 10px;
    }

    .stack-list{
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        margin-bottom: 20px;
    }

    @property --fontResize {
        syntax: '*';
        inherits: false;
        initial-value: 0.8rem;
    }

    .technologies button {
        padding: 16px;
        border-radius: 50px;
        line-height: 1rem;
        width: 8rem;
        height: 3rem;
        font-size: var(--fontResize);
        margin-top: 5px;
        color: white;
        font-family: 'Plus Jakarta Sans', sans-serif;
        border: none;
        box-shadow: 
        /* 1. The Deep Top/Left Shadow (Creates the carved cavity) */
        inset 4px 4px 8px rgba(0, 0, 0, 0.7),
        
        /* 2. The Subtle Bottom/Right Reflection (Highlights the inner bottom lip) */
        inset -2px -2px 6px rgba(255, 255, 255, 0.04);
        background: transparent;
        transition: 
        --fontResize 0.3s cubic-bezier(0.25, 1, 0.5, 1),
        font-size 0.3s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .technologies button:hover{
        --fontResize: 0.7rem;
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
        opacity: 1;
        will-change: transform; /* Important for performance */
        border: 1px solid rgba(0,0,0,0.7);
    }


</style>