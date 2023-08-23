import React from "react"
import { Switch, BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// Import scss
import "./assets/scss/theme.scss"
// Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';


// import Home from './pages/Dashboard/Dashboard';

// ANALYST IMPORTS START
import Analyst_dashboard from './pages/Analyst/Dashboard';
import Analyst_task_add from './pages/Analyst/Tasks/Add';
import Analyst_task_view from './pages/Analyst/Tasks/View';
import Analyst_task_report from "./pages/Analyst/Tasks/Report";
import Analyst_task_viewl3 from "./pages/Analyst/Tasks/L3View";
import Analyst_task_l3report from "./pages/Analyst/Tasks/L3Report";
import Analyst_viewmap from "./pages/Analyst/ViewMap/ViewMap";
import Analyst_track_employess from './pages/Analyst/FieldEngineers/TrackEmployees';
import Analyst_view_employess from './pages/Analyst/FieldEngineers/ViewEmployees';
import Analyst_task_prereport from "./pages/Analyst/Tasks/PreReport";
import Analyst_task_postreport from "./pages/Analyst/Tasks/PostReport";


// ANALYST IMPORTS ENDS


// import Posmachines from "./pages/Pos_machines/Pos_machines";
// import Network_report from "./pages/Pos_machines/Network_report";
// import Stores from "./pages/Stores/Stores";
// import AddStores from "./pages/Stores/Add";
// import EditStores from "./pages/Stores/Edit";
// import Store_managers from "./pages/Store_managers/Store_managers";
// import AddManagers from "./pages/Store_managers/Add";
// import EditManager from "./pages/Store_managers/Edit";
// import Map from "./pages/Stores/Map";
// import Settings from "./pages/Settings/Settings";
// import Devices from "./pages/storage_details/Devices";
// import Notification from "./pages/Notification/Notification";
// import Storage_report from "./pages/storage_details/Storage_report";
// import Ipdata from "./pages/IP/Ipdata";

function App() {
  const { user } = useAuthContext()

  const logoutFunction = () => {
    //posting arg1 as an example of whatever you are wanting to do.
    localStorage.setItem('user', "")
    window.location.href="/"

  };

  if(user != "" && user != null){

      //ANALYST LOGIN
      if(user.user_role == process.env.REACT_APP_ANALYST)
      {
          return (
              <div className="App lgin">
                  <BrowserRouter>
                      <div className="pages">
                          <Routes>
                              <Route path="/" element={ user ? <Navigate to="/dashboard" /> : <Login/> } />

                              <Route path="/dashboard" element={ user ? <Analyst_dashboard/> : <Login/> } />
                              <Route path="/tasks/add" element={ user ? <Analyst_task_add/> : <Login/> } />
                              <Route path="/tasks/view" element={ user ? <Analyst_task_view/> : <Login/> } />
                              <Route path="/tasks/report" element={ user ? <Analyst_task_report/> : <Login/> } />
                              <Route path="/tasks/l3tlview" element={ user ? <Analyst_task_viewl3/> : <Login/> } />
                              <Route path="/tasks/l3tlreport" element={ user ? <Analyst_task_l3report/> : <Login/> } />
                              <Route path="/view_map" element={ user ? <Analyst_viewmap/> : <Login/> } />
                              <Route path="/field-engineers/track" element={ user ? <Analyst_track_employess/> : <Login/> } />
                              <Route path="/fieldengineers" element={ user ? <Analyst_view_employess/> : <Login/> } />
                              <Route path="/tasks/report/pre" element={ user ? <Analyst_task_prereport/> : <Login/> } />
                              <Route path="/tasks/report/post" element={ user ? <Analyst_task_postreport/> : <Login/> } />


                          </Routes>
                      </div>
                  </BrowserRouter>
              </div>
          )
      }
      else{
          return (
              <div className="App lgin_no">
                  <BrowserRouter>
                      <div className="pages">
                          <Route path="/" element={ user ? <Navigate to="/" /> : <Login/> } />
                          <Route path="/logout" element={ user ? logoutFunction() : <Login/> } />
   
                      </div>
                  </BrowserRouter>
              </div>
          )
      }

  }
  else{
      return (
          <div className="App lgout">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Navigate to="/" />} />
                        <Route path="/register" element={<Login />} />

                    </Routes>
                </BrowserRouter>
          </div>
      )
  }
  return (
    <div className="App">
      <BrowserRouter>
      {user? 
          //ANALYST
          user.user_role == 3?

              <div className="pages">
                  <Routes>
                      <Route path="/" element={ <Navigate to="/dashboard" /> } />

                      <Route path="/dashboard" element={ <Analyst_dashboard /> } />
                  </Routes>
              </div>
          :
              <div>
              </div>
      :
        <div className="pages">

          <Routes>

            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Login />} />

          </Routes>
        </div>
      }
            

            
            {/* <Route path="/posmachines" element={user ? <Posmachines /> : <Login />} />
            <Route path="/posmachines/report" element={user ? <Network_report /> : <Login />} />
            <Route path="/stores" element={user ? <Stores /> : <Login />} />
            <Route path="/stores/add" element={user ? <AddStores /> : <Login />} />
            <Route path="/stores/edit" element={user ? <EditStores /> : <Login />} />
            <Route path="/stores/map" element={user ? <Map /> : <Login />} />
            <Route path="/store_managers" element={user ? <Store_managers /> : <Login />} />
            <Route path="/store_managers/add" element={user ? <AddManagers /> : <Login />} />
            <Route path="/store_managers/edit" element={user ? <EditManager /> : <Login />} />
            <Route path="/settings" element={user ? <Settings /> : <Login />} />
            <Route path="/storage_details" element={user ? <Devices /> : <Login />} />
            <Route path="/notification" element={user ? <Notification /> : <Login />} />
            <Route path="/storage_details/report" element={user ? <Storage_report /> : <Login />} /> */}
            
      </BrowserRouter>
    </div>
  );
}

export default App;
