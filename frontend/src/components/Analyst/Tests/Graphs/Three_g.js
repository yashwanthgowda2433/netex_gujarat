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
    const [rscp_good, set_rscp_good] = useState([]);
    const [rscp_bad, set_rscp_bad] = useState([]);
    const [rscp_poor, set_rscp_poor] = useState([]);

    const [rscp_good_percentage, set_rscp_good_percentage] = useState([]);
    const [rscp_good_percentage_counts, set_rscp_good_percentage_counts] = useState([]);

    const [rscp_bad_percentage, set_rscp_bad_percentage] = useState([]);
    const [rscp_bad_percentage_counts, set_rscp_bad_percentage_counts] = useState([]);

    const [rscp_poor_percentage, set_rscp_poor_percentage] = useState([]);
    const [rscp_poor_percentage_counts, set_rscp_poor_percentage_counts] = useState([]);



    //counts
    const [three_g_rscp_count, set_three_g_rscp_count] = useState([]);

    // ec_io
    const [three_g_ec_io_data, set_three_g_ec_io_data] = useState([]);
    const [cid_ec_io_data, set_cid_ec_io_data] = useState({});
    const [cid_ec_io_objdata, set_cid_ec_io_objdata] = useState({});
    const [ec_io_good, set_ec_io_good] = useState([]);
    const [ec_io_bad, set_ec_io_bad] = useState([]);
    const [ec_io_poor, set_ec_io_poor] = useState([]);

    const [ec_io_good_percentage, set_ec_io_good_percentage] = useState([]);
    const [ec_io_good_percentage_counts, set_ec_io_good_percentage_counts] = useState([]);

    const [ec_io_bad_percentage, set_ec_io_bad_percentage] = useState([]);
    const [ec_io_bad_percentage_counts, set_ec_io_bad_percentage_counts] = useState([]);

    const [ec_io_poor_percentage, set_ec_io_poor_percentage] = useState([]);
    const [ec_io_poor_percentage_counts, set_ec_io_poor_percentage_counts] = useState([]);


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

            // rscp filter start
            // let color = d >= -90 ? 'green' : d<-90 && d >= -100 ? 'yellow' : d < -95 ? 'red' :"";

            set_three_g_rscp_data(rscp_data);
            const rscpgood = rscp_data.map((value,index) => value >= -90 ? value : null );
            const rscpgood_null_removed = rscpgood.filter((value) => { if(value != null && value != NaN){ return value; }});
            const rscpgood_per = (rscpgood_null_removed.length/data.length)*100;
            set_rscp_good_percentage(parseInt(rscpgood_per));
            set_rscp_good_percentage_counts(rscpgood_null_removed.length);

            const rscpbad = rscp_data.map((value,index) => value < -90 && value >= -100 ? value : null );
            const rscpbad_null_removed = rscpbad.filter((value) => { if(value != null && value != NaN){ return value; }});
            const rscpbad_per = (rscpbad_null_removed.length/data.length)*100;
            set_rscp_bad_percentage(parseInt(rscpbad_per));
            set_rscp_bad_percentage_counts(rscpbad_null_removed.length);

            const rscppoor = rscp_data.map((value,index) => value < -100 ? value : null );
            const rscppoor_null_removed = rscppoor.filter((value) => { if(value != null && value != NaN){ return value; }});
            const rscppoor_per = (rscppoor_null_removed.length/data.length)*100;
            set_rscp_poor_percentage(parseInt(rscppoor_per));
            set_rscp_poor_percentage_counts(rscppoor_null_removed.length);


            for(var i=0; i<rscpgood.length-1; i++)
            {
                if(rscpgood[i] != null)
                {
                    if(rscpbad[i] == null && rscpbad[i+1] != null)
                    {
                        rscpbad[i] = rscpgood[i];
                    }
                    if(rscppoor[i] == null && rscppoor[i+1] != null)
                    {
                        rscppoor[i] = rscpgood[i];
                    }
                }

                if(rscpbad[i] != null)
                {
                    if(rscpgood[i] == null && rscpgood[i+1] != null)
                    {
                        rscpgood[i] = rscpbad[i];
                    }
                    if(rscppoor[i] == null && rscppoor[i+1] != null)
                    {
                        rscppoor[i] = rscpbad[i];
                    }
                }

                if(rscppoor[i] != null)
                {
                    if(rscpbad[i] == null && rscpbad[i+1] != null)
                    {
                        rscpbad[i] = rscppoor[i];
                    }
                    if(rscpgood[i] == null && rscpgood[i+1] != null)
                    {
                        rscpgood[i] = rscppoor[i];
                    }
                }
            }
           
            set_rscp_good(rscpgood);
            set_rscp_bad(rscpbad);
            set_rscp_poor(rscppoor);
            // end filter rscp data

            

            set_three_g_rscp_count(rx_count);


            // ec_io filter start
            set_three_g_ec_io_data(ec_io_data);
            // let color = d >= -14 ? 'green' : d < -14 && d >= -16 ? 'yellow' : d < -16 ? 'red' :"";

            const ec_iogood = ec_io_data.map((value,index) => value >= -14 ? value : null );
            const ec_iogood_null_removed = ec_iogood.filter((value) => { if(value != null && value != NaN){ return value; }});
            const ec_iogood_per = (ec_iogood_null_removed.length/data.length)*100;
            set_ec_io_good_percentage(parseInt(ec_iogood_per));
            set_ec_io_good_percentage_counts(ec_iogood_null_removed.length);

            const ec_iobad = ec_io_data.map((value,index) => value < -14 && value >= -16 ? value : null );
            const ec_iobad_null_removed = ec_iobad.filter((value) => { if(value != null && value != NaN){ return value; }});
            const ec_iobad_per = (ec_iobad_null_removed.length/data.length)*100;
            set_ec_io_bad_percentage(parseInt(ec_iobad_per));
            set_ec_io_bad_percentage_counts(ec_iobad_null_removed.length);

            const ec_iopoor = ec_io_data.map((value,index) => value < -16 ? value : null );
            const ec_iopoor_null_removed = ec_iopoor.filter((value) => { if(value != null && value != NaN){ return value; }});
            const ec_iopoor_per = (ec_iopoor_null_removed.length/data.length)*100;
            set_ec_io_poor_percentage(parseInt(ec_iopoor_per));
            set_ec_io_poor_percentage_counts(ec_iopoor_null_removed.length);


            for(var i=0; i<ec_iogood.length-1; i++)
            {
                if(ec_iogood[i] != null)
                {
                    if(ec_iobad[i] == null && ec_iobad[i+1] != null)
                    {
                        ec_iobad[i] = ec_iogood[i];
                    }
                    if(ec_iopoor[i] == null && ec_iopoor[i+1] != null)
                    {
                        ec_iopoor[i] = ec_iogood[i];
                    }
                }

                if(ec_iobad[i] != null)
                {
                    if(ec_iogood[i] == null && ec_iogood[i+1] != null)
                    {
                        ec_iogood[i] = ec_iobad[i];
                    }
                    if(ec_iopoor[i] == null && ec_iopoor[i+1] != null)
                    {
                        ec_iopoor[i] = ec_iobad[i];
                    }
                }

                if(ec_iopoor[i] != null)
                {
                    if(ec_iobad[i] == null && ec_iobad[i+1] != null)
                    {
                        ec_iobad[i] = ec_iopoor[i];
                    }
                    if(ec_iogood[i] == null && ec_iogood[i+1] != null)
                    {
                        ec_iogood[i] = ec_iopoor[i];
                    }
                }
            }
           
            set_ec_io_good(ec_iogood);
            set_ec_io_bad(ec_iobad);
            set_ec_io_poor(ec_iopoor);
            // end filter ec_io data
    
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
            //tickAmount: 4
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
        //       colorStops:generateColorrscp(three_g_rscp_data)
        //     },
        // },
        
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
            //tickAmount: 4
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
        //       colorStops:generateColorec_io(three_g_ec_io_data)
        //     },
        // },
        
    }

    // RX QUAL GRAPH END

    return (
        <React.Fragment>
            {/* <Card> */}
            <style>{"\
                        .apexcharts-legend{\
                            top:20px!important;\
                            justify-content:center!important;\
                        }\
            "}</style>
                <CardBody>
                        <h3>RSCP</h3>
                        <div class="row graph-info-box-center">
				            <div class="col-sm-4">
					            <div class="graph-info-box good"></div>
					            <span id="rscpgood">Good({rscp_good_percentage_counts} - {rscp_good_percentage}%)</span>
				            </div>
				            <div class="col-sm-4">
					            <div class="graph-info-box bad"></div>
					            <span id="rscpbad">Bad({rscp_bad_percentage_counts} - {rscp_bad_percentage}%)</span>
				            </div>
				            <div class="col-sm-4">
					            <div class="graph-info-box poor"></div>
					            <span id="rscppoor">Poor({rscp_poor_percentage_counts} - {rscp_poor_percentage}%)</span>
				            </div>
			            </div>
                       <ReactApexChart 
                       options={options_graph_rscp} 
                       series={
                          [
                            {
                                name: "Good",
                                type: 'line',
                                data: rscp_good,
                             },
                             {
                                 name: "Bad",
                                 type: 'line',
                                 data: rscp_bad,
                             },
                             {
                                 name: "Poor",
                                 type: 'line',
                                 data: rscp_poor,
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
                        <div class="row graph-info-box-center">
				            <div class="col-sm-4">
					            <div class="graph-info-box good"></div>
					            <span id="ec_iogood">Good({ec_io_good_percentage_counts} - {ec_io_good_percentage}%)</span>
				            </div>
				            <div class="col-sm-4">
					            <div class="graph-info-box bad"></div>
					            <span id="ec_iobad">Bad({ec_io_bad_percentage_counts} - {ec_io_bad_percentage}%)</span>
				            </div>
				            <div class="col-sm-4">
					            <div class="graph-info-box poor"></div>
					            <span id="ec_iopoor">Poor({ec_io_poor_percentage_counts} - {ec_io_poor_percentage}%)</span>
				            </div>
			            </div>
                      <ReactApexChart 
                      options={options_graph_ec_io} 
                      series={
                         [
                            {
                                name: "Good",
                                type: 'line',
                                data: ec_io_good,
                             },
                             {
                                 name: "Bad",
                                 type: 'line',
                                 data: ec_io_bad,
                             },
                             {
                                 name: "Poor",
                                 type: 'line',
                                 data: ec_io_poor,
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
                                                <td>{Math.max(...(cid_ec_io_data[item]).filter((value)=>{if(value!=null && value!=NaN){return value}}))}</td>
                                                <td>{Math.min(...(cid_ec_io_data[item]).filter((value)=>{if(value!=null && value!=NaN){return value}}))}</td>
                                                <td>{Math.round((cid_ec_io_data[item].filter((value)=>{if(value!=null && value!=NaN){return value}})).reduce((a,b)=>a+b)/cid_ec_io_data[item].length)}</td>
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
            {/* </Card> */}
        </React.Fragment>
    )
}

export default Three_g