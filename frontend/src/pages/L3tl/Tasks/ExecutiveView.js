// import task table variables
import { rth_yes, rth_no, assigned_yes, assigned_no, reassigned_yes, reassigned_no, pending, progress, completed,
    cancelled,closed,fwz,transfer,withdraw,addedbyl2_executive,fwz_to_zone,approve_for_fieldvisit,analysis_required,
    analysis_required_fwdbyl3,zone_analysed,zone_closed,l3_closed,optimisationprogress,analysed,optimised,closedbyl2_executive,
    resolved_and_closed,not_resolved_and_closed,closedbyl2_tl,fwd_to_l2,closedbyl2_outcall,addedbyl2_outcall,preopti,postopti,
    optimisationpending,preoptipending,preoptiprogress,preopticompleted,task_status,corporate,postpaid,prepaid,escalation,vip,
    employees,ebu,service_plus,repeated,social_media,outbound,my_idea,others,tat_vip,tat_employees,tat_ebu,tat_service_plus,
    tat_social_media,tat_my_idea,tat_outbound,tat_repeated,tat_others,tat_customer_categories,all_network,two_g,three_g,four_g,
    two_g_three_g,three_g_four_g,four_g_two_g,withdrawn_yes,withdrawn_no,fieldvisit_yes,fieldvisit_no,analyse_yes,analyse_no,		
    fwdtofe_yes,fwdtofe_no,	coverage_related,voice_related,data_related,subscription_types,zones,customer_categories,cust_categories,
    categories,p1_categories,esc_categories,districts,priorities,network_types,prepaid_segment,complaint_types,complaint_postpaid_types,
    complaint_prepaid_types,task_status_filters,task_status_filters_dept,task_addedby_options,tat_excluded_hours,tat_start_time,
    tat_end_time,tat_expired_sql,tat_calc_sql,tat_stop_sql,district_options,visit_pending_option,analyze_pending_option,dept_pending_option,
    visit_progress_option,optimization_progress_option,visit_completed_option,analyze_completed_option,revertTeam_option,closedwithoutFV_option,
    directL2Close_option,resolvedClosed_option,notResolvedClosed_option,
    } from '../../../global_variables/task_variables';


// import user table variables
import { active, in_active, confirmed_yes, confirmed_no, opti_yes, opti_no, super_admin,
    admin, analyst, field_engineer, zone_user, dept_user, executive, mis, l3tl, l2tl, outcall, client,
    roles, sla_fwz_depts,  is_logged_in_yes, is_logged_in_no, male, female, deleted_yes, deleted_no} from '../../../global_variables/user_variables';
  
    
import React, { useEffect, useState } from "react";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import Sidebar from "../../Common/Sidebar";
import { Card, CardBody, CardTitle, Col, Row, Progress,DropdownMenu, DropdownItem, Modal, DropdownToggle,ButtonDropdown,  } from "reactstrap";
import { Link, withRouter, useLocation } from "react-router-dom"
import { isEmpty, map, size } from "lodash"

import { useTable, useSortBy, usePagination, useRowSelect } from 'react-table';

//Context
import { useAuthContext } from "../../../hooks/useAuthContext";

import { Popover } from 'bootstrap/dist/js/bootstrap.esm.min.js';

import Flatpickr from "react-flatpickr";



const ExecutiveView = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [infodrp_up11, setInfodrp_up11] = useState(false);

    const arr_filter1  = {'prepending':'PreOptimisation Pending','postpending':'PostOptimisation Pending','progress':'Optimisation Inprogress','fwd':'Foward','analysed':'Reverted from RF','closed':'Closed without FV','preopti':'Preoptimization','postopti':'Postoptimization'};							   
	const arr2_filter = ['prepending','postpending','progress','fwd','analysed','closed','preopti','postopti'];

    const arr_date_type  = {'visit':'visit uploaded date','assign':'Assign to field date'};							   
    const arr2_date_type = ['visit','assign'];

    const {user} = useAuthContext()
    const propsData = useLocation();
    const [pageStart,setPageStart] = useState(0);
    const [pageLimit,setPageLimit] = useState(10);
    const [totalSize, settotalSize] = useState(0);
    const [status_filter, set_status_filter] = useState("");
    const [date_type, set_date_type] = useState("");
    const [from_date, set_from_date] = useState("");
    const [to_date, set_to_date] = useState("");
    const [search_task, set_search_task] = useState("");
    const [tasks_id, setTasksId] = useState([]);
    const [l3_engineers, set_l3_engineers] = useState([]);
    const [selectedEngineer, setSelectedEngineer] = useState("");
    const [remarks, setRemarks] = useState("");

    // modal
    const [modal_backdrop, setmodal_backdrop] = useState(false)
    function tog_backdrop() {
        setmodal_backdrop(!modal_backdrop)
        removeBodyCss()
    }
    // modal
    const [modal_nobackdrop, setmodal_nobackdrop] = useState(false)
    function tog_nobackdrop() {
        setmodal_nobackdrop(!modal_nobackdrop)
        removeBodyCss()
    }
    function removeBodyCss() {
        document.body.classList.add("no_padding")
    }
    // modal


    // const data = propsData.state;
   

    useEffect(() => {
       
        if(user)
        {
            getTasks(pageStart);
            fetchL3tlEngineers();
        }
    },[user]);

    const searchTask = () => {
        getTasks(pageStart);

    }

    // GET TASKS FUNCTION API START
    const getTasks = async (start) =>{
        var from = "";
        var to = "";
        if(document.querySelector('input[name="from_date"]'))
        {
            from = document.querySelector('input[name="from_date"]').value;
            to = document.querySelector('input[name="to_date"]').value;
        }
        
        var page_size = document.querySelector("select[name=page_size]");
        var page_limit = pageLimit;

        if(page_size){
            page_limit = parseInt(page_size.value);

            setPageLimit(parseInt(page_size.value));
        }
        
        var start_num = start;

        if(start_num <=0)
        {
            start_num = 0;
            // setPageStart(0);
        }
        
        if(start_num <= totalSize){
            
            setPageStart(start_num);

            const response = await fetch('/api/tasks/l3tl/getExecutiveTasks', {
                method: "POST",
                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
                body: JSON.stringify({pageStart:start_num,pageLimit:page_limit, status:status_filter, date_type:date_type, from_date:from, to_date:to, search:search_task})
            })
            if(response.ok){
               const json = await response.json()
               console.log(json)
                if(json.status == "Success")
                {
                    console.log(json.data);
                    setData(json.data.task_data);
                    settotalSize(json.data.total_size);
                    console.log(json.data.total_size/pageLimit);
                    setLoading(false);
                }
                if(json.status == "Error")
                {
                    setLoading(false);
                }
            }else{
                setLoading(false);
            }
        }
        
    }
    // GET TASKS FUNCTION API END

    // L3 Engineers APi
    const fetchL3tlEngineers = async () => {
        // setError("")
        // setSuccess("")
        const response = await fetch('/api/user/l3tl/getL3tlEngineers', {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
            body: JSON.stringify({search_user:search_task})
        })
        if(response.ok){
           const json = await response.json()
           console.log(json)
            if(json.status == "Success")
            {
            
                set_l3_engineers(json.data);
            }
            if(json.status == "Error")
            {
                // setError("please try aftersometime!");
            }
        }else{
            // setError("please try aftersometime!");
        }


    }
    // L3 Engineers Api end

    // Approve for FV
    const approveFv = async ()=> {
        const task_ids = []
        var task_inputs = document.querySelectorAll("input[name='deleteRow']:checked").forEach((input)=>{task_ids.push(input.value)});
        console.log(task_ids);
        if(task_ids.length>0)
        {
            setTasksId(task_ids);
            tog_backdrop();
        }else{
            tog_nobackdrop();
        }
    }

    // date Converison
    const convertdate = (olddate) => {
        var created_date = new Date(olddate);

        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = created_date.getFullYear();
        var month = months[created_date.getMonth()];
        var date = created_date.getDate();
        var hour = created_date.getHours();
        var min = created_date.getMinutes();
        var sec = created_date.getSeconds();
        var time = date + '-' + month + '-' + year + ' ' + hour + ':' + min + ':' + sec ;    // final date with time, you can use this according your requirement

        return time;
    }

    // STATUS FUNCTION START
    const statusFunction = (a) => {
        console.log("===================")

        console.log(task_status)
        var message = "";

        // Pending
        if(a.task_status == pending)
        {
            if(a.task_withdrawn == withdrawn_yes)
            {       
                message = <span className='btn btn-info' style={styles.status}>Withdrawn</span>;
            }else{
                message = <span className='btn btn-danger' style={styles.status}>Pending</span>;
            }
        }
        // Closed
        if(a.task_status == l3_closed)
        {
            message = <span className='btn btn-primary' style={styles.status}>Closed</span>;
        }
        // approve_for_fieldvisit
        if(a.task_status == approve_for_fieldvisit)
        {
            message = <span className='btn btn-danger' style={styles.status}>Approve for FV</span>;
        }
        // analysis_required_fwdbyl3
        if(a.task_status == analysis_required_fwdbyl3)
        {
            message = <span className='btn btn-danger' style={styles.status}>FWD to RF</span>;
        }
        // progress
        if(a.task_status == progress)
        {
            message = <span className='btn btn-warning' style={styles.status}>Progress</span>;
        }
        // Completed
        if(a.task_status == completed)
        {
            message = <span className='btn btn-success' style={styles.status}>Completed</span>;
        }
        
        // cancelled
        if(a.task_status == cancelled)
        {
            message = <span className='btn btn-danger' style={styles.status}>Cancelled</span>;
        }

        // closed
        if(a.task_status == closed)
        {
            message = <span className='btn btn-primary' style={styles.status}>Closed</span>;
        }
        
        // Fwd To Team
        if(a.task_status == fwz)
        {
            message = <span className='btn btn-primary' style={styles.status}>Fwd To Team</span>;
        }
        // transfer
        if(a.task_status == transfer)
        {
            message = <span className='btn btn-warning' style={styles.status}>Transfer Requested</span>;
        }
        
        
                    
        return message;

    }
    // STATUS FUNCTION END

    // Submit Approval Api
    const SubmitApprove = async () => {
        const employee_id = selectedEngineer;
        const task_ids = tasks_id;
        const fv_remarks = remarks;
        const response = await fetch('/api/tasks/l3tl/approveFVTasks', {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
            body: JSON.stringify({employee_id:employee_id, task_ids:task_ids, fv_remarks:fv_remarks})
        })
        if(response.ok){
            const json = await response.json()
            console.log(json)
            if(json.status == "Success")
            {
                alert("Successfully Submitted");
                window.location.reload();
            }
            if(json.status == "Error")
            {
                alert("Failed to Submit");
            }
        }else{
            alert("Failed to Submit");

        }
    }
    // End Submit Approval Api  

    // Define the columns for your table
    const columns = React.useMemo(
        () => [
            {
                id: "selection",
                // The header can use the table's getToggleAllRowsSelectedProps method
                // to render a checkbox
                Header: ({ getToggleAllRowsSelectedProps }) => (
                    <div>
                        <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
                    </div>
                ),
                accessor: "_id",
                Cell: ({ row }) => (
                    <div>
                        <input type="checkbox" name="deleteRow" value={row.values.selection} {...row.getToggleRowSelectedProps()} />
                    </div>
                ),
            },
            {
                Header: 'Employee Id',
                accessor: 'user_arr[0].user_userid',
            },
            {
                Header: 'SR Number',
                accessor: 'task_sr_no',
            },
            {
                Header: 'Customer Name',
                accessor: 'task_customer_name',
            },
            {
                Header: 'Customer Mobile',
                accessor: 'task_mobile_number',
            },
            {
                Header: 'Area',
                accessor: 'task_area',
            },
            {
                Header: 'Pincode',
                accessor: 'task_pincode',
            },
            {
                Header: 'Task Created on',
                accessor: a=>(convertdate(a.task_createdon)),
            },
            {
                Header: 'Customer Subtype',
                accessor: 'task_postpaid_sub_type',
            },
            {
                Header: 'Distance',
                accessor: 'task_distance',
            },
            {
                Header: 'Status',
                accessor: 
                    a => (statusFunction(a))
            },
            {
                Header: 'Action',
                accessor: a => (
                    <Link className='btn btn-danger' to="/tasks/executivereport" state={a} style={styles.linkbtn} title="View Report"><i className='bx bx-book fs-16'></i></Link>
                ),
            },
      // Add more columns as needed
        ],
    []
    );

    // Create a table instance using react-table hooks
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        prepareRow,
        state: { pageIndex, pageSize, selectedRowPaths },
        selectedFlatRows,
        toggleAllRowsSelected
    } = useTable(
        {
            columns,
            data,
            initialState: {
                // Initial sort settings (you can modify this according to your needs)
                sortBy: [{ id: 'id', desc: false }],
                pageIndex: 0, // Initial page index
                pageSize: 100, // Initial page size (number of rows per page)
            },
        },
        useSortBy,
        usePagination,
        useRowSelect
        
    );
    
    const loadChange = async (val)=>{
        setPageLimit(parseInt(val))
        await getTasks(pageStart)
    }
    document.querySelectorAll('.popover').forEach((element) => {
        element.remove();
    })
    // POPOVER
    Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]')).forEach(popoverNode => new Popover(popoverNode))
    // POPOVER END

    

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

                    <div class="main-content">
                        <div className="page-content">
                            <Row>
                                <div className="col-12">
                                    <div className="page-title-box d-flex align-items-center justify-content-between">
                                        <h4 className="page-title mb-0 font-size-18">
                                            Tasks
                                        </h4>

                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item active">
                                                    tasks
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <Row>
                                <Col lg={12}>
                                    {/* {map(tasks, (task, i) => ( */}
                                        <Card>
                                            <CardBody>
                                                <CardTitle className="mb-4">
                                                    Tasks Summary 
                                                    <Col lg={1} style={{float:"right",textAlign:"end",marginTop:"-10px"}}>
                                                        <ButtonDropdown
                                                            direction="right"
                                                            isOpen={infodrp_up11}
                                                            toggle={() => setInfodrp_up11(!infodrp_up11)}
                                                            className=""
                                                            >
                                                            <DropdownToggle style={{fontSize:"22px",cursor:"pointer",background:"none",border:"none",padding:"0px"}}>
                                                               <i className="bx bx-dots-vertical" style={{color:"#77787b"}}></i>
                                                            </DropdownToggle>
                                                            <DropdownMenu style={{marginLeft:"-120px",marginTop:"22px"}}>
                                                                <DropdownItem onClick={approveFv} data-toggle="modal" className="font-size-14">Approve for FV</DropdownItem> 
                                                                <DropdownItem  className="font-size-14">Excel Download</DropdownItem> 
                                                            </DropdownMenu>
                                                        </ButtonDropdown>
                                                    </Col>
                                                </CardTitle>
                                                <div className="table-responsive">
                                                
                                                    {/* <div class="col-sm-4">			
						                                <input type="date" name="checkInDatefrom" class="form-control" id="check-in-from" style="margin:20px;font-size: 13px;"/>
                                                    </div>	 
						                            <div class="col-sm-4">			
						                                <input type="date" name="checkInDateto" class="form-control" id="check-in-to" style="margin:20px;font-size: 13px;"/>
                                                    </div> */}
                                                  {loading ? (
                                                        <div>Loading...</div>
                                                  ) : (
                                                  <div>
                                                    <Card>
                                                        <CardBody>
                                                            <Row>
                                                        

                                                                <Col lg={2}>
                                                                    <Flatpickr
                                                                        name="from_date"
                                                                        className="form-control d-block"
                                                                        placeholder="Task from date"
                                                                        onChange={(event)=>{set_from_date(event.value)}}
                                                                        options={{
                                                                            altInput: true,
                                                                            altFormat: "F j, Y",
                                                                            dateFormat: "Y-m-d",
                                                                        }}
                                                                    />
                                                                </Col>

                                                                <Col lg={2}>
                                                                    <Flatpickr
                                                                        name="to_date"
                                                                        className="form-control d-block"
                                                                        placeholder="Task to date"
                                                                        onChange={(event)=>{set_to_date(event.value)}}
                                                                        options={{
                                                                            altInput: true,
                                                                            altFormat: "F j, Y",
                                                                            dateFormat: "Y-m-d",
                                                                        }}
                                                                    />
                                                                </Col>

                                                                <Col lg={2}>
                                                                    <input type="text" name="search_task" class="form-control" 
                                                                        onBlur={(event)=>{set_search_task(event.target.value)}}placeholder="SR No., Emp ID, Name..."/>
                                                                </Col>

                                                                <Col lg={2}>
                                                                    <button type='button' onClick={searchTask} className='btn btn-primary'>Search</button>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Card>
                                                    <select className="mb-3" name="page_size" onChange={(e)=>loadChange(e.target.value)}>
                                                        <option>10</option>
                                                        <option>25</option>
                                                        <option>50</option>
                                                        <option>100</option>
                                                    </select>
                                                    <table className="table table-striped table-bordered align-middle mb-0" id="lists-table" {...getTableProps()}>
                                                        <thead>
                                                          {headerGroups.map((headerGroup) => (
                                                            <tr {...headerGroup.getHeaderGroupProps()}>
                                                                {headerGroup.headers.map((column) => (
                                                                    <th style={{fontWeight:"bold"}} {...column.getHeaderProps(column.getSortByToggleProps())}>
                                                                        {column.render('Header')}
                                                                        <span style={{fontWeight:"bold"}}>
                                                                            {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                                                                        </span>
                                                                    </th>
                                                                ))}
                                                            </tr>
                                                             ))}
                                                        </thead>
                                                        <tbody {...getTableBodyProps()}>
                                                          {page.map((row) => {
                                                            prepareRow(row);
                                                            console.log(row)
                                                            return (
                                                            <tr {...row.getRowProps()}>
                                                                {
                                                                row.cells.map((cell,i) => (
                                                                    
                                                                    <td style={{width: "60px",}} {...cell.getCellProps()}>
                                                                        {cell.render('Cell')}
                                                                    </td>
                                                                ))}
                                                            </tr>
                                                            );
                                                           })}
                                                        </tbody>
                                                    </table>
                                                    <Row style={{margin:"0px"}}>
                                                        <Col>
                                                            <div className="datatable-info" style={{marginTop:"20px"}}>
                                                                <span>Page {(pageStart/pageLimit)+1} of {Math.ceil(totalSize / pageLimit)}</span> &nbsp;/&nbsp;
                                                                <span>Showing {pageStart} to {(pageStart+pageLimit)>totalSize?totalSize:(pageStart+pageLimit)} of {totalSize} entries</span>
                                                            </div>
                                                        </Col>
                                                        <Col>
                                                            <div className="datatable-pagination mt-3">
                                                                <div className="pagination" style={styles.pagination}>
                                                                    <button 
                                                                        className={((pageStart/10)+1)==1?"btn btn-light waves-effect waves-light":"btn btn-primary waves-effect waves-light"} 
                                                                        style={styles.pageLink} 
                                                                        onClick={() => {getTasks(pageStart-pageLimit)}} 
                                                                        disabled={((pageStart/10)+1)==1?"disabled":""}>
                                                                            Previous Page
                                                                    </button>
                                                                
                                                                    <button 
                                                                        className={((pageStart/10)+1)==Math.ceil(totalSize / pageLimit)?"btn btn-light waves-effect waves-light":"btn btn-primary waves-effect waves-light"} 
                                                                        style={styles.pageLink} 
                                                                        onClick={() => getTasks(pageStart+pageLimit)} 
                                                                        disabled={((pageStart/10)+1)==Math.ceil(totalSize / pageLimit)?"disabled":""}>
                                                                            Next Page
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                    </div>

                                                    )}
                                                </div>
                                                
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    <Footer />
                </div>
            </div>
            
            {/* Modals */}
            <Modal
                isOpen={modal_backdrop}
                toggle={() => {
                    tog_backdrop()
                }}
                scrollable={true}
                id="staticBackdrop"
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="staticBackdropLabel">Approve Task</h5>
                        <button type="button" className="btn-close"
                            onClick={() => {
                              setmodal_backdrop(false)
                            }} aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className='form-control' style={{border:"none"}}>
                                <label>Employee</label>
                                <select className="form-select" onChange={(event)=>{setSelectedEngineer(event.target.value)}}>
                                    <option value="">Select Employee</option>
                                    {
                                        l3_engineers.map((item, index)=> (
                                            <option value={item._id}>{item.user_name}({item.user_userid})</option>
                                        ))
                                    }
                                </select>
                        </div>
                        <div className='form-control' style={{border:"none"}}>
                                <label>Remarks</label>
                                <input type="text" name="remarks" onBlur={(event)=>{setRemarks(event.target.value)}} className="form-control"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" onClick={SubmitApprove} className="btn btn-primary">Approve</button>

                        <button type="button" className="btn btn-danger" onClick={() => {
                            setmodal_backdrop(false)
                          }}>Close</button>
                    </div>
            </Modal>
            {/* End Modals */}

            {/* No Modals */}
            <Modal
                isOpen={modal_nobackdrop}
                toggle={() => {
                    tog_nobackdrop()
                }}
                scrollable={true}
                id="staticBackdrop"
                >
                    <div className="modal-header">
                        {/* <h5 className="modal-title" id="staticBackdropLabel">Field Engineers</h5> */}
                        <button type="button" className="btn-close"
                            onClick={() => {
                              setmodal_nobackdrop(false)
                            }} aria-label="Close">
                        </button>
                    </div>
                    <div className="modal-body" style={{textAlign:"center"}}>
                        <p>Please select task to approve.</p>
                    </div>
                    <div className="modal-footer" style={{justifyContent:"center"}}>
                        <button type="button" className="btn btn-primary" onClick={() => {
                            setmodal_nobackdrop(false)
                          }}>Close</button>
                    </div>
            </Modal>
            {/* End No Modals */}
        </React.Fragment>
    );
};

const styles = {
    pagination: {
        display: "flex",
        paddingLeft: 0,
        listStyle: "none"
    },
    pageLink: {
       marginLeft:"20px",
       marginRight:"20px",
       
    },
    status:{
        fontSize:"11px",
        fontWeight:600,
        padding:"0px 10px",
    },
    linkbtn:{
        fontSize: "23px",
        padding: "3px 4px 0px 4px"
    },
    showbtn:{
        fontSize: "15px",
        padding: "3px 4px 0px 4px"
    }
}


export default ExecutiveView;