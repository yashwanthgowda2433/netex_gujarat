import React, { useEffect, useState } from "react"
import { Card, CardBody, Table, CardTitle, Row, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap"
import { isEmpty, map, size } from "lodash"

import { Link, withRouter, useLocation, useNavigate } from "react-router-dom";

// Map Import
import Leaflet from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from 'leaflet';
import "leaflet/dist/leaflet.css";

// context 
import { useAuthContext } from "../../../hooks/useAuthContext";

Leaflet.Icon.Default.imagePath = "../node_modules/leaflet";

delete Leaflet.Icon.Default.prototype._getIconUrl;

Leaflet.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

const WalkDriveTest = (props) => {
    const {user} = useAuthContext()
    const [device_lists, update_device_lists] = useState([]);

    const propsData = useLocation();
    const task_data = propsData.state;
    const test_data = props.data;
    const walk_drive_test = test_data?test_data.testreport_walkdrive?JSON.parse(test_data.testreport_walkdrive):"":"";
    const twog_values = ["Rx Level","Cell Id"];
    const threeg_values = ["RSCP","Cell Id"];
    const fourg_values = ["Rx Level","Cell Id"];

    const [technology_value, set_technology_value] = useState("");
    const [network_param_value, set_network_param_value] = useState("");

    const [latlong, set_latlong] = useState([13.025561441265522, 77.63931133566392]);

    const greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    });
    
    const blueIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    const yellowIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });
    
    const redIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });

    const changeTechnology = (event) => {
        var tech = event.target.value;
        if(tech == "two_g")
        {
            set_network_param_value("rx_lev");
        }
        if(tech == "three_g")
        {
            set_network_param_value("rscp");
        }
        if(tech == "four_g")
        {
            set_network_param_value("rsrp");
        }
        set_technology_value(tech);
    }

    const changeNetworkParam = (event) => {
        var tech = event.target.value;
        set_network_param_value(tech);
    }

    const getTwogStrength = (data) => {
        var twog_strength = greenIcon;
        var rxlevel_strength = "";
        var rxlevel = data;
        if (rxlevel >= -85) {
            twog_strength = greenIcon;
        } 
        else if (rxlevel < -85 && rxlevel >= -95) {
            twog_strength = yellowIcon;
        } 
        else if(rxlevel < -95){
            twog_strength = redIcon;
        }
      
         
        return twog_strength;
    }

    const getThreegStrength = (data) => {
        var threeg_strength = greenIcon;
      
        var rscp_strength = "";
        var rscp = data;
        if (rscp >= -90) {
            threeg_strength = greenIcon;
        } else if (rscp < -90 && rscp >= -100) {
            threeg_strength = yellowIcon;
        } else if(rscp < -100){
            threeg_strength = redIcon;
        }
        return threeg_strength;
    }

    const getFourgRsrpStrength = (data) => {
        var fourg_strength = greenIcon;
        var rsrp_strength = "";
        var rsrp = data.rsrp;
        if (rsrp >= -85) {
          fourg_strength = greenIcon;
        } else if (rsrp < -85 && rsrp >= -99) {
          fourg_strength = yellowIcon;
        } else if(rsrp < -99) {
          fourg_strength = redIcon;
        }
        return fourg_strength;
    }

    const getFourgRsrqStrength = (data) => {
        var fourg_strength = greenIcon;
        var rsrp_strength = "";
        var rsrq = data;
        if (rsrq >= -8) {
          fourg_strength = greenIcon;
        } else if (rsrq < -8 && rsrq >= -14) {
          fourg_strength = yellowIcon;
        } else if(rsrq < -14){
          fourg_strength = redIcon;
        }
        return fourg_strength;
    }

    const getFourgSinrStrength = (data) => {
        var fourg_strength = greenIcon;
        var rsrp_strength = "";
        var sinr = data;
        if (sinr >= 20) {
          fourg_strength = greenIcon;
        } else if (sinr > 5 && sinr < 20) {
          fourg_strength = yellowIcon;
        } else if(sinr <= 5){
          fourg_strength = redIcon;
        }
        return fourg_strength;
    }

    return (
        <Col lg={12}>
            <Card>
                <CardBody>
                    <Row>
                        <Col lg={2}>
                            <select className="form-select" name="technology" onChange={(event)=>{changeTechnology(event)}}>
                                <option value="">Select Technology</option>
                                <option value="two_g">2G</option>
                                <option value="three_g">3G</option>
                                <option value="four_g">4G</option>
                                <option value="four_g">Volte</option>

                                {/* <option value="five_g">5G</option> */}
                            </select>
                        </Col>

                        <Col lg={2}>
                            {technology_value != "" ?
                                technology_value == "two_g" ?
                                    <select className="form-select" name="parameter" onChange={(event)=>{changeNetworkParam(event)}}>
                                        <option value="rx_lev">Rx Level</option>
                                        <option value="c_id">Cell Id</option>
                                    </select>
                                :
                                    technology_value == "three_g" ?
                                        <select className="form-select" name="parameter" onChange={(event)=>{changeNetworkParam(event)}}>
                                            <option value="rscp">RSCP</option>
                                            <option value="c_id">Cell Id</option>
                                        </select>
                                    :
                                        technology_value == "four_g" ?
                                            <select className="form-select" name="parameter" onChange={(event)=>{changeNetworkParam(event)}}>
                                                <option value="rsrp">RSRP</option>
                                                <option value="rsrq">RSRQ</option>
                                                <option value="sinr">CINR</option>
                                                <option value="c_id">Cell Id</option>
                                            </select>
                                        :<></>
                            :<></>}
                        </Col>
                        
                        
                    </Row>

                    <Row className="mt-5">
                        <Col lg={6}>
                            <CardTitle>Idle</CardTitle>
                            {
                            technology_value != "" ?
                            <MapContainer
                                center={latlong}
                                zoom={20}
                                style={{ height: "600px" }}
                                maxZoom={30}
                                maxNativeZoom={19}
                                zoomControl={false}
                                >
                                <TileLayer
                                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" 
                                    maxZoom={30}
                                    maxNativeZoom={19}
                                />
                                <ZoomControl position="bottomright" />
                                {
                                    technology_value != "" ?
                                        technology_value == "two_g" ?
                                            walk_drive_test[technology_value].data.length > 0 ?
                                                walk_drive_test[technology_value].data.map((item, index)=>(
                                                    
                                                    <Marker position={[item.lat, item.lng]} icon={
                                                        item.rx_lev ?
                                                            getTwogStrength(parseInt(item.rx_lev))
                                                        : <></>
                         
                                                        }>
                                                        {latlong[0]==13.025561441265522 ? set_latlong([item.lat, item.lng]) : ""}

                                                    </Marker>
                                                ))
                                            :<></>
                                        :   
                                            technology_value == "three_g" ?
                                                walk_drive_test[technology_value].data.length > 0 ?
                                                    walk_drive_test[technology_value].data.map((item, index)=>(
                                                        <Marker position={[item.lat, item.lng]} icon={
                                                            item.rscp ?
                                                                getThreegStrength(parseInt(item.rscp))
                                                            : <></>
                     
                                                            }>
                                                            {latlong[0]==13.025561441265522 ? set_latlong([item.lat, item.lng]) : ""}

                                                        </Marker>
                                                    ))
                                                :<></>

                                            :   
                                                technology_value == "four_g" ?
                                                    walk_drive_test[technology_value].data.length > 0 ?
                                                        walk_drive_test[technology_value].data.map((item, index)=>(
                                                            <Marker position={[item.lat, item.lng]} icon={
                                                                network_param_value == "rsrp" ?
                                                                    getFourgRsrpStrength(parseInt(item.rscp))
                                                                : 
                                                                    network_param_value == "rsrq" ?
                                                                        getFourgRsrqStrength(parseInt(item.rsrq))
                                                                    :
                                                                        network_param_value == "sinr" ?
                                                                            getFourgSinrStrength(parseInt(item.sinr))
                                                                        :  <></>
                                                                }>
                                                                {latlong[0]==13.025561441265522 ? set_latlong([item.lat, item.lng]) : ""}

                                                            </Marker>
                                                        ))
                                                    :<></>
                                                : <></>
                                    : <></>
                                }
                            </MapContainer>
                            :<></>}

                        </Col>
                        <Col lg={6}>
                            <CardTitle>Dedicated</CardTitle>
                            {
                            technology_value != "" ?
                            <MapContainer
                                center={latlong}
                                zoom={20}
                                style={{ height: "600px" }}
                                maxZoom={30}
                                maxNativeZoom={19}
                                zoomControl={false}
                                >
                                <TileLayer
                                    url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" 
                                    maxZoom={30}
                                    maxNativeZoom={19}
                                />
                                <ZoomControl position="bottomright" />
                                {
                                    technology_value != "" ?
                                        technology_value == "two_g" ?
                                            walk_drive_test["two_g_dedicated"].data.length > 0 ?
                                                walk_drive_test["two_g_dedicated"].data.map((item, index)=>(
                                                    
                                                    <Marker position={[item.lat, item.lng]} icon={
                                                        item.rx_lev ?
                                                            getTwogStrength(parseInt(item.rx_lev))
                                                        : <></>
                         
                                                        }>
                                                        {latlong[0]==13.025561441265522 ? set_latlong([item.lat, item.lng]) : ""}

                                                    </Marker>
                                                ))
                                            :<></>
                                        :   
                                            technology_value == "three_g" ?
                                                walk_drive_test["three_g_dedicated"].data.length > 0 ?
                                                    walk_drive_test["three_g_dedicated"].data.map((item, index)=>(
                                                        <Marker position={[item.lat, item.lng]} icon={
                                                            item.rscp ?
                                                                getThreegStrength(parseInt(item.rscp))
                                                            : <></>
                     
                                                            }>
                                                            {latlong[0]==13.025561441265522 ? set_latlong([item.lat, item.lng]) : ""}

                                                        </Marker>
                                                    ))
                                                :<></>

                                            :   
                                                technology_value == "four_g" ?
                                                    walk_drive_test["four_g_dedicated"].data.length > 0 ?
                                                        walk_drive_test["four_g_dedicated"].data.map((item, index)=>(
                                                            <Marker position={[item.lat, item.lng]} icon={
                                                                network_param_value == "rsrp" ?
                                                                    getFourgRsrpStrength(parseInt(item.rscp))
                                                                : 
                                                                    network_param_value == "rsrq" ?
                                                                        getFourgRsrqStrength(parseInt(item.rsrq))
                                                                    :
                                                                        network_param_value == "sinr" ?
                                                                            getFourgSinrStrength(parseInt(item.sinr))
                                                                        :  <></>
                                                                }>
                                                                {latlong[0]==13.025561441265522 ? set_latlong([item.lat, item.lng]) : ""}

                                                            </Marker>
                                                        ))
                                                    :<></>
                                                : <></>
                                    : <></>
                                }
                            </MapContainer>
                            :<></>}
                        </Col>
                    </Row>

                </CardBody>
            </Card>
        </Col>
    )
}

export default WalkDriveTest


