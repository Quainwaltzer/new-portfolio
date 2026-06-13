<script>
    import gsap from "gsap";
    import { onMount } from "svelte";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import ScrambleTextPlugin from "gsap/ScrambleTextPlugin";
    import Icon from '@iconify/svelte';

    function scrollFaster(){
        gsap.to('.fifth-section-wrapper', {
            y: '-100vh',
            scrollTrigger: {
                trigger: '.fifth-section-wrapper',
                start: 'top-=70% bottom+=200',
                end: 'bottom+=200 bottom+=200',
                scrub: 4,
                markers: false
            }
        });
    }

    function overlayChange(){
        const emailWrapper = document.querySelector('.email-and-more');

        emailWrapper.addEventListener('mouseenter', () =>{
            gsap.to('.overlay-wrapper', {
                clipPath: 'circle(150% at 50% 100%)',
                duration: 2,
                ease: 'power2.out'
            })
        });

        emailWrapper.addEventListener('mouseleave', () =>{
            gsap.to('.overlay-wrapper', {
                clipPath: 'circle(0% at 50% 100%)',
                duration: 0.5,
                ease: 'power2.in'
            })
        });
    }

    function followCursor(){
        const element = document.querySelector('.follower');
        const emailWrapper = document.querySelector('.email-and-more');
        const button = document.querySelector('.overlay-wrapper button');

        gsap.set(element, {xPercent: 20, yPercent: -50, opacity: 0});
        let xSetter = gsap.quickTo(element, "x", {duration: 0.6, ease: "power3"});
        let ySetter = gsap.quickTo(element, "y", {duration: 0.6, ease: "power3"});

        function onMouseMove(e){
            xSetter(e.clientX);
            ySetter(e.clientY);
        }

        emailWrapper.addEventListener("mouseenter", (e) => {
            gsap.to(element, {opacity: 1, delay: 0.1, duration: 0.3, overwrite: "auto"});
            window.addEventListener("mousemove", onMouseMove);
        })

        emailWrapper.addEventListener("mouseleave", () => {
            gsap.to(element, { opacity: 0, duration: 0.3, overwrite: "auto"});
            window.removeEventListener("mousemove", onMouseMove);
        })

        button.addEventListener("mouseenter", (e) => {
            gsap.to(element, {opacity: 0, delay: 0.1, duration: 0.3, overwrite: "auto"});
            window.removeEventListener("mousemove", onMouseMove);
        })

        button.addEventListener("mouseleave", () => {
            gsap.to(element, { opacity: 1, duration: 0.3, overwrite: "auto"});
            window.addEventListener("mousemove", onMouseMove);
        })

    }

    function copyToClipboard(){
            const emailWrapper = document.querySelector('.email-and-more');
            const element = document.querySelector('.follower');
            if (!emailWrapper) return;

            emailWrapper.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText("endigadorovie26@gmail.com");
                    gsap.to(element, {
                        duration: 1, 
                        scrambleText: {
                            text: "Copied to clipboard!",
                            chars: '></+_=@#$%^&',
                            revealDelay: 0.5, 
                            speed: 0.3, 
                        }
                    });

                    gsap.to(element, {
                        delay: 2,
                        duration: 1, 
                        scrambleText: {
                            text: "Click me to copy!",
                            chars: '></+_=@#$%^&',
                            revealDelay: 0.5, 
                            speed: 0.3, 
                        }
                    });

                } catch (err) {
                    console.error(err);
                }
            }); 
    }

    onMount(()=>{
        gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);
        scrollFaster();
        followCursor();
        copyToClipboard();
    });
</script>

<div class="fifth-section-wrapper">
    <div class="secondary-wrapper">
        <div class="tagline-wrapper">
            <h1>Forging digital products with absolute depth</h1>
            <h6>from cinema-grade web interfaces to high-performance systems.</h6>
        </div>
       
        <div class="email-and-more">
            <div class="main-wrapper">
                <div class="icon-wrapper">
                    <Icon icon="weui:arrow-filled" width="100%" height="100%"/>
                </div>

                <h1>Let's Connect</h1>
            </div>

            <div class="overlay-wrapper">
                <h1>endigadorovie26@gmail.com</h1>
                <button>Or contact me using other methods by pressing here :D</button>
            </div>


        </div>

    </div>
</div>



<style>
    .fifth-section-wrapper{
        position: absolute;
        height: 125vh;
        width: 100%;
        background: #ffbc95;
        padding: 5%;
        z-index: 99999;
    }

    .secondary-wrapper{
        border-radius: 100px;
        border: 2px solid black;
        height: 100%;
        width: 100%;
        color: white;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
    }

    .tagline-wrapper{
        height: 80%;
        width: 100%;
        padding: 5%;
    }

    .tagline-wrapper h1{
        font-family: 'Horizon';
        font-size: 3rem;
        width: 50%;
    }

    .tagline-wrapper h6{
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 1.25rem;
    }

    .email-and-more{
        height: 20%;
        width: 100%;
        border-top: 2px solid black;
        padding: 2% 5%;
        position: relative;
    }

    .main-wrapper{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .icon-wrapper{
        height: 100%;
        width: auto;
        flex-shrink: 0;
        box-sizing: content-box !important;
    }

    .main-wrapper h1{
        font-family: 'Plus Jakarta Sans', sans-serif;
    }

    .overlay-wrapper{
        background: rgb(33, 33, 33);
        position: absolute;
        inset: 0;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        border-radius: 0 0 100px 100px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2% 5%;
        font-family: 'Plus Jakarta Sans', sans-serif;
        clip-path: circle(0% at 50% 100%);
        transition: clip-path 2s cubic-bezier(0.37, 0.24, 0.04, 0.99);
    }

    .email-and-more:hover .overlay-wrapper{
        clip-path: circle(150% at 50% 100%);
    }

    .overlay-wrapper button{
        border-radius: 20px;
        background: transparent;
        border: none;
        color: white;
        font-family: 'Plus Jakarta Sans', sans-serif;
        line-height: 2;
        padding: 1rem;
        box-shadow:         /* 1. The Deep Top/Left Shadow (Creates the carved cavity) */
        inset 4px 4px 8px rgba(0, 0, 0, 0.7),
        
        /* 2. The Subtle Bottom/Right Reflection (Highlights the inner bottom lip) */
        inset -2px -2px 6px rgba(255, 255, 255, 0.04);
        transform: scale(1);
        transform-origin: center;
        
        /* 🟢 Smooth transition applied to the scale transformation matrix layer */
        transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .overlay-wrapper button:active{
        transform: scale(0.9);
    }



</style>