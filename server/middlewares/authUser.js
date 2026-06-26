import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const token = req.cookies.token;

      if (!token) {
        return res.json({success: false, message: "Not authorized"});
       }

       try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (tokenDecode.id) {
          if (!req.body) req.body = {}; // ✅ Prevent crash on GET
          req.body.userId = tokenDecode.id;
        } else {
          return res.json({success: false, message: "Not authorized"});
      }

       next();
      } catch (error) {
       return res.json({success: false, message: error.message});
     }
};

export default authUser;