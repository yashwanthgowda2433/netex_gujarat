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

const View = () => {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [infodrp_up11, setInfodrp_up11] = useState(false)

    const {user} = useAuthContext()
    const propsData = useLocation();
    const [pageStart,setPageStart] = useState(0);
    const [pageLimit,setPageLimit] = useState(10);
    const [totalSize, settotalSize] = useState(0);
    // const data = propsData.state;
   

    useEffect(() => {
        if(user)
        {
            getTasks(pageStart);
        }
    },[user]);

    const getTasks = async (start) =>{
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

            const response = await fetch('/api/tasks/analyst/get', {
                method: "POST",
                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
                body: JSON.stringify({pageStart:start_num,pageLimit:page_limit})
    
            })
            if(response.ok){
               const json = await response.json()
               console.log(json)
                if(json.status == "Success")
                {
                    console.log(json.data)
                    setData(json.data.task_data);
                    settotalSize(json.data.total_size);
                    console.log(json.data.total_size/pageLimit)
                    setLoading(false)
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

    // Define the columns for your table
    const columns = React.useMemo(
        () => [
            {
                Header: 'Employee ID',
                accessor: 'task_employee_id',
            },
            {
                Header: 'Name',
                accessor: 'task_customer_name',
            },
            {
                Header: 'mobile number',
                accessor: 'task_mobile_number',
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
                                                    Lists
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
                                                            return (
                                                            <tr {...row.getRowProps()}>
                                                                {row.cells.map((cell) => (
                                                                    <td style={{width: "60px",}} {...cell.getCellProps()}>{cell.render('Cell')}</td>
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
       
    }
}

export default View;