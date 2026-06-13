<script>
    import gsap from "gsap";
    import { onMount } from "svelte";

    onMount(() => {
        gsap.to('.projects-container', {
            background: 'black',
            color: 'white',
            duration: 3,
        })
    });
</script>

<div class="projects-container">
    <h1>All Selected Works</h1>
    <p>Welcome to the laboratory.</p>
</div>