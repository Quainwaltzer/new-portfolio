<script>
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';

	const DEFAULT_PARTICLE_COUNT = 12;
	const DEFAULT_SPOTLIGHT_RADIUS = 300;
	const DEFAULT_GLOW_COLOR = '255, 138, 76';
	const MOBILE_BREAKPOINT = 768;

	const cardData = [
		{ 
			id: 'frontend', 
			label: '01 // VISUAL & INTERACTION ENGINE', 
			title: 'Frontend Ecosystem', 
			items: ['SvelteKit', 'Blazor UI', 'React.js', 'GSAP (GreenSock)', 'Anime.js', 'Tailwind CSS'],
			layoutClass: 'top-left-long'
		},
		{ 
			id: 'languages', 
			label: '02 // BASE MATRIX', 
			title: 'Languages', 
			items: ['C#', 'Python', 'TypeScript', 'JavaScript ES6', 'GLSL Shaders', 'C++'],
			layoutClass: 'top-right-short font-mono-override'
		},
		{ 
			id: 'backend', 
			label: '03 // INTELLIGENCE ENGINE', 
			title: 'Backend & AI', 
			items: ['ASP.NET Core', 'Azure OpenAI', 'REST APIs', 'YOLOv8', 'SignalR', 'EF Core'],
			layoutClass: 'bottom-left-short'
		},
		{ 
			id: 'cloud', 
			label: '04 // INTEGRATED ECOSYSTEM', 
			title: 'Cloud & Systems Architecture', 
			items: ['Grove Vision AI', 'ESP32 Hardware', 'MQTT Protocols', 'Azure DevOps', 'Docker', 'Git Engine'],
			layoutClass: 'bottom-right-long'
		}
	];

	let {
		textAutoHide = true,
		enableStars = true,
		enableSpotlight = true,
		enableBorderGlow = true,
		disableAnimations = false,
		spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
		particleCount = DEFAULT_PARTICLE_COUNT,
		enableTilt = true,
		glowColor = DEFAULT_GLOW_COLOR,
		clickEffect = true,
		enableMagnetism = true
	} = $props();

	let gridRef;
	let isMobile = $state(false);
	const shouldDisableAnimations = $derived(disableAnimations || isMobile);

	function createParticleEl(x, y, color) {
		const el = document.createElement('div');
		el.className = 'particle';
		el.style.cssText = `position:absolute;width:4px;height:4px;border-radius:50%;background:rgba(${color},1);box-shadow:0 0 6px rgba(${color},0.6);pointer-events:none;z-index:100;left:${x}px;top:${y}px;`;
		return el;
	}

	function updateCardGlow(card, mx, my, glow, radius) {
		const rect = card.getBoundingClientRect();
		card.style.setProperty('--glow-x', `${((mx - rect.left) / rect.width) * 100}%`);
		card.style.setProperty('--glow-y', `${((my - rect.top) / rect.height) * 100}%`);
		card.style.setProperty('--glow-intensity', glow.toString());
		card.style.setProperty('--glow-radius', `${radius}px`);
	}

	function attachCard(el, index) {
		let isHovered = false;
		const timeouts = [];
		const liveParticles = [];
		let memoParticles = [];
		let particlesInit = false;
		let magnetTween = null;

		const initParticles = () => {
			if (particlesInit || !el) return;
			const { width, height } = el.getBoundingClientRect();
			memoParticles = Array.from({ length: particleCount }, () =>
				createParticleEl(Math.random() * width, Math.random() * height, glowColor)
			);
			particlesInit = true;
		};
		const clearParticles = () => {
			timeouts.forEach(clearTimeout);
			timeouts.length = 0;
			magnetTween?.kill();
			liveParticles.forEach((p) => {
				gsap.to(p, {
					scale: 0, opacity: 0, duration: 0.3, ease: 'back.in(1.7)',
					onComplete: () => p.parentNode?.removeChild(p)
				});
			});
			liveParticles.length = 0;
		};
		const animateParticles = () => {
			if (!isHovered) return;
			if (!particlesInit) initParticles();
			memoParticles.forEach((p, i) => {
				const t = setTimeout(() => {
					if (!isHovered) return;
					const clone = p.cloneNode(true);
					el.appendChild(clone);
					liveParticles.push(clone);
					gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
					gsap.to(clone, {
						x: (Math.random() - 0.5) * 100, y: (Math.random() - 0.5) * 100,
						rotation: Math.random() * 360, duration: 2 + Math.random() * 2,
						ease: 'none', repeat: -1, yoyo: true
					});
					gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
				}, i * 100);
				timeouts.push(t);
			});
		};

		const onEnter = () => {
			if (shouldDisableAnimations) return;
			isHovered = true;
			if (enableStars) animateParticles();
		};
		const onLeave = () => {
			if (shouldDisableAnimations) return;
			isHovered = false;
			if (enableStars) clearParticles();
			if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
			if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
		};
		const onMove = (e) => {
			if (shouldDisableAnimations) return;
			if (!enableTilt && !enableMagnetism) return;
			const rect = el.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const cx = rect.width / 2, cy = rect.height / 2;
			if (enableTilt) {
				gsap.to(el, {
					rotateX: ((y - cy) / cy) * -6,
					rotateY: ((x - cx) / cx) * 6,
					duration: 0.1, ease: 'power2.out', transformPerspective: 1000
				});
			}
			if (enableMagnetism) {
				magnetTween = gsap.to(el, { x: (x - cx) * 0.03, y: (y - cy) * 0.03, duration: 0.3, ease: 'power2.out' });
			}
		};
		const onClick = (e) => {
			if (!clickEffect || shouldDisableAnimations) return;
			const rect = el.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			const maxD = Math.max(
				Math.hypot(x, y), Math.hypot(x - rect.width, y),
				Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height)
			);
			const ripple = document.createElement('div');
			ripple.style.cssText = `position:absolute;width:${maxD * 2}px;height:${maxD * 2}px;border-radius:50%;background:radial-gradient(circle, rgba(${glowColor}, 0.3) 0%, rgba(${glowColor}, 0.1) 40%, transparent 70%);left:${x - maxD}px;top:${y - maxD}px;pointer-events:none;z-index:1000;`;
			el.appendChild(ripple);
			gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.7, ease: 'power2.out', onComplete: () => ripple.remove() });
		};

		el.addEventListener('mouseenter', onEnter);
		el.addEventListener('mouseleave', onLeave);
		el.addEventListener('mousemove', onMove);
		el.addEventListener('click', onClick);

		return () => {
			isHovered = false;
			el.removeEventListener('mouseenter', onEnter);
			el.removeEventListener('mouseleave', onLeave);
			el.removeEventListener('mousemove', onMove);
			el.removeEventListener('click', onClick);
			clearParticles();
		};
	}

	function cardAction(node, index) {
		const detach = attachCard(node, index);
		return { destroy: detach };
	}

	onMount(() => {
		const checkMobile = () => (isMobile = window.innerWidth <= MOBILE_BREAKPOINT);
		checkMobile();
		window.addEventListener('resize', checkMobile);

		let spotlight = null;
		let onDocMove = null;
		let onDocLeave = null;

		if (enableSpotlight && !shouldDisableAnimations) {
			spotlight = document.createElement('div');
			spotlight.className = 'global-spotlight';
			spotlight.style.cssText = `position:fixed;width:800px;height:800px;border-radius:50%;pointer-events:none;background:radial-gradient(circle, rgba(${glowColor}, 0.15) 0%, rgba(${glowColor}, 0.08) 15%, rgba(${glowColor}, 0.04) 25%, rgba(${glowColor}, 0.02) 40%, rgba(${glowColor}, 0.01) 65%, transparent 70%);z-index:200;opacity:0;transform:translate(-50%, -50%);mix-blend-mode:screen;`;
			document.body.appendChild(spotlight);

			const proximity = spotlightRadius * 0.5;
			const fadeDistance = spotlightRadius * 0.75;

			onDocMove = (e) => {
				if (!spotlight || !gridRef) return;
				const section = gridRef.closest('.stack-section-three');
				const rect = section?.getBoundingClientRect();
				const inside = !!rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
				const cards = gridRef.querySelectorAll('.magic-bento-card');
				if (!inside) {
					gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
					cards.forEach((c) => c.style.setProperty('--glow-intensity', '0'));
					return;
				}
				let minDistance = Infinity;
				cards.forEach((card) => {
					const cr = card.getBoundingClientRect();
					const cx = cr.left + cr.width / 2;
					const cy = cr.top + cr.height / 2;
					const distance = Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(cr.width, cr.height) / 2;
					const eff = Math.max(0, distance);
					minDistance = Math.min(minDistance, eff);
					let glow = 0;
					if (eff <= proximity) glow = 1;
					else if (eff <= fadeDistance) glow = (fadeDistance - eff) / (fadeDistance - proximity);
					updateCardGlow(card, e.clientX, e.clientY, glow, spotlightRadius);
				});
				gsap.to(spotlight, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });
				const targetOpacity = minDistance <= proximity ? 0.8
					: minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
					: 0;
				gsap.to(spotlight, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5, ease: 'power2.out' });
			};
			onDocLeave = () => {
				gridRef?.querySelectorAll('.magic-bento-card').forEach((c) => c.style.setProperty('--glow-intensity', '0'));
				if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: 'power2.out' });
			};
			document.addEventListener('mousemove', onDocMove);
			document.addEventListener('mouseleave', onDocLeave);
            
            
		}

		return () => {
			window.removeEventListener('resize', checkMobile);
			if (onDocMove) document.removeEventListener('mousemove', onDocMove);
			if (onDocLeave) document.removeEventListener('mouseleave', onDocLeave);
			spotlight?.parentNode?.removeChild(spotlight);
		};
	});

	const baseCardClass = $derived(
		`magic-bento-card ${enableBorderGlow ? 'magic-bento-card--border-glow' : ''} ${enableStars ? 'particle-container' : ''} ${textAutoHide ? 'magic-bento-card--text-autohide' : ''}`
	);
	
</script>

<div class="stack-section-three">
	<div class="section-title-area" >
		<span class="title-accent">// ENGINE ROOT</span>
		<h2>Tech Stack</h2>
		<h3>Architectural Stack that I know of (hopefully haha)</h3>
	</div>

	<div bind:this={gridRef} class="bento-grid-container" >
		{#each cardData as card, i (card.id)}
			<div class="{baseCardClass} {card.layoutClass}" use:cardAction={i}>
				<div class="magic-bento-card__header">
					<span class="magic-bento-card__label">{card.label}</span>
				</div>
				<div class="magic-bento-card__content">
					<h3 class="magic-bento-card__title">{card.title}</h3>
					
					<div class="marquee-wrapper">
						<div class="marquee-track">
							<div class="marquee-content">
								{#each card.items as item}
									<span>{item}</span> • 
								{/each}
							</div>
							<div class="marquee-content" aria-hidden="true">
								{#each card.items as item}
									<span>{item}</span> • 
								{/each}
							</div>
						</div>
					</div>

				</div>
			</div>
		{/each}
	</div>

	<div class="divider"></div>
</div>

<style>

    .divider{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 20vh;
        background: linear-gradient(to bottom, #251716 0%,  transparent 100%);
        z-index: 99999;
    }
	.stack-section-three {
		width: 100%;
		height: 100vh;
		background-color: #111111;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 2vh 4vw;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
		user-select: none;
		--white: hsl(0, 0%, 100%);
		--border-color: #2A2620;
		--background-dark: #14110E;
		--accent-glow: rgba(255, 138, 76, 0.2);
	}

	.section-title-area {
		text-align: center;
		margin-bottom: 2.5vh;
	}

	.title-accent {
		font-family: monospace;
		font-size: 0.75rem;
		letter-spacing: 0.25em;
		color: #ff9f68;
		display: block;
		margin-bottom: 0.5vh;
	}

	.section-title-area h2{
		font-family: 'Horizon Outlined';
		font-size: 2.5rem;
		color: white;
		margin: 0;
	}

	.section-title-area h3 {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-size: 1rem;
		font-weight: 300;
		color: #ffffff;
		margin: 0;
	}

	.bento-grid-container {
		width: 100%;
		max-width: 1200px;
		height: 72vh;
		display: grid;
		grid-template-columns: repeat(27, 1fr);
		grid-template-rows: 1fr 1fr;
		gap: 1.25rem;
	}

	:global(.stack-section-three .magic-bento-card) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
		width: 100%;
		max-width: 100%;
		padding: 1.75rem 2rem;
		border-radius: 20px;
		border: 3px solid var(--border-color);
		background: var(--background-dark);
		font-weight: 300;
		overflow: hidden;
		transition: border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
		color: var(--white);
		box-sizing: border-box;
		--glow-x: 50%;
		--glow-y: 50%;
		--glow-intensity: 0;
		--glow-radius: 200px;
	}

	:global(.stack-section-three .top-left-long)      { grid-column: span 16; grid-row: 1; }
	:global(.stack-section-three .top-right-short)     { grid-column: span 11; grid-row: 1; }
	:global(.stack-section-three .bottom-left-short)   { grid-column: span 11; grid-row: 2; }
	:global(.stack-section-three .bottom-right-long)   { grid-column: span 16; grid-row: 2; }

	:global(.stack-section-three .magic-bento-card__header),
	:global(.stack-section-three .magic-bento-card__content) {
		display: flex;
		position: relative;
		color: var(--white);
		width: 100%;
	}
	:global(.stack-section-three .magic-bento-card__header) {
		justify-content: space-between;
	}
	:global(.stack-section-three .magic-bento-card__content) { 
		flex-direction: column; 
		justify-content: center;
		height: 100%;
	}
	:global(.stack-section-three .magic-bento-card__label) { 
		font-family: monospace;
		font-size: 0.65rem; 
		letter-spacing: 0.18em;
		color: #ff9f68;
	}
	:global(.stack-section-three .magic-bento-card__title) {
		font-family: 'Plus Jakarta Sans', sans-serif;
		font-weight: 700;
		font-size: 1.4rem;
		margin: 0 0 1.25rem 0;
	}

	.marquee-wrapper {
		width: 100%;
		overflow: hidden;
		position: relative;
		mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
		-webkit-mask-image: linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%);
	}

	.marquee-track {
		display: flex;
		width: max-content;
		animation: scrollRightToLeft 25s linear infinite;
	}

	:global(.magic-bento-card:hover .marquee-track) {
		animation-play-state: paused;
	}

	.marquee-content {
		display: flex;
		align-items: center;
		white-space: nowrap;
		gap: 1.25rem;
		padding-right: 1.25rem;
		font-family: monospace !important;
		font-size: 1.15rem;
		font-weight: 500;
		color: #ffbc95;
	}

	.marquee-content span {
		background: rgba(255, 188, 149, 0.03);
		border: 1px solid rgba(255, 188, 149, 0.08);
		padding: 0.45rem 1.1rem;
		border-radius: 12px;
		display: inline-block;
		transition: background 0.3s, border-color 0.3s;
	}

	:global(.magic-bento-card:hover .marquee-content span) {
		background: rgba(255, 188, 149, 0.06);
		border-color: rgba(255, 188, 149, 0.25);
   
	}

	:global(.stack-section-three .font-mono-override .marquee-content) {
		font-family: monospace !important;
		font-size: 1.05rem;
	}

	@keyframes scrollRightToLeft {
		0% { transform: translateX(0%); }
		100% { transform: translateX(-50%); }
	}

	@media (max-width: 960px) {
		.stack-section-three { height: auto; padding: 6rem 4vw; }
		.bento-grid-container { grid-template-columns: 1fr; height: auto; }
		:global(.stack-section-three .top-left-long), 
		:global(.stack-section-three .top-right-short), 
		:global(.stack-section-three .bottom-left-short), 
		:global(.stack-section-three .bottom-right-long) { grid-column: span 1; }
	}

	:global(.stack-section-three .magic-bento-card--border-glow::after) {
		content: '';
		position: absolute;
		inset: 0;
		padding: 1px;
		background: radial-gradient(
			var(--glow-radius) circle at var(--glow-x) var(--glow-y),
			rgba(255, 138, 76, calc(var(--glow-intensity) * 0.8)) 0%,
			rgba(255, 138, 76, calc(var(--glow-intensity) * 0.4)) 30%,
			transparent 60%
		);
		border-radius: inherit;
		-webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		-webkit-mask-composite: xor;
		mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
		mask-composite: exclude;
		pointer-events: none;
		opacity: 1;
		transition: opacity 0.3s ease;
		z-index: 1;
	}
	:global(.stack-section-three .magic-bento-card--border-glow:hover) {
		box-shadow: 0 4px 100px rgba(78, 38, 18, 0.4), 0 0 30px var(--accent-glow);
		border-color: rgba(255, 138, 76, 0.25);
	}
	:global(.particle-container) { position: relative; overflow: hidden; }
	:global(.particle::before) {
		content: '';
		position: absolute;
		top: -2px; left: -2px; right: -2px; bottom: -2px;
		background: rgba(255, 138, 76, 0.2);
		border-radius: 50%;
		z-index: -1;
	}
	:global(.global-spotlight) {
		mix-blend-mode: screen;
		will-change: transform, opacity;
		z-index: 200 !important;
		pointer-events: none;
	}
</style>