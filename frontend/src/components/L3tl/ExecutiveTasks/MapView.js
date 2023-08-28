import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    Table,
    CardTitle,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
} from "reactstrap";
import { isEmpty, map, size } from "lodash";

import { Link, withRouter, useLocation, useNavigate } from "react-router-dom";

// css
import "../../../assets/css/style.css";

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
        apiKey: "AIzaSyCOI8pPNuS93UqaW3TrSwrogFYgthw7rW0",
        version: "weekly",
        libraries: ["places"],
    });

    const { user } = useAuthContext();
    const [device_lists, update_device_lists] = useState([]);

    const propsData = useLocation();
    const task_data = propsData.state;
    const test_data = props.data;

    console.log(task_data);
    console.log(test_data);
    var gmarkers = [];
    var allcell1 = [];
    var last = {
        time: new Date(), // last time we let an event pass.
        x: -100, // last x position af the event that passed.
        y: -100,
    }; // last y position af the event that passed.
    var period = 100; // ms - don't let pass more than one event every 100ms.
    var space = 40; // px - let event pass if distance between the last and

    useEffect(() => {
        document.addEventListener("contextmenu", (event) => {
            event.preventDefault();
         });
        if (user) {
            // getTaskTests();
            initMap();
        }
    }, [user]);

    const mapOptions = {
        center: {
            lat: task_data.task_end_latitude,
            lng: task_data.task_end_longitude,
        },
        zoom: 17,
    };

    // convert to radians
    function toRadians(degrees) {
        return (degrees * Math.PI) / 180;
    }

    // convert to Degrees
    function toDegrees(radians) {
        return (radians * 180) / Math.PI;
    }

    // Get Orientation
    function get_orientation(startLat, startLng, destLat, destLng) {
        startLat = toRadians(startLat);
        startLng = toRadians(startLng);
        destLat = toRadians(destLat);
        destLng = toRadians(destLng);

        var y = Math.sin(destLng - startLng) * Math.cos(destLat);
        var x =
            Math.cos(startLat) * Math.sin(destLat) -
            Math.sin(startLat) *
                Math.cos(destLat) *
                Math.cos(destLng - startLng);
        var brng = Math.atan2(y, x);
        brng = toDegrees(brng);
        return (brng + 360) % 360;
    }

    // if (document.querySelector("#filter-networks")) {
    //     document.querySelector("#filter-networks").addEventListener("change", (event) => {
        const networkSelect = (event) => {
                var network = parseFloat(event.target.value);

                var input_lat = parseFloat(
                    document.querySelector("input[name=latitude]").value
                );
                var input_long = parseFloat(
                    document.querySelector("input[name=longitude]").value
                );
                console.log(network)

                if (input_lat > 0) {
                    if (network == 0) {
                        initMap();
                    } else {
                        initMaps(network);
                    }
                } else {
                    alert("Please select place / Enter Latitude & Longitude Manually!");
                }
            }
    //         });
    // }

    // hide context menu
    function hideContextMenu() {
        document.querySelector("#contextMenu").style.display = "none";
    }

    //   right click context menu
    function showContextMenu(event) {
        console.log(event)
        console.log(event.pixel.x)
        console.log(event.pixel.y)

        var contextele = document.querySelector("#contextMenu");
        contextele.style.display = "block";
        contextele.style.left = parseInt(event.pixel.x)+"px";
        contextele.style.marginTop = parseInt(event.pixel.y)+"px";

        var lat = parseFloat(event.latLng.lat()).toFixed(5);
        var lng = parseFloat(event.latLng.lng()).toFixed(5);
        document.querySelector("#newlatofright").innerHTML = lat + "," + lng;

        document.querySelector("input[name=latitude]").value = lat;
        document.querySelector("input[name=longitude]").value = lng;

        document.querySelector("#newlatofright").addEventListener('click', function(){ initMapinput()});
        // alert("Lat=" + lat + "," + lng);
    }

    
    function initMapinput() 
   {
    loader.load().then((google) => {
	var map_div = document.getElementById("map_view");
	
    var searchfield = document.createElement("input");
	searchfield.className = "controls form-control";
	searchfield.setAttribute("id", "searchInput");
	searchfield.setAttribute("placeholder", "Enter a location");
	searchfield.style.width = '80%';
	document.querySelector('#searchgetInput').innerHTML = searchfield.outerHTML;

	var lattitude = task_data.task_end_latitude;
	var longitude = task_data.task_end_longitude;
	
	var input_lat = parseFloat(document.querySelector('input[name=latitude]').value);
	var input_long = parseFloat(document.querySelector('input[name=longitude]').value);
	if(input_lat > 0)
	{
		lattitude = input_lat;
		longitude = input_long;
	}

	searchfield.setAttribute('value',lattitude+','+longitude);
	searchfield.value = lattitude+','+longitude;


    const myLatLng = { lat: lattitude, lng: longitude };
    const map = new google.maps.Map(document.getElementById("map_view"), {
       zoom: 15,
       center: myLatLng,
    });

    new google.maps.Marker({
       position: myLatLng,
       map,
       title: "Customer Location",
    });

    if(document.querySelector('#contextMenu'))
    {
        document.querySelector('#contextMenu').remove();
    }
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


    var cells = [];
    var i = 0; 
    cells = '';
        fetch(
        "https://vilkarnataka.telecomone.in/analystsTasks/getnearBycells",{
            method: "POST",
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
            body: JSON.stringify({ lat:lattitude,lng:longitude })
        }).then(response => response.json())
        .then(data => {
			console.log(JSON.parse(data));
			cells = JSON.parse(data);
			console.log(cells.length);
			for(i=0;i<cells.length;i++)
            {
				
				console.log(cells[i].type);
			    var lat1 = parseFloat(lattitude);
	            var lng1 = parseFloat(longitude);
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

    searchInputmap(map);
    map_div.addEventListener("mousemove", throttle_events, true);
    map.addListener("zoom_changed", () => {
            //   infowindow.setContent("Zoom: " + map.getZoom());
		      //   animateMapZoomTo(map, map.getZoom());
               toggleMarkers(map,map.getZoom(),lattitude,longitude);

            });

			
		    google.maps.event.addListener(map, "center_changed", function(event) {
			    var center = this.getCenter();
				var latitude = center.lat();
                var longitude = center.lng();
				toggleMarkers(map,map.getZoom(),latitude,longitude);

            });
  //////animateMapZoomTo(map, 17);
        })

  }

    //drag lag issue
    function throttle_events(event) {
        var now = new Date();
        var distance = Math.sqrt(
            Math.pow(event.clientX - last.x, 2) +
                Math.pow(event.clientY - last.y, 2)
        );
        var time = now.getTime() - last.time.getTime();
        if (distance * time < space * period) {
            //event arrived too soon or mouse moved too little or both
            // console.log("event stopped");
            if (event.stopPropagation) {
                // W3C/addEventListener()
                event.stopPropagation();
            } else {
                // Older IE.
                event.cancelBubble = true;
            }
        } else {
            // console.log("event allowed: " + now.getTime());
            last.time = now;
            last.x = event.clientX;
            last.y = event.clientY;
        }
    }

    //map load with cell towers
    function initMap() {
        loader.load().then((google) => {
            var map_div = document.getElementById("map_view");

            var searchfield = document.createElement("input");
            searchfield.className = "controls form-control";
            searchfield.setAttribute("id", "searchInput");
            searchfield.setAttribute("placeholder", "Enter a location");
            searchfield.style.width = "80%";
            document.querySelector("#searchgetInput").innerHTML = searchfield.outerHTML;

            var lattitude = parseFloat(task_data.task_end_latitude);
            var longitude = parseFloat(task_data.task_end_longitude);

            var input_lat = parseFloat(
                document.querySelector("input[name=latitude]").value
            );
            var input_long = parseFloat(
                document.querySelector("input[name=longitude]").value
            );

            if (input_lat > 0) {
                lattitude = input_lat;
                longitude = input_long;
                searchfield.setAttribute("value", lattitude + "," + longitude);
                searchfield.value = lattitude + "," + longitude;
            }

            // marker location
            const myLatLng = { lat: lattitude, lng: longitude };
            const map = new google.maps.Map(
                document.getElementById("map_view"),
                {
                    zoom: 5,
                    center: myLatLng,
                }
            );

            //   new google.maps.Marker({
            //     position: myLatLng,
            //     map,
            //     title: "Customer Location",
            //   });

            //right click context menu for latLng
            if(document.querySelector('#contextMenu'))
            {
                document.querySelector('#contextMenu').remove();
            }
            var btn = document.createElement("div");
            btn.className = "contextMenu";
            btn.setAttribute("id", "contextMenu");
            btn.innerHTML = '<div id="newlatofright"></div>';
            document.body.appendChild(btn);

            let contextMenu = document.getElementById("contextMenu");
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(
                contextMenu
            );
            hideContextMenu();

            google.maps.event.addListener(map, "rightclick", function (event) {
                showContextMenu(event);
            });
            google.maps.event.addListener(map, "click", function (event) {
                hideContextMenu();
            });

            var cells = []; //<?= $cells ?>;
            var i = 0;

            // Search field
            var input = document.getElementById("searchInput");
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo("bounds", map);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                map: map,
                anchorPoint: new google.maps.Point(0, -29),
            });

            // Has user pressed the down key to navigate autocomplete options?
            let hasDownBeenPressed = false;

            var searchInput = document.getElementById("searchInput");

            if(searchInput){
                // Listener outside to stop nested loop returning odd results
                searchInput.addEventListener("keydown", (e) => {
                    if (e.keyCode === 40) {
                        hasDownBeenPressed = true;
                    }
                });
            }

            // GoogleMaps API custom eventlistener method
            google.maps.event.addDomListener(
                searchInput,
                "keydown",
                function (e) {
                    // Maps API e.stopPropagation();
                    // e.cancelBubble = true;

                    // If enter key, or tab key
                    if (e.keyCode === 13 || e.keyCode === 9) {
                        // If user isn't navigating using arrows and this hasn't ran yet
                        if (e.key === "Enter" && !e.triggered) {
                            var ex1 = new Event("keydown");
                            ex1.code = "ArrowDown";
                            ex1.key = "ArrowDown";
                            ex1.keyCode = 40;
                            google.maps.event.trigger(this, "keydown", ex1);

                            var ex2 = new Event("keydown");
                            ex2.code = "Enter";
                            ex2.key = "Enter";
                            ex2.keyCode = 13;
                            ex2.triggered = true;
                            google.maps.event.trigger(this, "keydown", ex2);
                        }
                    }
                }
            );

            if(searchInput){

                // Clear the input on focus, reset hasDownBeenPressed
                searchInput.addEventListener("focus", () => {
                    hasDownBeenPressed = false;
                    // searchInput.value = '';
                });
            }

            console.log("[][][]]]][]][]")
            // place_changed GoogleMaps listener when we do submit
            google.maps.event.addListener(
                autocomplete,
                "place_changed",
                function () {
                    infowindow.close();
                    marker.setVisible(false);
                    var place = autocomplete.getPlace();
                    if (!place.geometry) {
                        // window.alert("Autocomplete's returned place contains no geometry");
                        var latlng = document
                            .querySelector("#searchInput")
                            .value.split(",");
                        var lattitude = parseFloat(latlng[0]);
                        var longitude = parseFloat(latlng[1]);

                        if (lattitude > 0 && longitude > 0) {
                            const myLatLng = { lat: lattitude, lng: longitude };
                            // alert(myLatLng);
                            const map = new google.maps.Map(
                                document.getElementById("map_view"),
                                {
                                    zoom: 17,
                                    center: myLatLng,
                                }
                            );
                            new google.maps.Marker({
                                position: myLatLng,
                                map,
                                title: "Customer Location",
                            });

                            var lat2 = lattitude;
                            var lng2 = longitude;

                            document.querySelector("input[name=latitude]").value = lat2;
                            document.querySelector("input[name=longitude]").value = lng2;

                            cells = "";
                            fetch(
                                "https://vilkarnataka.telecomone.in/analystsTasks/getnearBycells",{
                                    method: "POST",
                                    headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
                                    body: JSON.stringify({ lat: lat2, lng: lng2 })
                                }).then(response => response.json())
                                .then(data => {
                                    if (data) {
                                        cells = JSON.parse(data);
                                        console.log(cells.length);
                                        for (i = 0; i < cells.length; i++) {
                                            var lat1 = lattitude;
                                            var lng1 = longitude;
                                            var lat2 = parseFloat(cells[i].lat);
                                            var lng2 = parseFloat(cells[i].lng);
                                            var distance =
                                                google.maps.geometry.spherical.computeDistanceBetween(
                                                    new google.maps.LatLng(
                                                        lat1,
                                                        lng1
                                                    ),
                                                    new google.maps.LatLng(
                                                        lat2,
                                                        lng2
                                                    )
                                                );
                                            var segmentname =
                                                cells[i].segmentname;
                                            var cell_ids = cells[i].site_id;
                                            var enodbs = cells[i].enodb;
                                            var celltypt = parseInt(
                                                cells[i].type
                                            );
                                            var orientation = get_orientation(
                                                lat1,
                                                lng1,
                                                lat2,
                                                lng2
                                            );
                                            var html = "";
                                            if (celltypt == 2) {
                                                html =
                                                    "cell ID : " +
                                                    cells[i].cell_id +
                                                    " <br> Type : " +
                                                    cells[i].type +
                                                    "g<br> Site ID : " +
                                                    cells[i].site_id +
                                                    "<br> Site Name : " +
                                                    cells[i].site_name +
                                                    "<br> Distance : " +
                                                    Math.round(distance) +
                                                    " Meters. <br> Azimuth : " +
                                                    cells[i].azimuth +
                                                    " <br>Orientation :" +
                                                    orientation +
                                                    '<br><button className="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="' +
                                                    segmentname +
                                                    '" data-type="2" style="width:100%;">2G KPI</button><br>';
                                            }

                                            if (celltypt == 3) {
                                                html =
                                                    "cell ID : " +
                                                    cells[i].cell_id +
                                                    " <br> Type : " +
                                                    cells[i].type +
                                                    "g<br> Site ID : " +
                                                    cells[i].site_id +
                                                    "<br> Site Name : " +
                                                    cells[i].site_name +
                                                    "<br> Distance : " +
                                                    Math.round(distance) +
                                                    " Meters. <br> Azimuth : " +
                                                    cells[i].azimuth +
                                                    " <br>Orientation :" +
                                                    orientation +
                                                    '<br><button className="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="' +
                                                    segmentname +
                                                    '" data-type="3" style="width:100%;">3G KPI</button><br>';
                                            }

                                            if (celltypt == 4) {
                                                html =
                                                    "cell ID : " +
                                                    cells[i].cell_id +
                                                    " <br> Type : " +
                                                    cells[i].type +
                                                    "g<br> Site ID : " +
                                                    cells[i].site_id +
                                                    "<br> Site Name : " +
                                                    cells[i].site_name +
                                                    "<br> Cell Name : " +
                                                    cells[i].segmentname +
                                                    "<br>  Distance : " +
                                                    Math.round(distance) +
                                                    " Meters. <br> Azimuth : " +
                                                    cells[i].azimuth +
                                                    " <br>Orientation :" +
                                                    orientation +
                                                    '<br><button className="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="' +
                                                    cells[i].site_name +
                                                    '" data-cell="' +
                                                    cells[i].cell_id +
                                                    '" data-enodb="' +
                                                    cells[i].enodb +
                                                    '"  data-type="4" style="width:100%;">4G KPI</button><br>';
                                            }

                                            if (cells[i].azimuth == "IBS") {
                                                var rotation = cells[i].azimuth;
                                            } else {
                                                var rotation = parseFloat(
                                                    cells[i].azimuth
                                                );
                                            }

                                            createMarker(
                                                lat2,
                                                lng2,
                                                html,
                                                map,
                                                segmentname,
                                                rotation,
                                                parseFloat(cells[i].type),
                                                cells[i].site_name,
                                                distance,
                                                cell_ids,
                                                enodbs
                                            );
                                        }
                                    }
                                }
                            );

                            //searchfeild create
                            var searchfield = document.createElement("input");
                            searchfield.className = "controls form-control";
                            searchfield.setAttribute("id", "searchInput");
                            searchfield.setAttribute(
                                "placeholder",
                                "Enter a location"
                            );
                            searchfield.style.width = "80%";
                            document.querySelector("#searchgetInput").innerHTML = searchfield.outerHTML;

                            if(document.querySelector('#contextMenu'))
                            {
                                document.querySelector('#contextMenu').remove();
                            }
                            //right click context menu for latLng
                            var btn = document.createElement("div");
                            btn.className = "contextMenu";
                            btn.setAttribute("id", "contextMenu");
                            btn.innerHTML = '<div id="newlatofright"></div>';
                            document.body.appendChild(btn);

                            let contextMenu =
                                document.getElementById("contextMenu");
                            map.controls[
                                google.maps.ControlPosition.TOP_CENTER
                            ].push(contextMenu);
                            hideContextMenu();

                            google.maps.event.addListener(
                                map,
                                "rightclick",
                                function (event) {
                                    showContextMenu(event);
                                }
                            );
                            google.maps.event.addListener(
                                map,
                                "click",
                                function (event) {
                                    hideContextMenu();
                                }
                            );

                            searchInputmap(map);

                            map.addListener("zoom_changed", () => {
                                infowindow.setContent("Zoom: " + map.getZoom());
                                //   animateMapZoomTo(map, map.getZoom());
                                toggleMarkers(map, map.getZoom(), lat2, lng2);
                            });

                            google.maps.event.addListener(
                                map,
                                "center_changed",
                                function (event) {
                                    var center = this.getCenter();
                                    var latitude = center.lat();
                                    var longitude = center.lng();
                                    toggleMarkers(
                                        map,
                                        map.getZoom(),
                                        latitude,
                                        longitude
                                    );
                                }
                            );
                        } else {
                            // alert('true');
                            const autocomplete =
                                new google.maps.places.Autocomplete(
                                    document.getElementById("searchInput")
                                );

                            const place = autocomplete.getPlace();

                            // alert(place.geometry.location.lat());
                            console.log(place);
                            document.querySelector("input[name=latitude]").value = place.geometry.location.lat();
                            document.querySelector("input[name=longitude]").value = place.geometry.location.lng();
                            alert(place.geometry.location.lat());
                        }

                        map_div.addEventListener(
                            "mousemove",
                            throttle_events,
                            true
                        );

                        ////animateMapZoomTo(map, 17);

                        // return;
                    } else {
                        // If the place has a geometry, then present it on a map.
                        if (place.geometry.viewport) {
                            map.fitBounds(place.geometry.viewport);
                        } else {
                            map.setCenter(place.geometry.location);
                            map.setZoom(17);
                        }
                        marker.setIcon({
                            url: place.icon,
                            size: new google.maps.Size(71, 71),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(17, 34),
                            scaledSize: new google.maps.Size(35, 35),
                        });
                        marker.setPosition(place.geometry.location);
                        marker.setVisible(true);

                        var address = "";
                        if (place.address_components) {
                            address = [
                                (place.address_components[0] &&
                                    place.address_components[0].short_name) ||
                                    "",
                                (place.address_components[1] &&
                                    place.address_components[1].short_name) ||
                                    "",
                                (place.address_components[2] &&
                                    place.address_components[2].short_name) ||
                                    "",
                            ].join(" ");
                        }

                        infowindow.setContent(
                            "<div><strong>" +
                                place.name +
                                "</strong><br>" +
                                address
                        );
                        infowindow.open(map, marker);

                        // Location details
                        for (
                            var i = 0;
                            i < place.address_components.length;
                            i++
                        ) {
                            if (
                                place.address_components[i].types[0] ==
                                "postal_code"
                            ) {
                                document.getElementById(
                                    "postal_code"
                                ).innerHTML =
                                    place.address_components[i].long_name;
                            }
                            if (
                                place.address_components[i].types[0] ==
                                "country"
                            ) {
                                document.getElementById("country").innerHTML =
                                    place.address_components[i].long_name;
                            }
                        }
                        document.getElementById("location").innerHTML =
                            place.formatted_address;
                        document.getElementById("lat").innerHTML =
                            place.geometry.location.lat();
                        document.getElementById("lon").innerHTML =
                            place.geometry.location.lng();
                        document.querySelector("input[name=latitude]").value =
                            place.geometry.location.lat();
                        document.querySelector("input[name=longitude]").value =
                            place.geometry.location.lng();

                        var lat2 = parseFloat(place.geometry.location.lat());
                        var lng2 = parseFloat(place.geometry.location.lng());

                        cells = "";
                        fetch(
                            "https://vilkarnataka.telecomone.in/analystsTasks/getnearBycells",{
                                method: "POST",
                                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
                                body: JSON.stringify({ lat: lat2, lng: lng2 })
                            }).then(response => response.json())
                            .then(data => {
                                
                                console.log(JSON.parse(data));
                                cells = JSON.parse(data);
                                console.log(cells.length);
                                for (i = 0; i < cells.length; i++) {
                                    console.log(cells[i].type);
                                    var lat1 = parseFloat(
                                        place.geometry.location.lat()
                                    );
                                    var lng1 = parseFloat(
                                        place.geometry.location.lng()
                                    );
                                    var lat2 = parseFloat(cells[i].lat);
                                    var lng2 = parseFloat(cells[i].lng);
                                    var distance =
                                        google.maps.geometry.spherical.computeDistanceBetween(
                                            new google.maps.LatLng(lat1, lng1),
                                            new google.maps.LatLng(lat2, lng2)
                                        );
                                    var segmentname = cells[i].segmentname;
                                    var cell_ids = cells[i].site_id;
                                    var enodbs = cells[i].enodb;
                                    var celltypt = parseInt(cells[i].type);
                                    var orientation = get_orientation(
                                        lat1,
                                        lng1,
                                        lat2,
                                        lng2
                                    );
                                    var html = "";
                                    if (celltypt == 2) {
                                        html =
                                            "cell ID : " +
                                            cells[i].cell_id +
                                            " <br> Type : " +
                                            cells[i].type +
                                            "g<br> Site ID : " +
                                            cells[i].site_id +
                                            "<br> Site Name : " +
                                            cells[i].site_name +
                                            "<br> Distance : " +
                                            Math.round(distance) +
                                            " Meters. <br> Azimuth : " +
                                            cells[i].azimuth +
                                            " <br>Orientation :" +
                                            orientation +
                                            '<br><button className="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="' +
                                            segmentname +
                                            '" data-type="2" style="width:100%;">2G KPI</button><br>';
                                    }

                                    if (celltypt == 3) {
                                        html =
                                            "cell ID : " +
                                            cells[i].cell_id +
                                            " <br> Type : " +
                                            cells[i].type +
                                            "g<br> Site ID : " +
                                            cells[i].site_id +
                                            "<br> Site Name : " +
                                            cells[i].site_name +
                                            "<br> Distance : " +
                                            Math.round(distance) +
                                            " Meters. <br> Azimuth : " +
                                            cells[i].azimuth +
                                            " <br>Orientation :" +
                                            orientation +
                                            '<br><button className="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="' +
                                            segmentname +
                                            '" data-type="3" style="width:100%;">3G KPI</button><br>';
                                    }

                                    if (celltypt == 4) {
                                        html =
                                            "cell ID : " +
                                            cells[i].cell_id +
                                            " <br> Type : " +
                                            cells[i].type +
                                            "g<br> Site ID : " +
                                            cells[i].site_id +
                                            "<br> Site Name : " +
                                            cells[i].site_name +
                                            "<br> Cell Name : " +
                                            cells[i].segmentname +
                                            "<br>  Distance : " +
                                            Math.round(distance) +
                                            " Meters. <br> Azimuth : " +
                                            cells[i].azimuth +
                                            " <br>Orientation :" +
                                            orientation +
                                            '<br><button className="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="' +
                                            cells[i].site_name +
                                            '" data-cell="' +
                                            cells[i].cell_id +
                                            '" data-enodb="' +
                                            cells[i].enodb +
                                            '"  data-type="4" style="width:100%;">4G KPI</button><br>';
                                    }

                                    if (cells[i].azimuth == "IBS") {
                                        var rotation = cells[i].azimuth;
                                    } else {
                                        var rotation = parseFloat(
                                            cells[i].azimuth
                                        );
                                    }

                                    createMarker(
                                        lat2,
                                        lng2,
                                        html,
                                        map,
                                        segmentname,
                                        rotation,
                                        parseFloat(cells[i].type),
                                        cells[i].site_name,
                                        distance,
                                        cell_ids,
                                        enodbs
                                    );
                                }
                                map_div.addEventListener(
                                    "mousemove",
                                    throttle_events,
                                    true
                                );
                                ////animateMapZoomTo(map, 17);
                            }
                        );
                    }
                    map.addListener("zoom_changed", () => {
                        infowindow.setContent("Zoom: " + map.getZoom());
                        //   animateMapZoomTo(map, map.getZoom());
                        toggleMarkers(map, map.getZoom(), lat2, lng2);
                    });

                    google.maps.event.addListener(
                        map,
                        "center_changed",
                        function (event) {
                            var center = this.getCenter();
                            var latitude = center.lat();
                            var longitude = center.lng();
                            toggleMarkers(
                                map,
                                map.getZoom(),
                                latitude,
                                longitude
                            );
                        }
                    );
                }
            );

            map_div.addEventListener("mousemove", throttle_events, true);
            map.addListener("zoom_changed", () => {
                infowindow.setContent("Zoom: " + map.getZoom());
                //   animateMapZoomTo(map, map.getZoom());
                toggleMarkers(map, map.getZoom(), lattitude, longitude);
            });

            google.maps.event.addListener(
                map,
                "center_changed",
                function (event) {
                    var center = this.getCenter();
                    var latitude = center.lat();
                    var longitude = center.lng();
                    toggleMarkers(map, map.getZoom(), latitude, longitude);
                }
            );
        });
        // animateMapZoomTo(map, 5);
    }

    // cell towers loop
    function createMarker(
        lat,
        lon,
        html,
        map,
        segmentname,
        rotation,
        type,
        sitename,
        distance,
        cell_ids,
        enodbs
    ) {
        loader.load().then((google) => {
            var image =
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAA7AAAAOwBeShxvQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAUQSURBVFiFtZdtiJRVFMd/5z7PzOzu6LqzuouumVhkkqEUlvSyIFoZippBfajA1vKlTCl1NSNxRDPLyi/hW760RgUblBFFQQV9kD6kEKFCqGgq68u+DauzOzPPPPf04ZmJdddZZ0wPDNy559z/+T3nnvtcHihgcVX3k6x+v9vTaYVirmeNZ3rqV51JffuMqlMoxhRy1Pk0ADNUWHujAIJsBGaPOZd6sWQAEV4DwLICYFdWn9+nWpb3b99/uXbbp4mFb7/b9ln8g7Zx+fn4KS1bfTb9XCBuVgKgsrQkgD2qdSgTEI4sCMvhXWkdL7A/69MM8HFT11hs9qio7uxMZF/o6PCPrn+v/XGApJNuVtX9q/9Jj998e/gPgWPAhLdOJ0cUDWCzjA3IOQwgLtMAo8JBAFf9tSjD8vG+r6Y7nd0BICoHAccanRoUUA4B4htzV9EAKpTnht0BUZDMKC0Aqtzed41vpTqH3xKAaE1OLQmASLRoAMfSmhvelgM6BqAwPTf/c981EVcO5YbTg1hzNMgbwFrfXCwaYHCIvwievv4j1fKQwwFRjgv8CuBdrnof1WbQID7qnKmL6VwAMeYH4HjUDX8Xb9EKlEeBZDQZOlI0wLMiGeAboGqwZVGDSKrLZeLLruwFWLZM0mrMLyAYAcfltyVLaq8AvDcq8oUnkYnxOunuyaYXA0MQ+To+XjJFAwCIz2YgI8oTAMtFeq7yW54CsAqZjH2yt2/rqCBW4TEg41s2F8pTEODliBxRZabvMKevb8+e1sGITgXajUF7UlrzztbWfscscSkyxyozPxwdOVYoj1vIAbAwJP2aDcCT0AzQCPBlebmpTybtnak0q4A3esftmiQe12jY3lawAgOZSlB+UQ5EXL4CSKft3BvRklIX7NypIQ0nLimETaan5nzSL2trDbUL6LjbTGW+GYu1kiug4Y5pClUoPy1aVNcdXz6qo6JMzluLXLhslpWqN2APXBMAeQoAYcr2fZ0n/z7hjepJqQvgZfzngU2l6JVUgXhcDcjs3N8YcIeXtSFrVQC6U4yLx7WkhyoJYPiYjsnACODXnuiVCqAJQARcR3zfV2OjbQ23DAArwesWPVyeHPQbMM91xY8NcRZEo/ItQCbFS7cMwCJzABRZDjwA/BKLOfduWFOzu6LM2SIC6bR/XymaRR/DHXvb71EJbjgAVH4HWd9yyZuYn+rq8jdlfXVqhzmz1zXWfFeMbtENo0bm5i6/wEQfAv2xozPbLzadsUuBmwuA5sqv7DdoKj8dck2Dl7WhqwBSPFysbFE9sL2pbSQwCeHEq/Nj8xbPr17ko00qMjafPBKWZHXMbAyHyKQ9ja7dcmHyTQMQ6zwNCFa/3tbUMWHHvs5mI+YgMCUcknSsSrZWOrWVG96sXVsecf5UBeuZFcVoF7UFSv5KNrPEaqMGzXtcVNcNcWu/iq+R/xrBhNgLPJjOFPdBc91TsO3zREwyehHovc8dwAFRzZ46l63vs8Qku+3dAFVDuWNj4/BTA+lftwLG01l6dXKAamC+inAlaQsv9pzVwOL/BWCVOQIIrLAqf/X1V8fc+/vOqa+PdHb5szOenXU9gAG34KPms+VlyUGtAraMRG1Dw5jUQPF5i8fbK9tTXgKQocNsTXxlXVtBgBmvvH66kNOIG4mEosN99ZIZr/uaIomzJ0deW9nkqqsW1YL75IKOLuS06tGTSQBEc7/+MX7/N2EfMwxw3P8FEvoIdvbsz5YAAAAASUVORK5CYII=";
            //  path: "M150 0 L75 200 L225 200 Z",M0 0 L30 55 L55 30 Z

            //4         path: "M0 0 L50 95 L95 50 Z",
            //         fillColor: '#48D1CC',
            //         fillOpacity: 1,
            //         anchor: new google.maps.Point(0, 0),
            //         strokeWeight: 0,
            //         scale: .5,
            //         rotation: rotation

            //3        path: "M0 0 L35 65 L65 35 Z",
            //         fillColor: '#FFD700',
            //         fillOpacity: 1,
            //         anchor: new google.maps.Point(0, 0),
            //         strokeWeight: 0,
            //         scale: .5,
            //         rotation: rotation

            // 2       path: "M0 0 L20 35 L35 20 Z",
            //         fillColor: '#FF0000',
            //         fillOpacity: 1,
            //         anchor: new google.maps.Point(0, 0),
            //         strokeWeight: 0,
            //         scale: .5,
            //         rotation: rotation

            // path: "M0,0 v-40 z",
            // strokeWeight: 1,
            // rotation: rotation

            var ricon = {
                url: "https://vilkarnataka.telecomone.in/assets/images/twog.png", // url
                scaledSize: new google.maps.Size(30, 50),
                anchor: new google.maps.Point(0, 20), // scaled size
                // origin: new google.maps.Point(0,0), // origin
                // anchor: new google.maps.Point(0, 0) // anchor
            };
            var symbol = "";
            var labels = "";
            var textdata = cell_ids + "-" + enodbs;
            if (allcell1.includes(textdata)) {
                labels = "";
            } else {
                labels = {
                    color: "#1a237e",
                    fontWeight: "bold",
                    fontSize: "12px",
                    text: textdata,
                };
            }

            allcell1.push(textdata);
            if (type == 4 && rotation != "IBS") {
                symbol = {
                    path: "M-1.547 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                    fillColor: "#48D1CC",
                    fillOpacity: 1,
                    anchor: new google.maps.Point(0, 20),
                    strokeWeight: 0,
                    scale: 1.5,
                    rotation: rotation,
                };
                var newmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lon),
                    title: type + "G",
                    map,
                    label: labels,
                    icon: symbol,
                });
            }
            if (type == 4 && rotation == "IBS") {
                var newmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lon),
                    title: type + "G",
                    map,
                    label: labels,
                    icon: ricon,
                });
            }
            if (type == 3 && rotation != "IBS") {
                symbol = {
                    path: "M-1.547 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                    fillColor: "#FFD700",
                    fillOpacity: 1,
                    anchor: new google.maps.Point(0, 20),
                    strokeWeight: 0,
                    scale: 1,
                    rotation: rotation,
                };
                var newmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lon),
                    title: type + "G",
                    map,
                    icon: symbol,
                });
            }
            if (type == 3 && rotation == "IBS") {
                var newmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lon),
                    title: type + "G",
                    map,
                    icon: ricon,
                });
            }
            if (type == 2 && rotation != "IBS") {
                symbol = {
                    path: "M-1.547 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                    fillColor: "#FF0000",
                    fillOpacity: 1,
                    anchor: new google.maps.Point(0, 20),
                    strokeWeight: 0,
                    scale: 0.5,
                    rotation: rotation,
                };
                var newmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lon),
                    title: type + "G",
                    map,
                    icon: symbol,
                });
            }
            if (type == 2 && rotation == "IBS") {
                var newmarker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lon),
                    title: type + "G",
                    map,
                    icon: ricon,
                });
            }

            gmarkers.push(newmarker);

            newmarker["infowindow"] = new google.maps.InfoWindow({
                content: html,
                // content: "test"
            });
            // newmarker['infowindow'].open(map);

            google.maps.event.addListener(newmarker, "click", function () {
                this["infowindow"].open(map, this);
                document.querySelector("input[name=customer_distance]").value = Math.round(distance);

                document.querySelector("input[name=fl_suspected_kl_id]").value = sitename;
            });
        });
    }

    // drag & zoom display markers
    function toggleMarkers(map, zoom, lat, lng) {
        loader.load().then((google) => {
            // var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < gmarkers.length; i++) {
                gmarkers[i].setMap(null);
            }
            for (var i = 0; i < gmarkers.length; i++) {
                // if (gmarkers[i].getMap() != null)
                // {
                //     gmarkers[i].setMap(null);
                // }
                // else{
                var distance = Math.round(
                    google.maps.geometry.spherical.computeDistanceBetween(
                        new google.maps.LatLng(lat, lng),
                        gmarkers[i].getPosition()
                    )
                );
                if (zoom >= 17) {
                    if (distance < 1000) {
                        gmarkers[i].setMap(map);
                    }
                }

                if (zoom == 16) {
                    if (distance < 1500) {
                        gmarkers[i].setMap(map);
                    }
                }

                if (zoom == 15) {
                    if (distance < 2000) {
                        gmarkers[i].setMap(map);
                    }
                }

                if (zoom == 14) {
                    if (distance < 2600) {
                        gmarkers[i].setMap(map);
                    }
                }

                if (zoom <= 13) {
                    if (distance < 3600) {
                        gmarkers[i].setMap(map);
                    }
                }
                // gmarkers[i].setMap(map);
                // bounds.extend(gmarkers[i].getPosition());
                // console.log(gmarkers[i].getPosition());

                // }
            }
        });
        // map.fitBounds(bounds);
    }

    function searchInputmap(map) {
        loader.load().then((google) => {
            var map_div = document.getElementById("map_view");

            var input = document.getElementById("searchInput");
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo("bounds", map);

            var infowindow = new google.maps.InfoWindow();
            var marker = new google.maps.Marker({
                map: map,
                anchorPoint: new google.maps.Point(0, -29),
            });

            autocomplete.addListener("place_changed", function () {
                infowindow.close();
                marker.setVisible(false);
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    // window.alert("Autocomplete's returned place contains no geometry");
                    // window.alert("Autocomplete's returned place contains no geometry");
                    var latlng = document
                        .querySelector("#searchInput")
                        .value.split(",");
                    var lattitude = parseFloat(latlng[0]);
                    var longitude = parseFloat(latlng[1]);

                    if (lattitude > 0 && longitude > 0) {
                        const myLatLng = { lat: lattitude, lng: longitude };
                        // alert(myLatLng);
                        const map = new google.maps.Map(
                            document.getElementById("map_view"),
                            {
                                zoom: 17,
                                center: myLatLng,
                            }
                        );
                        new google.maps.Marker({
                            position: myLatLng,
                            map,
                            title: "Customer Location",
                        });

                        var lat2 = lattitude;
                        var lng2 = longitude;

                        document.querySelector("input[name=latitude]").value =
                            lat2;
                        document.querySelector("input[name=longitude]").value =
                            lng2;

                        var cells = "";

                        fetch(
                            "https://vilkarnataka.telecomone.in/analystsTasks/getnearBycells",{
                                method: "POST",
                                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
                                body: JSON.stringify({ lat: lat2, lng: lng2 })
                            }).then(response => response.json())
                            .then(data => {
                        
                                console.log(JSON.parse(data));
                                cells = JSON.parse(data);
                                console.log(cells.length);
                                for (i = 0; i < cells.length; i++) {
                                    console.log(cells[i].type);
                                    var lat1 = lattitude;
                                    var lng1 = longitude;
                                    var lat2 = parseFloat(cells[i].lat);
                                    var lng2 = parseFloat(cells[i].lng);
                                    var distance =
                                        google.maps.geometry.spherical.computeDistanceBetween(
                                            new google.maps.LatLng(lat1, lng1),
                                            new google.maps.LatLng(lat2, lng2)
                                        );
                                    var segmentname = cells[i].segmentname;
                                    var cell_ids = cells[i].site_id;
                                    var enodbs = cells[i].enodb;
                                    var orientation = get_orientation(
                                        lat1,
                                        lng1,
                                        lat2,
                                        lng2
                                    );
                                    var celltypt = parseInt(cells[i].type);

                                    var html = "";
                                    if (celltypt == 2) {
                                        html =
                                            "cell ID : " +
                                            cells[i].cell_id +
                                            " <br> Type : " +
                                            cells[i].type +
                                            "g<br> Site ID : " +
                                            cells[i].site_id +
                                            "<br> Site Name : " +
                                            cells[i].site_name +
                                            "<br> Distance : " +
                                            Math.round(distance) +
                                            " Meters. <br> Azimuth : " +
                                            cells[i].azimuth +
                                            " <br>Orientation :" +
                                            orientation +
                                            '<br><button className="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="' +
                                            segmentname +
                                            '" data-type="2" style="width:100%;">2G KPI</button><br>';
                                    }

                                    if (celltypt == 3) {
                                        html =
                                            "cell ID : " +
                                            cells[i].cell_id +
                                            " <br> Type : " +
                                            cells[i].type +
                                            "g<br> Site ID : " +
                                            cells[i].site_id +
                                            "<br> Site Name : " +
                                            cells[i].site_name +
                                            "<br> Distance : " +
                                            Math.round(distance) +
                                            " Meters. <br> Azimuth : " +
                                            cells[i].azimuth +
                                            " <br>Orientation :" +
                                            orientation +
                                            '<br><button className="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="' +
                                            segmentname +
                                            '" data-type="3" style="width:100%;">3G KPI</button><br>';
                                    }

                                    if (celltypt == 4) {
                                        html =
                                            "cell ID : " +
                                            cells[i].cell_id +
                                            " <br> Type : " +
                                            cells[i].type +
                                            "g<br> Site ID : " +
                                            cells[i].site_id +
                                            "<br> Site Name : " +
                                            cells[i].site_name +
                                            "<br> Cell Name : " +
                                            cells[i].segmentname +
                                            "<br>  Distance : " +
                                            Math.round(distance) +
                                            " Meters. <br> Azimuth : " +
                                            cells[i].azimuth +
                                            " <br>Orientation :" +
                                            orientation +
                                            '<br><button className="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="' +
                                            cells[i].site_name +
                                            '" data-cell="' +
                                            cells[i].cell_id +
                                            '" data-enodb="' +
                                            cells[i].enodb +
                                            '"  data-type="4" style="width:100%;">4G KPI</button><br>';
                                    }

                                    if (cells[i].azimuth == "IBS") {
                                        var rotation = cells[i].azimuth;
                                    } else {
                                        var rotation = parseFloat(
                                            cells[i].azimuth
                                        );
                                    }

                                    createMarker(
                                        lat2,
                                        lng2,
                                        html,
                                        map,
                                        segmentname,
                                        rotation,
                                        parseFloat(cells[i].type),
                                        cells[i].site_name,
                                        distance,
                                        cell_ids,
                                        enodbs
                                    );
                                }
                            }
                        );
                    }
                    map_div.addEventListener(
                        "mousemove",
                        throttle_events,
                        true
                    );

                    return;
                }

                // If the place has a geometry, then present it on a map.
                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }
                marker.setIcon({
                    url: place.icon,
                    size: new google.maps.Size(71, 71),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(17, 34),
                    scaledSize: new google.maps.Size(35, 35),
                });
                marker.setPosition(place.geometry.location);
                marker.setVisible(true);

                var address = "";
                if (place.address_components) {
                    address = [
                        (place.address_components[0] &&
                            place.address_components[0].short_name) ||
                            "",
                        (place.address_components[1] &&
                            place.address_components[1].short_name) ||
                            "",
                        (place.address_components[2] &&
                            place.address_components[2].short_name) ||
                            "",
                    ].join(" ");
                }

                infowindow.setContent(
                    "<div><strong>" + place.name + "</strong><br>" + address
                );
                infowindow.open(map, marker);

                // Location details
                for (var i = 0; i < place.address_components.length; i++) {
                    if (place.address_components[i].types[0] == "postal_code") {
                        document.getElementById("postal_code").innerHTML =
                            place.address_components[i].long_name;
                    }
                    if (place.address_components[i].types[0] == "country") {
                        document.getElementById("country").innerHTML =
                            place.address_components[i].long_name;
                    }
                }
                document.getElementById("location").innerHTML = place.formatted_address;
                document.getElementById("lat").innerHTML = place.geometry.location.lat();
                document.getElementById("lon").innerHTML = place.geometry.location.lng();
                document.querySelector("input[name=latitude]").value = place.geometry.location.lat();
                document.querySelector("input[name=longitude]").value = place.geometry.location.lng();

                var lat2 = parseFloat(place.geometry.location.lat());
                var lng2 = parseFloat(place.geometry.location.lng());

                fetch(
                    "https://vilkarnataka.telecomone.in/analystsTasks/getnearBycells",{
                        method: "POST",
                        headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
                        body: JSON.stringify({ lat: lat2, lng: lng2 })
                    }).then(response => response.json())
                    .then(data => {
                
                        console.log(JSON.parse(data));
                        cells = JSON.parse(data);
                        console.log(cells.length);
                        for (i = 0; i < cells.length; i++) {
                            console.log(cells[i].type);
                            var lat1 = lattitude;
                            var lng1 = longitude;
                            var lat2 = parseFloat(cells[i].lat);
                            var lng2 = parseFloat(cells[i].lng);
                            var distance =
                                google.maps.geometry.spherical.computeDistanceBetween(
                                    new google.maps.LatLng(lat1, lng1),
                                    new google.maps.LatLng(lat2, lng2)
                                );
                            var segmentname = cells[i].segmentname;
                            var cell_ids = cells[i].site_id;
                            var enodbs = cells[i].enodb;
                            var celltypt = parseInt(cells[i].type);
                            var orientation = get_orientation(
                                lat1,
                                lng1,
                                lat2,
                                lng2
                            );

                            var html = "";
                            if (celltypt == 2) {
                                html =
                                    "cell ID : " +
                                    cells[i].cell_id +
                                    " <br> Type : " +
                                    cells[i].type +
                                    "g<br> Site ID : " +
                                    cells[i].site_id +
                                    "<br> Site Name : " +
                                    cells[i].site_name +
                                    "<br> Distance : " +
                                    Math.round(distance) +
                                    " Meters. <br> Azimuth : " +
                                    cells[i].azimuth +
                                    " <br>Orientation :" +
                                    orientation +
                                    '<br><button className="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="' +
                                    segmentname +
                                    '" data-type="2" style="width:100%;">2G KPI</button><br>';
                            }

                            if (celltypt == 3) {
                                html =
                                    "cell ID : " +
                                    cells[i].cell_id +
                                    " <br> Type : " +
                                    cells[i].type +
                                    "g<br> Site ID : " +
                                    cells[i].site_id +
                                    "<br> Site Name : " +
                                    cells[i].site_name +
                                    "<br> Distance : " +
                                    Math.round(distance) +
                                    " Meters. <br> Azimuth : " +
                                    cells[i].azimuth +
                                    " <br>Orientation :" +
                                    orientation +
                                    '<br><button className="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="' +
                                    segmentname +
                                    '" data-type="3" style="width:100%;">3G KPI</button><br>';
                            }

                            if (celltypt == 4) {
                                html =
                                    "cell ID : " +
                                    cells[i].cell_id +
                                    " <br> Type : " +
                                    cells[i].type +
                                    "g<br> Site ID : " +
                                    cells[i].site_id +
                                    "<br> Site Name : " +
                                    cells[i].site_name +
                                    "<br> Cell Name : " +
                                    cells[i].segmentname +
                                    "<br>  Distance : " +
                                    Math.round(distance) +
                                    " Meters. <br> Azimuth : " +
                                    cells[i].azimuth +
                                    " <br>Orientation :" +
                                    orientation +
                                    '<br><button className="btn btn-primary" id="kpibut" onclick="getKpi(this)" data-kpi="' +
                                    cells[i].site_name +
                                    '" data-cell="' +
                                    cells[i].cell_id +
                                    '" data-enodb="' +
                                    cells[i].enodb +
                                    '"  data-type="4" style="width:100%;">4G KPI</button><br>';
                            }

                            if (cells[i].azimuth == "IBS") {
                                var rotation = cells[i].azimuth;
                            } else {
                                var rotation = parseFloat(cells[i].azimuth);
                            }

                            createMarker(
                                lat2,
                                lng2,
                                html,
                                map,
                                segmentname,
                                rotation,
                                parseFloat(cells[i].type),
                                cells[i].site_name,
                                distance,
                                cell_ids,
                                enodbs
                            );
                        }
                    }
                );
                map_div.addEventListener("mousemove", throttle_events, true);
            });
        });
    }

    // init maps
    // filters apply for map
   function initMaps(celltype) 
  {
    loader.load().then((google) => {

	var map_div = document.getElementById("map_view");

	var lat2 = task_data.task_end_latitude;
	var lng2 = task_data.task_end_longitude;
	
	var input_lat = parseFloat(document.querySelector('input[name=latitude]').value);
	var input_long = parseFloat(document.querySelector('input[name=longitude]').value);

	if(input_lat > 0)
	{
		lat2 = input_lat;
		lng2 = input_long;
	}

	// search field
    var searchfield = document.createElement("input");
	searchfield.className = "controls form-control";
	searchfield.setAttribute("id", "searchInput");
	searchfield.setAttribute("placeholder", "Enter a location");
	searchfield.style.width = '80%';
	searchfield.setAttribute('value',lat2+','+lng2);
	searchfield.value = lat2+','+lng2;

	document.querySelector('#searchgetInput').innerHTML = searchfield.outerHTML;

    const myLatLng = { lat: lat2, lng: lng2 };
    const map = new google.maps.Map(document.getElementById("map_view"), {
       zoom: 17,
       center: myLatLng,
    });

  
    // marker location 
    new google.maps.Marker({
       position: myLatLng,
       map,
       title: "Customer Location",
    });
    // Search field
    var input = document.getElementById("searchInput");
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // context menu
    let contextMenu = document.getElementById('contextMenu');
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(contextMenu);

    
    hideContextMenu();

    google.maps.event.addListener(map, "rightclick", function(event) {
       showContextMenu(event);
    });
    google.maps.event.addListener(map, "click", function(event) {
       hideContextMenu();
    });


    var cells = []
    var i = 0; 
 
    cells = '';
    fetch(
        "https://vilkarnataka.telecomone.in/analystsTasks/getnearBycells",{
            method: "POST",
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${user.token}` },
            body: JSON.stringify({ lat: lat2, lng: lng2 })
        }).then(response => response.json())
        .then(data => {

			console.log(JSON.parse(data));
			cells = JSON.parse(data);
			console.log(cells.length);
			for(i=0;i<cells.length;i++)
            {
				if(cells[i].type == celltype)
				{
				console.log(cells[i].type);
			    var lat1 = parseFloat(lat2);
	            var lng1 = parseFloat(lng2);
	            var lat2 = parseFloat(cells[i].lat);
	            var lng2 = parseFloat(cells[i].lng);
	            var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat1, lng1), new google.maps.LatLng(lat2, lng2));
				var orientation = get_orientation(lat1,lng1,lat2,lng2);
                var segmentname = cells[i].segmentname;
				var cell_ids = cells[i].site_id;
				var enodbs = cells[i].enodb;

				var celltypt = parseInt(cells[i].type);

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

                createMarker(lat2,lng2,html,map,segmentname,rotation,parseFloat(cells[i].type),cells[i].site_name,distance,cell_ids,enodbs);
			    }
				
		    }

        });
		map_div.addEventListener("mousemove", throttle_events, true);

    // get search field
    searchInputmap(map);

            map.addListener("zoom_changed", () => {
				toggleMarkerstype(map,map.getZoom(),lat2,lng2,celltype);
            });

			// drag & load markers
		    google.maps.event.addListener(map, "center_changed", function(event) {
			    var center = this.getCenter();
				var latitude = center.lat();
                var longitude = center.lng();
				toggleMarkerstype(map,map.getZoom(),latitude,longitude,celltype);

            });
    ////animateMapZoomTo(map, 17);
        });

  }

  // drag & zoom display markers with cell type
  function toggleMarkerstype(map,zoom,lat,lng,celltype) 
{
    loader.load().then((google) => {

	// var bounds = new google.maps.LatLngBounds();
	for (var i = 0; i < gmarkers.length; i++) 
    {
		    gmarkers[i].setMap(null);
	   
    }
    for (var i = 0; i < gmarkers.length; i++) 
    {
        // if (gmarkers[i].getMap() != null)
	    // {
		//     gmarkers[i].setMap(null);
	    // }
        // else{
		if(gmarkers[i].getTitle() == celltype+'G')
		{
			var distance = Math.round(google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(lat, lng), gmarkers[i].getPosition()));
            if(zoom >= 17)
			{
				if(distance < 1000)
				{
					gmarkers[i].setMap(map);

				}
			}

			if(zoom == 16)
			{
				if(distance < 1500)
				{
					gmarkers[i].setMap(map);

				}
			}

			if(zoom == 15)
			{
				if(distance < 2000)
				{
					gmarkers[i].setMap(map);

				}
			}

			if(zoom == 14)
			{
				if(distance < 2600)
				{
					gmarkers[i].setMap(map);

				}
			}

			if(zoom <= 13)
			{
				if(distance < 3600)
				{
					gmarkers[i].setMap(map);

				}
			}
		    // gmarkers[i].setMap(map);
			// bounds.extend(gmarkers[i].getPosition());
			// console.log(gmarkers[i].getPosition());

	    }
    }
	// map.fitBounds(bounds);
});
  }

    return (
        <Col lg={12}>
            <div
                className="row"
                style={{
                    width: " max-content",
                    margin: "20px auto",
                    display: "flex",
                }}
            >
                <div className="column" style={{ width: "20px" }}>
                    <div
                        className="color-table__color js-color"
                        style={{
                            backgroundColor: "#48D1CC",
                            padding: "10px",
                            borderRadius: "5px",
                        }}
                    ></div>
                </div>
                <div
                    className="column"
                    style={{ width: "max-content", marginLeft: "5px" }}
                >
                    <div className="color-table__color js-color">&nbsp;4G</div>
                </div>

                <div
                    className="column"
                    style={{ width: "20px", marginLeft: "15px" }}
                >
                    <div
                        className="color-table__color js-color"
                        style={{
                            backgroundColor: "#FFD700",
                            padding: "10px",
                            borderRadius: "5px",
                        }}
                    ></div>
                </div>

                <div
                    className="column"
                    style={{ width: "max-content", marginLeft: "5px" }}
                >
                    <div className="color-table__color js-color">&nbsp;3G</div>
                </div>

                <div
                    className="column"
                    style={{ width: "20px", marginLeft: "15px" }}
                >
                    <div
                        className="color-table__color js-color"
                        style={{
                            backgroundColor: "#FF0000",
                            padding: "10px",
                            borderRadius: "5px",
                        }}
                    ></div>
                </div>

                <div
                    className="column"
                    style={{ width: "max-content", marginLeft: "5px" }}
                >
                    <div className="color-table__color js-color">&nbsp;2G</div>
                </div>
            </div>

            <div
                className="row"
                style={{
                    width: "max-content",
                    marginTop: "-40px",
                    marginBottom: "40px",
                    marginLeft: "40px",
                    display: "flex",
                }}
            >
                <div className="column" style={{ width: "max-content" }}>
                    Filters&nbsp;:&nbsp;
                </div>
                <div className="column" style={{ width: "20px" }}>
                    <select id="filter-networks" onChange={(event)=>networkSelect(event)} style={{ cursor: "pointer" }}>
                        <option value="0">All</option>
                        <option value="2">2G</option>
                        <option value="3">3G</option>
                        <option value="4">4G</option>
                    </select>
                </div>
            </div>

            {/* map view start */}
            <input
                type="hidden"
                name="latitude"
                value="12.9716"
            />

            <input
                type="hidden"
                name="longitude"
                value="77.5946"
            />

            <div id="searchgetInput"></div>
            <div id="map_view" style={{ width: "100%", height: "500px" }}></div>
            <ul className="geo-data" style={{ display: "none" }}>
                <li>
                    Full Address: <span id="location"></span>
                </li>
                <li>
                    Postal Code: <span id="postal_code"></span>
                </li>
                <li>
                    Country: <span id="country"></span>
                </li>
                <li>
                    Latitude: <span id="lat"></span>
                </li>
                <li>
                    Longitude: <span id="lon"></span>
                </li>
            </ul>
            {/* map view end */}
        </Col>
    );
};

export default MapView;
