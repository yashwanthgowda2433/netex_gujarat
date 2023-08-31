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

import classnames from "classnames";

// Map Import
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})


const TrackEmployees = (props) => {
    const navigate = useNavigate();
    
    const { user } = useAuthContext();
    const [opti_engineers, set_opti_engineers] = useState([]);
    var [error, setError] = useState("");
    var [success,setSuccess] = useState("");
    const [search_task, set_search_task] = useState("");
    const [latlong, set_latlong] = useState([13.025561441265522, 77.63931133566392]);

    useEffect(() => {
       
        if(user)
        {
            fetchL3tlEngineers();
        }
    },[user]);

    const fetchL3tlEngineers = async () => {
        setError("")
        setSuccess("")
        const response = await fetch('/api/user/l3tl/getL3tlEngineers', {
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
                                                                    <button type='button' onClick={fetchL3tlEngineers} className='btn btn-primary'>Search</button>
                                                                </Col>
                                                              </Row>
                                                            </CardBody>
                                                        </Card>
                                                        <MapContainer
                                                            center={latlong}
                                                            zoom={7}
                                                            style={{ height: "600px" }}
                                                            maxZoom={30}
                                                            maxNativeZoom={20}
                                                            zoomControl={false}
                                                            >
                                                            <TileLayer 
                                                                url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" 
                                                                maxZoom={30}
                                                                maxNativeZoom={20}
                                                                />
                                                            <ZoomControl position="bottomright" />
                                                            {opti_engineers.length > 0?
                                                                    opti_engineers.map((item, index)=>(
                                                                        item.user_latitude != null ? 
                                                                            <Marker position={[item.user_latitude, item.user_longitude]}>
                                                                                <Popup>
                                                                                    <p><span style={{fontWeight:"700"}}>Emp ID :</span> {item.user_userid}</p>
                                                                                    <p><span style={{fontWeight:"700"}}>Name :</span> {item.user_name}</p>
                                                                                    <p><span style={{fontWeight:"700"}}>Mobile :</span> {item.user_mobile}</p>
                                                                                </Popup>
                                                                            </Marker> 
                                                                        :
                                                                            <></>
                                                                    ))
                                                                    :<></>
                                                            }
                                                        </MapContainer>
                                                       
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
