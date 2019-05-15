import createHTMLMapMarker from "./html-map-marker.js";

// swiper global 
var swiper;

// function initMap() {
(function() {
  var mapOptions = {
    zoom: 3,
    minZoom: 3,
    center: new google.maps.LatLng(37.5, -122),
    // mapTypeId: 'satellite',
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#0a3e57"
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
            "color": "#90c3b9"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#1c3645"
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
            "color": "#90c3b9"
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
            "color": "#90c3b9"
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
            "color": "#0f1626"
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

  // var testobj = document.getElementById("locations").getAttribute("value");
  // console.log(testobj);

  $(document).bind('webkitfullscreenchange mozfullscreenchange fullscreenchange', function() {
    var isFullScreen = document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen;
    if (isFullScreen) {
      console.log('fullscreen mode!');
      map.controls[google.maps.ControlPosition.TOP_LEFT].push($(".swiper-container").get(0));
    } else {
      console.log('not fullscreen mode!');
      var elem = map.controls[google.maps.ControlPosition.TOP_LEFT].pop();
      // console.log(elem);
      $(elem).removeAttr("style").prependTo("body");
    }
  });

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
                customInfo: [name, gallery_images],
                html: `<div class="custom-marker-div"><img class="custom-marker" src="`+marker_image+`" width="65" height="65"><div class="triangle"></div></div>`
                // label: {text: name, fontSize: "14px", fontWeight: "bold", color: "white"}
              });

              marker.addListener("click", function() { 
                if (swiper !== undefined)
                  swiper.destroy();

                /**
                 * Set swiper contents
                 */
                var swiperContainer = document.getElementsByClassName("swiper-container")[0];
                var swiperWrapper = swiperContainer.getElementsByClassName("swiper-wrapper")[0];

                // set album name
                var name = this.customInfo[0];
                swiperContainer.getElementsByTagName("h1")[0].innerText = name;

                // set image contents
                var contents = '';
                var gallery_images = this.customInfo[1];
                gallery_images.forEach((url) => {
                  var arr = url.split("/");
                  var imageName = arr[arr.length-1];

                  contents += '<div class="swiper-slide" style="background-image:url(' + url + ');" data-photo-caption="' + imageName + '"></div>';
                });
                swiperWrapper.innerHTML = contents;

                // set photo caption 
                var firstPhotoUrl = gallery_images[gallery_images.length-1].split("/");
                var firstPhotoName = firstPhotoUrl[firstPhotoUrl.length-1];
                swiperContainer.getElementsByClassName("photo-caption")[0].innerText = firstPhotoName.split(".")[0];

                swiper = new Swiper('.swiper-container', {
                  effect: 'coverflow',
                  grabCursor: true,
                  centeredSlides: true,
                  slidesPerView: 'auto',
                  spaceBetween: 200,
                  coverflowEffect: {
                    rotate: 0,
                    stretch: 1,
                    depth: 200,
                    modifier: 1,
                    slideShadows : true,
                  },
                  pagination: {
                    // el: '.swiper-pagination',
                  },
                  on: {
                    slideChangeTransitionEnd: function() {
                      // set photo caption 
                      var photoCaption = swiperContainer.getElementsByClassName("swiper-slide-active")[0].getAttribute("data-photo-caption");
                      swiperContainer.getElementsByClassName("photo-caption")[0].innerText = photoCaption.split(".")[0];
                    }
                  }
                });

                swiperContainer.className += " active";
              }, false);

              markers.push(marker);
          }

          var markerCluster = new MarkerClusterer(map, markers,  { imagePath: 'js/clustericons/m' });
      }
  })
})();
// }

