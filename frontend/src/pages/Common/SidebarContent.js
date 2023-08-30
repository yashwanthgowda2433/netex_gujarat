import { analyst,l3tl } from "../../global_variables/user_variables";

import PropTypes from "prop-types"
import React, { useEffect, useRef, useCallback, useState } from "react"

// //Import Scrollbar
import SimpleBar from "simplebar-react"

// MetisMenu
import MetisMenu from "metismenujs"
import { withRouter } from "react-router-dom"
import { Link } from "react-router-dom"

//AuthContext
import { useAuthContext } from "../../hooks/useAuthContext"

//i18n
// import { withTranslation } from "react-i18next"

const SidebarContent = () => {
  const [url_path, set_url_path] = useState("")
  const ref = useRef()

  const { user } = useAuthContext();

  const activateParentDropdown = useCallback((item) => {
    item.classList.add("active")
    const parent = item.parentElement
    const parent2El = parent.childNodes[1]
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show")
    }
    if (parent) {
      parent.classList.add("mm-active")
      const parent2 = parent.parentElement
      if (parent2) {
        parent2.classList.add("mm-show") // ul tag
        const parent3 = parent2.parentElement // li tag
        if (parent3) {
          parent3.classList.add("mm-active") // li
          parent3.childNodes[0].classList.add("mm-active") //a
          const parent4 = parent3.parentElement // ul
          if (parent4) {
            parent4.classList.add("mm-show") // ul
            const parent5 = parent4.parentElement
            if (parent5) {
              parent5.classList.add("mm-show") // li
              parent5.childNodes[0].classList.add("mm-active") // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false
    }
    scrollElement(item);
    return false
  }, []);


  

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {

    
    const pathurl = window.location.pathname;
    set_url_path(pathurl)
    // console.log(pathurl)
    const pathName = ""
    const initMenu = () => {
      new MetisMenu("#side-menu")
      let matchingMenuItem = null
      const ul = document.getElementById("side-menu")
      const items = ul.getElementsByTagName("a")
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i]
          break
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem)
      }
    }
    initMenu()
  }, ["", activateParentDropdown])
  useEffect(() => {
    ref.current.recalculate()
  }, []);
  const scrollElement = (item) => {
    if (item) {
      const currentPosition = item.offsetTop
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300
      }
    }
  }

  function openMenu(event){
    console.log(event.target);
    var parent_ele = event.target.parentElement;
    if(parent_ele.getAttribute("class")){
        if(parent_ele.getAttribute("class") == "has-arrow waves-effect" || parent_ele.getAttribute("class") == "has-arrow waves-effect mm-collapsed")
        {
            parent_ele = event.target.parentElement.parentElement;
        }
      }
    var i=0;
      if(parent_ele.querySelector('ul').getAttribute("class") == "sub-menu mm-collapse mm-show" && i==0){
          console.log(1)
          i=i+1;
          parent_ele.querySelector('ul').setAttribute("class","sub-menu mm-collapse");
          parent_ele.querySelector('ul').style.height = "0px";
          parent_ele.querySelector('a').setAttribute("class","has-arrow waves-effect");
      }
      if(parent_ele.querySelector('ul').getAttribute("class") =="sub-menu mm-collapse" && i==0){
        i=i+1;
        console.log(2)

          parent_ele.querySelector('ul').setAttribute("class","sub-menu mm-collapse mm-show");
          parent_ele.querySelector('ul').style.height = "max-content";
          parent_ele.querySelector('a').setAttribute("class","has-arrow waves-effect");
      }
      if(parent_ele.querySelector('ul').getAttribute("class") == "sub-menu mm-collapsing" && i==0)
      {
        i=i+1;
        console.log(3)

          parent_ele.querySelector('ul').setAttribute("class","sub-menu mm-collapse mm-show");
          parent_ele.querySelector('ul').style.height = "max-content";
          parent_ele.querySelector('a').setAttribute("class","has-arrow waves-effect");
      }

  }

  return (
    <React.Fragment>
      <SimpleBar ref={ref} className="vertical-simplebar">
        <div id="sidebar-menu" className="mm-show">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Menu </li>

            {/* ANALYST Login */}

              { user.user_role == analyst ? 
                <>
                    <li>
                        <Link to="/" className={'/'.includes(url_path) || '/dashboard'.includes(url_path) ? 'waves-effect mm-active' : 'waves-effect'}>
                            <i className="mdi mdi-airplay"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className={ /field-engineers/.test(url_path) || /fieldengineers/.test(url_path) ? "mm-active" : "" }>
                        <Link onClick={openMenu} to="/#" className={'has-arrow waves-effect'}>
                            <i className="mdi mdi-inbox-full"></i>
                            <span>Field Engineers</span>
                        </Link>
                        <ul className={ /field-engineers/.test(url_path) || /fieldengineers/.test(url_path) ? "sub-menu mm-collapse mm-show" :  "sub-menu" }>
                            <li>
                                <Link to="/field-engineers/track" className={'/field-engineers/track'.includes(url_path) ? "mm-active" : "" }>Track Employees</Link>
                            </li>
                            <li>
                                <Link to="/fieldengineers" className={'/fieldengineers'.includes(url_path) ? "mm-active" : "" }>View Employees</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                          <Link to="/view_map" className={'/view_map'.includes(url_path) ? "mm-active" : "" }>
                              <i className="mdi mdi-inbox-full"></i>
                              View Map
                          </Link>
                    </li>

                    <li className={ /tasks/.test(url_path) ? "mm-active" : "" }>
                        <Link onClick={openMenu} to="/#" className={'has-arrow waves-effect'}>
                            <i className="mdi mdi-inbox-full"></i>
                            <span>Tasks</span>
                        </Link>
                        <ul className={ /tasks/.test(url_path) ? "sub-menu mm-collapse mm-show" :  "sub-menu" }>
                            <li>
                                <Link to="/tasks/add" className={'/tasks/add'.includes(url_path) ? "mm-active" : "" }>Task Add</Link>
                            </li>
                            <li>
                                <Link to="/tasks/view" className={'/tasks/view'.includes(url_path) || '/tasks/report'.includes(url_path) ? "mm-active" : "" }>Tasks</Link>
                            </li>
                            <li>
                                <Link to="/tasks/l3tlview" className={'/tasks/l3tlview'.includes(url_path) || '/tasks/l3tlreport'.includes(url_path) ? "mm-active" : "" }>RF Open Tasks</Link>
                            </li>
                        </ul>
                    </li>  
                  </>
                :  <></>
              }


              {/* L3TL Login */}
              { user.user_role == l3tl ? 
                <>
                    <li>
                        <Link to="/" className={'/'.includes(url_path) || '/dashboard'.includes(url_path) ? 'waves-effect mm-active' : 'waves-effect'}>
                            <i className="mdi mdi-airplay"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className={ /field-engineers/.test(url_path) || /fieldengineers/.test(url_path) ? "mm-active" : "" }>
                        <Link onClick={openMenu} to="/#" className={'has-arrow waves-effect'}>
                            <i className="mdi mdi-inbox-full"></i>
                            <span>Field Engineers</span>
                        </Link>
                        <ul className={ /field-engineers/.test(url_path) || /fieldengineers/.test(url_path) ? "sub-menu mm-collapse mm-show" :  "sub-menu" }>
                            <li>
                                <Link to="/field-engineers/track" className={'/field-engineers/track'.includes(url_path) ? "mm-active" : "" }>Track Employees</Link>
                            </li>
                            <li>
                                <Link to="/fieldengineers" className={'/fieldengineers'.includes(url_path) ? "mm-active" : "" }>View Employees</Link>
                            </li>
                        </ul>
                    </li>

                    <li>
                          <Link to="/view_map" className={'/view_map'.includes(url_path) ? "mm-active" : "" }>
                              <i className="mdi mdi-inbox-full"></i>
                              View Map
                          </Link>
                    </li>

                    <li>
                          <Link to="/transfer/request" className={'/transfer/request'.includes(url_path) ? "mm-active" : "" }>
                              <i className="mdi mdi-inbox-full"></i>
                              Transfer Requests
                          </Link>
                    </li>

                    <li className={ /tasks/.test(url_path) ? "mm-active" : "" }>
                        <Link onClick={openMenu} to="/#" className={'has-arrow waves-effect'}>
                            <i className="mdi mdi-inbox-full"></i>
                            <span>Tasks</span>
                        </Link>
                        <ul className={ /tasks/.test(url_path) ? "sub-menu mm-collapse mm-show" :  "sub-menu" }>
                            
                            <li>
                                <Link to="/tasks/view" className={'/tasks/view'.includes(url_path) || '/tasks/report'.includes(url_path) ? "mm-active" : "" }>View Task Summary</Link>
                            </li>
                            <li>
                                <Link to="/tasks/executiveTasks" className={'/tasks/executiveTasks'.includes(url_path) || '/tasks/l3tlreport'.includes(url_path) ? "mm-active" : "" }>View Open Complaint Summary</Link>
                            </li>
                        </ul>
                    </li>  
                  </>
                :  <></>
              }
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  )
}

// SidebarContent.propTypes = {
//   location: PropTypes.object,
//   t: PropTypes.any,
// }

export default SidebarContent