import React, { useEffect, useState } from "react";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import Sidebar from "../../Common/Sidebar";
import { Card, CardBody, CardTitle, Col, Row, Progress, TabContent,TabPane, Collapse, NavLink, NavItem, Nav, DropdownMenu,
    DropdownItem, DropdownToggle,ButtonDropdown } from "reactstrap";
import { Link, withRouter, useLocation, useNavigate } from "react-router-dom"
import { isEmpty, map, size } from "lodash"

//Context
import { useAuthContext } from "../../../hooks/useAuthContext";

import classnames from "classnames"

// tabs import
import Summary from "../../../components/L3tl/Tasks/Summary";
import MapView from "../../../components/L3tl/Tasks/MapView";
import Indoor from "../../../components/L3tl/Tasks/Indoor";
import Outdoor from "../../../components/L3tl/Tasks/Outdoor";
import Balcony from "../../../components/L3tl/Tasks/Balcony";
import Terrace from "../../../components/L3tl/Tasks/Terrace";
import WalkDriveTest from "../../../components/L3tl/Tasks/WalkDriveTest";

const PreReport = (props) => {
    const navigate = useNavigate();
    const [activeTab, setactiveTab] = useState("1")
    const [test_data, set_test_data] = useState({});
    const [infodrp_up11, setInfodrp_up11] = useState(false)
    const [analysed_by_team, set_analysed_by_team] = useState({});
    const [analysed_by_l2, set_analysed_by_l2] = useState({});
    const [analysed_by_l3, set_analysed_by_l3] = useState({});
    const [analysed_by_rf, set_analysed_by_rf] = useState({});
    const [pre_test, set_pre_test] = useState(false);
    const [post_test, set_post_test] = useState(false);
    const [test, set_test] = useState(false);


    const [col5, setcol5] = useState(false)

    const {user} = useAuthContext()
    const propsData = useLocation();
    // //console.log(propsData)
    const task_data = propsData.state;
    //console.log(task_data)

    function toggle(tab) {
        if (activeTab !== tab) {
          setactiveTab(tab)
        }
    }

    useEffect(() => {
       
        if(user)
        {
            getTaskTests();
        }
    },[user]);

    const get_user = async (user_id)=>{
        // return user_id;
        //console.log(user_id)
        if(user_id != "" && user_id != null ){
          try{

            const response = await fetch('/api/user/get', {
                method: "POST",
                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
                body: JSON.stringify({ user_id })
            })
            if(response.ok)
            {
                const json = await response.json()
                //console.log("++++++++++++++++++")
                //console.log(json)
                if(json.status == "Success")
                {
                    return json.data;
                    
                }else{
                    return {}
                }
            }else{
                return {};
            }
          }catch(error){
            return {};
          }
        }else{
            return {};
        }
    }


    const getTaskTests = async () => {
        if(user)
        {
            const response = await fetch('/api/tests/l3tl/getPreReport', {
                method: "POST",
                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
                body: JSON.stringify({ task_id : task_data._id })
    
            })
            
            if(response.ok){
                const json = await response.json()
                //console.log(json)
                if(json.status == "Success")
                {
                    set_test_data(json.data);
                    if(user){
                        if(test_data)
                        {
                            set_test(json.test);
                            set_post_test(json.test_post);

                            // //console.log(test_data.analysed_by_l2)
                            set_analysed_by_team(await get_user(json.data.testreport_analysed_by_team));
                            set_analysed_by_l2(await get_user(json.data.analysed_by_l2));
                            set_analysed_by_l3(await get_user(json.data.analysed_by_l3));
                            set_analysed_by_rf(await get_user(json.data.analysed_by_rf));
                        }
                    }
                }
                if(json.status == "Error")
                {
                    // setLoading(false);
                }
            }else{
                // setLoading(false);
            }
        }
    }

    const convertdate = (olddate) => {
        var created_date = new Date(olddate);

        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = created_date.getFullYear();
        var month = months[created_date.getMonth()];
        var date = created_date.getDate();
        var hour = created_date.getHours();
        var min = created_date.getMinutes();
        var sec = created_date.getSeconds();
        var time = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec ;    // final date with time, you can use this according your requirement

        return time;
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
                                            TASK SUMMARY
                                        </h4>

                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item active">
                                                    tasks / report
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
                                                    Task Summary 
                                                    <Col lg={1} style={{float:"right",textAlign:"end",marginTop:"-10px"}}>
                                                        <ButtonDropdown
                                                            direction="right"
                                                            isOpen={infodrp_up11}
                                                            toggle={() => setInfodrp_up11(!infodrp_up11)}
                                                            className=""
                                                            >
                                                            <DropdownToggle style={{fontSize:"22px",cursor:"pointer",background:"none",border:"none",padding:"0px"}}>
                                                               <i className="bx bx-dots-vertical" style={{color:"#77787b"}}></i>
                                                            </DropdownToggle>
                                                            <DropdownMenu style={{marginLeft:"-120px",marginTop:"22px"}}>
                                                                <DropdownItem  className="font-size-14">Direct Transfer</DropdownItem> 
                                                                <DropdownItem  className="font-size-14">Excel Download</DropdownItem> 

                                                            </DropdownMenu>
                                                        </ButtonDropdown>
                                                    </Col>
                                                </CardTitle>

                                                <Row>
                                                    <Col lg={12}>
                                                        {pre_test || post_test ? 
                                                        <>
                                                            <button onClick={() => { setcol5(!col5) }} className="btn bg-warning waves-effect m-b-15 mt-2" type="button" style={{ cursor: "pointer", color:"#ffffff" }} >RF Measurments</button>
                                                            <Collapse isOpen={col5}>
                                                                <CardBody>
                                                                
                                                                    <Link className="btn btn-warning" style={{marginLeft:"20px"}} to="/tasks/report/post" state={task_data}>Post Measurments</Link>
                                                                </CardBody>
                                                            </Collapse>
                                                        </>
                                                        : <></> }
                                                        {
                                                            test ?
                                                               <>
                                                                    <Link className="btn btn-info" to="/tasks/report" state={task_data}>L3 Measurments</Link>
                                                               </>
                                                            : 
                                                               <></>
                                                        }
                                                    </Col>
                                                </Row>

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
                                                                    <span className="font-size-14 mt-2 fw-semibold d-none d-sm-block">MapView</span>
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem style={{width:"13%",textAlign:"center"}}>
                                                                <NavLink style={{ cursor: "pointer" }} className={classnames({active: activeTab === "3",})} onClick={() => { toggle("3") }}>
                                                                    <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                                    <span className="font-size-14 mt-2 fw-semibold d-none d-sm-block">Indoor</span>
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem style={{width:"13%",textAlign:"center"}}>
                                                                <NavLink style={{ cursor: "pointer" }} className={classnames({active: activeTab === "4",})} onClick={() => { toggle("4") }}>
                                                                    <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                                    <span className="font-size-14 mt-2 fw-semibold d-none d-sm-block">Outdoor</span>
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem style={{width:"13%",textAlign:"center"}}>
                                                                <NavLink style={{ cursor: "pointer" }} className={classnames({active: activeTab === "5",})} onClick={() => { toggle("5") }}>
                                                                    <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                                    <span className="font-size-14 mt-2 fw-semibold d-none d-sm-block">Balcony</span>
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem style={{width:"13%",textAlign:"center"}}>
                                                                <NavLink style={{ cursor: "pointer" }} className={classnames({active: activeTab === "6",})} onClick={() => { toggle("6") }}>
                                                                    <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                                    <span className="font-size-14 mt-2 fw-semibold d-none d-sm-block">Terrace</span>
                                                                </NavLink>
                                                            </NavItem>
                                                            <NavItem style={{width:"13%",textAlign:"center"}}>
                                                                <NavLink style={{ cursor: "pointer" }} className={classnames({active: activeTab === "7",})} onClick={() => { toggle("7") }}>
                                                                    <span className="d-block d-sm-none"><i className="fas fa-home"></i></span>
                                                                    <span className="font-size-14 mt-2 fw-semibold d-none d-sm-block">Walk Drive Test</span>
                                                                </NavLink>
                                                            </NavItem>
                                                        </Nav>
                                                        <TabContent activeTab={activeTab} className="p-3 text-muted">
                                                            <TabPane tabId="1"><Row><Summary data={{test_data, analysed_by_team, analysed_by_l2, analysed_by_l3, analysed_by_rf}} /></Row></TabPane>
                                                            <TabPane tabId="2"><Row><MapView data={test_data} /></Row></TabPane>
                                                            <TabPane tabId="3"><Row>{test_data?<Indoor data={test_data} />:""}</Row></TabPane>
                                                            <TabPane tabId="4"><Row>{test_data?<Outdoor data={test_data} />:""}</Row></TabPane>
                                                            <TabPane tabId="5"><Row>{test_data?<Balcony data={test_data} />:""}</Row></TabPane>
                                                            <TabPane tabId="6"><Row>{test_data?<Terrace data={test_data} />:""}</Row></TabPane>
                                                            <TabPane tabId="7"><Row>{test_data?<WalkDriveTest data={test_data} />:""}</Row></TabPane>

                                                        </TabContent>
                                                    </Col>
                                                </Row>

                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                    <Footer/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PreReport;
                            