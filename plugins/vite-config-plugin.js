const fs = require('fs');
const path = require('path');

export default function configPlugin() {
    return {
        name: 'vue-tailwind-buttons-vite-plugin', // required, will show up in warnings and errors
        enforce: 'pre',        // run before other plugins
        config() {
            try {
                // Read and parse the configuration file
                const configPath = path.resolve(__dirname, 'vue-tailwind-button.config.json');
                const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

                // Return a modified configuration object
                return {
                    define: {
                        __EXTERNAL_CONFIG__: JSON.stringify(configData || {}),
                    },
                };
            } catch (e) {
                console.error('Failed to load configuration:', e);
                throw e;  // Stop the build if configuration cannot be loaded
            }
        },
    };
}