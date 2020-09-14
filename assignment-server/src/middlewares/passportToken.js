import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { ExtractJwt } from "passport-jwt";
import { UserService } from "@services";

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET_KEY;
passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    const { id } = jwt_payload;
    const existedUser = await UserService.getUserById(id);
    if (!existedUser) {
      return done(new Error("Not found!"), false);
    }
    if (existedUser) {
      return done(null, existedUser);
    } else {
      return done(null, false);
      // or you could create a new account
    }
  })
);
