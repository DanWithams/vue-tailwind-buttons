import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export default function configPlugin() {
    return {
        name: 'vue-tailwind-buttons-vite-plugin', // required, will show up in warnings and errors
        enforce: 'pre',        // run before other plugins
        config() {
            // Read and parse the configuration file
            const configPath = path.resolve(__dirname, 'vue-tailwind-button.config.json');
            const configData = JSON.parse(readFileSync(configPath, 'utf-8'));

            // Return a modified configuration object
            return {
                define: {
                    __EXTERNAL_CONFIG__: JSON.stringify(configData || {}),
                },
            };
        },
    };
}