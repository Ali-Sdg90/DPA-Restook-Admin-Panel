export const convertFAtoEN = (input) => {
    const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    const englishNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    let output = input;

    persianNumbers.forEach((num, index) => {
        const regex = new RegExp(num, "g");
        output = output.replace(regex, englishNumbers[index]);
    });

    return output;
};
