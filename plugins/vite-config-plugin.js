import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    return {
        name: 'vue-tailwind-buttons-vite-plugin', // required, will show up in warnings and errors
        // enforce: 'pre',        // run before other plugins
        async config() {
            // Return a modified configuration object
            const configData = await loadConfig(configPath);
            console.log('config()', JSON.stringify(configData))
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
                const configData = await loadConfig(configPath);
                // Update the define values
                console.log('handleHotUpdate()', JSON.stringify(configData || {}));

                console.log(
                    server,
                    server.config,
                    server.config.define,
                );

                server.config.define.__EXTERNAL_CONFIG__ = JSON.stringify(configData || {});

                const modulePath = path.resolve(__dirname, '../');

                console.log('modulePath', modulePath);
                console.log('idToModuleMap', Array.from(server.moduleGraph.idToModuleMap.keys()));

                for (const [id, module] of server.moduleGraph.idToModuleMap.entries()) {
                    // Check if the module ID starts with the target path ignoring any query parameters
                    if (id.startsWith(modulePath)) {
                        console.log(`Invalidating module: ${id} ${module}`);
                        // Invalidate this module
                        server.moduleGraph.invalidateModule(module);
                    }
                }

                console.log('idToModuleMap', Array.from(server.moduleGraph.idToModuleMap.keys()));

                server.ws.send({
                    type: 'full-reload',
                });

                return [];
            }
        }
    };
}