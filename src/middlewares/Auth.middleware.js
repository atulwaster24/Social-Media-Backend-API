import jwt from "jsonwebtoken";

export const Authentication = (req, res, next)=>{
    try {
        const token = req.cookies.authToken;
        if(!token){
            return res.status(401).json({"Message": "Unauthorized access. Login To Access path."})
        }
        const payload = jwt.verify(token, process.env.SecretKey);
        req.userId = payload.userId;
    } catch (error) {
        return res.status(400).send(error.message);
    }
    next();
}