import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom"
import {router} from './router.tsx'
import {QueryClientProvider} from "@tanstack/react-query"
import {queryClient} from "./queryClient.ts";
import './index.css'
import LanguageSync from "@components/LanguageSync/LanguageSync.tsx";
import './i18n.ts'

declare global {
    interface Window {
        __TANSTACK_QUERY_CLIENT__:
            import('@tanstack/query-core')
                .QueryClient
    }
}

window.__TANSTACK_QUERY_CLIENT__ = queryClient
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <LanguageSync/>
            <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
    </StrictMode>
    ,
)
