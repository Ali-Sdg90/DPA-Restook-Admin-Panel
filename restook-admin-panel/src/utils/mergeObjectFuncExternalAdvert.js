export const mergeObjectFunc = (primary, secondary) => {
    const merged = {};

    console.log("FORM >>", primary);
    console.log("MAPPED >>", secondary);

    // debugger;

    Object.keys(primary).forEach((key) => {
        merged[key] = primary[key];
    });

    Object.keys(secondary).forEach((key) => {
        if (secondary[key] === undefined || secondary[key] === null) {
            merged[key] = primary[key];
        } else {
            merged[key] = secondary[key];
        }
    });

    console.log("MERGED >>", merged);

    // debugger;

    return merged;
};
