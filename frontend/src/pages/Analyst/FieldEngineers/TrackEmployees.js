import React, { useEffect, useState } from "react";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import Sidebar from "../../Common/Sidebar";
import { Card, CardBody, CardTitle, Col, Row, Progress, TabContent,TabPane, Collapse, NavLink, NavItem, Nav, DropdownMenu,
    DropdownItem,
    DropdownToggle,ButtonDropdown } from "reactstrap";
import { Link, withRouter, useLocation, useNavigate } from "react-router-dom"
import { isEmpty, map, size } from "lodash"

//Context
import { useAuthContext } from "../../../hooks/useAuthContext";

import classnames from "classnames"

const TrackEmployees = (props) => {
    const navigate = useNavigate();
    
    const { user } = useAuthContext();
    const [opti_engineers, set_opti_engineers] = useState([]);
    var [error, setError] = useState("");
    var [success,setSuccess] = useState("");
    const [search_task, set_search_task] = useState("");

    useEffect(() => {
       
        if(user)
        {
            fetchOptiEngineers();
        }
    },[user]);

    const fetchOptiEngineers = async () => {
        setError("")
        setSuccess("")
        const response = await fetch('/api/user/analyst/getOptiEngineers', {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
            body: JSON.stringify({search_user:search_task})
        })
        if(response.ok){
           const json = await response.json()
           console.log(json)
            if(json.status == "Success")
            {
            
                set_opti_engineers(json.data);
            }
            if(json.status == "Error")
            {
                setError("please try aftersometime!");
            }
        }else{
            setError("please try aftersometime!");
        }


    }


    return (
        <React.Fragment>
            <div id="preloader" style={{ display: "none" }}>
                <div id="status">
                    <div className="spinner-chase">
                        <div className="chase-dot"></div>
                        <div className="chase-dot"></div>
                        <div className="chase-dot"></div>
                        <div className="chase-dot"></div>
                        <div className="chase-dot"></div>
                        <div className="chase-dot"></div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div id="layout-wrapper">
                    <Header />
                    <Sidebar />

                    <div class="main-content">
                        <div className="page-content">
                            <Row>
                                <div className="col-12">
                                    <div className="page-title-box d-flex align-items-center justify-content-between">
                                        <h4 className="page-title mb-0 font-size-18">
                                            View Employees
                                        </h4>

                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item active">
                                                    view employees
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                            {/* <Row>
                                <Col lg={12} style={{textAlign:"end"}}>
                                    <button className="btn btn-light waves-effect waves-light mb-4" onClick={() => navigate(-1)}>Go Back</button>
                                </Col>
                            </Row> */}
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col lg={12}  style={{margin:"auto"}}>
                                            
                                                <CardTitle className="mb-4">
                                                    View Employees
                                                    <Col lg={1} style={{float:"right",textAlign:"end",marginTop:"-10px"}}>
                                                        
                                                    </Col>
                                                </CardTitle>

                                                <Row>
                                                    <Col lg={12}>
                                                        <Card>
                                                            <CardBody>
                                                              <Row>
                                                
                                                                <Col lg={2}>
                                                                    <input type="text" name="search_task" class="form-control" 
                                                                        onBlur={(event)=>{set_search_task(event.target.value)}}placeholder="SR No., Emp ID, Name..."/>
                                                                </Col>

                                                                <Col lg={2}>
                                                                    <button type='button' onClick={fetchOptiEngineers} className='btn btn-primary'>Search</button>
                                                                </Col>
                                                              </Row>
                                                            </CardBody>
                                                        </Card>
                                                        <table className="table table-striped table-bordered align-middle mb-0" id="lists-table" >
                                                            <thead>
                                                                <tr>
                                                                    <th>Employee ID</th>
                                                                    <th>Name</th>
                                                                    <th>Email</th>
                                                                    <th>Zone</th>
                                                                    <th>Mobile</th>
                                                                    <th>Status</th>
                                                                    
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {opti_engineers.length > 0?
                                                                    opti_engineers.map((item, index)=>(
                                                                        <tr>
                                                                            <td>{item.user_userid}</td>
                                                                            <td>{item.user_name}</td>
                                                                            <td>{item.user_email}</td>
                                                                            <td>{item.user_zone_id}</td>
                                                                            <td>{item.user_mobile}</td>
                                                                            <td>{item.user_status == 1?"Active":"In-active"}</td>

                                                                        </tr>
                                                                    ))
                                                                :<></>
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </Col>
                                                </Row>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
            
        </React.Fragment>
    )

}

export default TrackEmployees
