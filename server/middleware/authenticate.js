var {User} = require('../models/user');




var authenticate = (req, res, next) => {
  // 8.5
  var token = req.header('x-auth');

  User.findByToken(token).then((user) => {
    if (!user) {
      return Promise.reject();
      //OR
      // res.status(401).send(error)
    }


    // here its modify req. object of '/users/me'
    //req.user ==> means its comes from the server.js 
    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).send("token is wrong...!");
  });
};

module.exports = {authenticate};
