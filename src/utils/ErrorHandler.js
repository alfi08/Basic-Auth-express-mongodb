module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  console.log('err => ', err);
  return res.status(err.statusCode).json({ message: err.message ||'something wrong i can feel it 🕶' });
};
