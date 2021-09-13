exports.signin = (req, res) => {
  res.json({message: 'signin endpoint'});
};

exports.signup = (req, res) => {
   res.json({message: 'signup endpoint'});
};

exports.logout = (req, res) => {
   res.json({message: 'logout endpoint'});
};

exports.forgotPassword = (req, res) => {
   res.json({message: 'forgotPassword endpoint'});
};

exports.resetPassword = (req, res) => {
   res.json({message: 'resetPassword endpoint'});
};
