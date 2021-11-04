const LocalStrategy = require('passport-local').Strategy;
const { pool } = require('./db');
const bcrypt = require('bcrypt');

const initialize = (passport) => {
    const authenticateUser = (username, password, done) => {
        //Checking the DB to ensure the user exists
        pool.query(
            'SELECT * FROM users WHERE username = $1', 
            [username], 
            (error, results) => {
                if(error) {
                    console.log(error);
                } else {
                    console.log(results.rows);
                    //If user exists, we assign it to the user variable
                    if(results.rows.length > 0) {
                        const user = results.rows[0];
                        //compare the password from the login page with the password in DB
                        bcrypt.compare(password, user.password, (error, isMatch) => {
                            if(error) {
                                console.log(error)
                            }
                            //If the password returns isMatch as true, we can return the done function
                            if(isMatch) {
                                return done(null, user);
                            } 
                            //If password is incorrect
                            else {
                                return done(null, false, { message: 'Password is incorrect' });
                            }
                        })
                    
                    } 
                    //If there are no users found in the DB...
                    else {
                        return done(null, false, { message: 'Username is not registered!'});
                    }
                }
            })
    }

    passport.use(new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password'
    }, authenticateUser)
    );

    //stores user.id in the session
    passport.serializeUser((user, done) => done(null, user.id));

    //Obtains the user from database
    passport.deserializeUser((id, done) => {
        pool.query(
            'SELECT * FROM users WHERE id = $1',
            [id],
            (error, results) => {
                if (error) {
                    console.log(error);
                } else {
                    return done(null, results.rows[0]);
                }
            }
        )
    });
};

module.exports = initialize;