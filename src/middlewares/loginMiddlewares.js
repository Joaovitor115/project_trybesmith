module.exports = (req, res, next) => {
  const { email, password } = req.body;
  if (email === undefined) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  }
  if (password === undefined) {
    return res.status(400).json({
      message: 'O campo "password" é obrigatório',
    });
  }
  return next();
};