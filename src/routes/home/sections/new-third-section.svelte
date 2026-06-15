<script>
    import { onMount } from 'svelte';
    import { gsap } from "gsap";
    import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import { SplitText } from 'gsap/SplitText';
        import Sphere from '$lib/assets/beautiful_sphere.glb?url';
    onMount(()=>{

        gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger, SplitText);
        const orange = document.querySelectorAll('#Active_Group circle');
        const glow = document.querySelectorAll('#Glow_Group circle');
        const ellipses = ["#Ellipse_6", "#Ellipse_5", "#Ellipse_4", "#Ellipse_3", ];

        const descriptions = document.querySelectorAll('.node-desc');

        descriptions.forEach((desc) => {
            const splitDesc = SplitText.create(desc, { type: 'words', mask: 'words', wordsClass: 'split-word'});
        });

        gsap.set([orange, glow], {rotation: '-90deg', transformOrigin: "50% 50%"});
        gsap.set([".node-title", ".split-word"], { opacity: 0});

        gsap.set(["#Ring_1", "#Glow_1"], { drawSVG: "0% 0%" });
        gsap.set(["#Ring_2", "#Glow_2"], { drawSVG: "20% 20%" }); // Starts exactly at 2 o'clock/20%
        gsap.set(["#Ring_3", "#Glow_3"], { drawSVG: "40% 40%" });
        gsap.set(["#Ring_4", "#Glow_4"], { drawSVG: "60% 60%" });
        gsap.set(["#Ring_5", "#Glow_5"], { drawSVG: "80% 80%" });

        gsap.set(ellipses, { opacity: 0, 
        scale: 0, 
        transformOrigin: "50% 50%"});
        
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '.third-section-new',
                start: 'top top',
                end: '+=1000%',
                scrub: 1,
                pin: true,
                pinSpacing: true,
                anticipatePin: true,
                markers: false,
            }
        });

       

    // Stage 1: Initial Reveal
    tl.to('.node-1 .node-title', { opacity: 1 }, 0)
    .fromTo('.node-1 .split-word', { y: 100 }, { y: 0, opacity: 1, stagger: 0.02 }, 0)
    .to(["#Ring_1", "#Glow_1"], { drawSVG: "0% 20%" }, 0)
    .to(ellipses[0], { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' })
    .to('.node-2 .node-title', { opacity: 1 })
    .fromTo('.node-2 .split-word', { y: 100 }, { y: 0, opacity: 1, stagger: 0.02 })

    // Segment 2: Transition to Node 2 & 3
    .to(["#Ring_2", "#Glow_2"], { drawSVG: "20% 40%" })
    .to(ellipses[1], { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' })
    .to('.node-3 .node-title', { opacity: 1 })
    .fromTo('.node-3 .split-word', { y: 100 }, { y: 0, opacity: 1, stagger: 0.02 })

    // Segment 3: Transition to Node 3 & 4
    .to(["#Ring_3", "#Glow_3"], { drawSVG: "40% 60%" })
    // 🚀 Keep the breath moving slowly across the entire layout span
    .to(ellipses[2], { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' })
    .to('.node-4 .node-title', { opacity: 1 })
    .fromTo('.node-4 .split-word', { y: 100 }, { y: 0, opacity: 1, stagger: 0.02 })

    // Segment 4: Transition to Node 4 & 5
    .to(["#Ring_4", "#Glow_4"], { drawSVG: "60% 80%" })
    .to(ellipses[3], { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' })
    .to('.node-5 .node-title', { opacity: 1 })
    .fromTo('.node-5 .split-word', { y: 100 }, { y: 0, opacity: 1, stagger: 0.02 })

    // Segment 5: Final Arcs
    .to(["#Ring_5", "#Glow_5"], { drawSVG: "80% 100%" })
    .to(ellipses[4], { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)' });

    gsap.fromTo('.model-wrapper', { scale: 1.0 }, { scale: 1.5, ease: 'power1.inOut', duration: 3, repeat: -1, yoyo: true, }, '<');

    })


</script>

<div class="third-section-new">
    <div class="center-core-3d">
        <div class="model-wrapper">
            <model-viewer 
            src={Sphere}
            alt="Interactive 3D Matrix Core"
            auto-rotate
            field-of-view="5deg">
            </model-viewer>
        </div>
    </div>
    <div class="svg-container">
        <svg viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Frame_1">
                <circle id="Main_Ring" cx="960" cy="540" r="499" stroke="white" stroke-opacity="0.12" stroke-width="2"/>
                
                <g id="Glow_Group">
                    <circle id="Glow_1" cx="960" cy="540" r="499" stroke="#FFBC95" stroke-width="20" stroke-opacity="0.25" />
                    <circle id="Glow_2" cx="960" cy="540" r="499" stroke="#FFBC95" stroke-width="20" stroke-opacity="0.25" />
                    <circle id="Glow_3" cx="960" cy="540" r="499" stroke="#FFBC95" stroke-width="20" stroke-opacity="0.25" />
                    <circle id="Glow_4" cx="960" cy="540" r="499" stroke="#FFBC95" stroke-width="20" stroke-opacity="0.25" />
                    <circle id="Glow_5" cx="960" cy="540" r="499" stroke="#FFBC95" stroke-width="20" stroke-opacity="0.25" />
                </g>

                <g id="Active_Group">
                    <circle id="Ring_1" cx="960" cy="540" r="499" stroke="#FFBC95" stroke-width="2"/>
                    <circle id="Ring_2" cx="960" cy="540" r="499" stroke="#FFBC95" stroke-width="2"/>
                    <circle id="Ring_3" cx="960" cy="540" r="499" stroke="#FFBC95" stroke-width="2"/>
                    <circle id="Ring_4" cx="960" cy="540" r="499" stroke="#FFBC95" stroke-width="2"/>
                    <circle id="Ring_5" cx="960" cy="540" r="499" stroke="#FFBC95" stroke-width="2"/>
                </g>
                
                <circle id="Ellipse_2" cx="960" cy="40" r="20" fill="#FFBC95"/>
                <circle id="Ellipse_3" cx="484.472" cy="385.492" r="20" transform="rotate(-72 484.472 385.492)" fill="#FFBC95"/>
                <circle id="Ellipse_4" cx="666.107" cy="944.509" r="20" transform="rotate(-144 666.107 944.509)" fill="#FFBC95"/>
                <circle id="Ellipse_5" cx="1253.89" cy="944.509" r="20" transform="rotate(144 1253.89 944.509)" fill="#FFBC95"/>
                <circle id="Ellipse_6" cx="1435.53" cy="385.491" r="20" transform="rotate(72 1435.53 385.491)" fill="#FFBC95"/>
                
            <foreignObject x="1195" y="25" width="960" height="210" style="overflow: visible !important; transform: translate(-50%, -50%);transform-origin: center center; transform-box: fill-box;">
                    <div class="svg-node-wrapper top-info node-1" xmlns="http://www.w3.org/1999/xhtml">
                        <h1 class="node-title-new node-title">01 // Immersive Motion Design</h1>
                        <div class="node-desc-new max-w-large node-desc">
                            <p>Crafting fluid, high-fidelity web experiences using advanced timeline sequencing, scroll-driven triggers, and responsive canvas animations that breathe life into static interfaces.</p>
                        </div>
                    </div>
                </foreignObject>

                <foreignObject x="1500" y="360" width="600" height="350" style="overflow: visible;">
                    <div class="svg-node-wrapper align-left node-2" xmlns="http://www.w3.org/1999/xhtml">
                        <h1 class="node-title-new node-title">02 // Full-Stack Development</h1>
                        <div class="node-desc-new node-desc">
                            <p>Architecting secure, production-ready web applications with a focus on robust state management, high-throughput server backends, and seamless API infrastructure.</p>
                        </div>
                    </div>
                </foreignObject>

                <foreignObject x="1315" y="910" width="600" height="350" style="overflow: visible;">
                    <div class="svg-node-wrapper align-left node-3" xmlns="http://www.w3.org/1999/xhtml">
                        <h1 class="node-title-new node-title">03 // Intelligent Edge Systems</h1>
                        <div class="node-desc-new node-desc">
                            <p>Building localized hardware solutions and integrating compact computer vision models optimized for real-time object detection and direct signal processing.</p>
                        </div>
                    </div>
                </foreignObject>

                <foreignObject x="45" y="910" width="560" height="350" style="overflow: visible;">
                    <div class="svg-node-wrapper align-right node-4" xmlns="http://www.w3.org/1999/xhtml">
                        <h1 class="node-title-new node-title">04 // Graphic & Layout Artistry</h1>
                        <div class="node-desc-new node-desc">
                            <p>Designing high-impact visual media and promotional materials built on a strict understanding of typographic hierarchy, layout composition, and cinematic coloring.</p>
                        </div>
                    </div>
                </foreignObject>

                <foreignObject x="-170" y="360" width="600" height="350" style="overflow: visible;">
                    <div class="svg-node-wrapper align-right node-5" xmlns="http://www.w3.org/1999/xhtml">
                        <h1 class="node-title-new node-title">05 // Technical Systems Leadership</h1>
                        <div class="node-desc-new node-desc">
                            <p>Transforming complex project specifications into highly optimized, deployment-ready software architectures while maintaining structural quality and performance standards.</p>
                        </div>
                    </div>
                </foreignObject>

            </g>
        </svg>
    </div>

    <div class="overlay-transition"></div>
</div>

<style>

.center-core-3d{
    height: 100%;
    width: 100%;
    position:absolute;
    display: flex;
    justify-content: center;
    align-items: center;
}

.model-wrapper{
    width: 60%;
    height: 100%;   
}
.center-core-3d model-viewer{
    height: 100%;
    width: 100%;

}

model-viewer::part(default-progress-bar) {
    display: none !important;
    opacity: 0 !important;
    visibility: hidden !important;
}

.overlay-transition{
    content: '';
    position: absolute;
    display: block;
    bottom: 0;
    height: 100vh;
    width: 100%;
    background: linear-gradient(to bottom, #f1000039 0%, #1111115c 100%);
    z-index: 100000;
}
    .third-section-new{
        height: 100vh;
        width: 100%;
                        background-image: 
        linear-gradient(rgba(255, 96, 48, 0.1) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 96, 48, 0.1) 1px, transparent 1px);
            background-size: 60px 60px;
    background-position: center center;
        z-index: 100;
        position: relative;

    }

.svg-container {
    width: 100%;
    height: 100%;
    max-width: 1920px;
    max-height: 1080px;
    
    /* Forces the inner SVG to maintain its layout structure */
    display: flex;
    align-items: center;
    justify-content: center;
}

.svg-container svg {
    width: 80%;
    height: 80%;
    /* This scales the SVG perfectly like a CSS background-size: contain element */
    object-fit: contain; 
    overflow: visible !important;
}

#Glow_Group circle {
    /* Creates the smooth neon dispersion */
    filter: blur(8px); 
    /* Ensures the blur renders smoothly across browsers */
    will-change: filter; 
}
/* --- CLEAN STRUCTURAL FONTS INSIDE THE SVG SYSTEM --- */
    .svg-node-wrapper {
        display: flex;
        flex-direction: column;
        background: transparent;
        font-family: 'Plus Jakarta Sans', sans-serif;
        pointer-events: auto; /* Restores hover/clicks inside the SVG window */
    }

    /* Core Directional Stacking Systems */
    .top-info {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 3rem;
    }

    .align-left {
        align-items: flex-start;
        text-align: left;
    }

    .align-right {
        align-items: flex-end;
        text-align: right;
    }

    /* Typography Scaled Perfectly via SVG Canvas Viewbox Matrix */
    .node-title-new {
        color: #ffffff;
        font-size: 38px; 
        font-weight: 700;
        margin: 0 0 12px 0;
        white-space: nowrap;
        letter-spacing: -0.02em;
    }

    .node-desc-new {
        width: 100%;
        max-width: 440px; /* Constrains column text line widths safely */
    }

    /* Specific adjustment override for Top node width balance */
    .node-desc-new.max-w-large {
        max-width: 700px;
    }

    .node-desc-new p {
        color: #a3a3a3;
        font-size: 20px; 
        line-height: 1.6;
        margin: 0;
    }
</style>