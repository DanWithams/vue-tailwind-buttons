import _ from "lodash";

const base = {
    rounded: ['rounded'],
    classes: ['px-6', 'py-2', 'font-semibold'],
    insetClasses: [],
    classesOutline: [],
    insetClassesOutline: [],
}

const variants = {
    primary: {
        classes: [ 'bg-indigo-400', 'text-zinc-100', 'dark:bg-indigo-500', 'hover:bg-indigo-500', 'dark:hover:bg-indigo-700', 'focus:bg-indigo-500', 'dark:focus:bg-indigo-700' ],
        classesOutline: [ 'bg-transparent', 'text-indigo-400', 'dark:text-indigo-500', 'hover:text-indigo-500', 'dark:hover:text-indigo-700', 'focus:text-indigo-500', 'dark:focus:text-indigo-700' ],
        insetClasses: [ 'border-0' ],
        insetClassesOutline: [ 'border-2', 'border-indigo-400', 'dark:border-indigo-500', 'group-hover:border-indigo-500', 'dark:group-hover:border-indigo-700', 'group-focus:border-indigo-500', 'dark:group-focus:border-indigo-700' ],
    }
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
            defaults[key] = {
                rounded: _.get(classes, key + '.rounded', baseDefaults.rounded),
                classes: _.get(classes, key + '.classes', variants[key].classes),
                classesOutline: _.get(classes, key + '.classesOutline', variants[key].classesOutline),
                insetClasses: _.get(classes, key + '.insetClasses', variants[key].insetClasses),
                insetClassesOutline: _.get(classes, key + '.insetClassesOutline', variants[key].insetClassesOutline),
            }
        });

    return defaults;
}