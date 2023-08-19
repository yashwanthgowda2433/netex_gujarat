//css
import '../../../assets/css/style.css';

import React, { useEffect, useState } from "react"
import { Row, Card, CardBody, Table, CardTitle, Col, Pagination, PaginationItem, PaginationLink, Progress, Collapse, Form, Button } from "reactstrap"
import { isEmpty, map, size } from "lodash"

import { Link, withRouter, useLocation, useNavigate } from "react-router-dom"

import { Popover } from 'bootstrap/dist/js/bootstrap.esm.min.js';

// context 
import { useAuthContext } from "../../../hooks/useAuthContext";

const KpiView = (props) => {
    const {user} = useAuthContext()

    useEffect(() => {
        

    },[user])

    return (
        <Col lg={12}>
            <Row className="mt-5">
                                            <Col lg={2} style={{margin:"auto", width:"max-content"}}>
				                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-5 form-control-label">
					                                <label for="email_address_2" style={{fontWeight:600}}>Second&nbsp;level&nbsp;remarks&nbsp;:</label>
				                                </div>
                                            </Col>
                                            <Col lg={10}>
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
                                                <p id="sl_err" style={{color:"red",display:"none",textAlign:"center"}}>Please enter second level remark</p>
                                            </Col>
                                        </Row>
                                        
				                        <Row className="mt-5">
                                            <Col lg={2} style={{margin:"auto", width:"max-content"}}>
				                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-5 form-control-label">
					                                <label for="email_address_2" style={{fontWeight:600}}>Suspected&nbsp;Site&nbsp;ID&nbsp;:</label>
				                                </div>
                                            </Col>
                                            <Col lg={10}>
				                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-6">
					                                <div class="form-group">
						                                <div class="form-line">
							                                <input type="text" name="suspected_kl_id" class="form-control" id="site_id"/>
                                                            <p id="siteid_err" style={{color:"red",display:"none",textAlign:"center"}}>Please enter suspected site id</p>
						                                </div>
					                                </div>
				                                </div>
                                            </Col>
                                        </Row>
				                        
				                        <Row className="mt-5">
                                            <Col lg={2} style={{margin:"auto", width:"max-content"}}>
				                                <div class="col-lg-4 col-md-4 col-sm-4 col-xs-5 form-control-label">
					                                <label for="email_address_2" style={{fontWeight:600}}>Issue&nbsp;Technology&nbsp;:</label>
				                                </div>
                                            </Col>
                                            <Col lg={10}>
				                                <div class="col-lg-8 col-md-8 col-sm-8 col-xs-6">
					                                <div class="form-group">
						                                <select name="sl_issue_technology[]" id="stages" class="form-control network_type" placeholder="Network type"  multiple>
											                <option value="2G">2G</option>
											                <option value="3G">3G</option>
											                <option value="4G">4G</option>
											                <option value="VoLTE">VoLTE</option>
											
										                </select>
                                                        <p id="issue_err" style={{color:"red",display:"none",textAlign:"center"}}>Please enter issue category</p>
					                                </div>
				                                </div>
                                            </Col>
                                        </Row>
				                        
				              
                                        <Card className='mt-5'>
                                                <CardTitle>
											            <h3>KPI DashBoard</h3>
											            <ul class="header-dropdown m-r--5">
												            <button type="button" id="kpi-analyse" class="btn btn-info waves-effect" style={{float:"right"}}>
													            {/* <i class="material-icons fa-cog">find_replace</i> */}
													            <span>Analyse</span>
												            </button>
											            </ul>
										        </CardTitle>
                                            <CardBody>
									            
											            <div class="table-responsive">
												            <table class="table table-bordered table-striped table-hover dataTable" id="example">
												            </table>
											            </div>
                                                    
                                            </CardBody>
                                        </Card>
        </Col>
    )
}  
export default KpiView
