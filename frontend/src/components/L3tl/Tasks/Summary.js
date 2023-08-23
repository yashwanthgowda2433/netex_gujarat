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

// import user table variables
import { active, in_active, confirmed_yes, confirmed_no, opti_yes, opti_no, super_admin,
    admin, analyst, field_engineer, zone_user, dept_user, executive, mis, l3tl, l2tl, outcall, client,
    roles, sla_fwz_depts,  is_logged_in_yes, is_logged_in_no, male, female, deleted_yes, deleted_no} from '../../../global_variables/user_variables';
    
import {
    task_analyzed_options, task_analyzed_options_pending, task_analyzed_options_progress, task_analyzed_options_completed, task_analyzed_options_closed, analyzed_no, analyzed_yes, sla_forward_to_zone_yes, sla_forward_to_zone_no, tla_status_update_yes,tla_status_update_no, sla_submit_options, sla_fwz_options, sla_fwz_options_zone, sla_issue_options, tla_submit_options, tla_save_options, rf_save_options, c_id_details, c_id_count, cellid_array, twog_rx_lev_pts, twog_rx_qual_pts, threeg_rscp_pts, threeg_ec_io_pts,fourg_rsrp_pts, fourg_rsrq_pts, fourg_sinr_pts, twog_rx_lev_good, twog_rx_lev_bad, twog_rx_lev_poor, twog_rx_qual_good,twog_rx_qual_bad, twog_rx_qual_poor, threeg_rscp_good, threeg_rscp_bad, threeg_rscp_poor, threeg_ec_io_good, threeg_ec_io_bad,threeg_ec_io_poor, fourg_rsrp_good, fourg_rsrp_bad, fourg_rsrp_poor, fourg_rsrq_good, fourg_rsrq_bad, fourg_rsrq_poor, fourg_sinr_good,fourg_sinr_bad, fourg_sinr_poor, twog_rx_lev_pts_outdoor, twog_rx_qual_pts_outdoor, threeg_rscp_pts_outdoor, threeg_ec_io_pts_outdoor,fourg_rsrp_pts_outdoor, fourg_rsrq_pts_outdoor, fourg_sinr_pts_outdoor, twog_rx_lev_good_outdoor, 
    twog_rx_lev_bad_outdoor,twog_rx_lev_poor_outdoor, twog_rx_qual_good_outdoor, twog_rx_qual_bad_outdoor, twog_rx_qual_poor_outdoor, threeg_rscp_good_outdoor,threeg_rscp_bad_outdoor, threeg_rscp_poor_outdoor, threeg_ec_io_good_outdoor, threeg_ec_io_bad_outdoor, threeg_ec_io_poor_outdoor,fourg_rsrp_good_outdoor, fourg_rsrp_bad_outdoor, fourg_rsrp_poor_outdoor, fourg_rsrq_good_outdoor, fourg_rsrq_bad_outdoor,fourg_rsrq_poor_outdoor, fourg_sinr_good_outdoor, fourg_sinr_bad_outdoor, fourg_sinr_poor_outdoor, twog_rx_lev_pts_balcony,twog_rx_qual_pts_balcony, threeg_rscp_pts_balcony, threeg_ec_io_pts_balcony, fourg_rsrp_pts_balcony, fourg_rsrq_pts_balcony,fourg_sinr_pts_balcony, twog_rx_lev_good_balcony, twog_rx_lev_bad_balcony, twog_rx_lev_poor_balcony, 
    twog_rx_qual_good_balcony,twog_rx_qual_bad_balcony, twog_rx_qual_poor_balcony, threeg_rscp_good_balcony, threeg_rscp_bad_balcony, threeg_rscp_poor_balcony,threeg_ec_io_good_balcony, threeg_ec_io_bad_balcony, threeg_ec_io_poor_balcony, fourg_rsrp_good_balcony, fourg_rsrp_bad_balcony,fourg_rsrp_poor_balcony, fourg_rsrq_good_balcony, fourg_rsrq_bad_balcony, fourg_rsrq_poor_balcony, fourg_sinr_good_balcony, fourg_sinr_bad_balcony, fourg_sinr_poor_balcony, twog_rx_lev_pts_terrace, twog_rx_qual_pts_terrace, threeg_rscp_pts_terrace, threeg_ec_io_pts_terrace, fourg_rsrp_pts_terrace, fourg_rsrq_pts_terrace, fourg_sinr_pts_terrace, 
    twog_rx_lev_good_terrace, twog_rx_lev_bad_terrace, twog_rx_lev_poor_terrace, twog_rx_qual_good_terrace, twog_rx_qual_bad_terrace, twog_rx_qual_poor_terrace, threeg_rscp_good_terrace, threeg_rscp_bad_terrace, threeg_rscp_poor_terrace, threeg_ec_io_good_terrace, threeg_ec_io_bad_terrace, threeg_ec_io_poor_terrace, fourg_rsrp_good_terrace, fourg_rsrp_bad_terrace, fourg_rsrp_poor_terrace, fourg_rsrq_good_terrace, fourg_rsrq_bad_terrace, fourg_rsrq_poor_terrace, fourg_sinr_good_terrace, fourg_sinr_bad_terrace, fourg_sinr_poor_terrace
} from "../../../global_variables/test_report_variables";

//css
import '../../../assets/css/style.css';

import React, { useEffect, useState } from "react"
import { Row, Card, CardBody, Table, CardTitle, Col, Pagination, PaginationItem, PaginationLink, Progress } from "reactstrap"
import { isEmpty, map, size } from "lodash"

import { Link, withRouter, useLocation, useNavigate } from "react-router-dom"

import { Popover } from 'bootstrap/dist/js/bootstrap.esm.min.js';

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

    ////console.log(task_data)
    ////console.log(analysed_by_l2)

    

    useEffect(() => {
        

    },[user])

    
    // date Converison
    const convertdate = (olddate) => {
        var created_date = new Date(olddate);

        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = created_date.getFullYear();
        var month = months[created_date.getMonth()];
        var date = created_date.getDate();
        var hour = created_date.getHours();
        var min = created_date.getMinutes();
        var sec = created_date.getSeconds();
        var time = hour + ':' + min + ':' + sec +' '+month + ' ' + date + ' ' + year  ;    // final date with time, you can use this according your requirement

        return time;
    }

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
            
            ////console.log('difference = ' + 
            // daysDifference + ' day/s ' + 
            // hoursDifference + ' hour/s ' + 
            // minutesDifference + ' minute/s ' + 
            // secondsDifference + ' second/s ');
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

    var td_start_datetime ="";
    var td_end_datetime ="";
    var testing_duration ="0:0:0";
    var td_start_datetime1 ="";
    var td_end_datetime1 ="";
    var testing_duration1 ="0:0:0";
    if(task_data)
    {
        if(task_data.task_status != closed && task_data.task_is_closed_fv != fieldvisit_yes)
        {
            td_start_datetime = new Date(task_data.task_end_datetime);
            td_end_datetime = new Date(task_data.testing_end_datetime);
            testing_duration = getAnalysisTAT(td_start_datetime, td_end_datetime);

            td_start_datetime1 = new Date(task_data.task_assigned_on);
            td_end_datetime1 = new Date(task_data.testing_end_datetime);
            testing_duration1 = getAnalysisTAT(td_start_datetime1, td_end_datetime1)
        }
        var questions = "";
        if(task_data.task_questionnaires != null && task_data.task_questionnaires != "")
        {
            var Questions = JSON.parse(task_data.task_questionnaires);
            ////console.log(Questions)

            Questions.forEach(function(question, sl){
                ////console.log(question)
                for(const [key, value] of Object.entries(question)){
                    questions += (sl+1)+". "+key+" : "+value+"  ";
                }
            });
        }
                                                                 
    }
    Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]')).forEach(popoverNode => new Popover(popoverNode))
    
    
    return (
        <Col lg={12}>
            
			            <div class="table-responsive">
                                    <table className="table table-bordered table-hover align-middle mb-0" >

				                        <thead>
					                        <tr>
						                        <td><strong>Progress </strong></td>
						                        <td colSpan="3">
								
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
                                                <td colSpan="4" style={{textAlign:"center"}}><strong>Customer Details</strong></td>
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
												<th style={{textAlign:"center"}} colSpan="4"><strong>Issue Details</strong></th>
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
                                                        <th style={{textAlign:"center"}} colSpan="4"><strong>First Level Analysis</strong></th>
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
															<th style={{textAlign:"center"}} colSpan="4"><strong>L2 Level Analysis</strong></th>
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
                                                    task_data.task_is_rf_fieldvisit == fieldvisit_yes ?
                                                        <>
                                                            <tr>
															    <th style={{textAlign:"center"}} colSpan="4"><strong> Field visit Details</strong></th>
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
                                                            
                                                                { 
                                                                    task_data.task_status != cancelled ?
                                                                        <tr>
                                                                            <th>Visit Uploaded date time</th>
															                <td>{ test_data.rf_test_visit_upload ? test_data.rf_test_visit_upload : test_data.test_visit_upload }</td>
														
                                                                        </tr>
                                                                    :
                                                                        <></>

                                                                }
                                                                {
                                                                    task_data.task_status != closed ?
                                                                        <>
                                                                            <tr>
                                                                                <th>Visit TAT</th>
															                    {/* <td><?php echo $this->tasks->calculate_tat($assigned_date,$test_visit_upload,$task_addedby,FALSE);?></td> */}
                                                                                <td></td>
                                                                            </tr>
                                                                            <tr>
															                    <th>Testing Duration</th>
															                    <td>{testing_duration}</td>
															                    <th>SMS DateTime</th>
															                    <td>
                                                                                    {/* <?php 
															                        if(!empty($sms_details)){
															                            $original_array = array_column($sms_details, 'sms_send_date');
									                                                    $string_version = implode('/', $original_array); 
																                        echo  $string_version;
																                    } ?> */}
																                </td>
														                    </tr>
														                    <tr>
															                    <th>Latitude</th>
															                    <td>{task_data.task_end_latitude}</td>
															                    <th>Longitude</th>
															                    <td>{task_data.task_end_longitude}</td>
														                    </tr>
                                                                        </>
                                                                    :
                                                                        <></>
                                                                }
                                                                {
                                                                    task_data.task_status != cancelled ?
                                                                        <>
                                                                            <tr>
                                                                                <th>Canceled Latitude</th>
                                                                                <td>{task_data.task_cancel_latitude}</td>
                                                                                <th>Canceled Longitude</th>
                                                                                <td>{task_data.task_cancel_longitude}</td>
                                                                            </tr>
                                                                        </>
                                                                    :
                                                                        <></>
                                                                }
                                                                <tr>
															        <th>Cancelled Remarks</th>
															        <td>{task_data.task_canceled_remarks}</td>
															        <th>Resolved Status</th>
															        <td>{ test_data.testreport_resolved_status == 'yes' ?
																            <div class="alert alert-success">
																	            <strong>Issue Resolved..!!!</strong>
																            </div>
																        : <></>
                                                                        }
                                                                        { test_data.testreport_resolved_status == 'no' ?
																                <div class="alert alert-danger">
																	                <strong>Issue Not Yet Resolved..!!!</strong>
																                </div>
																            : <></>
                                                                        } 
                                                                        </td>
														        </tr>

                                                                <tr>
															        <th>Questionnaires</th>
															        <td>{ task_data.task_questionnaires != null && task_data.task_questionnaires != "" ?
                                                                            <>
                                                                                <button type="button" class="btn btn-primary btn-xs waves-effect" 
                                                                                    data-bs-container="body" 
                                                                                    data-bs-toggle="popover" 
                                                                                    data-bs-placement="bottom" 
                                                                                    title="Questionnaries"
                                                                                    data-bs-content={questions}
                                                                                    data-bs-trigger="focus"  style={styles.showbtn}>Show</button>
                                                                            </>
                                                                        :   <>No Questions</>
                                                                        } 
															        </td>
															        <th>Closed Without Visit Remarks</th>
															        <td>{task_data.task_remarks}</td>
															        {task_data.task_status == cancelled ?
                                                                        <>
															                <th>Cancelled date time</th>
                                                                            <td>{task_data.task_cancelled_on}</td>
                                                                        </>
                                                                     :
                                                                        <></>
                                                                    }
														
														        </tr>
                                                        </>
                                                        
                                                    :
                                                    <></>
                                                :
                                                    <></>

                                            }

                                            {
                                                test_data ?
                                                    test_data.testreport_l3_remarks != "" && test_data.testreport_l3_remarks != null?
                                                        <>
                                                            <tr>
															    <th style={{textAlign:"center"}} colSpan="4"><strong>L3 Level Analysis</strong></th>
														    </tr>
														    <tr>
															    <th>L3 level remarks</th>
															    <td>{test_data.testreport_l3_remarks}</td>
															    <th>Suspected Site ID </th>
															    <td>{test_data.testreport_l3_suspected_kl_id}</td>
														    </tr>
                                                            <tr>
															    <th>Zone</th>
															    <td>{test_data.testreport_zonename}</td>
															    <th>Issue Technology</th>
															    <td>{test_data.testreport_l3_sl_issue_technology}</td>
														    </tr>
                                                            <tr>
															    <th>Emp ID</th>
															    <td>{analysed_by_l3?analysed_by_l3.user_userid:""}</td>
															    <th>Emp Name</th>
															    <td>{analysed_by_l3?analysed_by_l3.user_name:""}</td>
														    </tr>
                                                            <tr>
															    {/* <th>Assigned date time</th>
															    <td><?= $l3_sl_submitted_on ?></td> */}
															    <th>Analysis date time</th>
															    <td>{task_data.task_fwdtoanalyst_on}</td>
														    </tr>
                                                            <tr>
															    <th>Analysis TAT</th>
															    <td>{getAnalysisTAT(test_data.testreport_l3_sl_submitted_on, task_data.task_fwdtoanalyst_on)}</td>
														    </tr>
                                                        </>
                                                    :<></>
                                                :<></>
                                            }
                                            {
                                                test_data ?
                                                    test_data.testreport_sl_remarks != "" ?
                                                        <>
                                                            <tr>
															    <th style={{textAlign:"center"}} colSpan="4"><strong>RF Level Analysis</strong></th>
														    </tr>
                                                            <tr>
															    <th>RF level remarks</th>
															    <td>{test_data.testreport_sl_remarks}</td>
															    <th>Suspected Site ID </th>
															    <td>{test_data.testreport_suspected_kl_id}</td>
														    </tr>
                                                            <tr>
															    <th>Zone</th>
															    <td>{test_data.testreport_zonename}</td>
															    <th>Issue Technology</th>
															    <td>{test_data.testreport_sl_issue_technology}</td>
														    </tr>
                                                            <tr>
															    <th>Emp ID</th>
															    <td>{analysed_by_rf?analysed_by_rf.user_userid:""}</td>
															    <th>Emp Name</th>
															    <td>{analysed_by_rf?analysed_by_rf.user_name:""}</td>
														    </tr>
                                                            <tr>
															    <th>Assigned date time</th>
															    <td>{test_data.testreport_sl_submitted_on}</td>
															    <th>Analysis date time</th>
															    <td>{test_data.testreport_sl_submitted_on}</td>
															
														    </tr>
														    <tr>
															    <th>Analysis TAT</th>
															    <td>{test_data.testreport_sl_tat}</td>
														    </tr>
                                                            {/* <?php
														if(!empty($test_analysed_files))
														{
														?>
															<tr>
																<th>Second level analysed files</th>
																<td colSpan="3">
																	<?php 
																		$i = 0;
																		foreach($test_analysed_files as $key => $image)
																		{
																			if(!empty($image->file_path))
																			{    
																				$path = base_url().$image->file_path;
																	?>
																	<a class="btn btn-sm btn-warning" href="<?= $path ?>"><i class="material-icons">file_download</i> File <?php echo $i+1; ?></a>
																	<?php
																			}
																			$i++;
																		}
																	?>
																</td>
															</tr>
														<?php 
														} */}
                                                        </>
                                                    :<></>
                                                :<></>
                                            }
                                            {
                                                test_data ?
                                                    test_data.testreport_tl_remarks != ""?
                                                        <>
                                                            <tr>
															    <th style={{textAlign:"center"}} colSpan="4"><strong>Third Level Analysis (Dept Analysis)</strong></th>
														    </tr>
                                                            <tr>
															    <th>Third level remarks</th>
															    <td>{test_data.testreport_tl_remarks}</td>
															    <th>Issue Site ID </th>
															    <td>{test_data.testreport_issue_kl_id}</td>
														    </tr>
                                                        
                                                            <tr>
															    <th>Emp ID</th>
															    <td>{analysed_by_team?analysed_by_team.user_userid:""}</td>
															    <th>Emp Name</th>
															    <td>{analysed_by_team?analysed_by_team.user_name:""}</td>
														    </tr>
                                                            <tr>
															    <th>Assigned date time</th>
															    <td>{task_data.task_fwdtoteam_on}</td>
															    <th>Analysis date time</th>
															    <td>{test_data.testreport_tl_submitted_on}</td>
															
														    </tr>
														    <tr>
															    <th>Analysis TAT</th>
															    <td>{test_data.testreport_tl_tat}</td>
														    </tr>
                                                        </>
                                                    :<></>
                                                :<></>
                                            }

                                        </tbody>
                                    </table>
                        
                        </div>

                        <div class="card mt-5">
				            <div class="panel">
					            <div class="panel-body">
					                <div class="header">
						                <h4>Report images </h4>
						            </div>
									{/* <?php
                                    if(!empty($test_report_images1))
                                    {
								        $images = explode(",",$test_report_images1);
                                        for ($xi = 0; $xi <= count($images)-1; $xi++) {
							            ?>
                                            <div class="col-sm-3 col-sm-3 col-md-3">
                                                <div class="thumbnail-box">
					              
					                                <img src=<?php echo stripslashes(str_replace(array('[',']') , ''  ,$images[$xi])) ?> alt="" style="width:250px;height:300px"/>
                                                </div>
                                            </div>
                                        <?php
								        }    
                                
                                    }
                                    ?> */}
					            </div>
				            </div>
			            </div>

                        {test_data?
                            test_data.testreport_analyzed_status == analyzed_no && test_data.testreport_is_fwz == sla_forward_to_zone_no ?
                                <>
                                    <a class="btn bg-pink waves-effect m-b-15" role="button" data-toggle="collapse" href="#uploadFile" aria-expanded="false" aria-controls="uploadFile">
				                        Attach Analysed Files
			                        </a>
			                        <div class="collapse" id="uploadFile">
				                        <form name="files_form" method="post" class="form-horizontal" action="<?= base_url().'tasks/report/upload_dept_files' ?>" enctype="multipart/form-data">
					                        <input name="test_report_id" type="hidden" value="<?= $test_report_id ?>" />
					                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-5 form-control-label">
						                        <label for="email_address_2">Files :</label>
					                        </div>
					                        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-6">
						                        <div class="input-group control-group after-add-more col-lg-8 col-md-8 col-sm-8 col-xs-6">
                                                    <input type="file" name="dept_files[]" class="form-control"/>
                                                    <div class="input-group-btn"> 
                                                        <button class="btn btn-success add-more" type="button"><i class="glyphicon glyphicon-plus"></i> Add</button>
                                                    </div>
						                        </div>
					                        </div>
					
					 
					                        <div class="copy hide">
					                            <div class="control-group input-group" style="margin-top:10px">
						                            <input type="file" name="dept_files[]" class="form-control"/>
						                            <div class="input-group-btn"> 
                                                        <button class="btn btn-danger remove" type="button"><i class="glyphicon glyphicon-remove"></i> Remove</button>
                                                    </div>
                                                </div>
                                            </div>
					
					                        <div class="col-md-12 text-center">
						                        <button type="submit"  id="upload" name="Import" class="btn btn-lg btn-primary m-t-15 waves-effect"><i class="material-icons">file_upload</i>Upload</button>
					                        </div>
				                        </form>
			                        </div>
			                        <form name="sl_form" id="sl_form" method="get" class="form-horizontal" action="<?= base_url().'tasks/report/'.$test_report_id.'/testanalyzed' ?>">
				                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-5 form-control-label">
					                        <label for="email_address_2">Second level remarks :</label>
				                        </div>
				                        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-6">
					                        <div class="form-group">
						                        <div class="form-line">
                                                    <textarea name="sl_remarks" className='form-control' cols="0" rows="2" id="sl_remark"></textarea>

						                            <input name="sl_stage" type="hidden"/>
						                            <input name="sl_zone" type="hidden"/>
						                            <input name="sl_submission_type" type="hidden"/>
						                        </div>
					                        </div>
				                        </div>
				                        <p id="sl_err" style="color:red;display:none;text-align:center">Please enter second level remark</p>
				                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-5 form-control-label">
					                        <label for="email_address_2">Suspected Site ID :</label>
				                        </div>
				                        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-6">
					                        <div class="form-group">
						                        <div class="form-line">
							                        <input type="text" name="suspected_kl_id" class="form-control" id="site_id"/>
						                        </div>
					                        </div>
				                        </div>
				                        <p id="siteid_err" style="color:red;display:none;text-align:center">Please enter suspected site id</p>
				                        <div class="col-lg-4 col-md-4 col-sm-4 col-xs-5 form-control-label">
					                        <label for="email_address_2">Issue Technology :</label>
				                        </div>
				                        <div class="col-lg-8 col-md-8 col-sm-8 col-xs-6">
					                        <div class="form-group">
						                        <select name="sl_issue_technology[]" id="stages" class="form-control network_type" placeholder="Network type"  multiple>
											        <option value="2G">2G</option>
											        <option value="3G">3G</option>
											        <option value="4G">4G</option>
											        <option value="VoLTE">VoLTE</option>
											
										        </select>
					                        </div>
				                        </div>
				                        <p id="issue_err" style="color:red;display:none;text-align:center">Please enter issue category</p>
				              
                                        <div class="row clearfix">
								 
								            <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
									            <div class="card">
										            <div class="header">
											            <h2>KPI DashBoard</h2>
											            <ul class="header-dropdown m-r--5">
												            <button type="button" id="kpi-analyse" class="btn btn-info waves-effect">
													            <i class="material-icons fa-cog">find_replace</i>
													            <span>Analyse</span>
												            </button>
											            </ul>
										            </div>
										            <div class="body">
											            <div class="table-responsive">
												            <table class="table table-bordered table-striped table-hover dataTable" id="example">
												            </table>
											            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
				                        <div class="text-center">
				                            <p id="nb"></p>
				                            <input type="hidden" name="rfempid" id="rfempid"/>
				                            <input  data-type="submit" class="btn btn-info" onclick="slSubmit(this.value)" value="Submit" name="sl_submission"/>
				                            <input  data-type="fwdtofiled" class="btn btn-info"  type="submit"  value="Assign to Field"/>
                                            {/* <input  data-type="submit" class="btn btn-info" onclick="slSubmit(this.value)" value="Submit" name="sl_submission"/> */}
				                            {/* <input data-type="sl_submit" class="btn btn-success" type="submit" value="Submit"/> */}
					                        <input data-type="sl_fwz" class="btn btn-success" type="submit" value="Forward to Team"/>
					                        {/* <input class="btn btn-success" type="submit" value="Internal Transfer" data-type="sl_rf"/> */}
					                        <input class="btn btn-success" type="submit" value="Internal Transfer" data-type="sl_fwz_zone"/>
				                            {/* <!--<input  data-type="submits" class="btn btn-info" value="Forward to Field Visit" onclick="slSubmit(this.value)" name="sl_submission_field"/> */}
				                            {/* <input data-type="sl_fwz_zone" class="btn btn-success" type="submit" value="Forward to Zone"/>--> */}
				                        </div>
			                        </form>
                                </>
                            :
                                test_data.testreport_analyzed_status == analyzed_no && test_data.testreport_is_fwz == sla_forward_to_zone_yes && user.user_role == dept_user ?
                                    <>
                                        {
                                            test_data.testreport_tl_target_date != null || test_data.testreport_tl_target_date != "" ?
                                                <>
                                                    <form name="date_form" method="post" class="form-horizontal" action="">
				                                        <input name="test_report_id" type="hidden" value="<?= $test_report_id ?>" />
				                                        <a class="btn bg-pink waves-effect m-b-15" role="button" data-toggle="collapse" href="#TargetDate" aria-expanded="false" aria-controls="TargetDate">Add Target Date</a>
				                                        <div class="collapse" id="TargetDate">
                                                            <div class="row clearfix">
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 form-control-label">
                                                                    <label for="email_address_2">Target Date :</label>
                                                                </div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                                    <div class="form-group">
                                                                        <div class="form-line">
                                                                            <input type="text" name="target_date" className='form-control' placeholder='Target date'/>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
                                                                    <button id="set_target_date" class="btn bg-cyan waves-effect m-b-15">Save</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        
                                                    </form>
                                                </>
                                            :
                                                <></>
                                        }
                                        <form name="tl_form" method="get" class="form-horizontal" action="<?= base_url().'tasks/report/'.$test_report_id.'/conclusion' ?>">
				                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-5 form-control-label">
					                            <label for="email_address_2">Third level remarks :</label>
				                            </div>
				                            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-6">
					                            <div class="form-group">
						                            <div class="form-line">
                                                        <textarea name="tl_remarks" className='form-control' cols="0" rows="2" id="tl_remarks"></textarea>
						                                <input name="tl_stage" type="hidden"/>
						                                <input name="tl_stage_date" type="hidden"/>
						                                <input name="tl_submission_type" type="hidden"/>
						                            </div>
					                            </div>
				                            </div>
				                            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-5 form-control-label">
					                            <label for="email_address_2">Issue Site ID :</label>
				                            </div>
				                            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-6">
					                            <div class="form-group">
						                            <div class="form-line">
							                            <input type="text" name="issue_kl_id" class="form-control" value="<?= $issue_kl_id ?>" />
						                            </div>
					                            </div>
				                            </div>
				                            <div class="text-center">
					                            <input class="btn btn-success" type="submit" value="Submit" data-type="tl_submit"/>
					                            <input class="btn btn-success" type="submit" value="Save" data-type="tl_save"/>
                                                <input class="btn btn-success" type="submit" value="Internal Transfer" data-type="tl_transfer"/>

				                            </div>
			                            </form>
                                    </>
                                :
                                    <></>
                        :<></>}
                        <div class="card mt-5">
				            <div class="panel">
					            <div class="panel-body">
						            <div class="col-lg-6 col-sm-6 col-md-6 timelinebox">
							            <div class="timeline">
								            <div class="received containertimeline right">
									            <div class="timeline-content">
									                <h5>{convertdate(task_data.task_createdon)}
									   <span class="label label-danger">Received</span></h5>
									</div>
								</div>
								<div class="containertimeline right">
									<div class="timeline-content">
									  <h5>{convertdate(task_data.task_createdon)}
									  <span class="label label-info">Assigned</span></h5>
									</div>
								</div>
								{ 
                                task_data.task_is_rf_fieldvisit == fieldvisit_yes ?
								
									    task_data.task_withdrawn == withdrawn_yes ?
									        <div class="containertimeline right">
										        <div class="timeline-content">
											        <h5>{convertdate(task_data.task_withdrawn_on)}
											        <span class="label label-info">Withdrawn</span></h5>
										        </div>
									        </div>
									    :<></>
                                  : <>{
                                
									task_data.task_assigned_on && task_data.task_assigned_on != ''?
                                        
									    <div class="containertimeline right">
										        <div class="timeline-content">
											        <h5>{convertdate(task_data.task_assigned_on)}
											        <span class="label label-info">Reassigned</span></h5>
										        </div>
									    </div>
									:<></>	
                                    }
									{/* if(is_array($attempts) && !empty($attempts)){
										foreach($attempts as $attempt){ 
										$datetime1 = new DateTime($attempt['call_starttime']);
										$datetime2 = new DateTime($attempt['call_endtime']);
										$interval = $datetime1->diff($datetime2);
										?>														
										<div class="containertimeline right">															
											<div class="timeline-content">
												<h5><?php echo date("h:i:s a F d Y", strtotime($attempt['call_datetime']));?>																
												<span class="label label-info"><?= $attempt['call_name'] ?>(<?= $interval->format('%H:%I:%S') ?>)</span></h5>
											</div>
										</div>
										<?php														
										$i++;													
										}
									}?> */}
									<div class="containertimeline right">
										<div class="timeline-content">
											<h5>{convertdate(task_data.task_end_datetime)}
											<span class="label label-info">Started</span></h5>
										</div>
									</div>
									{ 
                                        task_data.task_status == cancelled ?
									        <div class="received containertimeline right">
										        <div class="timeline-content">
											        <h5>{convertdate(task_data.task_cancelled_on)}
											       <span class="label label-warning">Canceled</span></h5>
										        </div>
									        </div>
									    :
                                            task_data.task_status == closed ?
									            <div class="closed containertimeline right">
										            <div class="timeline-content">
											            <h5>{convertdate(test_data?test_data.testreport_createdon:"")}
											            <span class="label label-success">Closed without Visit</span></h5>
										            </div>
									            </div>
									        :
									            <div class="closed containertimeline right">
										            <div class="timeline-content">
											            <h5>{convertdate(test_data?test_data.testreport_createdon:"")}
											            <span class="label label-success">Visit Completed</span></h5>
										            </div>
									            </div>
                                     }
								    </>
                                }
								
                                { test_data?
                                    test_data.testreport_analyzed_status == analyzed_yes ?
								        <div class="closed containertimeline right">
									        <div class="timeline-content">
										        <h5>{convertdate(test_data.testreport_sl_submitted_on)}
										        <span class="label label-success">RF Analysis Completed</span></h5>
									        </div>
								        </div>
								    :<></>
                                 :<></>
                                }
								{  task_data.testreport_id && task_data.testreport_is_fwz == sla_forward_to_zone_yes ?
                                    <>
								        <div class="containertimeline right">
									        <div class="timeline-content">
										        <h5>{convertdate(test_data.testreport_sl_submitted_on)}
										        <span class="label label-info">Forward to Team</span></h5>
									        </div>
								        </div>
                                    
								    {  test_data.testreport_tl_submitted_on && test_data.testreport_tl_submitted_on != '' ? 
								        <div class="closed containertimeline right">
									        <div class="timeline-content">
										        <h5>{convertdate(test_data.testreport_tl_submitted_on)}
										        <span class="label label-success">Revert from Team</span></h5>
									        </div>
								        </div>
                                    :<></>
                                    }</>
                                    :<></>
                                }
								{
                                    task_data.task_status == closedbyl2_executive ?
								        <div class="closed containertimeline right">
									        <div class="timeline-content">
										        <h5>{convertdate(test_data.testreport_tl_submitted_on)}
										        <span class="label label-success">Directly Closed By L2 Executive</span></h5>
									        </div>
								        </div>
                                    :
                                        task_data.task_status == resolved_and_closed ?
								            <div class="closed containertimeline right">
									            <div class="timeline-content">
										            <h5>{convertdate(test_data.testreport_tl_submitted_on)}
										            <span class="label label-success">Resolved and Closed</span></h5>
									            </div>
								            </div>
								        :
                                            task_data.task_status == not_resolved_and_closed ?
								                <div class="closed containertimeline right">
									                <div class="timeline-content">
										                <h5>{convertdate(test_data.testreport_tl_submitted_on)}
										                <span class="label label-success">Not Resolved and Closed</span></h5>
									                </div>
								                </div>
                                            :<></>
                                }
							</div>
						</div>
						{task_data.task_is_fieldvisit == fieldvisit_yes ?
                            <>
						        <div class="col-lg-3 col-sm-3 col-md-3">
							        <div id="mapimg">
								        <img src="https://vilkarnataka.telecomone.in/assets/images/map.png" id="mapmodal" class="mapbutton"/>
							        </div>
						        </div>
						        <div class="col-lg-3 col-sm-3 col-md-3">
							        <div>
								        {/* <img src="data:image/png;base64,<?= $sign_base_64 ?>" class="img-thumbnail" style="margin-top: 13px;    margin-left: -5px; width: 150px; max-height:150px;" />
								        <p><strong>Cell ID : </strong><?= $sign_cell_id ?></p> */}
							        </div>
						        </div>
                            </>
                        :
                            <></>
                        }
					</div>
				</div>
			</div>
        </Col>
    )
}

const styles = {
    showbtn:{
        fontSize: "15px",
        padding: "3px 4px 0px 4px"
    }
}

export default Summary


