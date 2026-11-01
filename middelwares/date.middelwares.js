exports.addCurrentDate=(req,res,next)=>{
    req.Current_date=new Date()
    next()
}

exports.logDateGet=(req,res,next)=>{
    if(req.method==="GET"){
        console.log(`GET request received at ${req.Current_date}`)
    }
    next()
}