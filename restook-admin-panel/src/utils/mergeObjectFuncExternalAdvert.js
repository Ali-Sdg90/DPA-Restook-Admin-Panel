export const mergeObjectFunc = (form, mapped) => {
    const merged = {};

    // console.log("FORM >>", form);
    // console.log("MAPPED >>", mapped);

    Object.keys(mapped).forEach((key) => {
        merged[key] = mapped[key];
    });

    Object.keys(form).forEach((key) => {
        merged[key] = form[key];
    });

    console.log("MERGED >>", merged);

    return merged;
};
