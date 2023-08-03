// import task table variables
const { rth_yes, rth_no, assigned_yes, assigned_no, reassigned_yes, reassigned_no, pending, progress, completed,
cancelled,closed,fwz,transfer,withdraw,addedbyl2_executive,fwz_to_zone,approve_for_fieldvisit,analysis_required,
analysis_required_fwdbyl3,zone_analysed,zone_closed,l3_closed,optimisationprogress,analysed,optimised,closedbyl2_executive,
resolved_and_closed,not_resolved_and_closed,closedbyl2_tl,fwd_to_l2,closedbyl2_outcall,addedbyl2_outcall,preopti,postopti,
optimisationpending,preoptipending,preoptiprogress,preopticompleted,task_status,corporate,postpaid,prepaid,escalation,vip,
employees,ebu,service_plus,repeated,social_media,outbound,my_idea,others,tat_vip,tat_employees,tat_ebu,tat_service_plus,
tat_social_media,tat_my_idea,tat_outbound,tat_repeated,tat_others,tat_customer_categories,all_network,two_g,three_g,four_g,
two_g_three_g,three_g_four_g,four_g_two_g,withdrawn_yes,withdrawn_no,fieldvisit_yes,fieldvisit_no,analyse_yes,analyse_no,		
fwdtofe_yes,fwdtofe_no,	coverage_related,voice_related,data_related,subscription_types,zones,customer_categories,cust_categories,
categories,p1_categories,esc_categories,districts,priorities,network_types,prepaid_segment,complaint_types,complaint_postpaid_types,
complaint_prepaid_types,task_status_filters,task_status_filters_dept,task_addedby_options,tat_excluded_hours,tat_start_time,
tat_end_time,tat_expired_sql,tat_calc_sql,tat_stop_sql,district_options,visit_pending_option,analyze_pending_option,dept_pending_option,
visit_progress_option,optimization_progress_option,visit_completed_option,analyze_completed_option,revertTeam_option,closedwithoutFV_option,
directL2Close_option,resolvedClosed_option,notResolvedClosed_option,
} = require('../global_variables/task_variables');

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




module.exports = mongoose.model('Task', taskSchema)
