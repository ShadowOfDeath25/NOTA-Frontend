import Echo from 'laravel-echo'
import Pusher from 'pusher-js'

// @ts-expect-error This object is added to the window object
window.Pusher = Pusher

export const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: Number(import.meta.env.VITE_REVERB_PORT),
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authEndpoint: '/broadcasting/auth',
    withCredentials: true,
    auth: {
        headers: {
            accept: "application/json"
        }
    }
})