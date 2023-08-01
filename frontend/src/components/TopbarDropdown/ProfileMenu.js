import React, { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

//i18n
// import { withTranslation } from "react-i18next"
// Redux
import { connect } from "react-redux"
import { withRouter, Link } from "react-router-dom"

// users
import user4 from "../../assets/images/netbuddy1.png"

//Logout api
import { useUserLogout } from "../../hooks/useUser"

//Context
import { useAuthContext } from "../../hooks/useAuthContext";

const ProfileMenu = (props) => {
  // Declare a new state variable, which we'll call "menu"
  const [menu, setMenu] = useState(false)

  const [username, setusername] = useState("Admin")

  const {logout, success, error, isLoading} = useUserLogout()
  const {user} = useAuthContext()
  
  useEffect(() => {
    if (user){
      setusername(user.user_name)
        // if (user.user) {
        //     setusername(user.user.user.user);
      
        // }
    }
  },[user])

  const Logout = () => {

    logout();
    // console.log(success)
  }
  return (
    <React.Fragment>
      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="d-inline-block"
      >
        <DropdownToggle
          className="btn header-item waves-effect"
          id="page-header-user-dropdown"
          tag="button"
        >
          <img
            className="rounded-circle header-profile-user"
            src={user4}
            alt="Header Avatar"
          />{" "}
          <span className="d-none d-xl-inline-block ms-1">{username}</span>{" "}
          <i className="mdi mdi-chevron-down d-none d-xl-inline-block"></i>{" "}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <DropdownItem tag="a" href="/profile">
            {" "}
            <i className="bx bx-user font-size-16 align-middle me-1"></i>{" "}
            View Profile{" "}
          </DropdownItem>
          {/* <DropdownItem tag="a" href="/#">
            <i className="bx bx-wallet font-size-16 align-middle me-1"></i>{" "}
            My Wallet
          </DropdownItem>
          <DropdownItem tag="a" href="#">
            <span className="badge bg-success float-end">11</span><i
              className="bx bx-wrench font-size-16 align-middle me-1"></i>{" "}
              Settings
          </DropdownItem>
          <DropdownItem tag="a" href="auth-lock-screen">
            <i className="bx bx-lock-open font-size-16 align-middle me-1"></i>{" "}
            Lock screen
          </DropdownItem> */}
          <div className="dropdown-divider" />
          <button className="dropdown-item text-danger" onClick={Logout}>
            <i className="bx bx-power-off font-size-16 align-middle me-1 text-danger"></i>{" "}
            <span>Logout</span>
          </button>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}


export default ProfileMenu