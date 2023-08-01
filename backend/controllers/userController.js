const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const ANALYST = process.env.ANALYST;
const FIELD_ENGINEER = process.env.FIELD_ENGINEER;
const ACTIVE = process.env.ACTIVE;
const INACTIVE = process.env.INACTIVE;
const IS_OPTI = process.env.IS_OPTI;
const NOT_OPTI = process.env.NOT_OPTI;
const DELETED = process.env.DELETED;
const NOT_DELETED = process.env.NOT_DELETED;


const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body

  try {
    const user_data = await User.login(email, password);
    const user_json = JSON.stringify(user_data)
    
    // create a token
    var token2 = createToken(user_data._id)
    const tok_obj3 = {token:token2};
    
    //append token
    const new_user = Object.assign(tok_obj3,JSON.parse(user_json))
    
    if(user_data){
        res.status(200).json({status:"Success", data:{user:new_user}})
    }else{
        res.status(200).json({status:"Error", message: "Failed to login, try again later!"})
    }
  } catch (error) {
    var err_message = "";
    if(error.message){
      err_message=error.message;
    }
    res.status(200).json({status:"Error", message: err_message})

  }
}

// signup a user
const addUser = async (req, res) => {
  const user_data = req.body

  try {
    const user = await User.addUser(user_data)

    if(user){
        res.status(200).json({status:"Success", message: "Successfully created!"})
    }else{
      res.status(200).json({status:"Error", message: "Failed to create, try again later!"})

    }
  } catch (error) {
    console.log(error)
    res.status(200).json({status:"Error", message: error.message})
  }
}


// ANALYST FUNCTIONS START
const getAnalystOptiEngineers = async (req, res)=>{

  const user = req.user;
  
  if(user){
    if(user.user_role == ANALYST)
    {
      try {
          const user_data = await User.find({$and:[{user_status:ACTIVE},{user_confirmationstatus:ACTIVE},{user_deleted:NOT_DELETED},{ user_role:FIELD_ENGINEER},{user_addedby:user._id}]})
          res.status(200).json({status:"Success", data:user_data})

      }
      catch(error)
      {
          res.status(200).json({status:"Error", message: error.message})
      }
    }else{
      res.status(200).json({status:"Error", message: "You Don't have permission access to this feature."})
    }
  }else{
    res.status(200).json({status:"Error", message: "Authorization failed!"})
  }

}
// ANALYST FUNCTIONS END


module.exports = { addUser, loginUser, getAnalystOptiEngineers }