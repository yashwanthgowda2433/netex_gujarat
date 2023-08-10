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

const Two_g = (props) => {

    const two_g_data = props.data;
    const data = two_g_data?two_g_data.data:"";

    const neighbours_list = props.neighbours;
    const neighbours = neighbours_list?neighbours_list.data:"";

    console.log("_+_+_+__+_+++___");

    console.log(neighbours);

    const {user} = useAuthContext()

    // rx level
    const [two_g_rxlevel_data, set_two_g_rxlevel_data] = useState([]);
    const [cid_rxlevel_data, set_cid_rxlevel_data] = useState({});
    const [cid_rxlevel_objdata, set_cid_rxlevel_objdata] = useState({});


    //counts
    const [two_g_rxlevel_count, set_two_g_rxlevel_count] = useState([]);

    // rx qual
    const [two_g_rxqual_data, set_two_g_rxqual_data] = useState([]);
    const [cid_rxqual_data, set_cid_rxqual_data] = useState({});
    const [cid_rxqual_objdata, set_cid_rxqual_objdata] = useState({});


    

    useEffect(() => {
        
        if(data.length > 0)
        {
            var rx_data = [];
            var rx_count = [];
            var rx_qual_data = [];

            var c_id_obj_rxlvl = {};
            var c_id_obj_rxlvlobj = {};

            var c_id_obj_rxqal = {};
            var c_id_obj_rxqalobj = {};


            for(var i=0; i<data.length; i++)
            {
                if(!c_id_obj_rxlvl[data[i].c_id+""]){
                    c_id_obj_rxlvl[data[i].c_id+""] = [];
                    c_id_obj_rxlvlobj[data[i].c_id+""] = [];

                }
                c_id_obj_rxlvl[data[i].c_id+""].push(parseInt(data[i].rx_lev));
                c_id_obj_rxlvlobj[data[i].c_id+""].push(data[i]);

                if(!c_id_obj_rxqal[data[i].c_id+""]){
                    c_id_obj_rxqal[data[i].c_id+""] = [];
                    c_id_obj_rxqalobj[data[i].c_id+""] = [];

                }
                c_id_obj_rxqal[data[i].c_id+""].push(parseInt(data[i].rx_qual));
                c_id_obj_rxqalobj[data[i].c_id+""].push(data[i]);

                rx_data.push(parseInt(data[i].rx_lev));
                rx_count.push(i+1);
                rx_qual_data.push(parseInt(data[i].rx_qual))
            }
            console.log("++++++[[[[[[[]]]]]]=");

            console.log(c_id_obj_rxlvl);
            console.log(c_id_obj_rxqal);
            set_cid_rxlevel_objdata(c_id_obj_rxlvlobj);
            set_cid_rxqual_objdata(c_id_obj_rxlvlobj);

            set_cid_rxlevel_data(c_id_obj_rxlvl);
            set_cid_rxqual_data(c_id_obj_rxqal);

            set_two_g_rxlevel_data(rx_data);
            set_two_g_rxlevel_count(rx_count);
            set_two_g_rxqual_data(rx_qual_data);
    
        }
    },[user])

    // RX LEVEL GRAPH START

    const generateColorRXlevel = (datas) => {
        console.log("zzzzzzzzzzz")

        console.log(datas)
        return datas.map((d,idx) => {
            console.log(d)
            console.log(idx)

            let color = d >= -85 ? 'green' : d<-85 && d >= -95 ? 'yellow' : d < -95 ? 'red' :"";
            return {
                offset: idx/datas.length*98,
                color,
                opacity:1
            }
        })

    }

    var options_graph_rx_level = {
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
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: '3',
            dashArray: [0, 4],  
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
                color:'#000',
            }
        },
        yaxis: {
            title:{
                text:"RX LEVEL",
            },
            axisBorder: {
                show:true,
                color:'#000',
            },
            tickAmount: 7
        },
        fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 1,
              opacityTo: 1,
              colorStops:generateColorRXlevel(two_g_rxlevel_data)
            },
        },
        
        
    }

    // RX LEVEL GRAPH END

    // RX QUAL GRAPH START
    
    const generateColorRXqual = (datas) => {
        console.log("zzzzzzzzzzz")

        console.log(datas)
        return datas.map((d,idx) => {
            console.log(d)
            console.log(idx)

            let color = d >= -0 && d <= 4 ? 'green' : d >= 5 && d <= 7 ? 'yellow' : d > 7 ? 'red' :"";
            return {
                offset: idx/datas.length*98,
                color,
                opacity:1
            }
        })

    }

    var options_graph_rx_qual = {
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
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: '3',
            dashArray: [0, 4],  
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
            }
        },
        yaxis: {
            title:{
                text:"RX Qual",
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 1,
              opacityTo: 1,
              colorStops:generateColorRXqual(two_g_rxqual_data)
            },
        },
        
    }

    // RX QUAL GRAPH END

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
                        <h3>RX LEVEL</h3>
                      
                       <ReactApexChart 
                       options={options_graph_rx_level} 
                       series={
                          [
                            {
                               name: "RX LEVEL",
                               type: 'line',
                               data: two_g_rxlevel_data,
                            }
                           ]
                        } 
                        height="260" 
                        type="line" 
                        className="apex-charts"/>

                        {
                        Object.keys(cid_rxlevel_data).length>0?<>
                        <table className="table table-striped table-bordered align-middle mt-3 mb-2" border="1">
                            <thead>
                                <tr>
                                    <th width="96" valign="top" class="graph-table">CI</th>
                                    <th width="96" valign="top" class="graph-table">Samples</th>
                                    <th width="96" valign="top" class="graph-table">Duration in seconds</th>
                                    <th width="96" valign="top" class="graph-table">Level High</th>
                                    <th width="96" valign="top" class="graph-table">Level Low</th>
                                    <th width="96" valign="top" class="graph-table">Level Avg</th>
                                    <th width="96" valign="top" class="graph-table">LAC</th>
                                    <th width="96" valign="top" class="graph-table">BSIC</th>
                                    <th width="96" valign="top" class="graph-table">Band</th>
                                    <th width="96" valign="top" class="graph-table">ARFCN</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cid_rxlevel_data?
                                        Object.keys(cid_rxlevel_data).map((item,i)=>(
                                            <tr>
                                                <td>{item}</td>
                                                <td>{cid_rxlevel_data[item].length}</td>
                                                <td>{data?data.length:""}</td>
                                                <td>{Math.max(...cid_rxlevel_data[item])}</td>
                                                <td>{Math.min(...cid_rxlevel_data[item])}</td>
                                                <td>{Math.round(cid_rxlevel_data[item].reduce((a,b)=>a+b)/cid_rxlevel_data[item].length)}</td>
                                                <td>{cid_rxlevel_objdata[item]?cid_rxlevel_objdata[item][0].lac:""}</td>
                                                <td>{cid_rxlevel_objdata[item]?cid_rxlevel_objdata[item][0].bsic:""}</td>
                                                <td>{cid_rxlevel_objdata[item]?cid_rxlevel_objdata[item][0].band:""}</td>
                                                <td>{cid_rxlevel_objdata[item]?cid_rxlevel_objdata[item][0].arfcn:""}</td>

                                            </tr>
                                        ))
                                    : 
                                        <></>
                                }
                            </tbody>
                        </table>
                        </>
                        :<></>
                        }

                        {
                        Object.keys(cid_rxlevel_data).length>0?<>
                        {/* NEIGHBOURS LIST START */}
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
                                    item.tech == "2G"?
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

                        {/* NEIGHBOURS LIST END */}
                        </>
                        :<></>
                        }

                      <h3>RX Qual</h3>
                      
                      <ReactApexChart 
                      options={options_graph_rx_qual} 
                      series={
                         [
                           {
                              name: "RX Qual",
                              type: 'line',
                              data: two_g_rxqual_data,
                           }
                          ]
                       } 
                       height="260" 
                       type="line" 
                       className="apex-charts"/>


                        {
                        Object.keys(cid_rxqual_data).length>0?<>
                        <table className="table table-striped table-bordered align-middle mt-3 mb-2" border="1">
                            <thead>
                                <tr>
                                    <th width="96" valign="top" class="graph-table">CI</th>
                                    <th width="96" valign="top" class="graph-table">Samples</th>
                                    <th width="96" valign="top" class="graph-table">Duration in seconds</th>
                                    <th width="96" valign="top" class="graph-table">Level High</th>
                                    <th width="96" valign="top" class="graph-table">Level Low</th>
                                    <th width="96" valign="top" class="graph-table">Level Avg</th>
                                    <th width="96" valign="top" class="graph-table">LAC</th>
                                    <th width="96" valign="top" class="graph-table">BSIC</th>
                                    <th width="96" valign="top" class="graph-table">Band</th>
                                    <th width="96" valign="top" class="graph-table">ARFCN</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cid_rxqual_data?
                                        Object.keys(cid_rxqual_data).map((item,i)=>(
                                            <tr>
                                                <td>{item}</td>
                                                <td>{cid_rxqual_data[item].length}</td>
                                                <td>{data?data.length:""}</td>
                                                <td>{Math.max(...cid_rxqual_data[item])}</td>
                                                <td>{Math.min(...cid_rxqual_data[item])}</td>
                                                <td>{Math.round(cid_rxqual_data[item].reduce((a,b)=>a+b)/cid_rxqual_data[item].length)}</td>
                                                <td>{cid_rxlevel_objdata[item]?cid_rxlevel_objdata[item][0].lac:""}</td>
                                                <td>{cid_rxlevel_objdata[item]?cid_rxlevel_objdata[item][0].bsic:""}</td>
                                                <td>{cid_rxlevel_objdata[item]?cid_rxlevel_objdata[item][0].band:""}</td>
                                                <td>{cid_rxlevel_objdata[item]?cid_rxlevel_objdata[item][0].arfcn:""}</td>

                                            </tr>
                                        ))
                                    : 
                                        <></>
                                }
                            </tbody>
                        </table>
                        </>
                        :<></>
                        }

                </CardBody>
            </Card>
        </React.Fragment>
    )
}

export default Two_g