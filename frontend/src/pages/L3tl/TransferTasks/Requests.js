import { pending, approved, hold, rejected, status_arr, deleted_no, deleted_yes } from "../../../global_variables/transfer_variables";
import React, { useEffect, useState } from "react";
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import Sidebar from "../../Common/Sidebar";
import { Card, CardBody, CardTitle, Col, Row, Progress,DropdownMenu,
    DropdownItem,
    DropdownToggle,ButtonDropdown, Modal } from "reactstrap";
import { Link, withRouter, useLocation } from "react-router-dom"
import { isEmpty, map, size } from "lodash"

import { useTable, useSortBy, usePagination, useRowSelect } from 'react-table';

//Context
import { useAuthContext } from "../../../hooks/useAuthContext";

import { Popover } from 'bootstrap/dist/js/bootstrap.esm.min.js';

import Flatpickr from "react-flatpickr";

const Requests = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [infodrp_up11, setInfodrp_up11] = useState(false);
    const {user} = useAuthContext()
    const [pageStart,setPageStart] = useState(0);
    const [pageLimit,setPageLimit] = useState(10);
    const [totalSize, settotalSize] = useState(0);
    const [status_filter, set_status_filter] = useState("");
    const [from_date, set_from_date] = useState("");

    useEffect(() => {
       
        if(user)
        {
            getTranferTasks(pageStart);
        }
    },[user]);

    const searchTask = () => {
        getTranferTasks(pageStart);

    }
 
   // GET Tranfer TASKS FUNCTION START
    const getTranferTasks = async (start) =>{
        var from = "";
        var to = "";
        if(document.querySelector('input[name="from_date"]'))
        {
            from = document.querySelector('input[name="from_date"]').value;
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

            const response = await fetch('/api/tasks/l3tl/getTranferTasks', {
                method: "POST",
                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
                body: JSON.stringify({pageStart:start_num,pageLimit:page_limit, status:status_filter, date:from})
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
    // GET Tranfer TASKS FUNCTION END

    const updateStatus = async (event) => {
        var status = event.target.value;
        var id = event.target.getAttribute('data-id');
        console.log(id)
        try{
            const response = await fetch('/api/tasks/l3tl/updateTransferTaskStatus', {
                method: "POST",
                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
                body: JSON.stringify({status:status, transfer_id:id})
            })
            if(response.ok){
                const json = await response.json();
                if(json.status == "Success")
                {
                    window.location.reload();
                }else{
                    alert("Failed to update")
                }
            }else{
                alert("Failed to update")
            }
        }catch(error){
            alert("Failed to update")
        }
        
    }

    // STATUS FUNCTION START
    const statusFunction = (a) => {
        console.log("===================")

        var message = "";

        if(a.transfer_status == approved)
        {       
            message = <span className='btn btn-success' style={styles.status}>Approved</span>;
        }
        if(a.transfer_status == pending)
        {       
            message = <span className='btn btn-danger' style={styles.status}>Pending</span>;
        }
        if(a.transfer_status == hold)
        {       
            message = <span className='btn btn-warning' style={styles.status}>Hold</span>;
        }
        if(a.transfer_status == rejected)
        {       
            message = <span className='btn btn-danger' style={styles.status}>Rejected</span>;
        }
        return message;

    }
    // STATUS FUNCTION END

    // POPOVER
    Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]')).forEach(popoverNode => new Popover(popoverNode))
    // POPOVER END

    const loadChange = async (val)=>{
        setPageLimit(parseInt(val))
        await getTranferTasks(pageStart)
    }
    
    // Define the columns for your table
    const columns = React.useMemo(
        () => [
            {
                Header: 'Employee Id',
                accessor: 'emp_arr[0].user_userid',
            },
            {
                Header: 'Employee name',
                accessor: 'emp_arr[0].user_name',
            },
            {
                Header: 'SR Number',
                accessor: 'task_arr[0].task_sr_no',
            },
            {
                Header: 'Transfer To',
                accessor: 'transfer_emp_arr[0].user_name',
            },
            {
                Header: 'Reason',
                accessor: a=>(
                    <button type="button" class="btn btn-primary btn-xs waves-effect" 
                        data-bs-container="body" 
                        data-bs-toggle="popover" 
                        data-bs-placement="bottom" 
                        title="Reason"
                        data-bs-content={a.transfer_reason}
                        data-bs-trigger="focus" style={styles.showbtn}>Show</button>),
            },
            {
                Header: 'Status',
                accessor: 
                    a => (statusFunction(a))
            },
            {
                Header: 'Action',
                accessor: a => (
                    <>
                        {a.transfer_status != approved ?
                            <select data-id={a._id} onChange={(event)=>{updateStatus(event)}}>
                                <option {...a.transfer_status==pending?"selected":""} value={pending}>Pending</option>
                                <option {...a.transfer_status==hold?"selected":""} value={hold}>Hold</option>
                                <option {...a.transfer_status==rejected?"selected":""} value={rejected}>Rejected</option>
                                <option {...a.transfer_status==approved?"selected":""} value={approved}>Approved</option>


                            </select> 
                        :<></>
                        }
                        <Link className='btn btn-primary' to="/tasks/report" state={a.task_arr[0]} style={styles.linkbtn} title="View Report"><i className='bx bx-book fs-16'></i></Link>
                    </>
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
                hiddenColumns:['employee_id']
            },
        },
        useSortBy,
        usePagination,
        useRowSelect
    );


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
                                        Transfer Requests 
                                        </h4>

                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item active">
                                                transfer / requests 
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
                                                    Transfer Requests 
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
                                                                        {Object.keys(status_arr).map((key)=> (
                                                                            key == status_filter ? 
                                                                                <option selected value={key}>{status_arr[key]}</option>
                                                                            :
                                                                                <option value={key}>{status_arr[key]}</option>
                                                                        ))}
                                                                    </select>
                                                                </Col>

                                                                <Col lg={2}>
                                                                    <Flatpickr
                                                                        name="from_date"
                                                                        className="form-control d-block"
                                                                        placeholder="date"
                                                                        onChange={(event)=>{set_from_date(event.value)}}
                                                                        options={{
                                                                            altInput: true,
                                                                            altFormat: "F j, Y",
                                                                            dateFormat: "Y-m-d",
                                                                        }}
                                                                    />
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
                                                                    onClick={() => {getTranferTasks(pageStart-pageLimit)}} 
                                                                    disabled={((pageStart/10)+1)==1?"disabled":""}>
                                                                        Previous Page
                                                                </button>
                                                            
                                                                <button 
                                                                    className={((pageStart/10)+1)==Math.ceil(totalSize / pageLimit)?"btn btn-light waves-effect waves-light":"btn btn-primary waves-effect waves-light"} 
                                                                    style={styles.pageLink} 
                                                                    onClick={() => getTranferTasks(pageStart+pageLimit)} 
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
                </div>
            </div>
        </React.Fragment>
    )
}


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

export default Requests;