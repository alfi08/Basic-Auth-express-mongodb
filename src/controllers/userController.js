exports.getUser = (req, res) => {
  res.json({ message: `hello ${req.params.username}, how are you bro\nI hope you ok :)` });
};

exports.updateUser = (req, res) => {
  res.json({msg : 'update users '+req.params.username})
}