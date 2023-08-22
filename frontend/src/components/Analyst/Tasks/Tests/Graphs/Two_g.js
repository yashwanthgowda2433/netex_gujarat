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

    //console.log("_+_+_+__+_+++___");

    //console.log(neighbours);

    const {user} = useAuthContext()

    // rx level
    const [two_g_rxlevel_data, set_two_g_rxlevel_data] = useState([]);
    const [cid_rxlevel_data, set_cid_rxlevel_data] = useState({});
    const [cid_rxlevel_objdata, set_cid_rxlevel_objdata] = useState({});
    const [rxlevel_good, set_rxlevel_good] = useState([]);
    const [rxlevel_bad, set_rxlevel_bad] = useState([]);
    const [rxlevel_poor, set_rxlevel_poor] = useState([]);
    
    const [rxlevel_good_percentage, set_rxlevel_good_percentage] = useState([]);
    const [rxlevel_good_percentage_counts, set_rxlevel_good_percentage_counts] = useState([]);

    const [rxlevel_bad_percentage, set_rxlevel_bad_percentage] = useState([]);
    const [rxlevel_bad_percentage_counts, set_rxlevel_bad_percentage_counts] = useState([]);

    const [rxlevel_poor_percentage, set_rxlevel_poor_percentage] = useState([]);
    const [rxlevel_poor_percentage_counts, set_rxlevel_poor_percentage_counts] = useState([]);


    //counts
    const [two_g_rxlevel_count, set_two_g_rxlevel_count] = useState([]);

    // rx qual
    const [two_g_rxqual_data, set_two_g_rxqual_data] = useState([]);
    const [cid_rxqual_data, set_cid_rxqual_data] = useState({});
    const [cid_rxqual_objdata, set_cid_rxqual_objdata] = useState({});
    const [rxqual_good, set_rxqual_good] = useState([]);
    const [rxqual_bad, set_rxqual_bad] = useState([]);
    const [rxqual_poor, set_rxqual_poor] = useState([]);

    
    const [rxqual_good_percentage, set_rxqual_good_percentage] = useState([]);
    const [rxqual_good_percentage_counts, set_rxqual_good_percentage_counts] = useState([]);

    const [rxqual_bad_percentage, set_rxqual_bad_percentage] = useState([]);
    const [rxqual_bad_percentage_counts, set_rxqual_bad_percentage_counts] = useState([]);

    const [rxqual_poor_percentage, set_rxqual_poor_percentage] = useState([]);
    const [rxqual_poor_percentage_counts, set_rxqual_poor_percentage_counts] = useState([]);


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
            //console.log("++++++[[[[[[[]]]]]]=");

            //console.log(c_id_obj_rxlvl);
            //console.log(c_id_obj_rxqal);
            set_cid_rxlevel_objdata(c_id_obj_rxlvlobj);
            set_cid_rxqual_objdata(c_id_obj_rxlvlobj);

            set_cid_rxlevel_data(c_id_obj_rxlvl);
            set_cid_rxqual_data(c_id_obj_rxqal);

            
            // rxlevel filter start
            // let color = d >= -85 ? 'green' : d<-85 && d >= -95 ? 'yellow' : d < -95 ? 'red' :"";

            set_two_g_rxlevel_data(rx_data);
            const rxlevelgood = rx_data.map((value,index) => value >= -85 ? value : null );
            const rxlevelgood_null_removed = rxlevelgood.filter((value) => { if(value != null && value != NaN){ return value; }});
            const rxlevelgood_per = (rxlevelgood_null_removed.length/data.length)*100;
            set_rxlevel_good_percentage(parseInt(rxlevelgood_per));
            set_rxlevel_good_percentage_counts(rxlevelgood_null_removed.length);

            const rxlevelbad = rx_data.map((value,index) => value < -85 && value >= -95 ? value : null );
            const rxlevelbad_null_removed = rxlevelbad.filter((value) => { if(value != null && value != NaN){ return value; }});
            const rxlevelbad_per = (rxlevelbad_null_removed.length/data.length)*100;
            set_rxlevel_bad_percentage(parseInt(rxlevelbad_per));
            set_rxlevel_bad_percentage_counts(rxlevelbad_null_removed.length);

            const rxlevelpoor = rx_data.map((value,index) => value < -95 ? value : null );
            const rxlevelpoor_null_removed = rxlevelpoor.filter((value) => { if(value != null && value != NaN){ return value; }});
            const rxlevelpoor_per = (rxlevelpoor_null_removed.length/data.length)*100;
            set_rxlevel_poor_percentage(parseInt(rxlevelpoor_per));
            set_rxlevel_poor_percentage_counts(rxlevelpoor_null_removed.length);

            for(var i=0; i<rxlevelgood.length-1; i++)
            {
                if(rxlevelgood[i] != null)
                {
                    if(rxlevelbad[i] == null && rxlevelbad[i+1] != null)
                    {
                        rxlevelbad[i] = rxlevelgood[i];
                    }
                    if(rxlevelpoor[i] == null && rxlevelpoor[i+1] != null)
                    {
                        rxlevelpoor[i] = rxlevelgood[i];
                    }
                }

                if(rxlevelbad[i] != null)
                {
                    if(rxlevelgood[i] == null && rxlevelgood[i+1] != null)
                    {
                        rxlevelgood[i] = rxlevelbad[i];
                    }
                    if(rxlevelpoor[i] == null && rxlevelpoor[i+1] != null)
                    {
                        rxlevelpoor[i] = rxlevelbad[i];
                    }
                }

                if(rxlevelpoor[i] != null)
                {
                    if(rxlevelbad[i] == null && rxlevelbad[i+1] != null)
                    {
                        rxlevelbad[i] = rxlevelpoor[i];
                    }
                    if(rxlevelgood[i] == null && rxlevelgood[i+1] != null)
                    {
                        rxlevelgood[i] = rxlevelpoor[i];
                    }
                }
            }
           
            set_rxlevel_good(rxlevelgood);
            set_rxlevel_bad(rxlevelbad);
            set_rxlevel_poor(rxlevelpoor);
            // end filter rxlevel data


            set_two_g_rxlevel_count(rx_count);


            // rxqual filter start
            // let color = d >= -0 && d <= 4 ? 'green' : d >= 5 && d <= 7 ? 'yellow' : d > 7 ? 'red' :"";

            set_two_g_rxqual_data(rx_qual_data);
            const rxqualgood = rx_qual_data.map((value,index) => value >= 0 && value <= 4 ? value : null );
            const rxqualgood_null_removed = rxqualgood.filter((value) => { if(value != null && value != NaN){ return value; }});
            const rxqualgood_per = (rxqualgood_null_removed.length/data.length)*100;
            set_rxqual_good_percentage(parseInt(rxqualgood_per));
            set_rxqual_good_percentage_counts(rxqualgood_null_removed.length);

            const rxqualbad = rx_qual_data.map((value,index) => value > 4 && value <= 7 ? value : null );
            const rxqualbad_null_removed = rxqualbad.filter((value) => { if(value != null && value != NaN){ return value; }});
            const rxqualbad_per = (rxqualbad_null_removed.length/data.length)*100;
            set_rxqual_bad_percentage(parseInt(rxqualbad_per));
            set_rxqual_bad_percentage_counts(rxqualbad_null_removed.length);

            const rxqualpoor = rx_qual_data.map((value,index) => value > 7 ? value : null );
            const rxqualpoor_null_removed = rxqualpoor.filter((value) => { if(value != null && value != NaN){ return value; }});
            const rxqualpoor_per = (rxqualpoor_null_removed.length/data.length)*100;
            set_rxqual_poor_percentage(parseInt(rxqualpoor_per));
            set_rxqual_poor_percentage_counts(rxqualpoor_null_removed.length);


            for(var i=0; i<rxqualgood.length-1; i++)
            {
                if(rxqualgood[i] != null)
                {
                    if(rxqualbad[i] == null && rxqualbad[i+1] != null)
                    {
                        rxqualbad[i] = rxqualgood[i];
                    }
                    if(rxqualpoor[i] == null && rxqualpoor[i+1] != null)
                    {
                        rxqualpoor[i] = rxqualgood[i];
                    }
                }

                if(rxqualbad[i] != null)
                {
                    if(rxqualgood[i] == null && rxqualgood[i+1] != null)
                    {
                        rxqualgood[i] = rxqualbad[i];
                    }
                    if(rxqualpoor[i] == null && rxqualpoor[i+1] != null)
                    {
                        rxqualpoor[i] = rxqualbad[i];
                    }
                }

                if(rxqualpoor[i] != null)
                {
                    if(rxqualbad[i] == null && rxqualbad[i+1] != null)
                    {
                        rxqualbad[i] = rxqualpoor[i];
                    }
                    if(rxqualgood[i] == null && rxqualgood[i+1] != null)
                    {
                        rxqualgood[i] = rxqualpoor[i];
                    }
                }
            }
           
            set_rxqual_good(rxqualgood);
            set_rxqual_bad(rxqualbad);
            set_rxqual_poor(rxqualpoor);
            // end filter rxqual data
    
        }
    },[user])

    // RX LEVEL GRAPH START

    const generateColorRXlevel = (datas) => {
        //console.log("zzzzzzzzzzz")

        //console.log(datas)
        return datas.map((d,idx) => {
            //console.log(d)
            //console.log(idx)

            let color = d >= -85 ? 'green' : d<-85 && d >= -95 ? 'yellow' : d < -95 ? 'red' :"";
            return {
                offset: idx/datas.length*105,
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
        colors: ['#008000', '#FFFF00', '#FF0000'],
        dataLabels: {
            enabled: false,
        },
        stroke: {
            curve: 'smooth',
            width: '3',
            lineCao: 'butt',
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
               
            },
            //tickAmount: 4

        },
        yaxis: {
            title:{
                text:"RX LEVEL",
            },
            axisBorder: {
                show:true,
                color:'#969494',
                offsetX:1,
                offsetY:1,
            },
            //tickAmount: 4

        },
        annotations: {
            yaxis:[
                {
                    borderColor:'#000'
                }]
            
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
        //       colorStops:generateColorRXlevel(two_g_rxlevel_data)
        //     },
        // },
        
        
    }

    // RX LEVEL GRAPH END

    // RX QUAL GRAPH START
    
    const generateColorRXqual = (datas) => {
        //console.log("zzzzzzzzzzz")

        //console.log(datas)
        return datas.map((d,idx) => {
            //console.log(d)
            //console.log(idx)

            let color = d >= -0 && d <= 4 ? 'green' : d >= 5 && d <= 7 ? 'yellow' : d > 7 ? 'red' :"";
            return {
                offset: idx/datas.length*105,
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
            },
            //tickAmount: 4

        },
        yaxis: {
            title:{
                text:"RX Qual",
            },
            axisBorder: {
                show:true,
                color:'#969494',
                offsetX:1,
                offsetY:1,
            },
            //tickAmount: 4
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
        //       colorStops:generateColorRXqual(two_g_rxqual_data)
        //     },
        // },
        
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
                        .apexcharts-gridline {\
                            stroke-width: 1px;\
                            stroke: #cbc4c4;\
                        }\
            "}</style>
                <CardBody>
                        <h3>RX LEVEL</h3>
                        <div class="row graph-info-box-center">
				            <div class="col-sm-4">
					            <div class="graph-info-box good"></div>
					            <span id="rxlevelgood">Good({rxlevel_good_percentage_counts} - {rxlevel_good_percentage}%)</span>
				            </div>
				            <div class="col-sm-4">
					            <div class="graph-info-box bad"></div>
					            <span id="rxlevelbad">Bad({rxlevel_bad_percentage_counts} - {rxlevel_bad_percentage}%)</span>
				            </div>
				            <div class="col-sm-4">
					            <div class="graph-info-box poor"></div>
					            <span id="rxlevelpoor">Poor({rxlevel_poor_percentage_counts} - {rxlevel_poor_percentage}%)</span>
				            </div>
			            </div>
                       <ReactApexChart 
                       options={options_graph_rx_level} 
                       series={
                          [
                            {
                                name: "Good",
                                type: 'line',
                                data: rxlevel_good,
                             },
                             {
                                 name: "Bad",
                                 type: 'line',
                                 data: rxlevel_bad,
                             },
                             {
                                 name: "Poor",
                                 type: 'line',
                                 data: rxlevel_poor,
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
                      <div class="row graph-info-box-center">
				            <div class="col-sm-4">
					            <div class="graph-info-box good"></div>
					            <span id="rxqualgood">Good({rxqual_good_percentage_counts} - {rxqual_good_percentage}%)</span>
				            </div>
				            <div class="col-sm-4">
					            <div class="graph-info-box bad"></div>
					            <span id="rxqualbad">Bad({rxqual_bad_percentage_counts} - {rxqual_bad_percentage}%)</span>
				            </div>
				            <div class="col-sm-4">
					            <div class="graph-info-box poor"></div>
					            <span id="rxqualpoor">Poor({rxqual_poor_percentage_counts} - {rxqual_poor_percentage}%)</span>
				            </div>
			            </div>
                      <ReactApexChart 
                      options={options_graph_rx_qual} 
                      series={
                         [
                            {
                                name: "Good",
                                type: 'line',
                                data: rxqual_good,
                             },
                             {
                                 name: "Bad",
                                 type: 'line',
                                 data: rxqual_bad,
                             },
                             {
                                 name: "Poor",
                                 type: 'line',
                                 data: rxqual_poor,
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
                                                <td>{Math.max(...(cid_rxqual_data[item]).filter((value)=>{if(value!=null && value!=NaN){if(value==Infinity){return 0}return value}}))}</td>
                                                <td>{Math.min(...(cid_rxqual_data[item]).filter((value)=>{if(value!=null && value!=NaN){if(value==Infinity){return 0}return value}}))}</td>
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