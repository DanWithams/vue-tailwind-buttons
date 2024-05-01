import { readFileSync } from 'fs';
import path from 'path';

// Async function to load config
async function loadConfig(configPath) {
    // delete require.cache[require.resolve(configPath)];
    try {
        const configModule = await import(configPath + '?update=' + new Date().getTime());
        console.log('loadConfig', JSON.stringify(configModule));
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
        // enforce: 'pre',        // run before other plugins
        async configResolved(config) {
            // Load config when Vite resolves its config
            configData = await loadConfig(configPath);
        },
        config() {
            // Return a modified configuration object
            console.log('config()', configData)
            return {
                define: {
                    __EXTERNAL_CONFIG__: JSON.stringify(configData),
                },
            };
        },
        async handleHotUpdate({ file, server }) {
            if (file === configPath) {
                console.log(`Reloading configuration due to change in ${file}`);
                // Re-import the config file
                configData = await loadConfig(configPath);
                // Update the define values
                console.log(JSON.stringify(configData || {}));
                // server.config.define = {
                //     __EXTERNAL_CONFIG__: JSON.stringify(configData || {}),
                // };
                server.config.define = {
                    __EXTERNAL_CONFIG__: JSON.stringify({
                        "primary": {
                            "solid": {
                                "classes": [
                                    "bg-red-400",
                                    "text-zinc-100",
                                    "dark:bg-red-500",
                                    "hover:bg-indigo-500",
                                    "dark:hover:bg-indigo-700",
                                    "focus:bg-indigo-500",
                                    "dark:focus:bg-indigo-700"
                                ],
                                "insetClasses": [
                                    "border-0"
                                ]
                            }
                        }
                    }),
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