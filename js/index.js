import createHTMLMapMarker from "./html-map-marker.js";

// const latLng = new google.maps.LatLng(16.7666, -3.0026);
// const mapOptions = {
//   zoom: 11,
//   center: latLng
// };
// const map = new google.maps.Map(document.getElementById("map"), mapOptions);

// let marker = createHTMLMapMarker({
//   latlng: latLng,
//   map: map,
//   html: `<img id="parrot" src="https://cultofthepartyparrot.com/parrots/hd/parrot.gif">`
// });

// marker.addListener("click", () => {
//   alert("Partyin Partyin Yeah!");
// });

// function initMap() {
  var mapOptions = {
    zoom: 3,
    minZoom: 3,
    center: new google.maps.LatLng(37.5, -122),
    mapTypeId: 'satellite',
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#212121"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#181818"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1b1b1b"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#2c2c2c"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8a8a8a"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#373737"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#3c3c3c"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#4e4e4e"
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "transit",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#3d3d3d"
          }
        ]
      }
    ]
  };

  var map = new google.maps.Map(document.getElementById('map'), mapOptions);
  
  $.ajax({
      type: "GET",
      async: true,
      url: "locations_.xml",
      dataType: "xml",
      success:
      function (xml) {
          var places = xml.documentElement.getElementsByTagName("location");
          var markers = [];
          
          for (var i = 0; i < places.length; i++) {
              // console.log(places[i].getElementsByTagName("photo")[0].getAttribute("url"));
              var marker_image = places[i].getElementsByTagName("photo")[0].getAttribute("url");

              // get gallery images
              var images = places[i].getElementsByTagName("photo");
              var gallery_images = [];
              for (var j=0; j<images.length; j++) {
                gallery_images.push(images[j].getAttribute("url"));
              }
              
              var lat = parseFloat(places[i].getElementsByTagName("lat")[0].textContent);
              var long = parseFloat(places[i].getElementsByTagName("long")[0].textContent);
              var name = places[i].getElementsByTagName("title")[0].textContent;
              var image = {
                  url: marker_image,
                  //url: 'assets/marker1.png',
                  labelOrigin: new google.maps.Point(50,110),
                  //origin: new google.maps.Point(0, 0),
                  //anchor: new google.maps.Point(0, 0),
                  //scaledSize: new google.maps.Size(38, 45)
                  scaledSize: new google.maps.Size(65, 65)
              };
              var latLng = new google.maps.LatLng(lat, long);
              // var marker = new google.maps.Marker({
              let marker = createHTMLMapMarker({
                latlng:  latLng,
                map: map,
                // icon: image,
                //title: "Hello world"
                title: String(name),
                customInfo: gallery_images,
                html: `<div class="custom-marker-div"><img class="custom-marker" src="`+marker_image+`" width="90" height="65"><div class="triangle"></div></div>`
                // label: {text: name, fontSize: "14px", fontWeight: "bold", color: "white"}
              });

              marker.addListener("click", function() { 
                var gallery_images = this.customInfo;
                var pswpElement = document.querySelectorAll('.pswp')[0];

                var items = [];
                gallery_images.forEach((url) => {
                  let item = {
                    src: url,
                    w: 960,
                    h: 720
                  }
                  items.push(item);
                })

                // define options (if needed)
                var options = {
                  // optionName: 'option value'
                  // for example:
                  index: 0 // start at first slide
                };

                // Initializes and opens PhotoSwipe
                var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
                gallery.init();
              }, false);

              markers.push(marker);
          }
          var markerCluster = new MarkerClusterer(map, markers,  { imagePath: 'js/clustericons/m' });
      }
  })
// }