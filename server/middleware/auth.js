import jwt, {decode} from 'jsonwebtoken'; 
//middleware 

// if user wants to like post => he must be able to have the option to like. 
// auth middle ware will do checks and balance. takes care of the actions before they actually happen. 
// middle ware def: do this then that . . 

const auth = async (req, res, next ) =>  {
    try {

        const token = req.headers.authorization.split(" ")[1]; 
        const isCustomAuth = token.length < 500;
        
        let decodedData; 

        if(token && isCustomAuth) {
            decodedData = jwt.verify(token, 'test');

            req.userId = decodedData?.id; 

        } else {
            decodedData = jwt.decode(token); 
            // googles specific name for an id for specific user . . sub -> googles way of given a user a unique id . 
            req.userId= decodedData?.sub; 
        }
        next();
    } catch (error) {
        console.log(error);
    }
}

export default auth; 