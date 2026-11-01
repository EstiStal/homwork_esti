exports.notFound=(req,res,next)=>{
    const error=new Error('resource not found, ${req.originalUrl}')
    res.status(404)
    next(error)
}

exports.errorHandler=(err,req,res,next)=>{
    const statusCode=res.statusCode===200?500:res.statusCode
    res.status(statusCode).json({error:{messge:err.messge}})
 }