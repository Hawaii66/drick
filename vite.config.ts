import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

const config = defineConfig({
    plugins: [
        devtools(),
        viteTsConfigPaths({
            projects: ['./tsconfig.json'],
        }),
        tailwindcss(),
        cloudflare({ viteEnvironment: { name: "ssr" } }),
        tanstackStart(),
        viteReact({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
    ],
})

export default config
