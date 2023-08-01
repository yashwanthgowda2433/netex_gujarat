const User = require('../../models/userModel')
const Task = require('../../models/taskModel')

const ANALYST = process.env.ANALYST;
const FIELD_ENGINEER = process.env.FIELD_ENGINEER;
const ACTIVE = process.env.ACTIVE;
const INACTIVE = process.env.INACTIVE;
const IS_OPTI = process.env.IS_OPTI;
const NOT_OPTI = process.env.NOT_OPTI;
const DELETED = process.env.DELETED;
const NOT_DELETED = process.env.NOT_DELETED;

// add a task
const addAnalystTask = async (req, res) => {
    const user = req.user
    const task_data = req.body

    if(user)
    {
        if(user.user_role == ANALYST)
        {
            try {
                const task = await Task.add(task_data);
            
                if(task){
                    res.status(200).json({status:"Success", message: "Successfully created!"})
                }else{
                  res.status(200).json({status:"Error", message: "Failed to create, try again later!"})
            
                }
            } catch (error) {
                console.log(error)
                res.status(200).json({status:"Error", message: error.message})
            }
        }else{
            res.status(200).json({status:"Error", message: "You Don't have permission access to this feature."})
        }
        
    }else{
        res.status(200).json({status:"Error", message: "Authorization failed!"})
    }
  
    
}

module.exports = { addAnalystTask }

