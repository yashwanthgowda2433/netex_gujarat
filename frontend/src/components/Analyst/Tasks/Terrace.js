import React, { useEffect, useState } from "react"
import { Card, CardBody, Table, CardTitle, Row, Col, Pagination, PaginationItem, PaginationLink, TabContent,TabPane, Collapse, NavLink, NavItem, Nav } from "reactstrap"
import { isEmpty, map, size } from "lodash"

import { Link, withRouter, useLocation, useNavigate } from "react-router-dom"

// context 
import { useAuthContext } from "../../../hooks/useAuthContext";

// classnames
import classnames from "classnames"

// test import
import Dedicated from "./Tests/Dedicated";
import Idle from "./Tests/Idle";
import Ookla from "./Tests/Ookla";

const Terrace = (props) => {
    const [activeTab, setactiveTab] = useState("2")

    const {user} = useAuthContext()
    const [device_lists, update_device_lists] = useState([]);

    const propsData = useLocation();
    const task_data = propsData.state;
    const test_data = props.data;
    const terrace_data = test_data?test_data.testreport_terrace?JSON.parse(test_data.testreport_terrace):"":"";
    const dedidcated = terrace_data?terrace_data.dedicated:"";
    const idle = terrace_data?terrace_data.idle:"";
    const ookla = terrace_data?terrace_data.dataResult:"";

    //console.log("+========+========+")
    //console.log(task_data)
    //console.log(test_data)

    function toggle(tab) {
        if (activeTab !== tab) {
          setactiveTab(tab)
        }
    }

    return (
        <Col lg={12}>
            <Nav tabs className="nav-tabs-custom nav-justified" style={{width:"55%"}}>
                
                <NavItem style={{width:"10%",textAlign:"center"}}>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({active: activeTab === "2",})} onClick={() => { toggle("2") }}>
                            <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                            <span className="font-size-14 mt-2 fw-semibold d-none d-sm-block">Dedicated</span>
                    </NavLink>
                </NavItem>
                <NavItem style={{width:"8%",textAlign:"center"}}>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({active: activeTab === "3",})} onClick={() => { toggle("3") }}>
                        <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                        <span className="font-size-14 mt-2 fw-semibold d-none d-sm-block">Idle</span>
                    </NavLink>
                </NavItem>
                <NavItem style={{width:"16%",textAlign:"center"}}>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({active: activeTab === "4",})} onClick={() => { toggle("4") }}>
                        <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                        <span className="font-size-14 mt-2 fw-semibold d-none d-sm-block">Ookla Speed Test</span>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab} className="p-3 text-muted">
                <TabPane tabId="2"><Row><Dedicated data={dedidcated}/></Row></TabPane>
                <TabPane tabId="3"><Row><Idle data={idle}/></Row></TabPane>
                <TabPane tabId="4"><Row><Ookla data={ookla} /></Row></TabPane>
            </TabContent>
        </Col>
    )
}

export default Terrace


