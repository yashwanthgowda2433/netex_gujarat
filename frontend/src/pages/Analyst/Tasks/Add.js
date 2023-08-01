import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { Card, CardBody, Col, Row, Progress, CardTitle, InputGroup, Alert} from "reactstrap";

import { AvForm, AvField } from "availity-reactstrap-validation"
//Import Flatepicker
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";

//Common pages
import Header from "../../Common/Header";
import Footer from "../../Common/Footer";
import Sidebar from "../../Common/Sidebar";

//Context
import { useAuthContext } from "../../../hooks/useAuthContext";

// Select
import Select from "react-select";


const Add = () => {
    const { user } = useAuthContext();
    var [error, setError] = useState("");
    var [success,setSuccess] = useState("");
    const [inputs,setInputs] = useState({});
    const [selectedGroup, setselectedGroup] = useState(null);
    const [opti_engineers, set_opti_engineers] = useState("");
    
    const optionGroupStores = [
        {
            label: "Field Engineers",
            options: opti_engineers,
        },
    ];

    function handleSelectGroup(selectedGroup) {
        // console.log(selectedGroup)
        setselectedGroup(selectedGroup);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    useEffect(() => {
        if(user)
        {
            fetchOptiEngineers();
        }
        
    }, [user]);

    const fetchOptiEngineers = async () => {
        setError("")
        setSuccess("")
        const response = await fetch('/api/user/analyst/getOptiEngineers', {
            method: "POST",
            headers: { 'Authorization': `Bearer ${user.token}` },
        })
        if(response.ok){
           const json = await response.json()
           console.log(json)
            if(json.status == "Success")
            {
                var lists = []
                for (var i = 0; i < json.data.length; i++) {
                    lists.push({ label: json.data[i].user_name+"("+json.data[i].user_userid+")", value: json.data[i]._id });
                }
                set_opti_engineers(lists);
            }
            if(json.status == "Error")
            {
                setError("please try aftersometime!");
            }
        }else{
            setError("please try aftersometime!");
        }


    }


    // handleValidSubmit
    const handleValidSubmit = async (event, values) => {
        event.preventDefault();

        var input_json = inputs;
        // emp_id select and date
        var employee_id = document.querySelector('input[name=employee_id]').value;
        var crm_date = document.querySelector('input[name=crm_date]').value;
        input_json.crm_date = crm_date;
        input_json.employee_id = employee_id;

        console.log(input_json);

        setError("")
        setSuccess("")
        const response = await fetch('/api/tasks/analyst/add', {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
            body: JSON.stringify(input_json)
        })

        if(response.ok){
           const json = await response.json()
           console.log(json)
            if(json.status == "Success")
            {
                setSuccess(json.message);

            }
            if(json.status == "Error")
            {
                setError(json.message);
            }
        }else{
            setError("please try aftersometime!");
        }
        // await login(email, password)  
  
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

                    <div className="main-content">
                        <div className="page-content">
                            <Row>
                                <div className="col-12">
                                    <div className="page-title-box d-flex align-items-center justify-content-between">
                                        <h4 className="page-title mb-0 font-size-18">
                                            Add Task
                                        </h4>

                                        <div className="page-title-right">
                                            <ol className="breadcrumb m-0">
                                                <li className="breadcrumb-item active">
                                                    tasks / add
                                                </li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>
                            </Row>

                            <Row>
                                <Col lg={12}>
                                    {/* {map(tasks, (task, i) => ( */}
                                            {success != '' ? (
                                                    <Alert color="success">
                                                        {success}
                                                    </Alert>
                                                ) : null} 

                                            {error != '' ? (
                                                    <Alert color="danger">
                                                        {error}
                                                    </Alert>
                                                ) : null}
                                    <Card>
                                        <CardBody>
                                            <Row>
                                                <Col lg={12} style={{margin:"auto"}}>
                                                    <AvForm className="form-horizontal" onValidSubmit={(e, v) => { handleValidSubmit(e, v) }}>
                                                        <Row>
                                                            <Col lg={7}>
                                                                <Row className="mb-4">
                                                                    <label htmlFor="username" className="col-md-4 col-form-label" style={{fontWeight:"600"}}>Opti Engineer</label>
                                                                    <div className="col-md-8">
                                                                    <Select
                                                                        name="employee_id"
                                                                        value={selectedGroup}
                                                                        onChange={() => { handleSelectGroup(); }}
                                                                        options={optionGroupStores}
                                                                        classNamePrefix="select2-selection"
                                                                        required
                                                                    />
                                                                    </div>
                                                                </Row>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col lg={7}>
                                                                <Row className="mb-4">
                                                                    <label htmlFor="username" className="col-md-4 col-form-label" style={{fontWeight:"600"}}>CRM date</label>
                                                                    <div className="col-md-8">
                                                                        <InputGroup>
                                                                            <Flatpickr
                                                                                className="form-control d-block"
                                                                                name="crm_date"
                                                                                placeholder="dd M,yyyy"
                                                                                options={{
                                                                                    altInput: true,
                                                                                    altFormat: "F j, Y",
                                                                                    dateFormat: "Y-m-d",
                                                                                }}
                                                                            />
                                                                        </InputGroup>
                                                                    </div>
                                                                </Row>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col lg={7}>
                                                                <Row className="mb-4">
                                                                    <label htmlFor="username" className="col-md-4 col-form-label" style={{fontWeight:"600"}}>SR Number</label>
                                                                    <div className="col-md-8">
                                                                        <InputGroup>
                                                                            <input type="text" className="form-control" name="sr_no" value={inputs.sr_no} onChange={handleChange}/>
                                                                        </InputGroup>
                                                                    </div>
                                                                </Row>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col lg={7}>
                                                                <Row className="mb-4">
                                                                    <label htmlFor="username" className="col-md-4 col-form-label" style={{fontWeight:"600"}}>Customer Name</label>
                                                                    <div className="col-md-8">
                                                                        <InputGroup>
                                                                            <input type="text" className="form-control" name="customer_name" value={inputs.customer_name} onChange={handleChange}/>
                                                                        </InputGroup>
                                                                    </div>
                                                                </Row>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col lg={7}>
                                                                <Row className="mb-4">
                                                                    <label htmlFor="username" className="col-md-4 col-form-label" style={{fontWeight:"600"}}>Customer Location</label>
                                                                    <div className="col-md-8">
                                                                        <InputGroup>
                                                                            <input type="text" className="form-control" name="customer_location" value={inputs.customer_location} onChange={handleChange}/>
                                                                        </InputGroup>
                                                                    </div>
                                                                </Row>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col lg={7}>
                                                                <Row className="mb-4">
                                                                    <label htmlFor="username" className="col-md-4 col-form-label" style={{fontWeight:"600"}}>Company Name</label>
                                                                    <div className="col-md-8">
                                                                        <InputGroup>
                                                                            <input type="text" className="form-control" name="company_name" value={inputs.company_name} onChange={handleChange}/>
                                                                        </InputGroup>
                                                                    </div>
                                                                </Row>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col lg={7}>
                                                                <Row className="mb-4">
                                                                    <label htmlFor="username" className="col-md-4 col-form-label" style={{fontWeight:"600"}}>Mobile Number</label>
                                                                    <div className="col-md-8">
                                                                        <InputGroup>
                                                                            <input type="number" className="form-control" name="mobile_number" value={inputs.mobile_number} onChange={handleChange}/>
                                                                        </InputGroup>
                                                                    </div>
                                                                </Row>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col lg={7}>
                                                                <Row className="mb-4">
                                                                    <label htmlFor="username" className="col-md-4 col-form-label" style={{fontWeight:"600"}}>Alternate Mobile</label>
                                                                    <div className="col-md-8">
                                                                        <InputGroup>
                                                                            <input type="number" className="form-control" name="alternate_mobile" value={inputs.alternate_mobile} onChange={handleChange}/>
                                                                        </InputGroup>
                                                                    </div>
                                                                </Row>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col lg={7}>
                                                                <div className="mt-3 mb-5" style={{textAlign:"center"}}>
                                                                    <button
                                                                        className="btn btn-primary waves-effect waves-light"
                                                                        type="submit"
                                                                        style={{width:"150px"}}
                                                                    >ADD Task
                                                                    </button>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                        

                                                    </AvForm>
                                                </Col>
                                            </Row>
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
export default Add;
