const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'שם המשתמש הוא שדה חובה'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'כתובת מייל היא שדה חובה'],
        unique: true,      // מוודא שהמייל ייחודי במערכת
        lowercase: true,   // ממיר אוטומטית לאותיות קטנות
        trim: true
    },
    phone: {
        type: String,
        required: [true, 'מספר טלפון הוא שדה חובה'],
        // ביטוי רגולרי לבדיקת מספר נייד ישראלי (מתחיל ב-05, ספרה נוספת, ו-7 ספרות)
        match: [/^05\d{8}$/, 'מספר הטלפון אינו תקין. יש להזין 10 ספרות המתחילות ב-05']
    },
    password: {
        type: String,
        required: [true, 'סיסמה היא שדה חובה'],
        minlength: [4, 'הסיסמה חייבת להכיל לפחות 4 תווים']
    },
    registrationDate: {
        type: Date,
        default: Date.now  // מתעדכן אוטומטית לתאריך והשעה הנוכחיים בעת היצירה
    },
    lends: [
        {
            bookCode: {
                type: mongoose.Schema.Types.ObjectId, // מפנה למזהה הייחודי (_id) של הספר
                ref: 'Book',
                required: true
            },
            bookName: {
                type: String,
                required: true
            }
        }
    ]
    {
    // הגדרות המרה של האובייקט בעת שליחתו ללקוח (JSON)
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.__v;
            delete ret.password;
            return ret;
        }
    }
});

userSchema.pre('save', async function (next) {
    // אם הסיסמה לא שונתה, אין צורך בהצפנה מחדש
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const saltRounds = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    }
    catch (err) {
        next(err);
    }
});
// 2. פונקציה סטטית (Static) לבדיקת התאמת סיסמה
userSchema.statics.checkPassword = async function (plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
};
module.exports = mongoose.model('User', userSchema);
