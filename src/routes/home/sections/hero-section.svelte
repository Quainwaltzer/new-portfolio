<script>
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    import DrawSVGPlugin from 'gsap/DrawSVGPlugin';
    import heroImage from '$lib/assets/hero-image.jpeg';
    onMount(() => {
         gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);
            const names = document.querySelectorAll('.name-signature h1');
    const namesArray = Array.from(names);
        gsap.set('.pathing', {drawSVG: '0%'});

        gsap.fromTo('.hero-image-wrapper img', {
            scale: 1.2,
            opacity: 0.5,
            y: '30%',
        }, {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.inOut',
            y: '0%',
        });

        gsap.from(namesArray, {y: 50, opacity: 0, delay:0.5,  duration: 1, stagger: 0.75});

        gsap.to('.pathing', {drawSVG: '100%', delay: 0.5, duration: 3, ease: 'power2.inOut', 
                onStart: () => {
                    document.body.classList.add('no-scroll');
                },
                
                onComplete: () => {
                    document.body.classList.remove('no-scroll');
                }});
    });
</script>

<div class="overall-wrapper">
    <div class="text-wrapper">

        <div class="hero-text-wrapper">
            <h4>Full Stack Dev <br> & UI/UX Designer</h4> 
        </div>

        <div class="placeholder-whitespace">

        </div>

        <div class="hero-name-wrapper">
            <div class="name-signature">
                <h1>Rovie</h1>

                <svg viewBox="0 0 610 384" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Group 1">
                        <path class="pathing" id="Vector 1" d="M5.00037 378.635C13.7124 372.299 22.4244 365.963 30.7404 359.927C39.0564 353.891 46.7124 348.347 78.2444 312.491C109.776 276.635 164.952 210.635 195.488 170.695C226.024 130.755 230.248 118.875 232.424 111.171C234.6 103.467 234.6 100.299 233.808 97.7434C230.489 87.0311 214.632 85.8435 202.044 84.5115C192.661 83.5186 177.048 83.7074 160.972 86.2114C144.896 88.7154 128.792 93.9954 118.912 97.9034C105.445 103.23 99.9604 109.803 95.9604 116.187C94.1065 119.146 94.6004 122.571 96.5804 125.919C101.169 133.678 108.976 137.555 120.76 141.139C130.018 143.955 146.536 146.571 226.512 147.807C306.488 149.043 449.576 148.251 524.608 147.579C599.64 146.907 602.28 146.379 605 145.835" stroke="#FFBC95" stroke-width="10" stroke-linecap="round"/>
                        <path class="pathing" id="Vector 2" d="M296.2 121.035C309.4 109.947 323.064 100.539 333.332 95.7314C336.575 94.2129 336.472 96.2035 336.072 97.8115C335.672 99.4195 335.144 101.003 335.532 101.687C340.081 109.706 364.648 92.2514 374.576 92.2274C377.606 92.2201 377.792 97.0274 379.52 98.3594C381.222 99.6709 388.936 99.6994 403.816 99.7035C412.364 99.7058 422.92 98.6515 431.132 97.5835C439.344 96.5155 444.888 95.1955 453.42 92.1395C461.952 89.0835 473.304 84.3314 486.808 75.8114C500.312 67.2914 515.624 55.1474 525.492 46.6474C539.866 34.2662 548.416 21.6434 556.148 9.91544C558.965 5.64383 559.128 4.52344 555.7 5.16744C552.272 5.81144 545.144 8.18744 538.964 10.9954C532.784 13.8034 527.768 16.9715 512.38 32.4635C496.992 47.9555 471.384 75.6755 433.376 125.595C395.368 175.515 345.736 246.795 315.944 288.135C286.152 329.475 277.704 338.715 267.4 350.635" stroke="#FFBC95" stroke-width="10" stroke-linecap="round"/>
                    </g>
                </svg>

                <h1>Endigado</h1>
            </div>

            <h4>Computer Engineering Graduate</h4>
        </div>
    </div>

    <div class="hero-image-wrapper">
        <img src={heroImage} alt="">
        <div class="lens-blur-overlay"></div>
    </div>
    
    <div class="divider"></div>
</div>
<style>
    .divider{
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30vh;
        background: linear-gradient(to bottom, transparent 0%, #251716 100%);
        z-index: 99999;
    }
    .overall-wrapper {
        width: 100%;
        height: 100vh;
        position: relative;

    }


    .text-wrapper{
        position: absolute;
        display: flex;
        flex-flow: column;
        height: 100%;
        width: 100%;
        justify-content: space-between;
        align-items: stretch;
        font-family: 'Plus Jakarta Sans', sans-serif;
        padding: 4vw;
        color: #ffbc95;
    }

    .hero-text-wrapper {
        align-self: flex-start;
        flex: 1;    
        display: flex;
        height: 100%;
        width: 100%;
        align-items: flex-end;
        font-size: 2vw;
    }

    .placeholder-whitespace {
        flex: 1;
    }

    .hero-name-wrapper {
        justify-self: flex-end;
        text-align: center;
        flex: 1;
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: flex-end;
        align-items: flex-end;
        flex-flow: column;
    }

    .name-signature{
        display: flex;
    }

    svg{
        will-change: transform;
    }

    .hero-name-wrapper .name-signature h1 {
        font-size: 7rem;
    }

    .hero-name-wrapper h4 {
        font-size: 1.5vw;
    }

    .hero-image-wrapper {
        position: relative;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        z-index: -1;
    }

    .hero-image-wrapper::after {
        content: '';
        position: absolute;
        inset: 0;
        background-color: #ffbc95a0;
        mix-blend-mode: multiply; 
        pointer-events: none;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        
    }

    .lens-blur-overlay {
        position: absolute;
        inset: 0;
        pointer-events: none;
        /* Blurs the image details sitting underneath it */
        backdrop-filter: blur(5px); 
        
        /* Slices a hole in the middle so the underlying clean image shows through crisp */
        mask-image: radial-gradient(circle at 50% 50%, transparent 30%, black 80%);
        -webkit-mask-image: radial-gradient(circle at 50% 50%, transparent 30%, black 80%);
    }
</style>