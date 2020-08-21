const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 try {
  console.log('check-auth authorization', req.headers.authorization);
  console.log('process.env.JWT_KEY: ', process.env.JWT_KEY);
  
  const token = req.headers.authorization.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_KEY);
  req.userData = decoded;

  console.log(req.userData);

  next();
 } catch (error) {
   return res.status(401).json({
     message: 'Auth failed'
    });
 }
};