const express=require('express');
const app=express();

// אפשרות לטעון נתונים מהיוזר
app.use(express.json());

const PORT=5000
//יבוא המערכים
const { books, lends } = require('./db');

//GET בקשה ריקה
app.get('/',(req,res)=>{
    res.send('Hello World')
})

//מחזיר כל הספרים לפי קטגוריה
app.get('/books',(req,res)=>{
    const category=req.query.category || null
    if(category!==null){const filteredBooks=books.filter(b=>b.category.toLowerCase()===category.toLowerCase())
    res.json(filteredBooks)}
    else{
        res.json(books)
    }
    
})
//GET בקשת ספר לפי מזהה
app.get('/books/:id',(req,res)=>{
    const bookid=+req.params.id
    const book=books.find(b=>b.id===bookid)
    if(book){
        res.json(book)
    }
    else{
        res.status(404).send('book not found')
    }
})

//POST הוספת ספר
app.post('/books',(req,res)=>{
    const book={id:6,bookId:4,userId:104,lendDate:"2023-04-05"};
    books.push(book);
    res.status(201).json(book);
});
//PUT עדכון ספר 
app.put('/books/:id',(req,res)=>{
    const bookid=+req.params.id
    const book=books.find(b=>b.id===bookid)
    if(book){
        const {name ,category,price}=req.body
        if(name) book.name=name
        if(category) book.category=category
        if(price) book.price=price
        res.json(books)
    }
    else{
        res.status(404).send("book not found")
    }
})

app.post('/lends',(req,res)=>{

    const bookId = +req.body.bookId;
    const userId = +req.body.userId;
    const book=books.find(b=>b.id===bookId) 
    if(book){
        if(book.isFinite)
            res.status(400).send("הספר מושאל")
        else{
            const lend={id:5,bookId:book.id,userId:userId,lendDate:"25/07/2033"}
            lends.push(lend)
            res.json(lends)
        }
    }
    else{
          res.status(404).send("book not found")
    }
})
//PUT עדכון השדה האם מושאל הספר
app.put('/books/:id/lend',(req,res)=>{
    const bookid=+req.params.id
    const book=books.find(b=>b.id===bookid)
    if(book){
        book.isFinite=false
        res.json(books)
    }
    else{
        res.status(404).send("book not found")
    }
})
//מחיקת ספר לפי קוד מזהה
app.delete('/books/:id',(req,res)=>{
    const bookid=+req.params.id
    const bookIndex=books.findIndex(b=>b.id===bookid)
    if(bookIndex!==-1){
        books.splice(bookIndex,1)
        res.json(books)
    }   
    else{
        res.status(404).send("book not found")
    }
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

