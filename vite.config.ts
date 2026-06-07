import {defineConfig, loadEnv} from 'vite'
import react from '@vitejs/plugin-react'

import tsconfigPaths from 'vite-tsconfig-paths'
import svgr from 'vite-plugin-svgr'

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [react(), tsconfigPaths(), svgr()],

        server: {
            allowedHosts: true,
            proxy: {
                '/api': {
                    target: env.VITE_API_BASE_URL,
                    changeOrigin: true,
                    secure: false,
                },
                "/ws": {
                    target: env.VITE_WS_PROVIDER_URL,
                    changeOrigin: true,
                    secure: false
                },
                "/broadcasting": {
                    target: env.VITE_API_BASE_URL,
                    changeOrigin: true,
                    secure: false
                }
            },
        },
    }
})