import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {RouterProvider} from "react-router-dom"
import {router} from './router.tsx'
import {QueryClientProvider} from "@tanstack/react-query"
import {queryClient} from "./queryClient.ts";
import './index.css'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router}></RouterProvider>
        </QueryClientProvider>
    </StrictMode>
    ,
)
