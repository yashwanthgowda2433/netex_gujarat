import React, { useEffect, useState } from "react"
import { Card, CardBody, Table, CardTitle, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap"
import { isEmpty, map, size } from "lodash"

import { Link, withRouter, useLocation, useNavigate } from "react-router-dom"

// context 
import { useAuthContext } from "../../../hooks/useAuthContext";

const WalkDriveTest = (props) => {
    const {user} = useAuthContext()
    const [device_lists, update_device_lists] = useState([]);

    const propsData = useLocation();
    const task_data = propsData.state;
    const test_data = props.data;

    console.log(task_data)
    console.log(test_data)



    return (
        <Col lg={12}>
            <h2>WalkDriveTest</h2>
        </Col>
    )
}

export default WalkDriveTest


