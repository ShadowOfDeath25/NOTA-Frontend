import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import axios from 'axios'

window.Pusher = Pusher

const broadcastAuthClient = axios.create({
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        Accept: "application/json",
        'ngrok-skip-browser-warning': true,
    },
})

export const echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: Number(import.meta.env.VITE_REVERB_PORT),
    forceTLS: false,
    enabledTransports: ['ws', 'wss'],
    authorizer: (channel) => ({
        authorize: (socketId, callback) => {
            broadcastAuthClient.post('/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name,
            })
                .then((response) => {
                    console.log('Auth response:', response.data)
                    callback(false, response.data)
                })
                .catch((error) => {
                    console.error('Auth error:', error)
                    callback(true, error)
                })
        },
    }),
})