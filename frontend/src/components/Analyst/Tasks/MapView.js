import React, { useEffect, useState } from "react"
import { Card, CardBody, Table, CardTitle, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap"
import { isEmpty, map, size } from "lodash"

import { Link, withRouter, useLocation, useNavigate } from "react-router-dom"

// context 
import { useAuthContext } from "../../../hooks/useAuthContext";

// useScript
import useScript from "../../../hooks/useScript";

// Loader
import { Loader } from "@googlemaps/js-api-loader";

const MapView = (props) => {
   
    // const [loaded, error] = useScript(
    //     "https://maps.googleapis.com/maps/api/js?key=AIzaSyCOI8pPNuS93UqaW3TrSwrogFYgthw7rW0&callback=initMap&libraries=geometry,places"
    //   );

    const loader = new Loader({
        apiKey : "AIzaSyCOI8pPNuS93UqaW3TrSwrogFYgthw7rW0",
        version : "weekly",
        libraries : ["places"]
    })

    
    const {user} = useAuthContext()
    const [device_lists, update_device_lists] = useState([]);

    const propsData = useLocation();
    const task_data = propsData.state;
    const test_data = props.data;

    console.log(task_data)
    console.log(test_data)

    useEffect(() => {
       
        if(user)
        {
           
            // getTaskTests();
        }
    },[user]);

    const mapOptions = {
        center: {
            lat:task_data.task_end_latitude,
            lng:task_data.task_end_longitude
        },
        zoom: 17
    }

    // convert to radians
    function toRadians(degrees) {
        return degrees * Math.PI / 180;
    };
      
    // convert to Degrees
    function toDegrees(radians) {
        return radians * 180 / Math.PI;
    }
      
    // Get Orientation
    function get_orientation(startLat, startLng, destLat, destLng){
        startLat = toRadians(startLat);
        startLng = toRadians(startLng);
        destLat = toRadians(destLat);
        destLng = toRadians(destLng);
      
        var y = Math.sin(destLng - startLng) * Math.cos(destLat);
        var x = Math.cos(startLat) * Math.sin(destLat) -
              Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
        var brng = Math.atan2(y, x);
        brng = toDegrees(brng);
        return (brng + 360) % 360;
    }


    if(document.querySelector('#filter-networks')){
       document.querySelector('#filter-networks').addEventListener("change", (event) => {
        var network = parseFloat(event.target.value);

	    var input_lat = parseFloat(document.querySelector('input[name=latitude]').value);
	    var input_long = parseFloat(document.querySelector('input[name=longitude]').value);

	    if(input_lat > 0)
	    {
		    if(network == 0)
	        {
                initMap();
	        }else{
		        // initMaps(network);
	        }
	    }else{
		    alert("Please select place / Enter Latitude & Longitude Manually!")
	    }
       });
    }

    //map load with cell towers
    function initMap() 
    {
       loader.load()
       .then((google)=>{
	    var map_div = document.getElementById("map_view");
	
        var searchfield = document.createElement("input");
	    searchfield.className = "controls form-control";
	    searchfield.setAttribute("id", "searchInput");
	    searchfield.setAttribute("placeholder", "Enter a location");
	    searchfield.style.width = '80%';
	    document.querySelector('#searchgetInput').innerHTML = searchfield;

	    var lattitude = parseFloat(task_data.task_end_latitude);
	    var longitude = parseFloat(task_data.task_end_longitude);
	
	    var input_lat = parseFloat(document.querySelector('input[name=latitude]').value);
	    var input_long = parseFloat(document.querySelector('input[name=longitude]').value);

	    if(input_lat > 0)
	    {
		    lattitude = input_lat;
		    longitude = input_long;
		    searchfield.setAttribute('value',lattitude+','+longitude);
	        searchfield.value = lattitude+','+longitude;
	    }

	
        // marker location
        const myLatLng = { lat: lattitude, lng: longitude };
        const map = new google.maps.Map(document.getElementById("map_view"), {
            zoom: 5,
            center: myLatLng,
        });

        //   new google.maps.Marker({
            //     position: myLatLng,
            //     map,
            //     title: "Customer Location",
        //   });

        //right click context menu for latLng
        var btn = document.createElement("div");
	    btn.className = "contextMenu";
	    btn.setAttribute("id", "contextMenu");
        btn.innerHTML = '<div id="newlatofright"></div>';
        document.body.appendChild(btn);


        let contextMenu = document.getElementById('contextMenu');
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(contextMenu);
        hideContextMenu();

        google.maps.event.addListener(map, "rightclick", function(event) {
            showContextMenu(event);
        });
        google.maps.event.addListener(map, "click", function(event) {
            hideContextMenu();
        });

        var cells = [];//<?= $cells ?>;
        var i = 0; 
 
        // Search field
        var input = document.getElementById('searchInput');
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        var autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var marker = new google.maps.Marker({
            map: map,
            anchorPoint: new google.maps.Point(0, -29)
        });

	    // Has user pressed the down key to navigate autocomplete options?
        let hasDownBeenPressed = false;

        // Listener outside to stop nested loop returning odd results
        searchInput.addEventListener('keydown', (e) => {
            if (e.keyCode === 40) {
                hasDownBeenPressed = true;
            }
        });

        // GoogleMaps API custom eventlistener method
        google.maps.event.addDomListener(searchInput, 'keydown', function(e) 
        {

            // Maps API e.stopPropagation();
            // e.cancelBubble = true;

            // If enter key, or tab key
            if (e.keyCode === 13 || e.keyCode === 9) 
	        {
                // If user isn't navigating using arrows and this hasn't ran yet
                if (e.key === "Enter" && !e.triggered) 
		        {
                    var ex1 = new Event('keydown');
                    ex1.code = "ArrowDown";
                    ex1.key = "ArrowDown";
                    ex1.keyCode = 40;
                    google.maps.event.trigger(this, 'keydown', ex1);

                    var ex2 = new Event('keydown');
                    ex2.code = "Enter";
                    ex2.key = "Enter";
                    ex2.keyCode = 13;
                    ex2.triggered = true;
                    google.maps.event.trigger(this, 'keydown', ex2);
                }
            }
        });

        // Clear the input on focus, reset hasDownBeenPressed
        searchInput.addEventListener('focus', () => {
            hasDownBeenPressed = false;
            // searchInput.value = '';
        });

        // place_changed GoogleMaps listener when we do submit
        google.maps.event.addListener(autocomplete, 'place_changed', function() 
        {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) 
		    {

                // window.alert("Autocomplete's returned place contains no geometry");
			    var latlng = document.querySelector('#searchInput').value.split(',');
		        var lattitude = parseFloat(latlng[0]);
		        var longitude = parseFloat(latlng[1]);

                if(lattitude > 0 && longitude > 0){
		            const myLatLng = { lat: lattitude, lng: longitude };
			        // alert(myLatLng);
                    const map = new google.maps.Map(document.getElementById("map_view"), {
                        zoom: 17,
                        center: myLatLng,
                    });
		            new google.maps.Marker({
                        position: myLatLng,
                        map,
                        title: "Customer Location",
                    });

			
		            var lat2 = lattitude;
	                var lng2 = longitude;

			        document.querySelector('input[name=latitude]').value = lat2;
		            document.querySelector('input[name=longitude]').value = lng2;

		            cells = '';
		            $.get("https://vilkarnataka.telecomone.in/analystsTasks/getnearBycells",
		            {lat:lat2,lng:lng2}, function(data)
		            {
			                cells = JSONparse(data);
			                console.log(cells.length);
			                for(i=0;i<cells.length;i++)
                            {
			                    var lat1 = lattitude;
	                            var lng1 = longitude;
	                            var lat2 = parseFloat(cells[i].lat);
	                            var lng2 = parseFloat(cells[i].lng);
	                            var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat1, lng1), new google.maps.LatLng(lat2, lng2));
                                var segmentname = cells[i].segmentname;
                                var cell_ids = cells[i].site_id;
		                        var enodbs = cells[i].enodb;
				                var celltypt = parseInt(cells[i].type);
                                var orientation = get_orientation(lat1,lng1,lat2,lng2);
			                    var html = '';
                                if(celltypt == 2)
	                            {
		                            html = 'cell ID : '+cells[i].cell_id+' <br> Type : '+cells[i].type+'g<br> Site ID : '+cells[i].site_id+'<br> Site Name : '+cells[i].site_name+'<br> Distance : '+Math.round(distance)+' Meters. <br> Azimuth : '+cells[i].azimuth+' <br>Orientation :'+orientation+'<br><button class="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="'+segmentname+'" data-type="2" style="width:100%;">2G KPI</button><br>';
	                            }

	                            if(celltypt == 3)
	                            {
		                            html = 'cell ID : '+cells[i].cell_id+' <br> Type : '+cells[i].type+'g<br> Site ID : '+cells[i].site_id+'<br> Site Name : '+cells[i].site_name+'<br> Distance : '+Math.round(distance)+' Meters. <br> Azimuth : '+cells[i].azimuth+' <br>Orientation :'+orientation+'<br><button class="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="'+segmentname+'" data-type="3" style="width:100%;">3G KPI</button><br>';
	                            }

	                            if(celltypt == 4)
	                            {
		                            html = 'cell ID : '+cells[i].cell_id+' <br> Type : '+cells[i].type+'g<br> Site ID : '+cells[i].site_id+'<br> Site Name : '+cells[i].site_name+'<br> Cell Name : '+cells[i].segmentname+'<br>  Distance : '+Math.round(distance)+' Meters. <br> Azimuth : '+cells[i].azimuth+' <br>Orientation :'+orientation+'<br><button class="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="'+cells[i].site_name+'" data-cell="'+cells[i].cell_id+'" data-enodb="'+cells[i].enodb+'"  data-type="4" style="width:100%;">4G KPI</button><br>';
	                            }

                                if(cells[i].azimuth=="IBS"){
                                    var rotation = cells[i].azimuth;
				                }
				                else{
					                var rotation = parseFloat(cells[i].azimuth); 
				                }

                                createMarker(lat2,lng2,html,map,segmentname,rotation,parseFloat(cells[i].type),cells[i].site_name,distance,cell_ids,enodbs);;
				
		                    }

                    });

			        //searchfeild create
			        var searchfield = document.createElement("input");
	                searchfield.className = "controls form-control";
	                searchfield.setAttribute("id", "searchInput");
	                searchfield.setAttribute("placeholder", "Enter a location");
	                searchfield.style.width = '80%';
	                document.querySelector('#searchgetInput').innerHTML = searchfield;

			        //right click context menu for latLng
			        var btn = document.createElement("div");
	                btn.className = "contextMenu";
	                btn.setAttribute("id", "contextMenu");
                    btn.innerHTML = '<div id="newlatofright"></div>';
                    document.body.appendChild(btn);


                    let contextMenu = document.getElementById('contextMenu');
                    map.controls[google.maps.ControlPosition.TOP_CENTER].push(contextMenu);
                    hideContextMenu();

                    google.maps.event.addListener(map, "rightclick", function(event) {
                        showContextMenu(event);
                    });
                    google.maps.event.addListener(map, "click", function(event) {
                        hideContextMenu();
                    });


			        searchInputmap(map)


			        map.addListener("zoom_changed", () => {
                        infowindow.setContent("Zoom: " + map.getZoom());
		                    //   animateMapZoomTo(map, map.getZoom());
                            toggleMarkers(map,map.getZoom(),lat2,lng2);

                    });

			        google.maps.event.addListener(map, "center_changed", function(event) {
			            var center = this.getCenter();
				        var latitude = center.lat();
                        var longitude = center.lng();
				        toggleMarkers(map,map.getZoom(),latitude,longitude);

                    });


		        }else
			    {
				    // alert('true');
                    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('searchInput'));

				    const place = autocomplete.getPlace();
	
	                // alert(place.geometry.location.lat());
                    console.log(place);
                    document.querySelector('input[name=latitude]').value = place.geometry.location.lat();
	                document.querySelector('input[name=longitude]').value = place.geometry.location.lng();
				    alert(place.geometry.location.lat());
			    }

			    map_div.addEventListener("mousemove", throttle_events, true);
			
			    ////animateMapZoomTo(map, 17);

                // return;
            }else
		    {
  
                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }
                marker.setIcon(({
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(35, 35)
                }));
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);
    
                var address = '';
                if (place.address_components) {
                    address = [
                        (place.address_components[0] && place.address_components[0].short_name || ''),
                        (place.address_components[1] && place.address_components[1].short_name || ''),
                        (place.address_components[2] && place.address_components[2].short_name || '')
                    ].join(' ');
                }
    
                infowindow.setContent('<div><strong>' + place.name + '</strong><br>' + address);
                infowindow.open(map, marker);
      
                // Location details
                for (var i = 0; i < place.address_components.length; i++) {
                    if(place.address_components[i].types[0] == 'postal_code'){
                        document.getElementById('postal_code').innerHTML = place.address_components[i].long_name;
                    }
                    if(place.address_components[i].types[0] == 'country'){
                        document.getElementById('country').innerHTML = place.address_components[i].long_name;
                    }
                }
                document.getElementById('location').innerHTML = place.formatted_address;
                document.getElementById('lat').innerHTML = place.geometry.location.lat();
                document.getElementById('lon').innerHTML = place.geometry.location.lng();
		        document.querySelector('input[name=latitude]').value = place.geometry.location.lat();
                document.querySelector('input[name=longitude]').value = place.geometry.location.lng();

		        var lat2 = parseFloat(place.geometry.location.lat());
	            var lng2 = parseFloat(place.geometry.location.lng());

		        cells = '';
		        $.get("<?php echo base_url('analystsTasks/getnearBycells');?>",
		            {lat:lat2,lng:lng2}, function(data)
		            {
			            console.log(JSON.parse(data));
			            cells = JSON.parse(data);
			            console.log(cells.length);
			            for(i=0;i<cells.length;i++)
                        {
				            console.log(cells[i].type);
			                var lat1 = parseFloat(place.geometry.location.lat());
	                        var lng1 = parseFloat(place.geometry.location.lng());
	                        var lat2 = parseFloat(cells[i].lat);
	                        var lng2 = parseFloat(cells[i].lng);
	                        var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat1, lng1), new google.maps.LatLng(lat2, lng2));
                            var segmentname = cells[i].segmentname;
					        var cell_ids = cells[i].site_id;
		                    var enodbs = cells[i].enodb;
                            var celltypt = parseInt(cells[i].type);
                            var orientation = get_orientation(lat1,lng1,lat2,lng2);
			                var html = '';
                            if(celltypt == 2)
	                        {
		                        html = 'cell ID : '+cells[i].cell_id+' <br> Type : '+cells[i].type+'g<br> Site ID : '+cells[i].site_id+'<br> Site Name : '+cells[i].site_name+'<br> Distance : '+Math.round(distance)+' Meters. <br> Azimuth : '+cells[i].azimuth+' <br>Orientation :'+orientation+'<br><button class="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="'+segmentname+'" data-type="2" style="width:100%;">2G KPI</button><br>';
	                        }

	                        if(celltypt == 3)
	                        {
		                        html = 'cell ID : '+cells[i].cell_id+' <br> Type : '+cells[i].type+'g<br> Site ID : '+cells[i].site_id+'<br> Site Name : '+cells[i].site_name+'<br> Distance : '+Math.round(distance)+' Meters. <br> Azimuth : '+cells[i].azimuth+' <br>Orientation :'+orientation+'<br><button class="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="'+segmentname+'" data-type="3" style="width:100%;">3G KPI</button><br>';
	                        }

	                        if(celltypt == 4)
	                        {
		                        html = 'cell ID : '+cells[i].cell_id+' <br> Type : '+cells[i].type+'g<br> Site ID : '+cells[i].site_id+'<br> Site Name : '+cells[i].site_name+'<br> Cell Name : '+cells[i].segmentname+'<br>  Distance : '+Math.round(distance)+' Meters. <br> Azimuth : '+cells[i].azimuth+' <br>Orientation :'+orientation+'<br><button class="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="'+cells[i].site_name+'" data-cell="'+cells[i].cell_id+'" data-enodb="'+cells[i].enodb+'"  data-type="4" style="width:100%;">4G KPI</button><br>';
	                        }

                            if(cells[i].azimuth=="IBS"){
                                var rotation = cells[i].azimuth;
				            }
				            else{
					            var rotation = parseFloat(cells[i].azimuth); 
				            }

                            createMarker(lat2,lng2,html,map,segmentname,rotation,parseFloat(cells[i].type),cells[i].site_name,distance,cell_ids,enodbs);;
				
		                }
			            map_div.addEventListener("mousemove", throttle_events, true);
			            ////animateMapZoomTo(map, 17);

                    });
	            }
		        map.addListener("zoom_changed", () => {
                    infowindow.setContent("Zoom: " + map.getZoom());
		            //   animateMapZoomTo(map, map.getZoom());
                    toggleMarkers(map,map.getZoom(),lat2,lng2);

                });

			
		        google.maps.event.addListener(map, "center_changed", function(event) {
			        var center = this.getCenter();
				    var latitude = center.lat();
                    var longitude = center.lng();
				    toggleMarkers(map,map.getZoom(),latitude,longitude);

                });

            });

	        map_div.addEventListener("mousemove", throttle_events, true);
	        map.addListener("zoom_changed", () => {
                infowindow.setContent("Zoom: " + map.getZoom());
		        //   animateMapZoomTo(map, map.getZoom());
                toggleMarkers(map,map.getZoom(),lattitude,longitude);

            });


			
		    google.maps.event.addListener(map, "center_changed", function(event) {
			    var center = this.getCenter();
				var latitude = center.lat();
                var longitude = center.lng();
				toggleMarkers(map,map.getZoom(),latitude,longitude);

            });
        })
	    // animateMapZoomTo(map, 5);

    }


    return (
        <Col lg={12}>
            <div className="row" style={{width:" max-content", margin: "20px auto", display: "flex"}}>
				<div className="column" style={{width:"20px"}}>
					<div className="color-table__color js-color" style={{backgroundColor: "#48D1CC", padding:"10px", borderRadius:"5px"}}></div>
				</div>
				<div className="column" style={{width:"max-content",marginLeft:"5px"}}>
					<div className="color-table__color js-color">&nbsp;4G</div>
				</div>

				<div className="column" style={{width:"20px", marginLeft:"15px"}}>
					<div className="color-table__color js-color" style={{backgroundColor: "#FFD700", padding:"10px", borderRadius:"5px"}}></div>
				</div>
									
                <div className="column" style={{width:"max-content", marginLeft:"5px"}}>
					<div className="color-table__color js-color">&nbsp;3G</div>
				</div>

				<div className="column" style={{width:"20px", marginLeft:"15px"}}>
					<div className="color-table__color js-color" style={{backgroundColor: "#FF0000", padding:"10px", borderRadius:"5px"}}></div>
				</div>
				
                <div className="column" style={{width:"max-content", marginLeft:"5px"}}>
					<div className="color-table__color js-color">&nbsp;2G</div>
				</div>
			</div>

			<div className="row" style={{width: "max-content", marginTop: "-40px", marginBottom:"40px",marginLeft:"40px", display:"flex"}}>
				<div className="column" style={{width:"max-content"}}>
					Filters&nbsp;:&nbsp;
				</div>
				<div className="column" style={{width:"20px"}}>
					<select id="filter-networks" style={{cursor:"pointer"}}>
						<option value="0">All</option>
						<option value="2">2G</option>
						<option value="3">3G</option>
						<option value="4">4G</option>

					</select>
				</div>
									
			</div>

            {/* map view start */}
            <input type="hidden" name="latitude" value={task_data.task_end_latitude}/>

            <input type="hidden" name="longitude" value={task_data.task_end_longitude}/>

			<div id="searchgetInput"></div>
			<div id="map_view" style={{width:"100%", height:"500px"}}></div>
            <ul class="geo-data" style={{display:"none"}}>
                <li>Full Address: <span id="location"></span></li>
                <li>Postal Code: <span id="postal_code"></span></li>
                <li>Country: <span id="country"></span></li>
                <li>Latitude: <span id="lat"></span></li>
                <li>Longitude: <span id="lon"></span></li>
            </ul>
            {/* map view end */}

        </Col>
    )
}

export default MapView


