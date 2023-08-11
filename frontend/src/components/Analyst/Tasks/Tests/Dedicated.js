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

//Graphs Import
import Two_g from "./Graphs/Two_g";
import Three_g from "./Graphs/Three_g";
import Four_g from "./Graphs/Four_g";

const Dedicated = (props) => {
    const data = props.data;

    if(data){
        console.log("--=-----=--")
        const json_data = JSON.parse(data);
        const two_g = json_data.two_g;
        const neighbours = json_data.neighbours_list;
        const three_g = json_data.three_g;

        const four_g = json_data.four_g;


        
        

        return (
            <>
                <Two_g data={two_g} neighbours={neighbours}/>
                <Three_g data={three_g} neighbours={neighbours}/>
                <Four_g data={four_g} neighbours={neighbours}/>

            </>
        )
    }else{
        return (
            <><p>No Data Found!</p></>
        )
    }

}
export default Dedicated

