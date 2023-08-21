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
import { useAuthContext } from "../../../../../hooks/useAuthContext";

// classnames
import classnames from "classnames";

const Four_g = (props) => {

    const four_g_data = props.data;
    const data = four_g_data?four_g_data.data:"";

    const neighbours_list = props.neighbours;
    const neighbours = neighbours_list?neighbours_list.data:"";

    const {user} = useAuthContext()

    // rsrp
    const [four_g_rsrp_data, set_four_g_rsrp_data] = useState([]);
    const [cid_rsrp_data, set_cid_rsrp_data] = useState({});
    const [cid_rsrp_objdata, set_cid_rsrp_objdata] = useState({});
    const [rsrp_good, set_rsrp_good] = useState([]);
    const [rsrp_bad, set_rsrp_bad] = useState([]);
    const [rsrp_poor, set_rsrp_poor] = useState([]);
    



    //counts
    const [four_g_rsrp_count, set_four_g_rsrp_count] = useState([]);

    // rsrq
    const [four_g_rsrq_data, set_four_g_rsrq_data] = useState([]);
    const [cid_rsrq_data, set_cid_rsrq_data] = useState({});
    const [cid_rsrq_objdata, set_cid_rsrq_objdata] = useState({});
    const [rsrq_good, set_rsrq_good] = useState([]);
    const [rsrq_bad, set_rsrq_bad] = useState([]);
    const [rsrq_poor, set_rsrq_poor] = useState([]);


    // sinr
    const [four_g_sinr_data, set_four_g_sinr_data] = useState([]);
    const [cid_sinr_data, set_cid_sinr_data] = useState({});
    const [cid_sinr_objdata, set_cid_sinr_objdata] = useState({});
    const [sinr_good, set_sinr_good] = useState([]);
    const [sinr_bad, set_sinr_bad] = useState([]);
    const [sinr_poor, set_sinr_poor] = useState([]);

    useEffect(() => {
        
        if(data.length > 0)
        {
            // RSRP
            var rsrp_data = [];
            var c_id_obj_rsrp = {};
            var c_id_obj_rsrpobj = {};

            var rx_count = [];

            // RSRQ
            var rsrq_data = [];
            var c_id_obj_rsrq = {};
            var c_id_obj_rsrqobj = {};

            //SINR
            var sinr_data = [];
            var c_id_obj_sinr = {};
            var c_id_obj_sinrobj = {};

            for(var i=0; i<data.length; i++)
            {
                // RSRP
                if(!c_id_obj_rsrp[data[i].c_id+""]){
                    c_id_obj_rsrp[data[i].c_id+""] = [];
                    c_id_obj_rsrpobj[data[i].c_id+""] = [];

                }
                c_id_obj_rsrp[data[i].c_id+""].push(parseInt(data[i].rsrp));
                c_id_obj_rsrpobj[data[i].c_id+""].push(data[i]);

                rsrp_data.push(parseInt(data[i].rsrp)); 

            
                // RSRQ
                if(!c_id_obj_rsrq[data[i].c_id+""]){
                    c_id_obj_rsrq[data[i].c_id+""] = [];
                    c_id_obj_rsrqobj[data[i].c_id+""] = [];

                }
                c_id_obj_rsrq[data[i].c_id+""].push(parseInt(data[i].rsrq));
                c_id_obj_rsrqobj[data[i].c_id+""].push(data[i]);
                
                rsrq_data.push(parseInt(data[i].rsrq))

                // SINR
                if(!c_id_obj_sinr[data[i].c_id+""]){
                    c_id_obj_sinr[data[i].c_id+""] = [];
                    c_id_obj_sinrobj[data[i].c_id+""] = [];

                }
                c_id_obj_sinr[data[i].c_id+""].push(parseInt(data[i].sinr));
                c_id_obj_sinrobj[data[i].c_id+""].push(data[i]);

                rx_count.push(i+1);
                // if(data[i].sinr!=""){
                    sinr_data.push(parseInt(data[i].sinr))
                // }else{
                //     // sinr_data.push(0);
                // }

            }
            //console.log("++++++[[[[[[[]]]]]]=");

            
            set_cid_rsrp_objdata(c_id_obj_rsrpobj);
            set_cid_rsrq_objdata(c_id_obj_rsrqobj);
            set_cid_sinr_objdata(c_id_obj_sinrobj);


            set_cid_rsrp_data(c_id_obj_rsrp);
            set_cid_rsrq_data(c_id_obj_rsrq);
            set_cid_sinr_data(c_id_obj_sinr);

            // filter rsrp data
            set_four_g_rsrp_data(rsrp_data.map(value => isNaN(value)?null:value));
            const rsrpgood = rsrp_data.map((value,index) => value >= -85 ? value : null );
            const rsrpbad = rsrp_data.map((value,index) => value <= -85 && value >= -99 ? value : null );
            const rsrppoor = rsrp_data.map((value,index) => value <= -99 ? value : null );

            for(var i=0; i<rsrpgood.length-1; i++)
            {
                if(rsrpgood[i] != null)
                {
                    if(rsrpbad[i] == null && rsrpbad[i+1] != null)
                    {
                        rsrpbad[i] = rsrpgood[i];
                    }
                    if(rsrppoor[i] == null && rsrppoor[i+1] != null)
                    {
                        rsrppoor[i] = rsrpgood[i];
                    }
                }

                if(rsrpbad[i] != null)
                {
                    if(rsrpgood[i] == null && rsrpgood[i+1] != null)
                    {
                        rsrpgood[i] = rsrpbad[i];
                    }
                    if(rsrppoor[i] == null && rsrppoor[i+1] != null)
                    {
                        rsrppoor[i] = rsrpbad[i];
                    }
                }

                if(rsrppoor[i] != null)
                {
                    if(rsrpbad[i] == null && rsrpbad[i+1] != null)
                    {
                        rsrpbad[i] = rsrppoor[i];
                    }
                    if(rsrpgood[i] == null && rsrpgood[i+1] != null)
                    {
                        rsrpgood[i] = rsrppoor[i];
                    }
                }
            }
           
            set_rsrp_good(rsrpgood);
            set_rsrp_bad(rsrpbad)
            set_rsrp_poor(rsrppoor)
            // end filter rsrp data

            // filter rsrq data
            set_four_g_rsrp_count(rx_count);
            set_four_g_rsrq_data(rsrq_data.map(value => isNaN(value)?null:value));
            // let color = d >= -8 ? 'green' : d < -8 && d >= -14 ? 'yellow' : d < -14 ? 'red' :"";

            const rsrqgood = rsrq_data.map((value,index) => value >= -8 ? value : null );
            const rsrqbad = rsrq_data.map((value,index) => value <= -8 && value >= -14 ? value : null );
            const rsrqpoor = rsrq_data.map((value,index) => value <= -14 ? value : null );

            for(var i=0; i<rsrqgood.length-1; i++)
            {
                if(rsrqgood[i] != null)
                {
                    if(rsrqbad[i] == null && rsrqbad[i+1] != null)
                    {
                        rsrqbad[i] = rsrqgood[i];
                    }
                    if(rsrqpoor[i] == null && rsrqpoor[i+1] != null)
                    {
                        rsrqpoor[i] = rsrqgood[i];
                    }
                }

                if(rsrqbad[i] != null)
                {
                    if(rsrqgood[i] == null && rsrqgood[i+1] != null)
                    {
                        rsrqgood[i] = rsrqbad[i];
                    }
                    if(rsrqpoor[i] == null && rsrqpoor[i+1] != null)
                    {
                        rsrqpoor[i] = rsrqbad[i];
                    }
                }

                if(rsrqpoor[i] != null)
                {
                    if(rsrqbad[i] == null && rsrqbad[i+1] != null)
                    {
                        rsrqbad[i] = rsrqpoor[i];
                    }
                    if(rsrqgood[i] == null && rsrqgood[i+1] != null)
                    {
                        rsrqgood[i] = rsrqpoor[i];
                    }
                }
            }
           
            set_rsrq_good(rsrqgood);
            set_rsrq_bad(rsrqbad)
            set_rsrq_poor(rsrqpoor)
            // end filter rsrq data

            // filter sinr data
            // let color = d >= 20 ? 'green' : d > 5 && d < 20 ? 'yellow' : d > -20 && d <= 5 ? 'red' :"";

            set_four_g_sinr_data(sinr_data.map(value => isNaN(value)?null:value));
            const sinrgood = sinr_data.map((value,index) => value >= 20 ? value : null );
            const sinrbad = sinr_data.map((value,index) => value >= 5 && value <= 20 ? value : null );
            const sinrpoor = sinr_data.map((value,index) => value <= 5 ? value : null );

            for(var i=0; i<sinrgood.length-1; i++)
            {
                if(sinrgood[i] != null)
                {
                    if(sinrbad[i] == null && sinrbad[i+1] != null)
                    {
                        sinrbad[i] = sinrgood[i];
                    }
                    if(sinrpoor[i] == null && sinrpoor[i+1] != null)
                    {
                        sinrpoor[i] = sinrgood[i];
                    }
                }

                if(sinrbad[i] != null)
                {
                    if(sinrgood[i] == null && sinrgood[i+1] != null)
                    {
                        sinrgood[i] = sinrbad[i];
                    }
                    if(sinrpoor[i] == null && sinrpoor[i+1] != null)
                    {
                        sinrpoor[i] = sinrbad[i];
                    }
                }

                if(sinrpoor[i] != null)
                {
                    if(sinrbad[i] == null && sinrbad[i+1] != null)
                    {
                        sinrbad[i] = sinrpoor[i];
                    }
                    if(sinrgood[i] == null && sinrgood[i+1] != null)
                    {
                        sinrgood[i] = sinrpoor[i];
                    }
                }
            }
           
            set_sinr_good(sinrgood);
            set_sinr_bad(sinrbad)
            set_sinr_poor(sinrpoor)
            // end filter sinr data
    
        }
    },[user])

    // RX LEVEL GRAPH START

    const generateColorrsrp = (datas) => {
        //console.log("zzzzzzzzzzz")

        //console.log(datas)
        return datas.map((d,idx) => {
            //console.log(d)
            //console.log(idx)

            let color = d >= -85 ? 'green' : d <-85 && d >= -99 ? 'yellow' : d < -99 ? 'red' :"";
            return {
                offset: idx/datas.length*100,
                color,
                opacity:1
            }
        })

    }

    var options_graph_rsrp = {
        chart: {
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        tooltip: {
            enabled: true,
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                return '<div class="arrow_box" style="padding:10px;"><span style="color:#000;font-weight:600;">CELL ID :</span>' +
                  '<span>' + data[dataPointIndex].c_id+ '</span>' +
                  '</div>'
            }
        },
        colors: ['#008000', '#FFFF00', '#FF0000'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: '3',
            dashArray: [0,0,0],
        },
        legend: {
            show:false,
            position: 'top',
        },
        markers: {
            size: 5
        },
        xaxis: {
            title:{
                text:"Seconds",
            },
            axisBorder: {
                show:true,
                color:'#969494',
                offsetX:1,
                offsetY:1,
            },
            tickAmount: 6
        },
        yaxis: {
            title:{
                text:"RSRP",
            },
            axisBorder: {
                show:true,
                color:'#969494',
                offsetX:1,
                offsetY:1,
            },
            tickAmount: 6
        },
        fill: {
            type: 'solid',
            opacity: [1, 1, 1],
        },
        // fill: {
        //     type: 'gradient',
        //     gradient: {
        //         shade: 'dark',
        //         type: "horizontal",
        //         shadeIntensity: 0,
        //         opacityFrom: 0,
        //         gradientToColors: undefined,
        //         opacityTo: 0,
        //         inverseColors: false,
        //         colorStops:generateColorrsrp(four_g_rsrp_data)
        //     },
        // },
        
    }

    // RX LEVEL GRAPH END

    // RX QUAL GRAPH START
    
    const generateColorrsrq = (datas) => {
        //console.log("zzzzzzzzzzz")

        //console.log(datas)
        return datas.map((d,idx) => {
            //console.log(d)
            //console.log(idx)

            let color = d >= -8 ? 'green' : d < -8 && d >= -14 ? 'yellow' : d < -14 ? 'red' :"";
            return {
                offset: idx/datas.length*100,
                color,
                opacity:0.6
            }
        })

    }

    var options_graph_rsrq = {
        chart: {
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        tooltip: {
            enabled: true,
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                return '<div class="arrow_box" style="padding:10px;"><span style="color:#000;font-weight:600;">CELL ID :</span>' +
                  '<span>' + data[dataPointIndex].c_id?data[dataPointIndex].c_id:""+ '</span>' +
                  '</div>'
            }
        },
        colors: ['#008000', '#FFFF00', '#FF0000'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: '3',
            dashArray: [0,0,0],
        },
        legend: {
            show:false,
            position: 'top',
        },
        markers: {
            size: 5
        },
        xaxis: {
            title:{
                text:"Seconds",
            },
            axisBorder: {
                show:true,
                color:'#969494',
                offsetX:1,
                offsetY:1,
            },
            tickAmount: 6
        },
        yaxis: {
            title:{
                text:"RSRQ",
            },
            axisBorder: {
                show:true,
                color:'#969494',
                offsetX:1,
                offsetY:1,
            },
            tickAmount: 6
        },
        fill: {
            type: 'solid',
            opacity: [1, 1, 1],
        },
        // fill: {
        //     type: 'gradient',
        //     gradient: {
        //         shade: 'dark',
        //         type: "horizontal",
        //         shadeIntensity: 0,
        //         opacityFrom: 0,
        //         gradientToColors: undefined,
        //         opacityTo: 0,
        //         inverseColors: false,
        //         colorStops:generateColorrsrq(four_g_rsrq_data)
        //     },
        // },
        
    }

    // RX QUAL GRAPH END


    // SINR GRAPH START
    
    const generateColorsinr = (datas) => {
        //console.log("zzzzzzzzzzz")

        //console.log(datas)
        return datas.map((d,idx) => {
            //console.log(d)
            //console.log(idx)

            let color = d >= 20 ? 'green' : d > 5 && d < 20 ? 'yellow' : d > -20 && d <= 5 ? 'red' :"";
            return {
                offset: idx/datas.length*100,
                color,
                opacity:1
            }
        })

    }

    var options_graph_sinr = {
        chart: {
            toolbar: {
                show: false
            },
            zoom: {
                enabled: false
            }
        },
        tooltip: {
            enabled: true,
            custom: function({series, seriesIndex, dataPointIndex, w}) {
                return '<div class="arrow_box" style="padding:10px;"><span style="color:#000;font-weight:600;">CELL ID :</span>' +
                  '<span>' + data[dataPointIndex].c_id+ '</span>' +
                  '</div>'
            }
        },
        colors: ['#008000', '#FFFF00', '#FF0000'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: '3',
            dashArray: [0,0,0],
        },
        legend: {
            show:false,
            position: 'top',
        },
        markers: {
            size: 5
        },
        xaxis: {
            title:{
                text:"Seconds",
            },
            axisBorder: {
                show:true,
                color:'#969494',
                offsetX:1,
                offsetY:1,
            },
            tickAmount: 6
        },
        yaxis: {
            title:{
                text:"SINR",
            },
            axisBorder: {
                show:true,
                color:'#969494',
                offsetX:1,
                offsetY:1,
            },
            tickAmount: 6
        },
        fill: {
            type: 'solid',
            opacity: [1, 1, 1],
        },
        // fill: {
        //     type: 'gradient',
        //     gradient: {
        //       shadeIntensity: 1,
        //       opacityFrom: 1,
        //       opacityTo: 1,
        //       colorStops:generateColorsinr(four_g_sinr_data)
        //     },
        // },
        
    }

    // SINR GRAPH END

    return (
        <React.Fragment>
            <Card>
            <style>{"\
                        .apexcharts-legend{\
                            top:20px!important;\
                            justify-content:center!important;\
                        }\
            "}</style>
                <CardBody>
                        <h3 className="mt-5">RSRP</h3>
                      
                       <ReactApexChart 
                       options={options_graph_rsrp} 
                       series={
                          [
                            {
                               name: "Good",
                               type: 'line',
                               data: rsrp_good,
                            },
                            {
                                name: "Bad",
                                type: 'line',
                                data: rsrp_bad,
                            },
                            {
                                name: "Poor",
                                type: 'line',
                                data: rsrp_poor,
                            }
                           ]
                        } 
                        height="260" 
                        type="line" 
                        className="apex-charts"/>
                        {
                        Object.keys(cid_rsrp_data).length>0?
                        <table className="table table-striped table-bordered align-middle mt-3 mb-2" border="1">
                            <thead>
                                <tr>
                                    <th width="96" valign="top" class="graph-table">CI</th>
                                    <th width="96" valign="top" class="graph-table">Samples</th>
                                    <th width="96" valign="top" class="graph-table">Duration in seconds</th>
                                    <th width="96" valign="top" class="graph-table">Level High</th>
                                    <th width="96" valign="top" class="graph-table">Level Low</th>
                                    <th width="96" valign="top" class="graph-table">Level Avg</th>
                                    <th width="96" valign="top" class="graph-table">TAC</th>
                                    <th width="96" valign="top" class="graph-table">PCI</th>
                                    <th width="96" valign="top" class="graph-table">Band</th>
                                    <th width="96" valign="top" class="graph-table">ARFCN</th>
                                    <th width="96" valign="top" class="graph-table">CQI</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cid_rsrp_data?
                                        Object.keys(cid_rsrp_data).map((item,i)=>(
                                            <tr>
                                                <td>{item}</td>
                                                <td>{cid_rsrp_data[item].length}</td>
                                                <td>{data?data.length:""}</td>
                                                <td>{Math.max(...cid_rsrp_data[item])}</td>
                                                <td>{Math.min(...cid_rsrp_data[item])}</td>
                                                <td>{Math.round(cid_rsrp_data[item].reduce((a,b)=>a+b)/cid_rsrp_data[item].length)}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].tac:""}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].pci:""}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].band:""}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].arfcn:""}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].cqi:""}</td>


                                            </tr>
                                        ))
                                    : 
                                        <></>
                                }
                            </tbody>
                        </table>

                        : <></>
                        }


                        {/* NEIGHBOURS LIST START */}
                        {
                        Object.keys(cid_rsrp_data).length>0?<>
                        <h3 className="mt-4 fz-14" style={{textAlign:"center"}}>Neighbours List</h3>
                        <table className="table table-bordered align-middle mt-3 mb-2" style={{width: "max-content",margin: "auto"}}>
                            <thead>
                                <tr>
                                    <th>CI</th>
                                    <th>lac</th>
                                    <th>nci</th>
                                    <th>arfcn</th>
                                    <th>level</th>
                                    <th>qual</th>
                                </tr>
                            </thead>
                            <tbody>
                                {neighbours.map((item,i)=>(
                                    item.tech == "4G"?
                                    <tr>
                                        <td>{item.c_id}</td>
                                        <td>{item.lac}</td>
                                        <td>{item.nci}</td>
                                        <td>{item.arfcn}</td>
                                        <td>{item.level}</td>
                                        <td>{item.qual}</td>

                                    </tr>
                                    :
                                       <></>

                                ))}
                            </tbody>
                        </table>
                        </>
                        : <></>
                        }

                        {/* NEIGHBOURS LIST END */}


                      <h3 className="mt-5">RSRQ</h3>
                      
                      <ReactApexChart 
                      options={options_graph_rsrq} 
                      series={
                          [
                            {
                               name: "Good",
                               type: 'line',
                               data: rsrq_good,
                            },
                            {
                                name: "Bad",
                                type: 'line',
                                data: rsrq_bad,
                            },
                            {
                                name: "Poor",
                                type: 'line',
                                data: rsrq_poor,
                            }
                           ]
                       } 
                       height="260" 
                       type="line" 
                       className="apex-charts"/>
                        {
                        Object.keys(cid_rsrq_data).length>0?<>
                        <table className="table table-striped table-bordered align-middle mt-3 mb-2" border="1">
                            <thead>
                                <tr>
                                    <th width="96" valign="top" class="graph-table">CI</th>
                                    <th width="96" valign="top" class="graph-table">Samples</th>
                                    <th width="96" valign="top" class="graph-table">Duration in seconds</th>
                                    <th width="96" valign="top" class="graph-table">Level High</th>
                                    <th width="96" valign="top" class="graph-table">Level Low</th>
                                    <th width="96" valign="top" class="graph-table">Level Avg</th>
                                    <th width="96" valign="top" class="graph-table">TAC</th>
                                    <th width="96" valign="top" class="graph-table">PCI</th>
                                    <th width="96" valign="top" class="graph-table">Band</th>
                                    <th width="96" valign="top" class="graph-table">ARFCN</th>
                                    <th width="96" valign="top" class="graph-table">CQI</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cid_rsrq_data?
                                        Object.keys(cid_rsrq_data).map((item,i)=>(
                                            <tr>
                                                <td>{item}</td>
                                                <td>{cid_rsrq_data[item].length}</td>
                                                <td>{data?data.length:""}</td>
                                                <td>{Math.max(...cid_rsrq_data[item])}</td>
                                                <td>{Math.min(...cid_rsrq_data[item])}</td>
                                                <td>{Math.round(cid_rsrq_data[item].reduce((a,b)=>a+b)/cid_rsrq_data[item].length)}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].tac:""}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].pci:""}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].band:""}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].arfcn:""}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].cqi:""}</td>

                                            </tr>
                                        ))
                                    : 
                                        <></>
                                    }
                            </tbody>
                        </table></>
                        : <></>
                        }

                       <h3 className="mt-5">SINR</h3>
                      
                      <ReactApexChart 
                      options={options_graph_sinr} 
                      series={
                          [
                            {
                               name: "Good",
                               type: 'line',
                               data: sinr_good,
                            },
                            {
                                name: "Bad",
                                type: 'line',
                                data: sinr_bad,
                            },
                            {
                                name: "Poor",
                                type: 'line',
                                data: sinr_poor,
                            }
                           ]
                       } 
                       height="260" 
                       type="line" 
                       className="apex-charts"/>
                        {
                        Object.keys(cid_sinr_data).length>0?<>
                        <table className="table table-striped table-bordered align-middle mt-3 mb-2" border="1">
                            <thead>
                                <tr>
                                    <th width="96" valign="top" class="graph-table">CI</th>
                                    <th width="96" valign="top" class="graph-table">Samples</th>
                                    <th width="96" valign="top" class="graph-table">Duration in seconds</th>
                                    <th width="96" valign="top" class="graph-table">Level High</th>
                                    <th width="96" valign="top" class="graph-table">Level Low</th>
                                    <th width="96" valign="top" class="graph-table">Level Avg</th>
                                    <th width="96" valign="top" class="graph-table">TAC</th>
                                    <th width="96" valign="top" class="graph-table">PCI</th>
                                    <th width="96" valign="top" class="graph-table">Band</th>
                                    <th width="96" valign="top" class="graph-table">ARFCN</th>
                                    <th width="96" valign="top" class="graph-table">CQI</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cid_sinr_data?
                                        Object.keys(cid_sinr_data).map((item,i)=>(
                                            <tr>
                                                <td>{item}</td>
                                                <td>{cid_sinr_data[item].length}</td>
                                                <td>{data?data.length:""}</td>
                                                <td>{Math.max(...cid_sinr_data[item])}</td>
                                                <td>{Math.min(...cid_sinr_data[item])}</td>
                                                <td>{Math.round(cid_sinr_data[item].reduce((a,b)=>a+b)/cid_sinr_data[item].length)}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].tac:""}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].pci:""}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].band:""}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].arfcn:""}</td>
                                                <td>{cid_rsrp_objdata[item]?cid_rsrp_objdata[item][0].cqi:""}</td>
                                            </tr>
                                        ))
                                    : 
                                        <></>
                                    }
                            </tbody>
                        </table></>
                        : <></>
                        }

                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default Four_g