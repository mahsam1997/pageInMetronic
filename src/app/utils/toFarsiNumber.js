const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

const toFarsiNumber = n => n.toString().replace(/\d/g, x => farsiDigits[x]);

export default toFarsiNumber;
