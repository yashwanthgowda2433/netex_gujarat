const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const crypto = require('crypto')

const Schema = mongoose.Schema
const transferRequestSchema = new Schema({
    transfer_user_id:
    {
        type:String,
        default:""
    },
    transfer_task_id:
    {
        type:String,
        default:""
    },
    transfer_reason:
    {
        type:String,
        default:""
        
    },
    transfer_to:
    {
        type:String,
        default:""
        
    },
    transfer_approvedby:
    {
        type:String,
        default:""
        
    },
    transfer_approvedon:
    {
        type:Date,
        default:""
        
    },
    transfer_rejectedby:
    {
        type:Number,
        default:""
        
    },
    transfer_rejectedon:
    {
        type:Date,
        default:""
        
    },
    transfer_status:
    {
        type:Number,
        default:""
        
    },
    transfer_deleted:
    {
        type:Number,
        default:""
        
    },
    transfer_createdon:
    {
        type: Date,
        default: new Date(),
    },
    transfer_modifiedon:
    {
        type: Date,
        default: new Date(),
    }
    })
    module.exports = mongoose.model('TransferRequests', transferRequestSchema)
