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

const Three_g = (props) => {

    const three_g_data = props.data;
    const data = three_g_data?three_g_data.data:"";

    const neighbours_list = props.neighbours;
    const neighbours = neighbours_list?neighbours_list.data:"";

    const {user} = useAuthContext()

    // rscp
    const [three_g_rscp_data, set_three_g_rscp_data] = useState([]);
    const [cid_rscp_data, set_cid_rscp_data] = useState({});
    const [cid_rscp_objdata, set_cid_rscp_objdata] = useState({});


    //counts
    const [three_g_rscp_count, set_three_g_rscp_count] = useState([]);

    // ec_io
    const [three_g_ec_io_data, set_three_g_ec_io_data] = useState([]);
    const [cid_ec_io_data, set_cid_ec_io_data] = useState({});
    const [cid_ec_io_objdata, set_cid_ec_io_objdata] = useState({});


    

    useEffect(() => {
        
        if(data.length > 0)
        {
            var rscp_data = [];
            var rx_count = [];
            var ec_io_data = [];

            var c_id_obj_rscp = {};
            var c_id_obj_rscpobj = {};

            var c_id_obj_ec_io = {};
            var c_id_obj_ec_ioobj = {};


            for(var i=0; i<data.length; i++)
            {
                if(!c_id_obj_rscp[data[i].c_id+""]){
                    c_id_obj_rscp[data[i].c_id+""] = [];
                    c_id_obj_rscpobj[data[i].c_id+""] = [];

                }
                c_id_obj_rscp[data[i].c_id+""].push(parseInt(data[i].rscp));
                c_id_obj_rscpobj[data[i].c_id+""].push(data[i]);

                if(!c_id_obj_ec_io[data[i].c_id+""]){
                    c_id_obj_ec_io[data[i].c_id+""] = [];
                    c_id_obj_ec_ioobj[data[i].c_id+""] = [];

                }
                c_id_obj_ec_io[data[i].c_id+""].push(parseInt(data[i].ec_io));
                c_id_obj_ec_ioobj[data[i].c_id+""].push(data[i]);

                rscp_data.push(parseInt(data[i].rscp));
                rx_count.push(i+1);
                ec_io_data.push(parseInt(data[i].ec_io))
            }
            //console.log("++++++[[[[[[[]]]]]]=");

            
            set_cid_rscp_objdata(c_id_obj_rscpobj);
            set_cid_ec_io_objdata(c_id_obj_ec_ioobj);

            set_cid_rscp_data(c_id_obj_rscp);
            set_cid_ec_io_data(c_id_obj_ec_io);

            set_three_g_rscp_data(rscp_data);
            set_three_g_rscp_count(rx_count);
            set_three_g_ec_io_data(ec_io_data);
    
        }
    },[user])

    // RX LEVEL GRAPH START

    const generateColorrscp = (datas) => {
        //console.log("zzzzzzzzzzz")

        //console.log(datas)
        return datas.map((d,idx) => {
            //console.log(d)
            //console.log(idx)

            let color = d >= -90 ? 'green' : d<-90 && d >= -100 ? 'yellow' : d < -95 ? 'red' :"";
            return {
                offset: idx/datas.length*105,
                color,
                opacity:1
            }
        })

    }

    var options_graph_rscp = {
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
                color:'#969494',
                offsetX:1,
                offsetY:1,
            },
            tickAmount: 6
        },
        yaxis: {
            title:{
                text:"RSCP",
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
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 1,
              opacityTo: 1,
              colorStops:generateColorrscp(three_g_rscp_data)
            },
        },
        
    }

    // RX LEVEL GRAPH END

    // RX QUAL GRAPH START
    
    const generateColorec_io = (datas) => {
        //console.log("zzzzzzzzzzz")

        //console.log(datas)
        return datas.map((d,idx) => {
            //console.log(d)
            //console.log(idx)

            let color = d >= -14 ? 'green' : d < -14 && d >= -16 ? 'yellow' : d < -16 ? 'red' :"";
            return {
                offset: idx/datas.length*105,
                color,
                opacity:1
            }
        })

    }

    var options_graph_ec_io = {
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
                color:'#969494',
                offsetX:1,
                offsetY:1,
            },
            tickAmount: 6
        },
        yaxis: {
            title:{
                text:"Ec/NO",
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
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 1,
              opacityTo: 1,
              colorStops:generateColorec_io(three_g_ec_io_data)
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
                        <h3>RSCP</h3>
                      
                       <ReactApexChart 
                       options={options_graph_rscp} 
                       series={
                          [
                            {
                               name: "RSCP",
                               type: 'line',
                               data: three_g_rscp_data,
                            }
                           ]
                        } 
                        height="260" 
                        type="line" 
                        className="apex-charts"/>
                        {
                        Object.keys(cid_rscp_data).length>0?
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
                                    <th width="96" valign="top" class="graph-table">RNC</th>
                                    <th width="96" valign="top" class="graph-table">PSC</th>
                                    <th width="96" valign="top" class="graph-table">Band</th>
                                    <th width="96" valign="top" class="graph-table">ARFCN</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cid_rscp_data?
                                        Object.keys(cid_rscp_data).map((item,i)=>(
                                            <tr>
                                                <td>{item}</td>
                                                <td>{cid_rscp_data[item].length}</td>
                                                <td>{data?data.length:""}</td>
                                                <td>{Math.max(...cid_rscp_data[item])}</td>
                                                <td>{Math.min(...cid_rscp_data[item])}</td>
                                                <td>{Math.round(cid_rscp_data[item].reduce((a,b)=>a+b)/cid_rscp_data[item].length)}</td>
                                                <td>{cid_rscp_objdata[item]?cid_rscp_objdata[item][0].lac:""}</td>
                                                <td>{cid_rscp_objdata[item]?cid_rscp_objdata[item][0].rnc:""}</td>
                                                <td>{cid_rscp_objdata[item]?cid_rscp_objdata[item][0].psc:""}</td>
                                                <td>{cid_rscp_objdata[item]?cid_rscp_objdata[item][0].band:""}</td>
                                                <td>{cid_rscp_objdata[item]?cid_rscp_objdata[item][0].arfcn:""}</td>

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
                        Object.keys(cid_rscp_data).length>0?<>
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
                                    item.tech == "3G"?
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


                      <h3>Ec/NO</h3>
                      
                      <ReactApexChart 
                      options={options_graph_ec_io} 
                      series={
                         [
                           {
                              name: "Ec/NO",
                              type: 'line',
                              data: three_g_ec_io_data,
                           }
                          ]
                       } 
                       height="260" 
                       type="line" 
                       className="apex-charts"/>
                        {
                        Object.keys(cid_ec_io_data).length>0?<>
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
                                    <th width="96" valign="top" class="graph-table">RNC</th>
                                    <th width="96" valign="top" class="graph-table">PSC</th>
                                    <th width="96" valign="top" class="graph-table">Band</th>
                                    <th width="96" valign="top" class="graph-table">ARFCN</th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cid_ec_io_data?
                                        Object.keys(cid_ec_io_data).map((item,i)=>(
                                            <tr>
                                                <td>{item}</td>
                                                <td>{cid_ec_io_data[item].length}</td>
                                                <td>{data?data.length:""}</td>
                                                <td>{Math.max(...cid_ec_io_data[item])}</td>
                                                <td>{Math.min(...cid_ec_io_data[item])}</td>
                                                <td>{Math.round(cid_ec_io_data[item].reduce((a,b)=>a+b)/cid_ec_io_data[item].length)}</td>
                                                <td>{cid_rscp_objdata[item]?cid_rscp_objdata[item][0].lac:""}</td>
                                                <td>{cid_rscp_objdata[item]?cid_rscp_objdata[item][0].rnc:""}</td>
                                                <td>{cid_rscp_objdata[item]?cid_rscp_objdata[item][0].psc:""}</td>
                                                <td>{cid_rscp_objdata[item]?cid_rscp_objdata[item][0].band:""}</td>
                                                <td>{cid_rscp_objdata[item]?cid_rscp_objdata[item][0].arfcn:""}</td>

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

export default Three_g