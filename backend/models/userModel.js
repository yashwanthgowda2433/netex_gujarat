// import user table variables
const { active, in_active, confirmed_yes, confirmed_no, opti_yes, opti_no, super_admin,
  admin, analyst, field_engineer, zone_user, dept_user, executive, mis, l3tl, l2tl, outcall, client,
  roles, sla_fwz_depts, zones, is_logged_in_yes, is_logged_in_no, male, female, deleted_yes, deleted_no} = require('../global_variables/user_variables');

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const crypto = require('crypto')


const Schema = mongoose.Schema

const userSchema = new Schema({
  user_userid:{
    type: String,
    default:"",
  },
  user_project_id:{
    type: Number,
    default:0
  },
  user_zone_id:{
    type: String,
    default:""
  },
  user_name:{
    type: String,
    required:true
  },
  user_email: {
    type: String,
    required: true,
    unique: true
  },
  user_mobile:{
    type: String,
    unique: true,
    default:""
  },
  user_password: {
    type: String,
    required: true
  },
  user_gender:{
    type: Number,
    default:""
    // default: {0:"female",1:"male"},
  },
  user_dob:{
    type:Date,
    default:null
  },
  user_address:{
    type:String,
    default:null
  },
  user_state:{
    type:String,
    default:null
  },
  user_city:{
    type:String,
    default:null
  },
  user_zip:{
    type: Number,
    default:0
  },
  user_latitude:{
    type: Number,
    default:0
  },
  user_longitude:{
    type: Number,
    default:0
  },
  user_base_longitude:{
    type: Number,
    default:0
  },
  user_base_latitude:{
    type: Number,
    default:0
  },
  user_image:{
    type:String,
    default:null
  },
  user_confirmationkey:{
    type:String,
  },
  user_confirmationexpiry:{
    type:Date,
    default:""
  },
  user_confirmationstatus:{
    type: Number,
    default:1
  },
  user_forgotpasswordkey:{
    type:String,
    default:null
  },
  user_forgotpasswordexpiry:{
    type:Date,
    default:""
  },
  user_apiaccesskey:{
    type: String,
    required: true,
    unique: true
  },
  user_deleted:{
    type: Number,
    default: 0 //{0:"Not-deleted",1:"Deleted"},
  },
  user_role:{
    type: Number,
    // default: {1:"Super admin", 2:"Admin", 3:"RO employee", 4: "Field engineer"},
  },
  user_is_opti:{
    type: Number,
    default:0
  },
  user_is_logged_in:{
    type:Number,
    default:0
  },
  user_status:{
    type: Number,
    default: 1 //1:Active; 0:In-active
  },
  user_addedby:{
    type:String,
  },
  user_createdon: {
    type: Date,
    default: new Date(),
  },
  user_modifiedon: {
    type: Date,
    default: new Date(),
  }
})

// static signup method
userSchema.statics.addUser = async function(user_data) {

  // validation
  if (!user_data.email || !user_data.password) {
    throw Error('All fields must be filled')
  }
  if (!validator.isEmail(user_data.email)) {
    throw Error('Email not valid')
  }
  if (!validator.isAlpha(user_data.name)) {
    throw Error('Name not valid')
  }
  if (!validator.isNumeric(user_data.mobile)) {
    throw Error('Name not Mobile')
  }
  

  const exists = await this.findOne({$or: [{ user_email: user_data.email },{ user_mobile: user_data.mobile},{ user_userid: user_data.user_id}]})

  if (exists) {
    throw Error('Email / Mobile / User ID already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(user_data.password, salt)

  var current_date = (new Date()).valueOf().toString();
  var random = Math.random().toString();
  var api_accesskey = crypto.createHash('sha1').update(current_date + random).digest('hex');

  var data = {};

  data.user_userid = user_data.user_id ?  user_data.user_id : "";
  data.user_project_id = user_data.project_id ? user_data.project_id : "";
  data.user_zone_id = user_data.zone_id ? user_data.zone_id : "";
  data.user_name = user_data.name ? user_data.name : "";
  data.user_email = user_data.email ? user_data.email : "";
  data.user_mobile = user_data.mobile ? user_data.mobile : "";
  data.user_password = hash;
  data.user_gender = user_data.gender ? user_data.gender : "";
  data.user_dob = user_data.dob ? user_data.dob : "";
  data.user_address = user_data.address ? user_data.address : "";
  data.user_state = user_data.state ? user_data.state : "";
  data.user_city = user_data.city ? user_data.city : "";
  data.user_zip = user_data.zip ? user_data.zip : "";
  data.user_latitude = user_data.latitude ? user_data.latitude : "";
  data.user_longitude = user_data.longitude ? user_data.longitude : "";
  data.user_base_longitude = user_data.base_longitude ? user_data.base_longitude : "";
  data.user_base_latitude = user_data.base_latitude ? user_data.base_latitude : "";
  data.user_image = user_data.image ? user_data.image : "";
  data.user_confirmationkey = user_data.confirmationkey ? user_data.confirmationkey : "";
  data.user_confirmationexpiry = user_data.confirmationexpiry ? user_data.confirmationexpiry : "";
  data.user_confirmationstatus = active;
  data.user_forgotpasswordkey = user_data.forgotpasswordkey ? user_data.forgotpasswordkey : "";
  data.user_forgotpasswordexpiry = user_data.forgotpasswordexpiry ? user_data.forgotpasswordexpiry : "";
  data.user_apiaccesskey = api_accesskey;
  data.user_role = user_data.role ? user_data.role : "";
  data.user_addedby = user_data.added_by ? user_data.added_by : "";
  data.user_createdon = new Date();
  data.user_modifiedon = new Date();



  const user = await this.create(data)

  return user
}

// static login method
userSchema.statics.login = async function(email, password) {

  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const user = await this.findOne({$and: [{ user_email:email },{user_status:active},{user_confirmationstatus:active},{user_deleted:deleted_no}]})
  if (!user) {
    throw Error('Incorrect email or user not exist!')
  }

  const match = await bcrypt.compare(password, user.user_password)
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}




module.exports = mongoose.model('User', userSchema)