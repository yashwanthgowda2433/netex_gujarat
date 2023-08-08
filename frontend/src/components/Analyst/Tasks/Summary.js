// import task table variables
import { rth_yes, rth_no, assigned_yes, assigned_no, reassigned_yes, reassigned_no, pending, progress, completed,
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
} from '../../../global_variables/task_variables';

import {
    task_analyzed_options, task_analyzed_options_pending, task_analyzed_options_progress, task_analyzed_options_completed, task_analyzed_options_closed, analyzed_no, analyzed_yes, sla_forward_to_zone_yes, sla_forward_to_zone_no, tla_status_update_yes,tla_status_update_no, sla_submit_options, sla_fwz_options, sla_fwz_options_zone, sla_issue_options, tla_submit_options, tla_save_options, rf_save_options, c_id_details, c_id_count, cellid_array, twog_rx_lev_pts, twog_rx_qual_pts, threeg_rscp_pts, threeg_ec_io_pts,fourg_rsrp_pts, fourg_rsrq_pts, fourg_sinr_pts, twog_rx_lev_good, twog_rx_lev_bad, twog_rx_lev_poor, twog_rx_qual_good,twog_rx_qual_bad, twog_rx_qual_poor, threeg_rscp_good, threeg_rscp_bad, threeg_rscp_poor, threeg_ec_io_good, threeg_ec_io_bad,threeg_ec_io_poor, fourg_rsrp_good, fourg_rsrp_bad, fourg_rsrp_poor, fourg_rsrq_good, fourg_rsrq_bad, fourg_rsrq_poor, fourg_sinr_good,fourg_sinr_bad, fourg_sinr_poor, twog_rx_lev_pts_outdoor, twog_rx_qual_pts_outdoor, threeg_rscp_pts_outdoor, threeg_ec_io_pts_outdoor,fourg_rsrp_pts_outdoor, fourg_rsrq_pts_outdoor, fourg_sinr_pts_outdoor, twog_rx_lev_good_outdoor, 
    twog_rx_lev_bad_outdoor,twog_rx_lev_poor_outdoor, twog_rx_qual_good_outdoor, twog_rx_qual_bad_outdoor, twog_rx_qual_poor_outdoor, threeg_rscp_good_outdoor,threeg_rscp_bad_outdoor, threeg_rscp_poor_outdoor, threeg_ec_io_good_outdoor, threeg_ec_io_bad_outdoor, threeg_ec_io_poor_outdoor,fourg_rsrp_good_outdoor, fourg_rsrp_bad_outdoor, fourg_rsrp_poor_outdoor, fourg_rsrq_good_outdoor, fourg_rsrq_bad_outdoor,fourg_rsrq_poor_outdoor, fourg_sinr_good_outdoor, fourg_sinr_bad_outdoor, fourg_sinr_poor_outdoor, twog_rx_lev_pts_balcony,twog_rx_qual_pts_balcony, threeg_rscp_pts_balcony, threeg_ec_io_pts_balcony, fourg_rsrp_pts_balcony, fourg_rsrq_pts_balcony,fourg_sinr_pts_balcony, twog_rx_lev_good_balcony, twog_rx_lev_bad_balcony, twog_rx_lev_poor_balcony, 
    twog_rx_qual_good_balcony,twog_rx_qual_bad_balcony, twog_rx_qual_poor_balcony, threeg_rscp_good_balcony, threeg_rscp_bad_balcony, threeg_rscp_poor_balcony,threeg_ec_io_good_balcony, threeg_ec_io_bad_balcony, threeg_ec_io_poor_balcony, fourg_rsrp_good_balcony, fourg_rsrp_bad_balcony,fourg_rsrp_poor_balcony, fourg_rsrq_good_balcony, fourg_rsrq_bad_balcony, fourg_rsrq_poor_balcony, fourg_sinr_good_balcony, fourg_sinr_bad_balcony, fourg_sinr_poor_balcony, twog_rx_lev_pts_terrace, twog_rx_qual_pts_terrace, threeg_rscp_pts_terrace, threeg_ec_io_pts_terrace, fourg_rsrp_pts_terrace, fourg_rsrq_pts_terrace, fourg_sinr_pts_terrace, 
    twog_rx_lev_good_terrace, twog_rx_lev_bad_terrace, twog_rx_lev_poor_terrace, twog_rx_qual_good_terrace, twog_rx_qual_bad_terrace, twog_rx_qual_poor_terrace, threeg_rscp_good_terrace, threeg_rscp_bad_terrace, threeg_rscp_poor_terrace, threeg_ec_io_good_terrace, threeg_ec_io_bad_terrace, threeg_ec_io_poor_terrace, fourg_rsrp_good_terrace, fourg_rsrp_bad_terrace, fourg_rsrp_poor_terrace, fourg_rsrq_good_terrace, fourg_rsrq_bad_terrace, fourg_rsrq_poor_terrace, fourg_sinr_good_terrace, fourg_sinr_bad_terrace, fourg_sinr_poor_terrace
} from "../../../global_variables/test_report_variables";


import React, { useEffect, useState } from "react"
import { Row, Card, CardBody, Table, CardTitle, Col, Pagination, PaginationItem, PaginationLink, Progress } from "reactstrap"
import { isEmpty, map, size } from "lodash"

import { Link, withRouter, useLocation, useNavigate } from "react-router-dom"

// context 
import { useAuthContext } from "../../../hooks/useAuthContext";

const Summary = (props) => {
    const {user} = useAuthContext()
    

    var ddate = "";
    var created_date = "";

    const propsData = useLocation();
    const task_data = propsData.state;
    const test_data = props.data.test_data;
    const analysed_by_team = props.data.analysed_by_team;
    const analysed_by_l2 = props.data.analysed_by_l2;
    const analysed_by_l3 = props.data.analysed_by_l3;
    const analysed_by_rf = props.data.analysed_by_rf;

    console.log(task_data)
    console.log(analysed_by_l2)

    

    useEffect(() => {
        

    },[user])

    

    const getTaskStatus = (status) => {

        var message = "";

        if (status == pending) {
            message = 'Visit Pending';

        } else if (status == progress) {
            message = 'Progress';

        } else if (status == cancelled) {
            message = 'Cancelled';

        } else if (status == completed) {
            message = 'Completed';

        } else if (status == pending && task_data.task_is_rf_fieldvisit == fieldvisit_yes) {
            message = 'Optimisation Pending';

        } else if (status == progress && task_data.task_is_rf_fieldvisit == fieldvisit_yes) {
            message = 'Optimisation Inprogress';

        } else if (status == cancelled) {
            message = 'Cancelled';

        } else if (status == completed && task_data.task_is_rf_fieldvisit == fieldvisit_yes) {
            message = 'Optimisation Completed';

        } else if (status == closed) {
            message = 'Closed without field visit';

        } else if (status == closedbyl2_executive) {
            message = 'Closed';
            ddate = test_data.testreport_createdon;

        } else if (status == fwz) {
            //message = 'Fwd To Team';
            message = "Forward to " + sla_fwz_options[test_data.testreport_sl_stage];
            ddate = task_data.task_fwdtoteam_on;

        } else if (status == approve_for_fieldvisit) {
            //message = 'Transfer Requested';
            message = 'Forward to field visit';
            ddate = task_data.task_fwdtofe_on;

        } else if (status == addedbyl2_executive) {
            message = 'added by l2executive';
            ddate = created_date;

        } else if (status == analysis_required) {
            message = 'Forward to analysts';


        } else if (status == analysed) {
            message = 'analysed';

        } else if (status == not_resolved_and_closed) {
            message = 'not resolved and closed';

        } else if (status == resolved_and_closed) {
            message = 'resolved and closed';

        } else if (status == withdraw) {
            message = 'withdrawn';

        } else if (status == optimisationprogress) {
            message = 'Optimisation  in Progress';

        } else if (status == optimised) {
            message = 'Reverted from Team';

        } else if (status == fwz_to_zone) {
            message = 'Foward to zone';
            ddate = task_data.task_fwdtozone_on;

        }
        return message
    }

    const getAnalysisTAT = (fromDate, toDate)=>{
        if(fromDate != null && toDate != null)
        {
            const date1 = new Date(toDate);
            const date2 = new Date(fromDate);
            var difference = date1.getTime() - date2.getTime();

            var daysDifference = Math.floor(difference/1000/60/60/24);
            difference -= daysDifference*1000*60*60*24

            var hoursDifference = Math.floor(difference/1000/60/60);
            difference -= hoursDifference*1000*60*60

            var minutesDifference = Math.floor(difference/1000/60);
            
            difference -= minutesDifference*1000*60;

            var secondsDifference = Math.floor(difference/1000);

            return hoursDifference+":"+minutesDifference+":"+secondsDifference;
            
            console.log('difference = ' + 
            daysDifference + ' day/s ' + 
            hoursDifference + ' hour/s ' + 
            minutesDifference + ' minute/s ' + 
            secondsDifference + ' second/s ');
        }else{
            return 0+":"+0+":"+0;
        }
    }

    

    var sla_stage = "";
    if(test_data){
        if(test_data.testreport_is_fwz == sla_forward_to_zone_yes)
        {
            sla_stage = sla_fwz_options[test_data.testreport_sl_stage];
        }
        else
        {
            sla_stage = sla_submit_options[test_data.testreport_sl_stage];
        }
    }

    
    return (
        <Col lg={12}>
            
			            <div class="table-responsive">
                                    <table className="table table-bordered table-hover align-middle mb-0" >

				                        <thead>
					                        <tr>
						                        <td><strong>Progress </strong></td>
						                        <td colspan="3">
								
									             {task_data.status == pending || task_data.status == addedbyl2_executive || task_data.status == approve_for_fieldvisit || task_data.status == withdraw || task_data.status == transfer ?
							                        
                                                    <Row style={{padding: "0px 20px 0px 20px"}}>
                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                            <Progress title={task_data.task_crystal_date} striped animated color="danger" value="100" style={{ height: "16px",borderRadius:"0px" }} >Pending</Progress>
                                                        </Col>
                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                            <Progress striped animated color="" value="0" style={{ height: "16px",borderRadius:"0px" }} ></Progress>
                                                        </Col>
                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                            <Progress striped animated color="" value="0" style={{ height: "16px",borderRadius:"0px" }} ></Progress>
                                                        </Col>
                                                    </Row>

                                                 :
                                                    task_data.status == progress || task_data.status == completed || task_data.status == fwz || task_data.status == analysis_required || task_data.status == optimisationprogress || task_data.status == analysed || task_data.status == optimised ?
                                                            
                                                            <Row style={{padding: "0px 20px 0px 20px", display: "flex", width: "100%"}}>
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={task_data.task_crystal_date} striped animated color="danger" value="100" style={{ height: "16px",borderRadius:"0px" }} >Received</Progress>
                                                                        </Col>
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={task_data.task_datetime} striped animated color="" value="100" style={{ height: "16px",borderRadius:"0px" }} >Under Progress</Progress>
                                                                        </Col>
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress striped animated color="" value="0" style={{ height: "16px",borderRadius:"0px" }} ></Progress>
                                                                        </Col>
                                                            </Row>
                                                        :
                                                            task_data.status == closed || task_data.status == closedbyl2_executive || task_data.status == resolved_and_closed || task_data.status == not_resolved_and_closed ?
                                                                <Row style={{padding: "0px 20px 0px 20px", display: "flex", width: "100%"}}>
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={task_data.task_crystal_date} striped animated color="danger" value="100" style={{ height: "16px",borderRadius:"0px" }} >Received</Progress>
                                                                        </Col>
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={task_data.task_datetime} striped animated color="info" value="100" style={{ height: "16px",borderRadius:"0px" }} >Under Progress</Progress>
                                                                        </Col>
									                                { task_data.status == closed ?
									                                
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={test_data?test_data.test_visit_upload:""} striped animated color="success" value="100" style={{ height: "16px",borderRadius:"0px" }} >Closed</Progress>
                                                                        </Col>
                                                                    : 
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={test_data?test_data.test_visit_upload:""} striped animated color="success" value="100" style={{ height: "16px",borderRadius:"0px" }} >Completed</Progress>
                                                                        </Col>
                                                                    }
                                                                
                                                                        
                                                                </Row>
									
									
									                        :
								                                task_data.status == cancelled ?
                                                                    <Row style={{padding: "0px 20px 0px 20px", display: "flex", width: "100%"}}>
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={task_data.task_crystal_date} striped animated color="danger" value="100" style={{ height: "16px",borderRadius:"0px" }} >Received</Progress>
                                                                        </Col>
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={task_data.task_datetime} striped animated color="info" value="100" style={{ height: "16px",borderRadius:"0px" }} >Under Progress</Progress>
                                                                        </Col>
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={test_data?test_data.test_visit_upload:""} striped animated color="danger" value="100" style={{ height: "16px",borderRadius:"0px" }} >Canceled</Progress>
                                                                        </Col>
                                                                    </Row>
                                                                :
                                                                    // <div class="progress progress-striped active">
                                                                    //     <abbr title={ task_data.crystal_date }>
                                                                    //         <div class="progress-bar progress-bar-danger" style={{width: "34%" }}>Pending</div>
                                                                    //     </abbr>
                                                                    // </div>
                                                                    <Row style={{padding: "0px 20px 0px 20px", display: "flex", width: "100%"}}>
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={task_data.task_crystal_date} striped animated color="danger" value="100" style={{ height: "16px",borderRadius:"0px" }} >Received</Progress>
                                                                        </Col>
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={task_data.task_datetime} striped animated color="" value="0" style={{ height: "16px",borderRadius:"0px" }} >Under Progress</Progress>
                                                                        </Col>
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={test_data?test_data.test_visit_upload:""} striped animated color="" value="0" style={{ height: "16px",borderRadius:"0px" }} >Canceled</Progress>
                                                                        </Col>
                                                                    </Row>
                                                            }
						                        </td>
                                                

					                        </tr>
				                        </thead>
				                        <tbody>
                                            <tr>
                                                <td colspan="4" style={{textAlign:"center"}}><strong>Customer Details</strong></td>
                                            </tr>
                                            <tr>
                                                <td><strong>SR Number</strong></td>
                                                <td>{task_data.task_sr_no}</td>
                                                <td><strong>Customer name</strong></td>
                                                <td>{task_data.task_customer_name}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Mobile Number</strong></td>
                                                <td>{task_data.task_mobile_number}</td>
                                                <td><strong>Alternate Mobile</strong></td>
                                                <td>{task_data.task_alternate_mobile}</td>
                                            </tr>
                                            
                                            { subscription_types[task_data.task_subscription_type+""]=="Postpaid" || subscription_types[task_data.task_subscription_type+""]=="Escalation" ?
                                            <>
                                                <tr>
                                                    <td><strong>Subscriber type</strong></td>
                                                    <td>{task_data.task_subscriber_type}</td>
                                                    <td><strong>Customer Segment</strong></td>
                                                    <td>{customer_categories[task_data.task_customer_category]}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Brand</strong></td>
                                                    <td>{task_data.task_brand}</td>
                                                    <td><strong>Subscription Type</strong></td>
                                                    <td>{subscription_types[task_data.task_subscription_type+""]}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>CRM date</strong></td>
                                                    <td>{task_data.task_crystal_date}</td>
                                                    <td><strong>Due Date</strong></td>
                                                    <td>{task_data.task_crm_due_date}</td>
                                                </tr>
                                            </>
                                            :
                                            <>
                                                <tr>
                                                    <td><strong>Brand</strong></td>
                                                    <td>{task_data.task_brand}</td>
                                                    <td><strong>Customer Segment</strong></td>
                                                    <td>{prepaid_segment[task_data.task_customer_category]}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>CRM date</strong></td>
                                                    <td>{task_data.task_crystal_date}</td>
                                                    <td><strong>Subscription Type</strong></td>
                                                    <td>{subscription_types[task_data.task_subscription_type+""]}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Due Date</strong></td>
                                                    <td>{task_data.task_crm_due_date}</td>
                                                    <td><strong>Issue Start Date/Time</strong></td>
                                                    <td>{task_data.task_issue_date}</td>
                                                </tr>
                                            </>
                                            }
                                            <tr>
												<th style={{textAlign:"center"}} colspan="4"><strong>Issue Details</strong></th>
											</tr>
                                            <tr>
                                                <td><strong>Latitude</strong></td>
                                                <td>{task_data.task_end_latitude}</td>
                                                <td><strong>Longitude</strong></td>
                                                <td>{task_data.task_end_longitude}</td>
                                            </tr>
                                            { subscription_types[task_data.task_subscription_type+""]=="Postpaid" || subscription_types[task_data.task_subscription_type+""]=="Escalation" ?
                                            <>
                                                <tr>
                                                    <td><strong>Issue technology</strong></td>
                                                    <td>{task_data.task_issue_technology}</td>
                                                    <td><strong>Complaint category</strong></td>
                                                    <td>{task_data.task_complaint_category}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Issue category</strong></td>
                                                    <td>{task_data.task_issue_category}</td>
                                                    <td><strong>Number of Signal bars</strong></td>
                                                    <td>{task_data.task_signal_bar}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Issue Details</strong></td>
                                                    <td>{task_data.task_issue_details}</td>
                                                    <td><strong>Location</strong></td>
                                                    <td>{task_data.task_customer_location}</td>
                                                </tr>
                                            </>
                                            :
                                            <>
                                                <tr>
                                                    <td><strong>Issue technology</strong></td>
                                                    <td>{task_data.task_issue_technology}</td>
                                                    <td><strong>Issue in</strong></td>
                                                    <td>{task_data.task_issue_in}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Issue category</strong></td>
                                                    <td>{task_data.task_issue_category}</td>
                                                    <td><strong>Number of Signal bars</strong></td>
                                                    <td>{task_data.task_signal_bar}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Remarks</strong></td>
                                                    <td>{task_data.task_prepaid_remark}</td>
                                                    <td><strong>Location</strong></td>
                                                    <td>{task_data.task_customer_location}</td>
                                                </tr>
                                            </>
                                            }
                                            <tr>
                                                <td><strong>District</strong></td>
                                                <td>{task_data.task_district}</td>
                                                <td><strong>Cluster</strong></td>
                                                <td>{task_data.task_cluster}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Area</strong></td>
                                                <td>{task_data.task_area}</td>
                                                <td><strong>Distance</strong></td>
                                                <td>{task_data.task_customer_distance}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Verified Address</strong></td>
                                                <td>{task_data.task_verified_address}</td>
                                                <td><strong>Out called</strong></td>
                                                <td>{task_data.task_out_called}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Connected/Not connected</strong></td>
                                                <td>{task_data.task_connected}</td>
                                                <td><strong>Customer inputs</strong></td>
                                                <td>{task_data.task_customer_inputs}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Appartment Name</strong></td>
                                                <td>{task_data.task_appartment}</td>
                                                <td><strong>Total Floor</strong></td>
                                                <td>{task_data.task_floor}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Customer Floor</strong></td>
                                                <td>{task_data.task_customer_floor}</td>
                                                
                                            </tr>
                                            <tr>
                                                <td><strong>Problem since when</strong></td>
                                                <td>{task_data.task_problem_since}</td>
                                                <td><strong>Any specific timing</strong></td>
                                                <td>{task_data.task_specific_timing}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Number of Signal bars in handset</strong></td>
                                                <td>{task_data.task_handset_bars}</td>
                                                <td><strong>Indoor/Outdoor</strong></td>
                                                <td>{task_data.task_indoor_outdoor}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Office/Residence</strong></td>
                                                <td>{task_data.task_office_residence}</td>
                                                <td><strong>Issue type</strong></td>
                                                <td>{task_data.task_issue_type}</td>
                                            </tr>
                                            
                                            <tr>
                                                <td><strong>Voice Type</strong></td>
                                                {task_data.task_issue_type == "Voice"?
                                                    <td>{task_data.task_voice_type}</td>
                                                :
                                                    <>
                                                       <td></td>    
                                                       <th>Data Type</th>
                                                        <td>{task_data.task_data_type}</td>
                                                    </>
                                                }
                                               
                                            </tr>

                                            { task_data.task_issue_type == "Data" ?
                                            <> 
                                                <tr>
                                                    <td><strong>Balance</strong></td>
                                                    <td>{task_data.task_balance}</td>
                                                    <td><strong>Validity</strong></td>
                                                    <td>{task_data.task_validity}</td>
                                                </tr>
                                                <tr>
                                                    <td><strong>Data Plan</strong></td>
                                                    <td>{task_data.task_data_plan}</td>
                                                    <td><strong>Average Data Usage</strong></td>
                                                    <td>{task_data.task_data_usage}</td>
                                                </tr>
                                            </>
                                            : ""
                                            }
                                            <tr>
                                                <td><strong>STATUS</strong></td>
                                                <td><b>{getTaskStatus(task_data.task_status)}</b></td>
                                            </tr>
                                            {
                                              test_data?
                                                test_data.testreport_fl_remarks != "null" && test_data.testreport_fl_remarks != "" ?
                                                <>
                                                    <tr>
                                                        <th style={{textAlign:"center"}} colspan="4"><strong>First Level Analysis</strong></th>
                                                    </tr>
                                                    <tr>
														<th>Emp ID</th>
														<td>{task_data.user_arr[0].user_userid}</td>
														<th>Emp Name</th>
														<td>{task_data.user_arr[0].user_name}</td>
													</tr>
                                                    <tr>
															<th>Kpi issues/Alarms</th>
															<td>{ task_data.task_kpi_issue_identified }</td>
															<th>Network Type</th>
															<td>{ task_data.task_network_type }</td>
													</tr>
													<tr>
															<th>Suspected Cell ID</th>
															<td>{ test_data.testreport_fl_suspected_kl_id }</td>
															<th>First level remarks</th>
															<td>{ test_data.testreport_fl_remarks }</td>
													</tr>
														
														<tr>
															<th>Assigned date time</th>
															<td>{ task_data.task_createdon }</td>
															<th>Analysis date time</th>
															<td>{ task_data.task_fwdtol2_on }</td>
														</tr>
														<tr>
															<th>Analysis TAT</th>
															<td>{getAnalysisTAT(task_data.task_crm_uploaddate, task_data.task_fwdtol2_on)}</td>
															
														</tr>
														<tr>
															<th>Resolution Code</th>
															<td>{ task_data.task_resolution_code }</td>
															<th>Out Come</th>
															<td>{ task_data.task_final_remarks }</td>
														</tr>
                                                </>
                                                : <></>
                                              :""
                                            }
                                            {
                                              test_data?
                                                test_data.testreport_l2_remarks != null && test_data.testreport_l2_remarks != "" ?
                                                    <>
                                                        <tr>
															<th style={{textAlign:"center"}} colspan="4"><strong>L2 Level Analysis</strong></th>
														</tr>
														<tr>
															<th>L2 level remarks</th>
															<td>{test_data.testreport_l2_remarks}</td>
															<th>Suspected Site ID </th>
															<td>{test_data.testreport_l2_suspected_kl_id}</td>
														</tr>
                                                        <tr>
															<th>Zone</th>
															<td>{test_data.testreport_zonename}</td>
															<th>Issue Technology</th>
															<td>{test_data.testreport_l2_sl_issue_technology}</td>
														</tr>
														<tr>
															<th>Emp ID</th>
															<td>{analysed_by_l2?analysed_by_l2.user_userid:""}</td>
															<th>Emp Name</th>
															<td>{analysed_by_l2?analysed_by_l2.user_name:""}</td>
														</tr>
                                                        <tr>
                                                            <th>Analysis date time</th>
															<td>{test_data.testreport_l2_sl_submitted_on}</td>
														</tr>
														<tr>
															<th>Analysis TAT</th>
															<td>{getAnalysisTAT(task_data.task_crm_uploaddate, test_data.testreport_l2_sl_submitted_on)}</td>
														</tr>
                                                    </>
                                                : <></>
                                              :""
                                            }
                                            {
                                                test_data?
                                                    task_data.task_is_rf_fieldvisit != fieldvisit_yes ?
                                                        <>
                                                            <tr>
															    <th style={{textAlign:"center"}} colspan="4"><strong> Field visit Details</strong></th>
														    </tr>
                                                            <tr>
															    <th>Appointment date/time</th>
															    <td>{task_data.task_appointment_datetime}</td>
															    <th>Created date/time</th>
															    <td>{task_data.task_crm_uploaddate}</td>
														    </tr>
                                                            <tr>
															    <th>No. Of Call Attempts</th>
															    <td>0</td>
															    <th>Assigned date time</th>
															    <td>{task_data.task_assigned_on}</td>
														    </tr>
                                                            {
                                                                task_data.task_status != closed && task_data.task_is_closed_fv != fieldvisit_yes ?
                                                                    <>
                                                                        <tr>
                                                                            <th>Task Start date/time</th>
                                                                            <td>{task_data.task_end_datetime}</td>
                                                                            <th>Reached location date/time</th>
                                                                            <td>{task_data.task_reached_datetime}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th>Testing started Date/Time</th>
                                                                            <td>{task_data.task_end_datetime}</td>
                                                                            <th>Testing Ended Date Time</th>
                                                                            <td>{task_data.testing_end_datetime}</td>
                                                                        </tr>
                                                                    </>
                                                                    :<></>
                                                            }
                                                        </>
                                                        
                                                    :
                                                    <></>
                                                :
                                                    <></>

                                            }

                                        </tbody>
                                    </table>
                        
                        </div>
        </Col>
    )
}

export default Summary


