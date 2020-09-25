import { User } from '../typeorm/entity/User';
import bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const passport = require('passport');
const passportJwt = require('passport-jwt');
const { Strategy, ExtractJwt } = passportJwt;

const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const signin = async (req) => {
  const body = req.data
  const { passphrase } = process.env;  
  
  const where = { email: body.email };
  const user = await User.findOne({ order: { id: 'DESC' }, where });

  if (!user) throw ['Usuário não encontrado'];
  if (!bcrypt.compareSync(body.password, user.password)) throw ['Senha incorreta'];

  const now = Math.floor(Date.now() / 1000);
  const payload = {
    id: user.id,
    email: user.email,
    iat: now,
    exp: now + 60 * 60 * 10,
  };

  return {
    ...payload,
    token: jwt.encode(payload, passphrase),
  };
};

const signup = async (req) => {
  const body = req.data
  if (!body.email || !body.password) throw ['E-mail e senha são obrigatórios'];

  if (await User.findOne({ where: { email: body.email } })) throw ['Usuário já cadastrado'];

  const user = new User();

  user.email = body.email;
  user.password = encryptPassword(body.password);

  const {password, ...data} = await user.save()
  
  return data;
};

const authMiddleware = () => {
  const { passphrase } = process.env;
  const params = {
    secretOrKey: passphrase,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  const strategy = new Strategy(params, (payload, done) => {
    User.findOne({ where: { id: payload.id } })
      .then(user => done(null, user ? { ...payload } : false))
      .catch(err => done(err, false));
  });

  passport.use(strategy);    

  return passport.authenticate('jwt', { session: false })  
};

export default {
  signin,
  signup,
  authMiddleware,
};
