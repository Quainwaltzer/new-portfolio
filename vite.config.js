import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	ssr: {
		// 🟢 Add this to stop Vite from trying to bundle node-fetch internals
		noExternal: [],
		external: ['node-fetch']
	}
});
