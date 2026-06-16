<script>
    import Fa from 'svelte-fa'; 
    import { faUser, faEnvelope, faBars } from '@fortawesome/free-solid-svg-icons';
    import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
    import { onMount } from 'svelte';
    import { gsap } from 'gsap';
    import { SplitText } from 'gsap/SplitText';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';
    

    function animateHover(e) {
        if (gsap.isTweening(e.currentTarget)) return;
        const localSplit = new SplitText(e.currentTarget, { type: 'chars', charsClass: 'gsap-split-text-chars' });

       const tl = gsap.timeline({
            onComplete: () => localSplit.revert()
        });

        tl.to(localSplit.chars, {
            y: '-30%',
            opacity: 0,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.08,
            overwrite: 'auto'
        })
        .to(localSplit.chars, {
            y: '0%',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.in',
            stagger: 0.08,
            overwrite: 'auto'
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
            gsap.to(icon, { fill: '#1a1a1a', color: '#1a1a1a', duration: 0.3, overwrite: 'auto'});
        }

    }

    function animateHoverOut(e) {
        gsap.to(e.currentTarget, {
            scale: 1,
            backgroundColor: 'rgba(96, 96, 96, 0.15)',
            color: '#ffbc95',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto'
        });

        const icon = e.currentTarget.querySelector('svg path');
        if (icon) {
            gsap.to(icon, { fill: '#ffbc95', color: '#ffbc95', duration: 0.3, overwrite: 'auto'});
        }


    }        
    
    onMount(() => {
        gsap.registerPlugin(SplitText, ScrollTrigger);
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
                trigger: '.third-section-new',
                start: 'top top',
                end: '+=1000%',
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
        height: 10vh;
        width: 100%;
        position: fixed;
        top: 0;
        pointer-events: none;
        z-index: 1;
    }

    .main-header {
        position: fixed;
        top: 0;
        width: 100%;
        height: 100dvh;
        padding: 4vw;

        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-rows: 10% 80% 10%;

        z-index: 2;
        border: none;
    }

/* Desktop behavior (implicit grid areas via columns) */
.logo {
  grid-column: 1;
  grid-row: 1;
  align-self: start;
  justify-self: start;
}

.nav-links {
  grid-column: 2;
  grid-row: 1;
  align-self: start;
  justify-self: center;

  display: flex;
  gap: 0.5rem;
}


.socials {
  grid-column: 3;
  grid-row: 1;
  align-self: start;
  justify-self: end;

  display: flex;
  gap: 0.5rem;
}

/* Mobile layout */
@media (max-width: 768px) {
    .nav-links{
          grid-column: 2;
        grid-row: 3;
    }

    .main-header .logo{
        grid-column: 2;
        grid-row: 1;
        justify-self: center;
        align-self: center;
    }

    .socials{
        display: none;
    }
}

   .main-header .logo h6, .main-header .nav-links a, .main-header .socials a {
    font-family: 'Plus Jakarta Sans', sans-serif;
    color: #ffbc95;
    text-decoration: none;
   }

   .main-header .logo h6 {
        font-size: clamp(0.85rem, 0.8rem + 0.3vw, 1.1rem);
   }

   .main-header .nav-links a, .main-header .socials a {
    cursor: pointer;
    font-size: clamp(0.2rem, 0.65rem, 0.9rem);
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