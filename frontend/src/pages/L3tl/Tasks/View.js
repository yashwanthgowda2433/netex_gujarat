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
import { Card, CardBody, CardTitle, Col, Row, Progress,DropdownMenu,
    DropdownItem,
    DropdownToggle,ButtonDropdown } from "reactstrap";
import { Link, withRouter, useLocation } from "react-router-dom"
import { isEmpty, map, size } from "lodash"

import { useTable, useSortBy, usePagination } from 'react-table';

//Context
import { useAuthContext } from "../../../hooks/useAuthContext";

import { Popover } from 'bootstrap/dist/js/bootstrap.esm.min.js';

import Flatpickr from "react-flatpickr";


const View = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [infodrp_up11, setInfodrp_up11] = useState(false)

    const arr_filter1  = {'prepending':'PreOptimisation Pending','postpending':'PostOptimisation Pending','progress':'Optimisation Inprogress','fwd':'Foward','analysed':'Reverted from RF','closed':'Closed without FV','preopti':'Preoptimization','postopti':'Postoptimization'};							   
	const arr2_filter = ['prepending','postpending','progress','fwd','analysed','closed','preopti','postopti'];

    const arr_date_type  = {'visit':'visit uploaded date','assign':'Assign to field date'};							   
    const arr2_date_type = ['visit','assign'];
    const postpaid_arr = ['R-10 Plus Years','R-Family Base','R-High Value','R-Senior Citizen'];

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


    // const data = propsData.state;
   

    useEffect(() => {
       
        if(user)
        {
            getTasks(pageStart);
        }
    },[user]);

    const searchTask = () => {
        getTasks(pageStart);

    }

    // GET TASKS FUNCTION START
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

            const response = await fetch('/api/tasks/l3tl/get', {
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
    // GET TASKS FUNCTION END

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

        // Post-Optimisation Pending
        if(a.task_status == preoptipending && a.task_is_postopti == fieldvisit_yes)
        {
            if(a.task_withdrawn == withdrawn_yes)
            {       
                message = <span className='btn btn-info' style={styles.status}>Withdrawn</span>;
            }else{
                message = <span className='btn btn-danger' style={styles.status}>Post-Optimisation Pending</span>;
            }
        }
        // Pre-Optimisation Inprogress
        else if(a.task_status == progress && a.task_is_rf_fieldvisit == fieldvisit_yes && a.task_is_postopti == fieldvisit_no)
        {
            message = <span className='btn btn-warning' style={styles.status}>Pre-Optimisation Inprogress</span>;
        }
        // Pre-Optimisation Pending
        else if((a.task_status == preoptipending || a.task_status == pending) && a.task_is_rf_fieldvisit==fieldvisit_yes && a.task_is_postopti==fieldvisit_no)
        {
            if(a.task_withdrawn == withdrawn_yes)
            {       
                message = <span className='btn btn-info' style={styles.status}>Withdrawn</span>;
            }else{
                message = <span className='btn btn-danger' style={styles.status}>Pre-Optimisation Pending</span>;
            }
        }
        //Post-Optimisation Inprogress
        else if(a.task_status == progress && a.task_is_postopti==fieldvisit_yes)
        {
            message = <span className='btn btn-warning' style={styles.status}>Post-Optimisation Inprogress</span>;
        }
        //Pre-Optimisation Completed
        else if(a.task_status == preopti)
        {
            message = <span className='btn btn-success' style={styles.status}>Pre-Optimisation Completed</span>;
        }
        //Postoptimization
        else if(a.task_status == postopti)
        {
            message = <span className='btn btn-success' style={styles.status}>Postoptimization</span>;
        }
        //Cancelled
        else if(a.task_status == cancelled)
        {
            message = <span className='btn btn-danger' style={styles.status}>Cancelled</span>;
        }
        //Completed
        else if(a.task_status == completed)
        {
            message = <span className='btn btn-success' style={styles.status}>Completed</span>;
        }
        //Closed without field visit
        else if(a.task_status == closed)
        {
            message = <span className='btn btn-warning' style={styles.status}>Closed without field visit</span>;
        }
        //Forward to ......
        else if(a.task_status == fwz)
        {
            // message = <span className='btn btn-primary' style={styles.status}>Forward to {sla_fwz_options[a.task_fwd_dept_id]}</span>;
        }
        //Forward to field visit
        else if(a.task_status == approve_for_fieldvisit)
        {
            message = <span className='btn btn-warning' style={styles.status}>Forward to field visit</span>;
        }
        //added by l2executive
        else if(a.task_status == addedbyl2_executive)
        {
            message = <span className='btn btn-primary' style={styles.status}>added by l2executive</span>;
        }
        //FWD to RF
        else if(a.task_status == analysis_required || a.task_status == analysis_required_fwdbyl3)
        {
            message = <span className='btn btn-primary' style={styles.status}>FWD to RF</span>;
        }
        //reverted from RF
        else if(a.task_status == analysed)
        {
            message = <span className='btn btn-primary' style={styles.status}>reverted from RF</span>;
        }
        //Withdrawn
        else if(a.task_status == withdraw)
        {
            message = <span className='btn btn-primary' style={styles.status}>Withdrawn</span>;
        }
        //Not resolved and closed
        else if(a.task_status == not_resolved_and_closed)
        {
            message = <span className='btn btn-primary' style={styles.status}>Not resolved and closed</span>;
        }
        //Resolved and closed
        else if(a.task_status == resolved_and_closed)
        {
            message = <span className='btn btn-primary' style={styles.status}>Resolved and closed</span>;
        }
        //Optimisation  in Progress
        else if(a.task_status == optimisationprogress)
        {
            message = <span className='btn btn-warning' style={styles.status}>Optimisation  in Progress</span>;
        }
        //Reverted from
        else if(a.task_status == optimised)
        {
            // message = <span className='btn btn-warning' style={styles.status}>Reverted from {sla_fwz_options[a.task_fwd_dept_id]}</span>;
        }
        //Foward to zone
        else if(a.task_status == fwz_to_zone)
        {
            message = <span className='btn btn-warning' style={styles.status}>Foward to zone</span>;
        }
        
        else if(a.task_status == progress)
        {
            message = <span className='btn btn-warning' style={styles.status}>Inprogress</span>;
        }
        else if(a.task_status == pending)
        {
            message = <span className='btn btn-danger' style={styles.status}>Pending</span>;
        }
                    
        return message;

    }
    // STATUS FUNCTION END

    // Define the columns for your table
    const columns = React.useMemo(
        () => [
            {
                Header: 'Select',
                accessor: 
                a => (
                    <div>
                        <input type="checkbox" className="delete-checkbox" value={a._id} id={"chk"+a._id}/>
					    <input type="hidden" className={"close-status"+a._id} value={a.task_status }/>  
                    </div>
                ),
            },
            {
                Header: 'Employee Name',
                accessor: 'user_arr[0].user_name',
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
            user.user_role == dept_user ? 
                {
                    Header: 'Task Forwarded on',
                    accessor: 'cc',
                } 
            : 
                {
                    Header: 'TAT',
                    accessor: '',
                },
                {
                    Header: 'ATAT Reason',
                    accessor: '',
                }
            ,{
                Header: 'Assign to field date',
                accessor: 'task_assigned_on',
            },
            {
                Header: 'visit uploaded date',
                accessor: a=>(convertdate(a.task_createdon)),
            },
            {
                Header: 'Customer Subtype',
                accessor: a => (postpaid_arr.includes(a.task_postpaid_sub_type) ? <span className='btn btn-warning' style={styles.status}>{a.task_postpaid_sub_type}</span>:a.task_postpaid_sub_type),
            },
            {
                Header: 'Status',
                accessor: 
                    a => (statusFunction(a))
            },
            {
                Header: 'Action',
                accessor: a => (
                    <Link className='btn btn-danger' to="/tasks/report" state={a} style={styles.linkbtn} title="View Report"><i className='bx bx-book fs-16'></i></Link>
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
        state: { pageIndex, pageSize },
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
        usePagination
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
                                                                <DropdownItem  className="font-size-14">Direct Transfer</DropdownItem> 
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
                                                                    <select onChange={(event)=>{set_status_filter(event.target.value)}} className="form-select">
                                                                        <option value="">All</option>
                                                                        {arr2_filter.map((item, index)=> (
                                                                            item == status_filter ? 
                                                                                <option selected value={item}>{arr_filter1[item]}</option>
                                                                            :
                                                                                <option value={item}>{arr_filter1[item]}</option>
                                                                        ))}
                                                                    </select>
                                                                </Col>

                                                                <Col lg={2}>
                                                                    <select onChange={(event)=>{set_date_type(event.target.value)}} className="form-select">
                                                                        <option value="">Select date type</option>
                                                                        {arr2_date_type.map((item, index)=> (
                                                                            item == date_type ? 
                                                                                <option selected value={item}>{arr_date_type[item]}</option>
                                                                            :
                                                                                <option value={item}>{arr_date_type[item]}</option>
                                                                        ))}
                                                                    </select>
                                                                </Col>

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

export default View;