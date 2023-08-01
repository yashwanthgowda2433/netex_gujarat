// import PropTypes from 'prop-types'
import React, { useEffect } from "react"

import { Row, Col, Alert, Container } from "reactstrap"

// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

//style{background:linear-gradient(to bottom, #0186b3, #96d8ab);}
// import images
import logo from "../../assets/images/netbuddy1.png"

//user api calling
import { useUserLogin } from "../../hooks/useUser"

const Login = (props) => {

    useEffect(() => {
        document.body.className = "authentication-bg";
        document.body.style.background = "linear-gradient(to bottom, #0186b3, #96d8ab)";

        // remove classname when component will unmount
        return function cleanup() {
            document.body.className = "";
        };
    });

    const {login, success, error, isLoading} = useUserLogin()

    // handleValidSubmit
    const handleValidSubmit = async (event, values) => {
      // console.log(values);
      

      const email = values.email;
      const password = values.password;

      await login(email, password)

    }

    return(
        <React.Fragment>
      {/* <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div> */}
      <div className="account-pages my-5 pt-sm-5">
      
        <Container>
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <div className="card overflow-hidden">
                <div className="bg-login text-center">
                  <div className="bg-login-overlay"></div>
                  <div className="position-relative">
                    <h5 className="text-white font-size-20">Welcome Back!</h5>
                    <p className="text-white-50 mb-0">Sign in to continue to Netex.</p>
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
                          Successfully Loggedin!
                        </Alert>
                       ) : null} 

                      {error && error != null &&
                        error != '' ? (
                          <Alert color="danger">
                            {error}
                          </Alert>
                        ) : null}


{/* value="netbuddy@telecomone.in" */}
                      <div className="mb-3">
                        <AvField
                          name="email"
                          label="Email"
                          className="form-control"
                          placeholder="Enter email"
                          type="email"
                          required
                        />
                      </div>
                      
{/* value="Tele@123" */}
                      <div className="mb-3">
                        <AvField
                          name="password"
                          label="Password"
                          type="password"
                          required
                          placeholder="Enter Password"
                        />
                      </div>

                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="customControlInline"
                          name="rememberme"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="customControlInline"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="mt-3">
                        <button
                          className="btn btn-primary w-100 waves-effect waves-light"
                          type="submit"
                        >
                          Log In
                        </button>
                      </div>

                      {/* <div className="mt-4 text-center">
                        <Link to="/forgot-password" className="text-muted"><i
                          className="mdi mdi-lock me-1"></i> Forgot your password?</Link>
                      </div> */}
                    </AvForm>

                  </div>
                </div>
              </div>
              <div className="mt-5 text-center">
                
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
export default Login