import { fileURLToPath } from 'url';
import path from 'path';

// Async function to load config
async function loadConfig(configPath) {
    // delete require.cache[require.resolve(configPath)];
    try {
        const configModule = await import(configPath + '?update=' + new Date().getTime());
        return configModule.default || {};
    } catch (error) {
        console.error('Failed to load config:', error);
        return {};
    }
}

export default function configPlugin(options = {}) {
    const configPath = path.resolve(process.cwd(), 'vue-tailwind-button.config.js');
    return {
        name: 'vue-tailwind-buttons-vite-plugin', // required, will show up in warnings and errors
        enforce: 'post',        // run before other plugins
        async config() {
            // Return a modified configuration object
            const configData = await loadConfig(configPath);
            return {
                define: {
                    __VUE_TW_BUTTONS_EXTERNAL_CONFIG__: JSON.stringify(configData),
                },
            };
        },
        async handleHotUpdate({ file, server }) {
            if (file === configPath) {
                console.warn(`Changes to ${file} require Vite to be restarted`);
                return [];
            }
        }
    };
}