const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const crypto = require('crypto')

const Schema = mongoose.Schema

const testReportSchema = new Schema({
    testreport_task_id: {
        type: String,
        default: ""
        
    },
    testreport_indoor: {
        type: String,
        default: ""
        
    },
    testreport_outdoor: {
        type: String,
        default: ""
        
    },
    testreport_terrace: {
        type: String,
        default: ""
        
    },
    testreport_balcony: {
        type: String,
        default: ""
        
    },
    testreport_rf_indoor: {
        type: String,
        default: ""
        
    },
    testreport_rf_outdoor: {
        type: String,
        default: ""
        
    },
    testreport_rf_terrace: {
        type: String,
        default: ""
        
    },
    testreport_rf_balcony: {
        type: String,
        default: ""
        
    },
    testreport_upload_speed: {
        type: String,
        default: ""
        
    },
    testreport_download_speed: {
        type: String,
        default: ""
        
    },
    testreport_walkdrive: {
        type: String,
        default: ""
        
    },
    testreport_rf_walkdrive: {
        type: String,
        default: ""
        
    },
    testreport_dataDiagnosticTest: {
        type: String,
        default: ""
        
    },
    testreport_speedtest_mode: {
        type: String,
        default: ""
        
    },
    testreport_complaint_type: {
        type: String,
        default: ""
        
    },
    testreport_customer_comments: {
        type: String,
        default: ""
        
    },
    testreport_resolved_status: {
        type: String,
        default: ""
        
    },
    testreport_rf_resolved_status: {
        type: String,
        default: ""
        
    },
    testreport_rf_complaint_type: {
        type: String,
        default: ""
        
    },
    testreport_rf_customer_comments: {
        type: String,
        default: ""
        
    },
    testreport_rf_speedtest_mode: {
        type: String,
        default: ""
        
    },
    testreport_fl_remarks: {
        type: String,
        default: ""
        
    },
    testreport_fl_suspected_kl_id: {
        type: String,
        default: ""
        
    },
    testreport_l3_remarks: {
        type: String,
        default: ""
        
    },
    testreport_l2_remarks: {
        type: String,
        default: ""
        
    },
    testreport_l2_resolution_code: {
        type: String,
        default: ""
        
    },
    testreport_l2_sl_issue_technology: {
        type: String,
        default: ""
        
    },
    testreport_l2_suspected_kl_id: {
        type: String,
        default: ""
        
    },
    testreport_l2_sl_tat: {
        type: String,
        default: ""
        
    },
    testreport_l2_sl_submitted_on: {
        type: Date,
        default: ""
        
    },
    testreport_l2_sl_stage: {
        type: String,
        default: ""
        
    },
    testreport_l3_sl_issue_technology: {
        type: String,
        default: ""
        
    },
    testreport_l3_suspected_kl_id: {
        type: String,
        default: ""
        
    },
    testreport_l3_sl_tat: {
        type: String,
        default: ""
        
    },
    testreport_l3_sl_submitted_on: {
        type: Date,
        default: ""
        
    },
    testreport_l3_sl_stage: {
        type: Number,
        default: ""
        
    },
    testreport_zone_remarks: {
        type: String,
        default: ""
        
    },
    testreport_zone_sl_issue_technology: {
        type: String,
        default: ""
        
    },
    testreport_zone_suspected_kl_id: {
        type: String,
        default: ""
        
    },
    testreport_zone_sl_tat: {
        type: String,
        default: ""
        
    },
    testreport_zone_sl_submitted_on: {
        type: Date,
        default: ""
        
    },
    testreport_zone_sl_stage: {
        type: String,
        default: ""
        
    },
    testreport_sl_remarks: {
        type: String,
        default: ""
        
    },
    testreport_sl_issue_technology: {
        type: String,
        default: ""
        
    },
    testreport_suspected_kl_id: {
        type: String,
        default: ""
        
    },
    testreport_sl_tat: {
        type: String,
        default: ""
        
    },
    testreport_sl_submitted_on: {
        type: Date,
        default: ""
        
    },
    testreport_sl_stage: {
        type: String,
        default: ""
        
    },
    testreport_zonename: {
        type: String,
        default: ""
        
    },
    testreport_analysed_by: {
        type: String,
        default: ""
        
    },
    testreport_is_fwz: {
        type: Number,
        default: ""
        
    },
    testreport_zone_id: {
        type: Number,
        default: ""
        
    },
    testreport_analysed_by_team: {
        type: String,
        default: ""
        
    },
    analysed_by_l2: {
        type: String,
        default: ""
        
    },
    analysed_by_l3: {
        type: String,
        default: ""
        
    },
    analysed_by_rf: {
        type: String,
        default: ""
        
    },
    analysed_by_zone: {
        type: String,
        default: ""
        
    },
    testreport_tl_remarks: {
        type: String,
        default: ""
        
    },
    testreport_issue_kl_id: {
        type: String,
        default: ""
        
    },
    testreport_tl_tat: {
        type: String,
        default: ""
        
    },
    testreport_tl_submitted_on: {
        type: Date,
        default: ""
        
    },
    testreport_tl_target_date: {
        type: Date,
        default: ""
        
    },
    testreport_tl_stage_date: {
        type: Date,
        default: ""
        
    },
    testreport_tl_stage: {
        type: String,
        default: ""
        
    },
    testreport_tl_is_supdate: {
        type: Number,
        default: ""
        
    },
    testreport_zone_is_supdate: {
        type: Number,
        default: ""
        
    },
    testreport_analyzed_status: {
        type: Number,
        default: ""
        
    },
    url_string: {
        type: String,
        default: ""
        
    },
    rfurl_string: {
        type: String,
        default: ""
        
    },
    test_visit_upload: {
        type: String,
        default: ""
        
    },
    rf_test_visit_upload: {
        type: String,
        default: ""
        
    },
    testreport_createdon: {
        type: Date,
        default: ""
        
    },
    testreport_modifiedon: {
        type: Date,
        default: ""
        
    }


})

module.exports = mongoose.model('TestReports', testReportSchema)