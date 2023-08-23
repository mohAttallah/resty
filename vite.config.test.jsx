import { defineConfig } from 'vite';
import { createVuePlugin } from 'vite-plugin-vue';
import { ViteTestPlugin } from 'vite-plugin-test';

export default defineConfig({
    plugins: [createVuePlugin(), ViteTestPlugin()],
});