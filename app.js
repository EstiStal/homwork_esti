const express=require('express');
const app=express();
const morgan=require('morgan')

const{addCurrentDate,logDateGet}=require('./middelwares/date.middelwares')

app.use(addCurrentDate)
app.use(logDateGet)
//יבוא ספריית cors
app.use(cors())

//הגדרת פורמט הנתונים המתקבלים
app.use(morgan('dev'))
app.use(express.json())

const PORT=5000


//יבוא הנתיבים
const bookRoutes=require('./routes/book.route')
const userRoure=require('./routes/user.route')

app.use('/books',bookRoutes)
app.use('/users',userRoure)

//יבוא המידלוור של טיפול בשגיאות
const {notFound,errorHandler}=require('./middelwares/error.middelwares')
//
app.use(notFound)
app.use(errorHandler)



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});