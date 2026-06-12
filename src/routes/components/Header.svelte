<script>
    import Fa from 'svelte-fa'; 
    import { faUser, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
    import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { SplitText } from 'gsap/SplitText';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    gsap.registerPlugin(SplitText, ScrollTrigger);

    function animateHover(e) {
        const localSplit = new SplitText(e.currentTarget, { type: 'chars' });

       const tl = gsap.timeline({
            onComplete: () => localSplit.revert()
        });

        tl.to(localSplit.chars, {
            y: '-30%',
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.08
        })
        .to(localSplit.chars, {
            y: '0%',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.in',
            stagger: 0.08
        }, 0.15);

        gsap.to(e.currentTarget, {
            scale: 1.05,
            backgroundColor: '#ffbc95',
            color: '#1a1a1a',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
        });

        const icon = e.currentTarget.querySelector('svg path');
        if (icon) {
            gsap.to(icon, { fill: '#1a1a1a', color: '#1a1a1a', duration: 0.3 });
        }

    }

    function animateHoverOut(e) {
        gsap.to(e.currentTarget, {
            scale: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.152)',
            color: '#ffbc95',
            duration: 0.3,
            ease: 'power2.out'
        });

        const icon = e.currentTarget.querySelector('svg path');
        if (icon) {
            gsap.to(icon, { fill: '#ffbc95', color: '#ffbc95', duration: 0.3 });
        }


    }        
    
    onMount(() => {
        scrollingAnimation();
        disappearHeader();
    });

    function scrollingAnimation(){
            gsap.to('.fade-top', {
                opacity: 0.0,
                duration: 0.3,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: '.overall-wrapper',
                    start: 'top top',
                    end: 'center top',
                    scrub: true,
                    markers: false,
                }
            });
        }

    function disappearHeader(){
        gsap.to('.main-header', {
            scrollTrigger: {
                trigger: '.stack-section-three',
                start: 'top top',
                end: 'bottom top',
                scrub: true,
                markers: false,
                
                onEnter: () => gsap.to('.main-header', { opacity: 0, duration: 0.5, ease: 'power2.out' }),
                onLeaveBack: () => gsap.to('.main-header', { opacity: 1, duration: 0.5, ease: 'power2.out' }),
                onLeave: () => gsap.to('.main-header', { opacity: 1, duration: 0.5, ease: 'power2.out' }),
                onEnterBack: () => gsap.to('.main-header', { opacity: 0, duration: 0.5, ease: 'power2.out' }),
            }
        });
    }
</script>

<div class="fade-top"></div>

<div class="blur-top"></div>

<div class="main-header">
    <div class="logo">
        <h6>Rovie Endigado</h6>
    </div>

    <div class="nav-links">
        <a href="#about" on:mouseenter={animateHover} on:mouseleave={animateHoverOut}>About</a>
        <a href="#projects" on:mouseenter={animateHover} on:mouseleave={animateHoverOut}>Projects</a>
        <a href="#contact" on:mouseenter={animateHover} on:mouseleave={animateHoverOut}>Contact</a>
    </div>

    <div class="socials">
        <a href="#profile" on:mouseenter={animateHover} on:mouseleave={animateHoverOut}>
            <Fa icon={faUser} primaryColor="#ffbc95" size="lg" /> 

        </a>
        
        <a href="https://github.com" target="_blank" on:mouseenter={animateHover} on:mouseleave={animateHoverOut}>
            <Fa icon={faGithub} primaryColor="#ffbc95" size="lg" /> 

        </a>
    </div>
</div>

<style>

    .fade-top{
       
        background: rgba(0, 0, 0, 1);
        mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
        -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
        height: 20vh;
        width: 100%;
        position: fixed;
        top: 0;
        pointer-events: none;
        z-index: 1;
    }

    .blur-top{
         backdrop-filter: blur(8px);
          mask-image: linear-gradient(to bottom, black 10%, transparent 100%);
        -webkit-mask-image: linear-gradient(to bottom, black 0%, transparent 100%);
        height: 10  vh;
        width: 100%;
        position: fixed;
        top: 0;
        pointer-events: none;
        z-index: 1;
    }

   .main-header{
    position: fixed;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 4vw;
    z-index: 2;
    border: none;
   }

   .main-header .logo h6, .main-header .nav-links a, .main-header .socials a {
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #ffbc95;
    text-decoration: none;
   }

   .main-header .logo h6 {
    font-size: 1rem;
   }

   .main-header .nav-links a, .main-header .socials a {
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 700;
   }

   .main-header .nav-links a{
     background: rgba(96, 96, 96, 0.15);
     backdrop-filter: blur(10px);
        padding: 0.8rem;
        border-radius: 50px;
   }

   .main-header .socials a{
    background: rgba(96, 96, 96, 0.15);
    backdrop-filter: blur(10px);
    padding: 0.8rem;
    border-radius: 50px;
   }

   a:focus,
a:focus-visible,
a:active {
  outline: none;
  box-shadow: none;
}
</style>