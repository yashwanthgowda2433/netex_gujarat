// import user table variables
const { active, in_active, confirmed_yes, confirmed_no, opti_yes, opti_no, super_admin,
  admin, analyst, field_engineer, zone_user, dept_user, executive, mis, l3tl, l2tl, outcall, client,
  roles, sla_fwz_depts, zones, is_logged_in_yes, is_logged_in_no, male, female, deleted_yes, deleted_no} = require('../global_variables/user_variables');

const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

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

// getUser
const getUser = async (req, res) => {
  const {user_id} = req.body

    try {
        if(user_id)
        {
            const user_data = await User.findOne({$and:[{user_status:active},{user_confirmationstatus:active},{user_deleted:deleted_no},{_id:user_id}]})

            res.status(200).json({status:"Success", data: user_data});

        }else{
          res.status(200).json({status:"Error", message: "Invalid User ID"})

        }
    } catch (error) {
        res.status(200).json({status:"Error", message: error.message})
    }
}


// ANALYST FUNCTIONS START
const getAnalystOptiEngineers = async (req, res)=>{

  const user = req.user;
  const {search_user} = req.body;
  
  if(user){
    if(user.user_role == analyst)
    {
      try {
        if(search_user){
          const user_data = await User.find({$and:[{user_status:active},{user_confirmationstatus:active},{user_deleted:deleted_no},{ user_role:field_engineer},{user_addedby:user._id}], $or:[{user_userid:{ $regex :search_user}},{user_email:{ $regex :search_user}},{user_name:{ $regex :search_user}},{user_mobile:{ $regex :search_user}}]})
          res.status(200).json({status:"Success", data:user_data})
        }else{
          const user_data = await User.find({$and:[{user_status:active},{user_confirmationstatus:active},{user_deleted:deleted_no},{ user_role:field_engineer},{user_addedby:user._id}]})
          res.status(200).json({status:"Success", data:user_data})
        }

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


module.exports = { addUser, loginUser, getUser, getAnalystOptiEngineers }