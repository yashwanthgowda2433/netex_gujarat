//RF analysis status
const task_analyzed_options = {
    "0": "Visit Pending",
    "1": "Analysis Pending",
    "2": "Pending from Department",
    "3": "Visit Progress",
    "4": "Optimization in Progress",
    "5": "Visit Completed",
    "6": "Analysis Completed",
    "7": "Revert from Team",
    "8": "Closed Without Visit",
    "9": "Direct L2 Closed",
    "10": "Resolved and Closed",
    "11": "Not Resolved and Closed"
  };
const task_analyzed_options_pending = {
    "0": "Visit Pending",
    "1": "Analysis Pending",
    "2": "Pending from Department"
  };
const task_analyzed_options_progress = {
    "3": "Visit Progress",
    "4": "Optimization in Progress"
  };
const task_analyzed_options_completed = {
    "5": "Visit Completed",
    "6": "Analysis Completed",
    "7": "Reverted from Team"
  };
const task_analyzed_options_closed = {
    "8": "Closed Without Visit",
    "9": "Direct L2 Closed",
    "10": "Resolved and Closed",
    "11": "Not Resolved and Closed"
  };
// const task_analyzed_options = array(0 => 'Not analyzed',1 => 'Analyzed',2=> 'Withdrawn',3 => "Forward to zone",4 => "Optimization In progress",5 => "Revert pending from zone",6 => "Customer Feedaback Pending");
const analyzed_no = 0;
const analyzed_yes = 1;
const sla_forward_to_zone_yes = 1;
const sla_forward_to_zone_no = 0;
const tla_status_update_yes = 1;
const tla_status_update_no = 0;
//Second level submit options
const sla_submit_options = {
    "1": "Handset-Settings issue",
    "2": "Sim issue-Profile issue",
    "3": "Deep indoor issue-Outdoor working fine",
    "4": "Site distance >200m",
    "5": "No issue observed",
    "6": "Temporary issue",
    "7": "Not responding",
    "8": "Indoor access issue",
    "9": "Appointment issue",
    "10": "SMS issue",
    "11": "B-Party calling issue",
    "12": "Higher Floor"
  }; //Second level forward to zone options 

const sla_fwz_options = {
    "3": "ONM",
    "4": "Core",
    "5": "IN"
  }; //Second level forward to zone options

const sla_fwz_options_zone = {
    "3": "ONM",
    "4": "Core",
    "5": "IN"
  }; //Second level forward to zone options
const sla_issue_options = {
    "1": "2G",
    "2": "3G",
    "3": "4G",
    "4": "Volte"
  }; //Second level Issue Technology Options
const tla_submit_options = {
    "1": "Low coverage area",
    "2": "Max Optimisation done",
    "3": "Booster Proposed",
    "4": "Lowcoverage area/New Site Proposed",
    "5": "Issue Resolved",
    "6": "No issue observed",
    "7": "KPI issue cleared"
  }; //Third level submit options
const tla_save_options = {
    "1": "Planning",
    "2": "Scheduling"
  }; //Third level save options
const rf_save_options = {
    "6": "Banglore East",
    "7": "Banglore West"
  }; //Third level save options
const c_id_details = []; //Store Cell details i.e. Cell ID, Cell Name, lat and lang
const c_id_count = 0; //Store Cell details count
const cellid_array = []; //Store Cell id to check duplicate

const twog_rx_lev_pts = [];
const twog_rx_qual_pts = [];
const threeg_rscp_pts = [];
const threeg_ec_io_pts = [];
const fourg_rsrp_pts = [];
const fourg_rsrq_pts = [];
const fourg_sinr_pts = [];

//Count variables for 2g,3g,4g indoor/outdoor
const twog_rx_lev_good = 0;
const twog_rx_lev_bad = 0;
const twog_rx_lev_poor = 0;

const twog_rx_qual_good = 0;
const twog_rx_qual_bad = 0;
const twog_rx_qual_poor = 0;

const threeg_rscp_good = 0;
const threeg_rscp_bad = 0;
const threeg_rscp_poor = 0;

const threeg_ec_io_good = 0;
const threeg_ec_io_bad = 0;
const threeg_ec_io_poor = 0;

const fourg_rsrp_good = 0;
const fourg_rsrp_bad = 0;
const fourg_rsrp_poor = 0;

const fourg_rsrq_good = 0;
const fourg_rsrq_bad = 0;
const fourg_rsrq_poor = 0;

const fourg_sinr_good = 0;
const fourg_sinr_bad = 0;
const fourg_sinr_poor = 0;
const twog_rx_lev_pts_outdoor = [];
const twog_rx_qual_pts_outdoor = [];
const threeg_rscp_pts_outdoor = [];
const threeg_ec_io_pts_outdoor = [];
const fourg_rsrp_pts_outdoor = [];
const fourg_rsrq_pts_outdoor = [];
const fourg_sinr_pts_outdoor = [];

const twog_rx_lev_good_outdoor = 0;
const twog_rx_lev_bad_outdoor = 0;
const twog_rx_lev_poor_outdoor = 0;

const twog_rx_qual_good_outdoor = 0;
const twog_rx_qual_bad_outdoor = 0;
const twog_rx_qual_poor_outdoor = 0;

const threeg_rscp_good_outdoor = 0;
const threeg_rscp_bad_outdoor = 0;
const threeg_rscp_poor_outdoor = 0;

const threeg_ec_io_good_outdoor = 0;
const threeg_ec_io_bad_outdoor = 0;
const threeg_ec_io_poor_outdoor = 0;

const fourg_rsrp_good_outdoor = 0;
const fourg_rsrp_bad_outdoor = 0;
const fourg_rsrp_poor_outdoor = 0;

const fourg_rsrq_good_outdoor = 0;
const fourg_rsrq_bad_outdoor = 0;
const fourg_rsrq_poor_outdoor = 0;

const fourg_sinr_good_outdoor = 0;
const fourg_sinr_bad_outdoor = 0;
const fourg_sinr_poor_outdoor = 0;

const twog_rx_lev_pts_balcony= [];
const twog_rx_qual_pts_balcony= [];
const threeg_rscp_pts_balcony= [];
const threeg_ec_io_pts_balcony= [];
const fourg_rsrp_pts_balcony= [];
const fourg_rsrq_pts_balcony= [];
const fourg_sinr_pts_balcony= [];

const twog_rx_lev_good_balcony= 0;
const twog_rx_lev_bad_balcony= 0;
const twog_rx_lev_poor_balcony= 0;

const twog_rx_qual_good_balcony= 0;
const twog_rx_qual_bad_balcony= 0;
const twog_rx_qual_poor_balcony= 0;

const threeg_rscp_good_balcony= 0;
const threeg_rscp_bad_balcony= 0;
const threeg_rscp_poor_balcony= 0;

const threeg_ec_io_good_balcony= 0;
const threeg_ec_io_bad_balcony= 0;
const threeg_ec_io_poor_balcony= 0;

const fourg_rsrp_good_balcony= 0;
const fourg_rsrp_bad_balcony= 0;
const fourg_rsrp_poor_balcony= 0;

const fourg_rsrq_good_balcony= 0;
const fourg_rsrq_bad_balcony= 0;
const fourg_rsrq_poor_balcony= 0;

const fourg_sinr_good_balcony= 0;
const fourg_sinr_bad_balcony= 0;
const fourg_sinr_poor_balcony= 0;
const twog_rx_lev_pts_terrace = [];
const twog_rx_qual_pts_terrace = [];
const threeg_rscp_pts_terrace = [];
const threeg_ec_io_pts_terrace = [];
const fourg_rsrp_pts_terrace = [];
const fourg_rsrq_pts_terrace = [];
const fourg_sinr_pts_terrace = [];

const twog_rx_lev_good_terrace = 0;
const twog_rx_lev_bad_terrace = 0;
const twog_rx_lev_poor_terrace = 0;

const twog_rx_qual_good_terrace = 0;
const twog_rx_qual_bad_terrace = 0;
const twog_rx_qual_poor_terrace = 0;

const threeg_rscp_good_terrace = 0;
const threeg_rscp_bad_terrace = 0;
const threeg_rscp_poor_terrace = 0;

const threeg_ec_io_good_terrace = 0;
const threeg_ec_io_bad_terrace = 0;
const threeg_ec_io_poor_terrace = 0;

const fourg_rsrp_good_terrace = 0;
const fourg_rsrp_bad_terrace = 0;
const fourg_rsrp_poor_terrace = 0;

const fourg_rsrq_good_terrace = 0;
const fourg_rsrq_bad_terrace = 0;
const fourg_rsrq_poor_terrace = 0;

const fourg_sinr_good_terrace = 0;
const fourg_sinr_bad_terrace = 0;
const fourg_sinr_poor_terrace = 0;


module.exports = {
    task_analyzed_options, task_analyzed_options_pending, task_analyzed_options_progress, task_analyzed_options_completed, task_analyzed_options_closed, analyzed_no, analyzed_yes, sla_forward_to_zone_yes, sla_forward_to_zone_no, tla_status_update_yes,tla_status_update_no, sla_submit_options, sla_fwz_options, sla_fwz_options_zone, sla_issue_options, tla_submit_options, tla_save_options, rf_save_options, c_id_details, c_id_count, cellid_array, twog_rx_lev_pts, twog_rx_qual_pts, threeg_rscp_pts, threeg_ec_io_pts,fourg_rsrp_pts, fourg_rsrq_pts, fourg_sinr_pts, twog_rx_lev_good, twog_rx_lev_bad, twog_rx_lev_poor, twog_rx_qual_good,twog_rx_qual_bad, twog_rx_qual_poor, threeg_rscp_good, threeg_rscp_bad, threeg_rscp_poor, threeg_ec_io_good, threeg_ec_io_bad,threeg_ec_io_poor, fourg_rsrp_good, fourg_rsrp_bad, fourg_rsrp_poor, fourg_rsrq_good, fourg_rsrq_bad, fourg_rsrq_poor, fourg_sinr_good,fourg_sinr_bad, fourg_sinr_poor, twog_rx_lev_pts_outdoor, twog_rx_qual_pts_outdoor, threeg_rscp_pts_outdoor, threeg_ec_io_pts_outdoor,fourg_rsrp_pts_outdoor, fourg_rsrq_pts_outdoor, fourg_sinr_pts_outdoor, twog_rx_lev_good_outdoor, twog_rx_lev_bad_outdoor,twog_rx_lev_poor_outdoor, twog_rx_qual_good_outdoor, twog_rx_qual_bad_outdoor, twog_rx_qual_poor_outdoor, threeg_rscp_good_outdoor,threeg_rscp_bad_outdoor, threeg_rscp_poor_outdoor, threeg_ec_io_good_outdoor, threeg_ec_io_bad_outdoor, threeg_ec_io_poor_outdoor,fourg_rsrp_good_outdoor, fourg_rsrp_bad_outdoor, fourg_rsrp_poor_outdoor, fourg_rsrq_good_outdoor, fourg_rsrq_bad_outdoor,fourg_rsrq_poor_outdoor, fourg_sinr_good_outdoor, fourg_sinr_bad_outdoor, fourg_sinr_poor_outdoor, twog_rx_lev_pts_balcony,twog_rx_qual_pts_balcony, threeg_rscp_pts_balcony, threeg_ec_io_pts_balcony, fourg_rsrp_pts_balcony, fourg_rsrq_pts_balcony,fourg_sinr_pts_balcony, twog_rx_lev_good_balcony, twog_rx_lev_bad_balcony, twog_rx_lev_poor_balcony, twog_rx_qual_good_balcony,twog_rx_qual_bad_balcony, twog_rx_qual_poor_balcony, threeg_rscp_good_balcony, threeg_rscp_bad_balcony, threeg_rscp_poor_balcony,threeg_ec_io_good_balcony, threeg_ec_io_bad_balcony, threeg_ec_io_poor_balcony, fourg_rsrp_good_balcony, fourg_rsrp_bad_balcony,fourg_rsrp_poor_balcony, fourg_rsrq_good_balcony, fourg_rsrq_bad_balcony, fourg_rsrq_poor_balcony, fourg_sinr_good_balcony, fourg_sinr_bad_balcony, fourg_sinr_poor_balcony, twog_rx_lev_pts_terrace, twog_rx_qual_pts_terrace, threeg_rscp_pts_terrace, threeg_ec_io_pts_terrace, fourg_rsrp_pts_terrace, fourg_rsrq_pts_terrace, fourg_sinr_pts_terrace, twog_rx_lev_good_terrace, twog_rx_lev_bad_terrace, twog_rx_lev_poor_terrace, twog_rx_qual_good_terrace, twog_rx_qual_bad_terrace, twog_rx_qual_poor_terrace, threeg_rscp_good_terrace, threeg_rscp_bad_terrace, threeg_rscp_poor_terrace, threeg_ec_io_good_terrace, threeg_ec_io_bad_terrace, threeg_ec_io_poor_terrace, fourg_rsrp_good_terrace, fourg_rsrp_bad_terrace, fourg_rsrp_poor_terrace, fourg_rsrq_good_terrace, fourg_rsrq_bad_terrace, fourg_rsrq_poor_terrace, fourg_sinr_good_terrace, fourg_sinr_bad_terrace, fourg_sinr_poor_terrace
}