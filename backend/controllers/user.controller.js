import User from "../controllers/user.controller.js";

const registerUser=async(req,res)=>{
    const {username,email,password} = req.body;
    if(!user|| !email || !password) return res.status(500).json({
        success:false,
        message:"all fields are required"
    })
    try {
        
        const existngUser = await User.findOne({ email })
        if(user) return res.json({
            message:"user already exist"
        })
    
        const user = User.create({
            username,
            email,
            password
        })
        console.log(user);

        if(!user){
            return res.status(400).json({
                message: "User not registered",
            })
        }
        


    } catch (error) {
        
    }

}

export { registerUser } 