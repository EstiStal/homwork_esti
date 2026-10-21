const books=[{id:1,name:"The Great Gatsby",category:"Fiction",price:10.99,isFinite:true},
{id:2,name:"To Kill a Mockingbird",category:"Fiction",price:8.99,isFinite:true},
{id:3,name:"1984",category:"Dystopian",price:9.99,isFinite:true},
{id:4,name:"Pride and Prejudice",category:"Romance",price:7.99,isFinite:false}];

const lends=[{id:1,bookId:1,userId:101,lendDate:"2023-01-15"},
{id:2,bookId:2,userId:102,lendDate:"2023-02-20"},
{id:3,bookId:3,userId:103,lendDate:"2023-03-10"},
{id:4,bookId:4,userId:104,lendDate:"2023-04-05"}];

module.exports = { books, lends };