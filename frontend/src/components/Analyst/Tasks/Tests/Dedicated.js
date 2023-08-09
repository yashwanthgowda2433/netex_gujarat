import React, { useEffect, useState } from "react"
import ReactDOM from 'react-dom';

import ReactApexChart from "react-apexcharts"
import ApexCharts from "apexcharts";
import {
    Card,
    CardBody,
  } from "reactstrap"

import { act } from "react-dom/test-utils";

import { Link, withRouter, useLocation, useNavigate } from "react-router-dom"

// context 
import { useAuthContext } from "../../../../hooks/useAuthContext";

// classnames
import classnames from "classnames";

const Dedicated = (props) => {
    const data = props.data;
    const [two_g_data, set_two_g_data] = useState([]);

    if(data){
        console.log("--=-----=--")
        const json_data = JSON.parse(data);
        console.log(json_data.two_g)
        const two_g = json_data.two_g;
        const three_g = json_data.three_g;
        const four_g = json_data.four_g;


        var options = {
            chart: {
                toolbar: {
                    autoSelected: 'pan' 
                }
            },
            colors: ['#45cb85', '#3b5de7'],
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
                width: '3',
                dashArray: [0, 0],
            },
            legend: {
                show:false,
                position: 'top',
            },
            markers: {
                size: 0,
            },
            fill: {
                type: 'gradient',
                gradient: {
                  shadeIntensity: 0,
                  inverseColors: false,
                  opacityFrom: 0.5,
                  opacityTo: 0,
                  stops: [0, 90, 100]
                },
            },
            xaxis: {
                categories: two_g_data,
                title: {
                    text: 'Time'
                },
               
            },
            
            fill: {
                type: 'solid',
                opacity: [1, 0.1],
            },
    
            legend: {
                position: 'top',
                horizontalAlign: 'right',
            }
        }
        

        return (
            <><h1>Dedicated</h1></>
        )
    }else{
        return (
            <><h1>Dedicated</h1></>
        )
    }

}
export default Dedicated

