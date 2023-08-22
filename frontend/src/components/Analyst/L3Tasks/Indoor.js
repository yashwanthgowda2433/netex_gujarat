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

const Indoor = (props) => {
    const [activeTab, setactiveTab] = useState("2")

    const {user} = useAuthContext()
    const [device_lists, update_device_lists] = useState([]);
    const [floorValue, update_floorValue] = useState("");
    const [new_indoor_data, update_new_indoor_data] = useState("");


    const propsData = useLocation();
    const task_data = propsData.state;
    const test_data = props.data;
    const indoor_data = test_data?test_data.testreport_indoor?JSON.parse(test_data.testreport_indoor):"":"";
    console.log(indoor_data)
    const floor_keys = Object.keys(indoor_data);

    const [dedidcated, set_dedidcated] = useState("");
    const [idle, set_idle] = useState("");
    const [ookla, set_ookla] = useState("");

    if(idle == ""){
      setTimeout(()=>{
        set_idle(indoor_data?indoor_data.idle?indoor_data.idle:JSON.parse(indoor_data[floor_keys[0]]).idle:"");
             
        set_dedidcated(indoor_data?indoor_data.dedicated?indoor_data.dedicated:JSON.parse(indoor_data[floor_keys[0]]).dedicated:"");
        
        set_ookla(indoor_data?indoor_data.dataResult?indoor_data.dataResult:JSON.parse(indoor_data[floor_keys[0]]).dataResult:"");
      }, 1000)
    }
    //console.log("+========+========+")
    //console.log(task_data)
    //console.log(test_data)

    useEffect(() => {
       
        if(user)
        {
            
            // if(floorValue == ""){
                // var floor_val = document.querySelector('select[name=floors]').value;
                console.log("+++++++++++++")

                // if(floor_val)
                // {
                //     update_floorValue(floor_val);
                //     update_new_indoor_data(indoor_data[floor_val]);
                //     console.log(indoor_data[floor_val])
                //     set_dedidcated(JSON.parse(indoor_data[floor_val]).dedicated);
                //     console.log(JSON.parse(indoor_data[floor_val]).dedicated);
                //     set_idle(JSON.parse(indoor_data[floor_val]).idle);
                //     console.log(JSON.parse(indoor_data[floor_val]).idle);
                //     set_ookla(JSON.parse(indoor_data[floor_val]).dataResult);
                //     console.log(JSON.parse(indoor_data[floor_val]).dataResult);

                // }else{
                    // set_idle(indoor_data?indoor_data.idle?indoor_data.idle:JSON.parse(indoor_data[floor_keys[0]]).idle:"");
                  
                    // set_dedidcated(indoor_data?new_indoor_data.dedicated?new_indoor_data.dedicated:JSON.parse(indoor_data[floor_keys[0]]).dedicated:"");
                    // set_ookla(indoor_data?new_indoor_data.dataResult?new_indoor_data.dataResult:JSON.parse(indoor_data[floor_keys[0]]).dataResult:"");
                // }
                
            // }
        }
    },[user]);

    function toggle(tab) {
        if (activeTab !== tab) {
          setactiveTab(tab)
        }
    }

    const selectFloor = (event) => { 
        console.log(event.target.value);
        update_floorValue(event.target.value)
        console.log(JSON.parse(indoor_data[event.target.value]).dedicated);
        update_new_indoor_data(JSON.parse(indoor_data[event.target.value]).dedicated);
        set_dedidcated(JSON.parse(indoor_data[event.target.value]).dedicated);
        console.log(JSON.parse(indoor_data[event.target.value]).dedicated);
        set_idle(JSON.parse(indoor_data[event.target.value]).idle);
        console.log(JSON.parse(indoor_data[event.target.value]).idle);
        set_ookla(JSON.parse(indoor_data[event.target.value]).dataResult);
        console.log(JSON.parse(indoor_data[event.target.value]).dataResult);
    }
    

    return (
        <Col lg={12}>
            <Nav tabs className="nav-tabs-custom nav-justified" style={{width:"55%"}}>
                <NavItem style={{width:"10%",textAlign:"center"}}>
                    <NavLink style={{ cursor: "pointer" }} className={classnames({active: activeTab === "1",})}>
                        <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                        <span className="font-size-14 mt-2 fw-semibold d-none d-sm-block">Floors&nbsp;&nbsp;
                            <select name="floors" onChange={(event)=>{selectFloor(event)}}>
                                { floor_keys.length > 0 ?
                                    floor_keys.map((item, index)=>(
                                        item != "dedicated" && item != "idle" && item != "dataResult" && item != "speed_test_mode"?
                                           <option value={item}>{item}</option>
                                        :  <></>
                                    ))
                                :
                                    <></>
                                }
                                
                            </select>
                        </span>
                    </NavLink>
                </NavItem>
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
                <TabPane tabId="2">
                    <Row>
                        <Col lg={9}>
                            <Dedicated data={dedidcated}/>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="3">
                    <Row>
                        <Col lg={9}>
                            <Idle data={idle}/>
                        </Col>
                    </Row>
                </TabPane>
                <TabPane tabId="4">
                    <Row>
                        <Col lg={9}>
                            <Ookla data={ookla} />
                        </Col>
                    </Row>
                </TabPane>
            </TabContent>
        </Col>
    )
}

export default Indoor


