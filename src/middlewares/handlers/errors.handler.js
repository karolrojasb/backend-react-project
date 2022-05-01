const logErrors = (err,req,res,next) => {
  console.log(err)
  next(err);
}

const errorHandler = (err,req,res,next) => {
  res.status(404).json({
    message: err.message,
    stack: err.stack
  })
}

module.exports = {logErrors, errorHandler}
