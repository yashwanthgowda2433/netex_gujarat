const {
    task_analyzed_options, task_analyzed_options_pending, task_analyzed_options_progress, task_analyzed_options_completed, task_analyzed_options_closed, analyzed_no, analyzed_yes, sla_forward_to_zone_yes, sla_forward_to_zone_no, tla_status_update_yes,tla_status_update_no, sla_submit_options, sla_fwz_options_zone, sla_issue_options, tla_submit_options, tla_save_options, rf_save_options, c_id_details, c_id_count, cellid_array, twog_rx_lev_pts, twog_rx_qual_pts, threeg_rscp_pts, threeg_ec_io_pts,fourg_rsrp_pts, fourg_rsrq_pts, fourg_sinr_pts, twog_rx_lev_good, twog_rx_lev_bad, twog_rx_lev_poor, twog_rx_qual_good,twog_rx_qual_bad, twog_rx_qual_poor, threeg_rscp_good, threeg_rscp_bad, threeg_rscp_poor, threeg_ec_io_good, threeg_ec_io_bad,threeg_ec_io_poor, fourg_rsrp_good, fourg_rsrp_bad, fourg_rsrp_poor, fourg_rsrq_good, fourg_rsrq_bad, fourg_rsrq_poor, fourg_sinr_good,fourg_sinr_bad, fourg_sinr_poor, twog_rx_lev_pts_outdoor, twog_rx_qual_pts_outdoor, threeg_rscp_pts_outdoor, threeg_ec_io_pts_outdoor,fourg_rsrp_pts_outdoor, fourg_rsrq_pts_outdoor, fourg_sinr_pts_outdoor, twog_rx_lev_good_outdoor, twog_rx_lev_bad_outdoor,twog_rx_lev_poor_outdoor, twog_rx_qual_good_outdoor, twog_rx_qual_bad_outdoor, twog_rx_qual_poor_outdoor, threeg_rscp_good_outdoor,threeg_rscp_bad_outdoor, threeg_rscp_poor_outdoor, threeg_ec_io_good_outdoor, threeg_ec_io_bad_outdoor, threeg_ec_io_poor_outdoor,fourg_rsrp_good_outdoor, fourg_rsrp_bad_outdoor, fourg_rsrp_poor_outdoor, fourg_rsrq_good_outdoor, fourg_rsrq_bad_outdoor,fourg_rsrq_poor_outdoor, fourg_sinr_good_outdoor, fourg_sinr_bad_outdoor, fourg_sinr_poor_outdoor, twog_rx_lev_pts_balcony,twog_rx_qual_pts_balcony, threeg_rscp_pts_balcony, threeg_ec_io_pts_balcony, fourg_rsrp_pts_balcony, fourg_rsrq_pts_balcony,fourg_sinr_pts_balcony, twog_rx_lev_good_balcony, twog_rx_lev_bad_balcony, twog_rx_lev_poor_balcony, twog_rx_qual_good_balcony,twog_rx_qual_bad_balcony, twog_rx_qual_poor_balcony, threeg_rscp_good_balcony, threeg_rscp_bad_balcony, threeg_rscp_poor_balcony,threeg_ec_io_good_balcony, threeg_ec_io_bad_balcony, threeg_ec_io_poor_balcony, fourg_rsrp_good_balcony, fourg_rsrp_bad_balcony,fourg_rsrp_poor_balcony, fourg_rsrq_good_balcony, fourg_rsrq_bad_balcony, fourg_rsrq_poor_balcony, fourg_sinr_good_balcony, fourg_sinr_bad_balcony, fourg_sinr_poor_balcony, twog_rx_lev_pts_terrace, twog_rx_qual_pts_terrace, threeg_rscp_pts_terrace, threeg_ec_io_pts_terrace, fourg_rsrp_pts_terrace, fourg_rsrq_pts_terrace, fourg_sinr_pts_terrace, twog_rx_lev_good_terrace, twog_rx_lev_bad_terrace, twog_rx_lev_poor_terrace, twog_rx_qual_good_terrace, twog_rx_qual_bad_terrace, twog_rx_qual_poor_terrace, threeg_rscp_good_terrace, threeg_rscp_bad_terrace, threeg_rscp_poor_terrace, threeg_ec_io_good_terrace, threeg_ec_io_bad_terrace, threeg_ec_io_poor_terrace, fourg_rsrp_good_terrace, fourg_rsrp_bad_terrace, fourg_rsrp_poor_terrace, fourg_rsrq_good_terrace, fourg_rsrq_bad_terrace, fourg_rsrq_poor_terrace, fourg_sinr_good_terrace, fourg_sinr_bad_terrace, fourg_sinr_poor_terrace
} = require("../../../global_variables/test_report_variables");

// import user table variables
const { active, in_active, confirmed_yes, confirmed_no, opti_yes, opti_no, super_admin,
    admin, analyst, field_engineer, zone_user, dept_user, executive, mis, l3tl, l2tl, outcall, client,
    roles, sla_fwz_depts, zones, is_logged_in_yes, is_logged_in_no, male, female, deleted_yes, deleted_no} = require('../../../global_variables/user_variables');
  
const Test = require('../data_model/test');


// getReport
const getReport = async (req, res) => {
    const user = req.user;
    const data = req.body;
    
    if(user)
    {
        if(user.user_role == analyst)
        {
            const test_data = await Test.getTestReport(data);
            res.status(200).json({status:"Success", data:test_data});

        }else{
            res.status(200).json({status:"Error", message: "You Don't have permission access to this feature."})
        }
    }else{
        res.status(200).json({status:"Error", message: "Authorization failed!"})
    }
}

module.exports = { getReport }