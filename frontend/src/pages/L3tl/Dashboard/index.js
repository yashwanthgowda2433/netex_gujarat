import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardBody, Col, Row, Progress } from "reactstrap";
import ReactApexChart from "react-apexcharts";

//Import Components
// import LineChart from "../../components/dashboard/line-chart";
// import RevenueChart from "../../components/dashboard/revenue-chart";
// import SalesAnalytics from "../../components/dashboard/sales-analytics";
// import CoverageScatter from "../../components/dashboard/coverage_scatter";
// import QualityScatter from "../../components/dashboard/quality_scatter";
// import BatteryDevices from "../../components/dashboard/battery_devices";
// import LatestTransaction from "../../components/dashboard/latest-transaction"

import widgetImage from "../../../assets/images/widget-img.png";

//Common pages
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import Sidebar from "../../Common/Sidebar";

//Context
import { useAuthContext } from "../../../hooks/useAuthContext";
const series = [70];

const options = {
    plotOptions: {
        radialBar: {
            offsetY: -12,
            hollow: {
                margin: 5,
                size: "60%",
                background: "rgba(59, 93, 231, .25)",
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    show: true,
                    fontSize: "12px",
                    offsetY: 5,
                },
                style: {
                    colors: ["#fff"],
                },
            },
        },
    },
    colors: ["#3b5de7"],
};

const series1 = [81];

const options1 = {
    plotOptions: {
        radialBar: {
            offsetY: -12,
            hollow: {
                margin: 5,
                size: "60%",
                background: "rgba(69, 203, 133, .25)",
            },
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    show: true,
                    fontSize: "12px",
                    offsetY: 5,
                },
                style: {
                    colors: ["#fff"],
                },
            },
        },
    },
    colors: ["#45CB85"],
};

const Dashboard = () => {
    const [stores_count, update_stores_count] = useState(0);
    const [devices, update_devices] = useState(0);

    const { user } = useAuthContext();

    useEffect(() => {
        //Registered Devices Counts
        // const fetchRegisteredDevicesCounts = async () => {
        //     const response = await fetch(
        //         "/api/devices/getRegisteredDevicesCounts",
        //         {
        //             method: "POST",
        //             headers: { Authorization: `Bearer ${user.token}` },
        //         }
        //     );
        //     const json = await response.json();
        //     // // console.log(json)

        //     if (response.ok) {
        //         dispatch({ type: "SET_DEVICES", payload: json });
        //         devices = json;
        //     }
        // };

        // const fetchStoresCount = async () => {
        //     const response = await fetch('/api/stores/getStoresCount', {
        //         method: "POST",
        //         headers: { 'Authorization': `Bearer ${user.token}` },
        //     })
        //     const json = await response.json()
        //     // console.log(json)

        //     if (response.ok) {

        //         if (json.status == "Success") {
        //             update_stores_count(json.data)
        //         }
        //     }
        // }

        // // console.log("user :: " + user);
        // if (user) {
        //     fetchRegisteredDevicesCounts();
        //     fetchStoresCount();
        // }
    }, [user]);

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

                    <div className="main-content">
                        <div className="page-content">
                            <Row>
                                <div className="col-12">
                                    <div className="page-title-box d-flex align-items-center justify-content-between">
                                        <h4 className="page-title mb-0 font-size-18">
                                            Dashboard
                                        </h4>

                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item active">
                                                    Welcome to Netbuddy
                                                    Dashboard
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <Row>
                                <Col lg={2}>
                                
                                            <Card>
                                                <CardBody>
                                                    <div className="d-flex align-items-start">

                                                        <div className="flex-1">
                                                            <div className="font-size-16 mt-2">
                                                                Total Devices
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h4 className="mt-4">
                                                        {devices != null
                                                            ? devices.registered_devices_count
                                                            : 0}
                                                    </h4>

                                                </CardBody>
                                            </Card>
                                           
                                    
                                            <Card>
                                                <CardBody>
                                                    <div className="d-flex align-items-start">

                                                        <div className="flex-1">
                                                            <div className="font-size-16 mt-2">
                                                                Registered Devices
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h4 className="mt-4">
                                                        {devices != null
                                                            ? devices.registered_devices_count
                                                            : 0}
                                                    </h4>

                                                </CardBody>
                                            </Card>
                                            

                                            <Card>
                                                <CardBody>
                                                    <div className="d-flex align-items-start">

                                                        <div className="flex-1">
                                                            <div className="font-size-16 mt-2">
                                                                Total Stores
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <h4 className="mt-4">{stores_count}</h4>
                                                    <Row>
                                                        <div className="col-7"></div>
                                                    </Row>
                                                </CardBody>
                                            </Card>
                                            
                                </Col>
                                <Col lg={5}>
                                    {/* <LineChart /> */}
                                </Col>
                                <Col lg={5}>
                                    {/* <CoverageScatter /> */}
                                </Col>
                            </Row>
                            <Row>
                                <Col lg={7}>
                                    <Row>
                                        {/* <BatteryDevices /> */}
                                    </Row>
                                </Col>
                                <Col lg={5}>
                                    {/* <QualityScatter /> */}
                                </Col>


                            </Row>
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;
