const jwt = require('jsonwebtoken')
const secret = "665ed4b4ecbebdabf872e736"
const isLogin = (req ,res , next) => {
    let token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({error:"Unidentified , please Login to Continue" , success:false})
    } else {
        try {
            let login = jwt.verify(token, secret);
            if (login) {
               req.user = login;
                 
               next();
            }
        } catch (error) {
            return res.status(401).send({error:"Something Went Wrong" , success:false , message :error.message})
        }

    }
}

module.exports = isLogin;