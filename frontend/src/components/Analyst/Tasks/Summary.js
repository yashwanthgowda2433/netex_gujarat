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

import React, { useEffect, useState } from "react"
import { Row, Card, CardBody, Table, CardTitle, Col, Pagination, PaginationItem, PaginationLink, Progress } from "reactstrap"
import { isEmpty, map, size } from "lodash"

import { Link, withRouter, useLocation, useNavigate } from "react-router-dom"

// context 
import { useAuthContext } from "../../../hooks/useAuthContext";

const Summary = (props) => {
    const {user} = useAuthContext()
    const [device_lists, update_device_lists] = useState([]);

    const propsData = useLocation();
    const task_data = propsData.state;
    const test_data = props.data;

    console.log(task_data)
    console.log(test_data)



    return (
        <Col lg={12}>
            
			            <div class="table-responsive">
                                    <table className="table table-bordered align-middle mb-0" >

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
                                                                            <Progress title={test_data.test_visit_upload} striped animated color="success" value="100" style={{ height: "16px",borderRadius:"0px" }} >Closed</Progress>
                                                                        </Col>
                                                                    : 
                                                                        <Col lg={4} className="m-0 p-0" style={{width:"32%"}}>
                                                                            <Progress title={test_data.test_visit_upload} striped animated color="success" value="100" style={{ height: "16px",borderRadius:"0px" }} >Completed</Progress>
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
                                                                            <Progress title={test_data.test_visit_upload} striped animated color="danger" value="100" style={{ height: "16px",borderRadius:"0px" }} >Canceled</Progress>
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
                                                                            <Progress title={test_data.test_visit_upload} striped animated color="" value="0" style={{ height: "16px",borderRadius:"0px" }} >Canceled</Progress>
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
                                        </tbody>
                                    </table>
                        
                        </div>
        </Col>
    )
}

export default Summary


