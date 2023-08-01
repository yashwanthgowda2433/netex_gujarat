// import PropTypes from 'prop-types'
import React, { useEffect, useState } from "react"

import { Row, Col, Alert, Container, Card } from "reactstrap"

// Redux
// import { connect } from "react-redux"
// import { withRouter, Link } from "react-router-dom"
import { Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"


// import images
import logo from "../../assets/images/netbuddy1.png"

// import { useSignup } from "../../hooks/useSignup"
//user api calling
import { useUserRegister } from "../../hooks/useUser"

const Register = (props) => {

    useEffect(() => {
        document.body.className = "authentication-bg";
        document.body.style.background = "linear-gradient(to bottom, #0186b3, #96d8ab)";

        // remove classname when component will unmount
        return function cleanup() {
            document.body.className = "";
        };
    });

    
    const {signup, success, error, isLoading} = useUserRegister()
      

    // handleValidSubmit
    const handleValidSubmit = async (event, values) => {
         // console.log(values);
         const email = values.email;
         const username = values.username;
         const password = values.password;

         await signup(username, email, password)

         // console.log(error)
    }

    return(
    <React.Fragment>
      {/* <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2"></i>
        </Link>
      </div> */}
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Register</h5>
                    <p className="text-white-50 mb-0">Get your Netbuddy account now</p>
                    <Link to="/" className="logo logo-admin mt-4">
                      <img src={logo} alt="" height="50" />
                    </Link>
                  </div>
                </div>
                <div className="card-body pt-5">

                  <div className="p-2">
                    <AvForm
                      className="form-horizontal"
                      onValidSubmit={(e, v) => {
                        handleValidSubmit(e, v)
                      }}
                    >
                      {success && success !='' ? (
                        <Alert color="success">
                          Register User Successfully, Please Login!
                        </Alert>
                       ) : null} 

                      {error && error != null &&
                        error != '' ? (
                          <Alert color="danger">
                            {error}
                          </Alert>
                        ) : null}

                      <div className="mb-3">
                        <AvField
                          name="username"
                          label="Username"
                          type="text"
                          required
                          placeholder="Enter username"
                        />
                      </div>

                      <div className="mb-3">
                        <AvField
                          id="email"
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>

                      
                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="mt-4">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Register
                        </button>
                      </div>

                    
                    </AvForm>

                  </div>
                </div>
              </Card>
              <div className="mt-5 text-center">
                <p style={{color:"#fff"}}>Already have an account ? <a href="/login" className="fw-medium text-primary">
                  Login</a> </p>
                <p style={{color:"#fff"}}>Copyright © {new Date().getFullYear()} | TelecomOne Teleservices India Pvt. Ltd
                        </p>
              </div>
            </Col>
          </Row>
          </Container>
      </div>
    </React.Fragment>

    )
}


export default Register