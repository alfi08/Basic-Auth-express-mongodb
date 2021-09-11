exports.getUser = (req, res) => {
  res.json({message: `hello ${req.params.username}, how are you bro\nI hope you ok :)`});
};