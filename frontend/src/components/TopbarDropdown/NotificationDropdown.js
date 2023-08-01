import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { Link, NavLink, useNavigate} from "react-router-dom";
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from "reactstrap";
import SimpleBar from "simplebar-react";
import { useAuthContext } from "../../hooks/useAuthContext";

const NotificationDropdown = (props) => {
  const navigate = useNavigate();
  const {user} = useAuthContext()
  const [menu, setMenu] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [prevCount, setPrevCount] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [clickedNotifications, setClickedNotifications] = useState(new Set());
  const audioRef = useRef(null);

  useEffect(() => {
    console.log(isMuted)
    console.log(localStorage.getItem('muted'))

    if(parseInt(localStorage.getItem('muted')) == 0){
      setIsMuted(false)
    }else{
      setIsMuted(true)
    
    }
    console.log("_+__________________")

    console.log(isMuted)

    const fetchNotifications = async () => {
      try {
        const response = await fetch('/api/devices/deviceNotification', {
          method:"POST",
          headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
        });

        if (!response.ok) {
          // localStorage.setItem("user","");
          // window.location.href="/";
        }

        const jsonFetch = await response.json();
        if (jsonFetch.status === "Success" && Array.isArray(jsonFetch.deviceslist)) {
          const notificationsData = jsonFetch.deviceslist.map(device => ({ ...device.data }));
          setNotifications(notificationsData);  
          console.log(isMuted)        
          console.log(notificationsData.length)        
          console.log(prevCount)        
          
          if (notificationsData.length > prevCount) {
            console.log("true1")        

            setPrevCount(notificationsData.length);
            if (!isMuted) {
              console.log("true")        
              
              audioRef.current.play();
            }else{
              console.log("false")        

            }
          }else{
            console.log("====================")        

            console.log("false1")        
            console.log(prevCount)   
            console.log(notificationsData.length);     

            setPrevCount(notificationsData.length);

          }
        }
      } catch (error) {
        console.log('Fetch error: ', error);
      }
    };

    fetchNotifications();
    const interval = setInterval(() => {
      fetchNotifications();
    }, 10000);

    return () => clearInterval(interval);
  }, [prevCount, isMuted]);

  const handleClick = (notification) => {
    fetch('/api/devices/updateSeenStatus', {
      method:"POST",
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}`},
      body: JSON.stringify({ _id: notification.device_id, data_warning: notification.data_warning, battery_warning: notification.battery_warning }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === 'Success') {
          setClickedNotifications(prevState => new Set([...prevState, notification.device_id]));
        }
      })
      .catch(error => {
        console.log('Failed to update seen_status for notification:', error);
      });
  };

  const volumeFunc = () => {
    if(isMuted){
      localStorage.setItem('muted',0)
      setIsMuted(false)
    }else{
      localStorage.setItem('muted',1)
      setIsMuted(true)
    }
    console.log("=============")

    console.log(isMuted)
  }

  const unclickedNotifications = notifications.filter(notification => !clickedNotifications.has(notification.device_id));

  return (
    <>
      <audio ref={audioRef} src="/notification.mp3"/>
      <i className={isMuted ? "mdi mdi-volume-off " : "mdi mdi-volume-high "}
        style={{ cursor: 'pointer', color: 'white', fontSize: 16 }}
        onClick={() => volumeFunc() }
      />

      <Dropdown
        isOpen={menu}
        toggle={() => setMenu(!menu)}
        className="dropdown d-inline-block"
        tag="li"
      >
        <DropdownToggle
          className="btn header-item noti-icon waves-effect"
          tag="button"
          id="page-header-notifications-dropdown"
        >
          <i className="mdi mdi-bell-outline"></i>
          <span className="badge rounded-pill bg-danger ">
            {unclickedNotifications.length}
          </span>
        </DropdownToggle>

        <DropdownMenu
          className="dropdown-menu-lg dropdown-menu-end p-0"
        >
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0">{" "}Notifications </h6>
              </Col>
              <div className="col-auto">
                <NavLink to="/notification" className="small">
                  {" "}
                  View All
                </NavLink>
              </div>
            </Row>
          </div>

          <SimpleBar style={{ height: "230px" }}>
            {unclickedNotifications.map((notification, index) => {
              let notificationTime = new Date(notification.createdAt);
              let currentTime = new Date();
              let timeDifferenceInMilliseconds = currentTime - notificationTime;
              let timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / 60000);
              let hours = Math.floor(timeDifferenceInMinutes / 60);
              let minutes = timeDifferenceInMinutes % 60;
              let deviceData = { parent: notification.device_id, data: notification };
              return (
                <Link
                  className="text-reset notification-item"
                  to="/posmachines/report"
                  state={deviceData}
                  onClick={() => handleClick(notification)}
                >
                  <div className="d-flex align-items-start">
                    <div className="avatar-xs me-3">
                      <span className="avatar-title bg-danger rounded-circle font-size-16">
                        {((notification.data_warning === 0) && (notification.battery_warning === 1)) ? <i className="mdi mdi-battery-alert mdi-24px" /> : ((notification.data_warning === 1) && (notification.battery_warning === 0)) ? <i className="mdi mdi-timer-sand mdi-24px mdi-rotate-180" /> : ""}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h6 className="mt-0 mb-1">
                        Device id : {notification.device_id}
                      </h6>
                      <p className="mt-0 mb-1">
                        {((notification.data_warning === 0) && (notification.battery_warning === 1)) ? "Battery level is low." : ((notification.data_warning === 1) && (notification.battery_warning === 0)) ? "Data limit exceeded." : ""}
                      </p>
                      <div className="font-size-12 text-muted">
                        <p className="mb-1">
                          {((notification.data_warning === 0) && (notification.battery_warning === 1)) ? "current battery level is " + notification.battery_level + "%" : ((notification.data_warning === 1) && (notification.battery_warning === 0)) ? " current internet used is " + (parseInt(notification.internet_usage) / 1000) + " MB" : ""}
                        </p>
                        <p className="mb-0">
                          <i className="mdi mdi-clock-outline" />{" "}
                          {hours} hours {minutes} minutes ago
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </SimpleBar>

          <div className="p-2 border-top d-grid">
            <Link className="btn btn-sm btn-link font-size-14 text-center" to="/notification" >
              <i className="mdi mdi-arrow-right-circle me-1"></i>
              {" "}
              View all{" "}
            </Link>
          </div>
        </DropdownMenu>
      </Dropdown >
    </>
  )
}

export default NotificationDropdown;