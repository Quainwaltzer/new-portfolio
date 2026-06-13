import { redirect } from '@sveltejs/kit';

export function load() {
    // 🟢 Instantly forward the visitor to the /home route with a 307 Temporary Redirect status
    return redirect(307, '/home');
}