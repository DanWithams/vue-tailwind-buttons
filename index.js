import {mergeDefaultClasses} from "./defaults";

export const createVueButtons = (options = { classes: {} }) => {
    return {
        install(app) {
            app.provide('vueButtonDefaults', mergeDefaultClasses(options.classes));
        }
    }
}