const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const toFarsiNumber = n => n.toString().replace(/\d/g, x => englishDigits[x]);

export default toFarsiNumber;
