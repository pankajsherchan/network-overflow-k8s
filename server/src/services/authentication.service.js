// export const extractToken = (req, res, next) => {
//   const bearerHeader = req.headers['authorization'];

//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(' ');
//     const token = bearer[1];
//     req.token = token;
//     next();
//   } else {
//     res.sendStatus(403);
//   }
// };

// export const generateToken = username => {
//   return jwt.sign({ username }, env.JWT_SECRET_KEY, { expiresIn: '30s' });
// };

// export const verifyToken = async token => {
//   const isTokenVerified = await jwt.verify(token, env.JWT_SECRET_KEY);

//   return isTokenVerified;
// };
