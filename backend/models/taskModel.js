const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const crypto = require('crypto')

const Schema = mongoose.Schema

const taskSchema = new Schema({
    task_employee_id:{
        type: String,
        default:"",
        required:true
    },
    task_rf_employee_id:{
        type: String,
        default:""
    },
    task_post_rf_employee_id:{
        type: String,
        default:""
    },
    task_zone_employee_id:{
        type: String,
        default:""
    },
    task_fwd_dept_id: {
        type: String,
        default:""
    },
    task_crystal_date: {
        type: Date,
        default:""
    },
    task_issue_date: {
        type: String,
        default:""
    },
    task_crm_uploaddate: {
        type: Date,
        default:""
    },
    task_crm_due_date: {
        type: Date,
        default:""
    },
    task_sr_no: {
        type: String,
        default:""
    },
    task_issue_in: {
        type: String,
        default:""
    },
    task_issue_technology: {
        type: String,
        default:""
    },
    task_distance: {
        type: Number,
        default:""
    },
    task_duration: {
        type: String,
        default:""
    },
    task_end_latitude: {
        type: Number,
        default:""
    },
    task_end_longitude: {
        type: Number,
        default:""
    },
    task_latitude: {
        type: Number,
        default:""
    },
    task_rflongitude: {
        type: Number,
        default:""
    },
    task_rflatitude: {
        type: Number,
        default:""
    },
    task_longitude: {
        type: Number,
        default:""
    },
    task_accuracy: {
        type: Number,
        default:""
    },
    task_rfaccuracy: {
        type: Number,
        default:""
    },
    task_cancel_longitude: {
        type: Number,
        default:""
    },
    task_cancel_latitude: {
        type: Number,
        default:""
    },
    task_location: {
        type: String,
        default:""
    },
    task_landmark: {
        type: String,
        default:""
    },
    task_pincode: {
        type: String,
        default:""
    },
    task_customer_name: {
        type: String,
        default:""
    },
    task_mobile_number: {
        type: String,
        default:""
    },
    task_alternate_mobile: {
        type: String,
        default:""
    },
    task_subscription_type: {
        type: Number,
        default:""
    },
    task_network_type: {
        type: String,
        default:""
    },
    task_customer_category: {
        type: Number,
        default:""
    },
    task_issue_category: {
        type: String,
        default:""
    },
    task_bulk_segment: {
        type: String,
        default:""
    },
    task_kpi_issue_identified: {
        type: String,
        default:""
    },
    task_customer_inputs: {
        type: String,
        default:""
    },
    task_out_called: {
        type: String,
        default:""
    },
    task_zone_id: {
        type: String,
        default:""
    },
    task_serving_site: {
        type: String,
        default:""
    },
    task_district: {
        type: String,
        default:""
    },
    task_cluster: {
        type: String,
        default:""
    },
    task_customer_distance: {
        type: String,
        default:""
    },
    task_area: {
        type: String,
        default:""
    },
    task_congestion: {
        type: String,
        default:""
    },
    task_taluk: {
        type: String,
        default:""
    },
    task_verified_address: {
        type: String,
        default:""
    },
    task_connected: {
        type: String,
        default:""
    },
    task_appartment: {
        type: String,
        default:""
    },
    task_floor: {
        type: String,
        default:""
    },
    task_customer_floor: {
        type: String,
        default:""
    },
    task_problem_since: {
        type: String,
        default:""
    },
    task_specific_timing: {
        type: String,
        default:""
    },
    task_handset_bars: {
        type: String,
        default:""
    },
    task_indoor_outdoor: {
        type: String,
        default:""
    },
    task_office_residence: {
        type: String,
        default:""
    },
    task_issue_type: {
        type: String,
        default:""
    },
    task_voice_type: {
        type: String,
        default:""
    },
    task_data_type: {
        type: String,
        default:""
    },
    task_balance: {
        type: String,
        default:""
    },
    task_validity: {
        type: String,
        default:""
    },
    task_data_plan: {
        type: String,
        default:""
    },
    task_data_usage: {
        type: String,
        default:""
    },
    task_outcall_time: {
        type: String,
        default:""
    },
    task_browsing_type: {
        type: String,
        default:""
    },
    task_resolution_code: {
        type: String,
        default:""
    },
    task_fl_congestion_kl_id: {
        type: String,
        default:""
    },
    task_company_name: {
        type: String,
        default:""
    },
    task_tat: {
        type: Date,
        default:""
    },
    task_rftat: {
        type: String,
        default:""
    },
    task_datetime: {
        type: Date,
        default:""
    },
    task_start_datetime: {
        type: Date,
        default:""
    },
    task_end_datetime: {
        type: Date,
        default:""
    },
    task_rf_end_datetime: {
        type: Date,
        default:""
    },
    testing_end_datetime: {
        type: Date,
        default:""
    },
    rf_testing_end_datetime: {
        type: Date,
        default:""
    },
    task_rf_testing_end_datetime: {
        type: Date,
        default:""
    },
    task_reached_location: {
        type: String,
        default:""
    },
    task_issue_details: {
        type: String,
        default:""
    },
    task_sr_sub_type: {
        type: String,
        default:""
    },
    task_media: {
        type: String,
        default:""
    },
    task_submedia: {
        type: String,
        default:""
    },
    task_reached_datetime: {
        type: Date,
        default:""
    },
    task_rf_reached_datetime: {
        type: Date,
        default:""
    },
    task_appointment_datetime: {
        type: Date,
        default:""
    },
    task_addedby: {
        type: String,
        default:""
    },
    task_addedby_l2: {
        type: String,
        default:""
    },
    task_closedby_l2: {
        type: String,
        default:""
    },
    task_subscriber_type: {
        type: String,
        default:""
    },
    task_complaint_category: {
        type: String,
        default:""
    },
    task_postpaid_sub_type: {
        type: String,
        default:""
    },
    task_remarks: {
        type: String,
        default:""
    },
    task_brand: {
        type: String,
        default:""
    },
    task_signal_bar: {
        type: String,
        default:""
    },
    task_l2_close_p1_p2: {
        type: String,
        default:""
    },
    task_l2_close_root: {
        type: String,
        default:""
    },
    task_l2_close_service_affected: {
        type: String,
        default:""
    },
    task_l2_close_details: {
        type: String,
        default:""
    },
    task_prepaid_remark: {
        type: String,
        default:""
    },
    task_canceled_remarks: {
        type: String,
        default:""
    },
    task_final_remarks: {
        type: String,
        default:""
    },
    task_remarks_addedby: {
        type: String,
        default:""
    },
    task_attempt_count: {
        type: Number,
        default:0
    },
    task_questionnaires: {
        type: String,
        default:""
    },
    task_rfquestionnaires: {
        type: String,
        default:""
    },
    task_postquestionnaires: {
        type: String,
        default:""
    },
    task_prequestionnaires: {
        type: String,
        default:""
    },
    task_cancelled_on: {
        type: Date,
        default:""
    },
    task_visit_upload: {
        type: String,
        default:""
    },
    task_rfvisit_upload: {
        type: String,
        default:""
    },
    task_is_fieldvisit: {
        type: Number,
        default:0
    },
    task_is_assigned: {
        type: Number,
        default:0
    },
    task_is_rf_fieldvisit: {
        type: Number,
        default:0
    },
    task_withdrawn: {
        type: Number,
        default:0
    },

    task_withdrawn_on: {
        type: Date,
        default:""
    },
    task_assigned_on: {
        type: Date,
        default:""
    },
    task_fwdtoteam_on: {
        type: Date,
        default:""
    },
    task_fwdtoteam_by: {
        type: String,
        default:""
    },
    task_fwdtozone_on: {
        type: Date,
        default:""
    },
    task_fwdtozone_by: {
        type: String,
        default:""
    },
    task_fwdtofe_on: {
        type: Date,
        default:""
    },
    task_forwardtoanalyst: {
        type: String,
        default:""
    },
    task_fwdtoanalyst_by: {
        type: String,
        default:""
    },
    task_fwdtoanalyst_on: {
        type: Date,
        default:""
    },
    task_closed_on: {
        type: Date,
        default:""
    },
    task_fwdtofe: {
        type: Number,
        default:0
    },
    task_fwdtol2_on: {
        type: Date,
        default:""
    },
    task_outcallclosed_on: {
        type: Date,
        default:""
    },
    created_by_group: {
        type: String,
        default:""
    },
    task_rth_flag: {
        type: Number,
        default:""
    },
    task_is_reassign: {
        type: Number,
        default:""
    },
    task_is_postopti: {
        type: Number,
        default:""
    },
    task_is_closed_fv: {
        type: Number,
        default:""
    },
    task_post_datetime: {
        type: Date,
        default:""
    },
    task_post_assignedon: {
        type: Date,
        default:""
    },
    task_saved_attended_on: {
        type: Date,
        default:""
    },
    task_is_save_submit: {
        type: Number,
        default:""
    },
    task_status: {
        type: Number,
        default:0
    },
    task_deleted: {
        type: Number,
        default:0
    },
    task_createdon: {
        type: Date,
        default: new Date(),
    },
    task_modifiedon: {
        type: Date,
        default: new Date(),
    }
})

// static add method
taskSchema.statics.add = async function(task_data) {
    return true;
}


module.exports = mongoose.model('Task', taskSchema)
