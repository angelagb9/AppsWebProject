const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require("../modelos/userModel");
const llave = require("./llave");

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = llave;

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  let user= getUsuario(jwt_payload.id );
  
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
// use the strategy
passport.use(strategy);

async function getUsuario(id){
    let usuario= await User.getByID(id)
    return usuario;
}

module.exports = passport;