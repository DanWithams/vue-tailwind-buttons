import _ from "lodash";
import {mergeTwClasses} from "tailwind-helpers";

const base = {
    rounded: ['rounded'],
    classes: ['px-6', 'py-2', 'font-semibold'],
    insetClasses: [],
    classesOutline: [],
    insetClassesOutline: [],
}

const variants = {
    primary: {
        solid: {
            classes: [ 'bg-indigo-400', 'text-zinc-100', 'dark:bg-indigo-500', 'hover:bg-indigo-500', 'dark:hover:bg-indigo-700', 'focus:bg-indigo-500', 'dark:focus:bg-indigo-700' ],
            insetClasses: [ 'border-0' ],
        },
        outline: {
            classes: [ 'bg-transparent', 'text-indigo-400', 'dark:text-indigo-500', 'hover:text-indigo-500', 'dark:hover:text-indigo-700', 'focus:text-indigo-500', 'dark:focus:text-indigo-700' ],
            insetClasses: [ 'border-2', 'border-indigo-400', 'dark:border-indigo-500', 'group-hover:border-indigo-500', 'dark:group-hover:border-indigo-700', 'group-focus:border-indigo-500', 'dark:group-focus:border-indigo-700' ],
        },
    },
    secondary: {
        classes: [ 'bg-cyan-400', 'text-zinc-100', 'dark:bg-cyan-500', 'hover:bg-cyan-500', 'dark:hover:bg-cyan-700', 'focus:bg-cyan-500', 'dark:focus:bg-cyan-700' ],
        classesOutline: [ 'bg-transparent', 'text-cyan-400', 'dark:text-cyan-500', 'hover:text-cyan-500', 'dark:hover:text-cyan-700', 'focus:text-cyan-500', 'dark:focus:text-cyan-700' ],
        insetClasses: [ 'border-0' ],
        insetClassesOutline: [ 'border-2', 'border-cyan-400', 'dark:border-cyan-500', 'group-hover:border-cyan-500', 'dark:group-hover:border-cyan-700', 'group-focus:border-cyan-500', 'dark:group-focus:border-cyan-700' ],
    },
    positive: {
        classes: [ 'bg-green-400', 'text-zinc-100', 'dark:bg-green-500', 'hover:bg-green-500', 'dark:hover:bg-green-700', 'focus:bg-green-700' ],
        classesOutline: [ 'bg-transparent', 'text-green-400', 'dark:text-green-500', 'hover:text-green-500', 'dark:hover:text-green-700', 'focus:text-green-500', 'focus:text-green-700' ],
        insetClasses: [ 'border-0' ],
        insetClassesOutline: [ 'border-2', 'border-green-400', 'dark:border-green-500', 'group-hover:border-green-500', 'dark:group-hover:border-green-700', 'group-focus:border-green-500', 'dark:group-focus:border-green-700' ],
    },
    negative: {
        classes: [ 'bg-red-400', 'text-zinc-100', 'dark:bg-red-500', 'hover:bg-red-500', 'dark:hover:bg-red-700', 'focus:bg-red-500', 'dark:focus:bg-red-700' ],
        classesOutline: [ 'bg-transparent', 'text-red-400', 'dark:text-red-500', 'hover:text-red-500', 'dark:hover:text-red-700', 'focus:text-red-500', 'dark:focus:text-red-700' ],
        insetClasses: [ 'border-0' ],
        insetClassesOutline: [ 'border-2', 'border-red-400', 'dark:border-red-500', 'group-hover:border-red-500', 'dark:group-hover:border-red-700', 'group-focus:border-red-500', 'dark:group-focus:border-red-700' ],
    },
    default: {
        classes: [ 'bg-zinc-400', 'text-zinc-100', 'dark:bg-zinc-500', 'hover:bg-zinc-500', 'dark:hover:bg-zinc-700', 'focus:bg-zinc-500', 'dark:focus:bg-zinc-700' ],
        classesOutline: [ 'bg-transparent', 'text-zinc-400', 'dark:text-zinc-500', 'hover:text-zinc-500', 'dark:hover:text-zinc-700', 'focus:text-zinc-500', 'dark:focus:text-zinc-700' ],
        insetClasses: [ 'border-0' ],
        insetClassesOutline: [ 'border-2', 'border-zinc-400', 'dark:border-zinc-500', 'group-hover:border-zinc-500', 'dark:group-hover:border-zinc-700', 'group-focus:border-zinc-500', 'dark:group-focus:border-zinc-700' ],
    },
    transparent: {
        classes: [ 'bg-transparent', 'hover:bg-transparent', 'focus:bg-transparent', 'text-indigo-400',  'hover:text-indigo-700' ],
        classesOutline: [],
        insetClasses: [ 'border-0' ],
        insetClassesOutline: [],
    },
};

export function mergeDefaultClasses(classes) {
    const baseDefaults = {
        rounded: _.get(classes, 'base.rounded', base.rounded),
        classes: _.get(classes, 'base.classes', base.classes),
        insetClasses: _.get(classes, 'base.insetClasses', base.insetClasses),
        classesOutline: _.get(classes, 'base.classesOutline', base.classesOutline),
        insetClassesOutline: _.get(classes, 'base.insetClassesOutline', base.insetClassesOutline),
    };

    const defaults = {};
    Object.keys(variants)
        .forEach(key => {
            const rounded = _.get(classes, key + '.rounded', baseDefaults.rounded);
            defaults[key] = {
                baseClasses: rounded,
                solid: {
                    classes: mergeTwClasses(baseDefaults.classes, _.get(classes, key + '.solid.classes', variants[key].classes), rounded),
                    insetClasses: mergeTwClasses(_.get(classes, key + '.solid.insetClasses', variants[key].insetClasses), rounded),
                },
                outline: {
                    classes: mergeTwClasses(_.get(classes, key + '.outline.classes', variants[key].classesOutline), rounded),
                    insetClasses: mergeTwClasses(_.get(classes, key + '.outline.insetClasses', variants[key].insetClassesOutline), rounded),
                }
            }
        });

    return defaults;
}