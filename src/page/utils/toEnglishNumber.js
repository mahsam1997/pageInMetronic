const toEnglishNumber = s => s.replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

export default toEnglishNumber;
