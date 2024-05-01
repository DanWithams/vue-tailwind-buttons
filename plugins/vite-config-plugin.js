import { readFileSync } from 'fs';
import path from 'path';

// Async function to load config
async function loadConfig(configPath) {
    try {
        const configModule = await import(configPath);
        return configModule.default || {};
    } catch (error) {
        console.error('Failed to load config:', error);
        return {};
    }
}

export default function configPlugin(options = {}) {
    const configPath = path.resolve(process.cwd(), 'vue-tailwind-button.config.js');
    let configData = {}

    return {
        name: 'vue-tailwind-buttons-vite-plugin', // required, will show up in warnings and errors
        enforce: 'pre',        // run before other plugins
        async configResolved(config) {
            // Load config when Vite resolves its config
            configData = await loadConfig(configPath);
        },
        config() {
            // Return a modified configuration object
            return {
                define: {
                    __VUE_TAILWIND_BUTTONS_EXTERNAL_CONFIG__: JSON.stringify(configData),
                },
            };
        },
        async handleHotUpdate({ file, server }) {
            if (file === configPath) {
                console.log(`Reloading configuration due to change in ${file}`);
                // Re-import the config file
                configData = await loadConfig(configPath);
                // Update the define values
                console.log(configData);
                server.config.define = {
                    __VUE_TAILWIND_BUTTONS_EXTERNAL_CONFIG__: JSON.stringify(configData || {}),
                };
                // Trigger a full reload
                server.moduleGraph.invalidateAll(); // Invalidate the entire module graph to force a re-import
                server.ws.send({
                    type: 'full-reload',
                });
                return [];
            }
        }
    };
}