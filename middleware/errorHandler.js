const errorHandler = (err, req, res, next) => {
  //Handle Mangoose Validation Error
  if (err.name === "ValidationError") {
    const errors = {};
    for (const field in err.errors) {
      errors[field] = err.errors[field].message;
    }
    res.status(400).json({ errors });
  } else {
    let statusCode = err.status || 500;
    let msg = err.msg || "Internal Server Error.";
    res.status(statusCode).json({ msg: msg });
  }
};

module.exports = errorHandler;
