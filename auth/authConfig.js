var passport = require("passport");
const Strategy = require("passport-local").Strategy;
// const db = require("./db");

module.exports = function configurePassport(app) {
  console.log("configuring passport");

  function findByUsername(username) {
    return username === "John"
      ? { username: "John", password: "JohnKnows" }
      : null;
  }

  // Configure the local strategy for use by Passport.
  //
  // The local strategy require a `verify` function which receives the credentials
  // (`username` and `password`) submitted by the user.  The function must verify
  // that the password is correct and then invoke `cb` with a user object, which
  // will be set at `req.user` in route handlers after authentication.
  passport.use(
    new Strategy(async function (username, password, cb) {
      console.log("Authenticating", username, password);

      try {
        const user = await findByUsername(username);
        // Didn't find the user
        if (!user) {
          console.log("User not found");
          return cb(null, false);
        }
        if (user.password !== password) {
          console.log("Wrong password");
          return cb(null, false);
        }

        console.log("User athenticated");
        return cb(null, user);
      } catch (err) {
        console.log("Error auth", err);
        return cb(err, null);
      }
    })
  );

  // Configure Passport authenticated session persistence.
  //
  // In order to restore authentication state across HTTP requests, Passport needs
  // to serialize users into and deserialize users out of the session.  The
  // typical implementation of this is as simple as supplying the user ID when
  // serializing, and querying the user record by ID from the database when
  // deserializing.
  passport.serializeUser(function (user, cb) {
    cb(null, user.username);
  });

  passport.deserializeUser(async function (username, cb) {
    try {
      const user = await findByUsername(username);
      cb(null, user);
    } catch (err) {
      cb(err);
    }
  });

  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(
    require("express-session")({
      secret: "yeah I'm original",
      resave: false,
      saveUninitialized: false,
    })
  );

  // Initialize Passport and restore authentication state, if any, from the
  // session.
  app.use(passport.initialize());
  app.use(passport.session());
};
