const {
    task_analyzed_options, task_analyzed_options_pending, task_analyzed_options_progress, task_analyzed_options_completed, task_analyzed_options_closed, analyzed_no, analyzed_yes, sla_forward_to_zone_yes, sla_forward_to_zone_no, tla_status_update_yes,tla_status_update_no, sla_submit_options, sla_fwz_options_zone, sla_issue_options, tla_submit_options, tla_save_options, rf_save_options, c_id_details, c_id_count, cellid_array, twog_rx_lev_pts, twog_rx_qual_pts, threeg_rscp_pts, threeg_ec_io_pts,fourg_rsrp_pts, fourg_rsrq_pts, fourg_sinr_pts, twog_rx_lev_good, twog_rx_lev_bad, twog_rx_lev_poor, twog_rx_qual_good,twog_rx_qual_bad, twog_rx_qual_poor, threeg_rscp_good, threeg_rscp_bad, threeg_rscp_poor, threeg_ec_io_good, threeg_ec_io_bad,threeg_ec_io_poor, fourg_rsrp_good, fourg_rsrp_bad, fourg_rsrp_poor, fourg_rsrq_good, fourg_rsrq_bad, fourg_rsrq_poor, fourg_sinr_good,fourg_sinr_bad, fourg_sinr_poor, twog_rx_lev_pts_outdoor, twog_rx_qual_pts_outdoor, threeg_rscp_pts_outdoor, threeg_ec_io_pts_outdoor,fourg_rsrp_pts_outdoor, fourg_rsrq_pts_outdoor, fourg_sinr_pts_outdoor, twog_rx_lev_good_outdoor, twog_rx_lev_bad_outdoor,twog_rx_lev_poor_outdoor, twog_rx_qual_good_outdoor, twog_rx_qual_bad_outdoor, twog_rx_qual_poor_outdoor, threeg_rscp_good_outdoor,threeg_rscp_bad_outdoor, threeg_rscp_poor_outdoor, threeg_ec_io_good_outdoor, threeg_ec_io_bad_outdoor, threeg_ec_io_poor_outdoor,fourg_rsrp_good_outdoor, fourg_rsrp_bad_outdoor, fourg_rsrp_poor_outdoor, fourg_rsrq_good_outdoor, fourg_rsrq_bad_outdoor,fourg_rsrq_poor_outdoor, fourg_sinr_good_outdoor, fourg_sinr_bad_outdoor, fourg_sinr_poor_outdoor, twog_rx_lev_pts_balcony,twog_rx_qual_pts_balcony, threeg_rscp_pts_balcony, threeg_ec_io_pts_balcony, fourg_rsrp_pts_balcony, fourg_rsrq_pts_balcony,fourg_sinr_pts_balcony, twog_rx_lev_good_balcony, twog_rx_lev_bad_balcony, twog_rx_lev_poor_balcony, twog_rx_qual_good_balcony,twog_rx_qual_bad_balcony, twog_rx_qual_poor_balcony, threeg_rscp_good_balcony, threeg_rscp_bad_balcony, threeg_rscp_poor_balcony,threeg_ec_io_good_balcony, threeg_ec_io_bad_balcony, threeg_ec_io_poor_balcony, fourg_rsrp_good_balcony, fourg_rsrp_bad_balcony,fourg_rsrp_poor_balcony, fourg_rsrq_good_balcony, fourg_rsrq_bad_balcony, fourg_rsrq_poor_balcony, fourg_sinr_good_balcony, fourg_sinr_bad_balcony, fourg_sinr_poor_balcony, twog_rx_lev_pts_terrace, twog_rx_qual_pts_terrace, threeg_rscp_pts_terrace, threeg_ec_io_pts_terrace, fourg_rsrp_pts_terrace, fourg_rsrq_pts_terrace, fourg_sinr_pts_terrace, twog_rx_lev_good_terrace, twog_rx_lev_bad_terrace, twog_rx_lev_poor_terrace, twog_rx_qual_good_terrace, twog_rx_qual_bad_terrace, twog_rx_qual_poor_terrace, threeg_rscp_good_terrace, threeg_rscp_bad_terrace, threeg_rscp_poor_terrace, threeg_ec_io_good_terrace, threeg_ec_io_bad_terrace, threeg_ec_io_poor_terrace, fourg_rsrp_good_terrace, fourg_rsrp_bad_terrace, fourg_rsrp_poor_terrace, fourg_rsrq_good_terrace, fourg_rsrq_bad_terrace, fourg_rsrq_poor_terrace, fourg_sinr_good_terrace, fourg_sinr_bad_terrace, fourg_sinr_poor_terrace
} = require("../../../global_variables/test_report_variables");

const User = require('../../../models/userModel');
const Task = require('../../../models/taskModel');
const Test = require('../../../models/test_reportModel');

const addTest = async (user, test_data, task_id) => {
    console.log(task_id)
    if (task_id == "") {
        throw Error('Employee must be Select')
    }

    var data = {};
    data.testreport_task_id = task_id;
    data.testreport_indoor = test_data.indoor ? JSON.stringify(test_data.indoor) : "";
    data.testreport_outdoor = test_data.outdoor ? JSON.stringify(test_data.outdoor) : "";
    data.testreport_terrace = test_data.terrace ? JSON.stringify(test_data.terrace) : "";
    data.testreport_balcony = test_data.balcony ? JSON.stringify(test_data.balcony) : "";
    data.testreport_rf_indoor = test_data.rf_indoor ? JSON.stringify(test_data.rf_indoor) : "";
    data.testreport_rf_outdoor = test_data.rf_outdoor ? JSON.stringify(test_data.rf_outdoor) : "";
    data.testreport_rf_terrace = test_data.rf_terrace ? JSON.stringify(test_data.rf_terrace ): "";
    data.testreport_rf_balcony = test_data.rf_balcony ? JSON.stringify(test_data.rf_balcony) : "";
    data.testreport_upload_speed = test_data.upload_speed ? test_data.upload_speed : "";
    data.testreport_download_speed = test_data.download_speed ? test_data.download_speed : "";
    data.testreport_walkdrive = test_data.walkdrive ? test_data.walkdrive : "";
    data.testreport_rf_walkdrive = test_data.rf_walkdrive ? test_data.rf_walkdrive : "";
    data.testreport_dataDiagnosticTest = test_data.dataDiagnosticTest ? test_data.dataDiagnosticTest : "";
    data.testreport_speedtest_mode = test_data.speedtest_mode ? test_data.speedtest_mode : "";
    data.testreport_complaint_type = test_data.complaint_type ? test_data.complaint_type : "";
    data.testreport_customer_comments = test_data.customer_comments ? test_data.customer_comments : "";
    data.testreport_resolved_status = test_data.resolved_status ? test_data.resolved_status : "";
    data.testreport_rf_complaint_type = test_data.rf_complaint_type ? test_data.rf_complaint_type : "";
    data.testreport_rf_customer_comments = test_data.rf_customer_comments ? test_data.rf_customer_comments : "";
    data.testreport_rf_speedtest_mode = test_data.rf_speedtest_mode ? test_data.rf_speedtest_mode : "";
    data.testreport_fl_remarks = test_data.fl_remarks ? test_data.fl_remarks : "";
    data.testreport_fl_suspected_kl_id = test_data.fl_suspected_kl_id ? test_data.fl_suspected_kl_id : "";
    data.testreport_l3_remarks = test_data.l3_remarks ? test_data.l3_remarks : "";
    data.testreport_l2_remarks = test_data.l2_remarks ? test_data.l2_remarks : "";
    data.testreport_l2_resolution_code = test_data.l2_resolution_code ? test_data.l2_resolution_code : "";
    data.testreport_l2_sl_issue_technology = test_data.l2_sl_issue_technology ? test_data.l2_sl_issue_technology : "";
    data.testreport_l2_suspected_kl_id = test_data.l2_suspected_kl_id ? test_data.l2_suspected_kl_id : "";
    data.testreport_l2_sl_tat = test_data.l2_sl_tat ? test_data.l2_sl_tat : "";
    data.testreport_l2_sl_submitted_on = test_data.l2_sl_submitted_on ? test_data.l2_sl_submitted_on : "";
    data.testreport_l2_sl_stage = test_data.l2_sl_stage ? test_data.l2_sl_stage : "";
    data.testreport_l3_sl_issue_technology = test_data.l3_sl_issue_technology ? test_data.l3_sl_issue_technology : "";
    data.testreport_l3_suspected_kl_id = test_data.l3_suspected_kl_id ? test_data.l3_suspected_kl_id : "";
    data.testreport_l3_sl_tat = test_data.l3_sl_tat ? test_data.l3_sl_tat : "";
    data.testreport_l3_sl_submitted_on = test_data.l3_sl_submitted_on ? test_data.l3_sl_submitted_on : "";
    data.testreport_l3_sl_stage = test_data.l3_sl_stage ? test_data.l3_sl_stage : "";
    data.testreport_zone_remarks = test_data.zone_remarks ? test_data.zone_remarks : "";
    data.testreport_zone_sl_issue_technology = test_data.zone_sl_issue_technology ? test_data.zone_sl_issue_technology : "";
    data.testreport_zone_suspected_kl_id = test_data.zone_suspected_kl_id ? test_data.zone_suspected_kl_id : "";
    data.testreport_zone_sl_tat = test_data.zone_sl_tat ? test_data.zone_sl_tat : "";
    data.testreport_zone_sl_submitted_on = test_data.zone_sl_submitted_on ? test_data.zone_sl_submitted_on : "";
    data.testreport_zone_sl_stage = test_data.zone_sl_stage ? test_data.zone_sl_stage : "";
    data.testreport_sl_remarks = test_data.sl_remarks ? test_data.sl_remarks : "";
    data.testreport_sl_issue_technology = test_data.sl_issue_technology ? test_data.sl_issue_technology : "";
    data.testreport_suspected_kl_id = test_data.suspected_kl_id ? test_data.suspected_kl_id : "";
    data.testreport_sl_tat = test_data.sl_tat ? test_data.sl_tat : "";
    data.testreport_sl_submitted_on = test_data.sl_submitted_on ? test_data.sl_submitted_on : "";
    data.testreport_sl_stage = test_data.sl_stage ? test_data.sl_stage : "";
    data.testreport_zonename = test_data.zonename ? test_data.zonename : "";
    data.testreport_analysed_by = test_data.analysed_by ? test_data.analysed_by : "";
    data.testreport_is_fwz = test_data.is_fwz ? test_data.is_fwz : "";
    data.testreport_zone_id = test_data.zone_id ? test_data.zone_id : "";
    data.testreport_analysed_by_team = test_data.analysed_by_team ? test_data.analysed_by_team : "";
    data.analysed_by_l2 = test_data.analysed_by_l2 ? test_data.analysed_by_l2 : "";
    data.analysed_by_l3 = test_data.analysed_by_l3 ? test_data.analysed_by_l3 : "";
    data.analysed_by_rf = test_data.analysed_by_rf ? test_data.analysed_by_rf : "";
    data.analysed_by_zone = test_data.analysed_by_zone ? test_data.analysed_by_zone : "";
    data.testreport_tl_remarks = test_data.tl_remarks ? test_data.tl_remarks : "";
    data.testreport_issue_kl_id = test_data.issue_kl_id ? test_data.issue_kl_id : "";
    data.testreport_tl_tat = test_data.tl_tat ? test_data.tl_tat : "";
    data.testreport_tl_submitted_on = test_data.tl_submitted_on ? test_data.tl_submitted_on : "";
    data.testreport_tl_target_date = test_data.tl_target_date ? test_data.tl_target_date : "";
    data.testreport_tl_stage_date = test_data.tl_stage_date ? test_data.tl_stage_date : "";
    data.testreport_tl_stage = test_data.tl_stage ? test_data.tl_stage : "";
    data.testreport_tl_is_supdate = test_data.tl_is_supdate ? test_data.tl_is_supdate : "";
    data.testreport_zone_is_supdate = test_data.zone_is_supdate ? test_data.zone_is_supdate : "";
    data.testreport_analyzed_status = test_data.analyzed_status ? test_data.analyzed_status : "";
    data.url_string = test_data.url_string ? test_data.url_string : "";
    data.rfurl_string = test_data.rfurl_string ? test_data.rfurl_string : "";
    data.test_visit_upload = test_data.visit_upload ? test_data.visit_upload : "";
    data.rf_test_visit_upload = test_data.rf_visit_upload ? test_data.rf_visit_upload : "";
    data.testreport_createdon = new Date();
    data.testreport_modifiedon = new Date();
    
    const exists = await Test.findOne({ testreport_task_id:task_id })
    if (exists) {
        var where = { testreport_task_id : task_id };
        var new_values = { $set : data }

        const test_update = await Test.updateOne(where, new_values)
        if(test_update)
        {
                return true;

        }else{
                return false;
        }
    }else{
        const test_add = await Test.create(data);
        if(test_add)
        {
                return true;

        }else{
                return false;
        }
    }
    // return true;

}


const getTestReport = async (data) => {
    const test_data = await Test.findOne({testreport_task_id:data.task_id});
    return test_data;
}

const getTestReportExists = async (data) => {
    const test_data = await Test.findOne({testreport_task_id:data.task_id});
    if(test_data){
        return true;
    }else{
        return false;
    }
}

module.exports = { addTest, getTestReport, getTestReportExists }