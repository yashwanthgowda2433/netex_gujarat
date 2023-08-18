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


    //counts
    const [four_g_rsrp_count, set_four_g_rsrp_count] = useState([]);

    // rsrq
    const [four_g_rsrq_data, set_four_g_rsrq_data] = useState([]);
    const [cid_rsrq_data, set_cid_rsrq_data] = useState({});
    const [cid_rsrq_objdata, set_cid_rsrq_objdata] = useState({});

    // sinr
    const [four_g_sinr_data, set_four_g_sinr_data] = useState([]);
    const [cid_sinr_data, set_cid_sinr_data] = useState({});
    const [cid_sinr_objdata, set_cid_sinr_objdata] = useState({});

    

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


            set_four_g_rsrp_data(rsrp_data);
            set_four_g_rsrp_count(rx_count);
            set_four_g_rsrq_data(rsrq_data);
            set_four_g_sinr_data(sinr_data);

    
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
                offset: idx/datas.length*105,
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
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 1,
              opacityTo: 1,
              colorStops:generateColorrsrp(four_g_rsrp_data)
            },
        },
        
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
                offset: idx/datas.length*105,
                color,
                opacity:1
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
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 1,
              opacityTo: 1,
              colorStops:generateColorrsrq(four_g_rsrq_data)
            },
        },
        
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
                offset: idx/datas.length*105,
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
            type: 'gradient',
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 1,
              opacityTo: 1,
              colorStops:generateColorsinr(four_g_rsrq_data)
            },
        },
        
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
                               name: "RSRP",
                               type: 'line',
                               data: four_g_rsrp_data,
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
                              name: "RSRQ",
                              type: 'line',
                              data: four_g_rsrq_data,
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
                              name: "SINR",
                              type: 'line',
                              data: four_g_sinr_data,
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