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

// tabs import
import Summary from "../../../components/Analyst/ViewMap/Summary";
import KpiView from "../../../components/Analyst/ViewMap/KpiView";

const ViewMap = (props) => {
    const navigate = useNavigate();
    const [activeTab, setactiveTab] = useState("1");
    const [infodrp_up11, setInfodrp_up11] = useState(false);
    const { user } = useAuthContext();

    function toggle(tab) {
        if (activeTab !== tab) {
          setactiveTab(tab)
        }
    }

    useEffect(() => {
       
        if(user)
        {
            // getTaskTests();
        }
    },[user]);


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
                                            View Map
                                        </h4>

                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item active">
                                                    view map
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </Row>
                            <Row>
                                <Col lg={12} style={{textAlign:"end"}}>
                                    <button className="btn btn-light waves-effect waves-light mb-4" onClick={() => navigate(-1)}>Go Back</button>
                                </Col>
                            </Row>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col lg={12}  style={{margin:"auto"}}>
                                            
                                                <CardTitle className="mb-4">
                                                    View Map
                                                    <Col lg={1} style={{float:"right",textAlign:"end",marginTop:"-10px"}}>
                                                        
                                                    </Col>
                                                </CardTitle>

                                                <Row>
                                                    <Col lg={12}>
                                                        <Nav tabs className="nav-tabs-custom nav-justified" style={{width:"90%"}}>
                                                            <NavItem style={{width:"13%",textAlign:"center"}}>
                                                                <NavLink style={{ cursor: "pointer" }} className={classnames({active: activeTab === "1",})} onClick={() => { toggle("1") }}>
                                                                    <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                                    <span className="font-size-14 mt-2 fw-semibold d-none d-sm-block">Summary</span>
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem style={{width:"13%",textAlign:"center"}}>
                                                                <NavLink style={{ cursor: "pointer" }} className={classnames({active: activeTab === "2",})} onClick={() => { toggle("2") }}>
                                                                    <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                                    <span className="font-size-14 mt-2 fw-semibold d-none d-sm-block">Kpi View</span>
                                                                </NavLink>
                                                            </NavItem>
                                                        </Nav>
                                                        <TabContent activeTab={activeTab} className="p-3 text-muted">
                                                            <TabPane tabId="1"><Row><Summary/></Row></TabPane>
                                                            <TabPane tabId="2"><Row><KpiView/></Row></TabPane>
                                                            
                                                        </TabContent>
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

export default ViewMap
