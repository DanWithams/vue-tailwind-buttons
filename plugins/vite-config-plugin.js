import { readFileSync } from 'fs';
import path from 'path';

export default function configPlugin(options = {}) {
    const configPath = options.configPath || path.resolve(process.cwd(), 'vue-tailwind-button.config.json');

    return {
        name: 'vue-tailwind-buttons-vite-plugin', // required, will show up in warnings and errors
        enforce: 'pre',        // run before other plugins
        config() {
            // Parse the configuration file
            const configData = JSON.parse(readFileSync(configPath, 'utf-8'));

            // Return a modified configuration object
            return {
                define: {
                    __EXTERNAL_CONFIG__: JSON.stringify(configData || {}),
                },
            };
        },
        handleHotUpdate({ file, server }) {
            if (file === configPath) {
                console.log(`Reloading configuration due to change in ${file}`);
                // Re-import the config file
                const configData = JSON.parse(readFileSync(configPath, 'utf-8'));
                // Update the define values
                server.config.define = {
                    __EXTERNAL_CONFIG__: JSON.stringify(configData),
                };
                // Trigger a full reload
                server.ws.send({
                    type: 'full-reload',
                });
            }
        }
    };
}