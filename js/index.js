import createHTMLMapMarker from "./html-map-marker.js";

// global variables
var swiper;
var closeSwiper = false;

// var url_sample = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg";
// var url_sample_small = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_s.jpg";

(function() {
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

  // for google full screen
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

  // // init map data from flickr
  // $.ajax({
  //   type: "POST",
  //   async: true,
  //   url: "src/photosets_getList.php",
  //   success: function(data) {
  //     // console.log(data);
      
  //     var markers = [];

  //     // var url_sample = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_s.jpg";
  //     // var url_sample_small = "https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}_s.jpg";

  //     data.forEach(place => {
  //       // console.log(place);
  //       var marker_image = url_sample_small;
  //       marker_image = marker_image.replace("{farm-id}", place["farm"]).replace("{server-id}", place["server"]).replace("{id}", place["primary"]).replace("{secret}", place["secret"]);
  //       // console.log(marker_image);

  //       // // get gallery images
  //       // var images = places[i].getElementsByTagName("photo");
  //       // var gallery_images = [];
  //       // var photoCaptions = [];
  //       // for (var j=0; j<images.length; j++) {
  //       //   gallery_images.push(images[j].getAttribute("url"));
  //       //   photoCaptions.push(images[j].textContent);
  //       // }

  //       var album_desc = place["description"];
  //       var lat = album_desc.split(",")[0].trim();
  //       var long = album_desc.split(",")[1].trim();
        
  //       var latLng = new google.maps.LatLng(lat, long);
  //       var name = place["title"];
  //       var album_id = place["id"];
        
  //       var marker = createHTMLMapMarker({
  //         latlng:  latLng,
  //         map: map,
  //         title: String(name),
  //         customInfo: [name, album_id],
  //         html: `<div class="custom-marker-div">
  //                 <div class="custom-marker" style="background-image: url(`+marker_image+`)" ></div>
  //                 <div class="triangle"></div>
  //               </div>`
  //         // label: {text: name, fontSize: "14px", fontWeight: "bold", color: "white"}
  //       });

  //       marker.addListener("click", function() { 
  //         if (swiper !== undefined)
  //           swiper.destroy();

  //         /**
  //          * Set swiper contents
  //          */
  //         var swiperContainer = document.getElementsByClassName("swiper-container")[0];
  //         var swiperWrapper = swiperContainer.getElementsByClassName("swiper-wrapper")[0];

  //         // set album name
  //         var name = this.customInfo[0];
  //         swiperContainer.getElementsByTagName("h1")[0].innerText = name;

  //         var album_id = this.customInfo[1];

  //         $.ajax({
  //           type: "POST",
  //           async: true,
  //           url: "src/photosets_getPhotos.php",
  //           data: {album_id: album_id},
  //           dataType: "json",
  //           success: function(data) {
  //             // set image contents
  //             var photos = data['photo'];
  //             var contents = '';

  //             photos.forEach(photo => {
  //               var url = url_sample;
  //               url = url.replace("{farm-id}", photo["farm"]).replace("{server-id}", photo["server"]).replace("{id}", photo["id"]).replace("{secret}", photo["secret"]);
  //               contents += `<div class="swiper-slide" data-photo-caption="` + photo['title'] + `">
  //                             <img src="` + url + `" style="height:100%">
  //                           </div>`;
  //             });
  //             swiperWrapper.innerHTML = contents;

  //             swiper = new Swiper('.swiper-container', {
  //               effect: 'coverflow',
  //               grabCursor: true,
  //               centeredSlides: true,
  //               slidesPerView: 'auto',
  //               coverflowEffect: {
  //                 rotate: 0,
  //                 stretch: 1,
  //                 depth: 200,
  //                 modifier: 1,
  //                 slideShadows : true,
  //               },
  //               on: {
  //                 sliderMove: function() { // when slider is moving
  //                   // set photo caption 
  //                   var activeSlide = swiperContainer.getElementsByClassName("swiper-slide-active");
  //                   if (activeSlide.length > 0) {
  //                     var photoCaption = activeSlide[0].getAttribute("data-photo-caption");
  //                     swiperContainer.getElementsByClassName("photo-caption")[0].innerText = photoCaption.split(".")[0];
  //                   }
  //                 },
  //                 slideChangeTransitionEnd: function() { // when transition is ended
  //                   // set photo caption 
  //                   var activeSlide = swiperContainer.getElementsByClassName("swiper-slide-active");
  //                   if (activeSlide.length > 0) {
  //                     var photoCaption = activeSlide[0].getAttribute("data-photo-caption");
  //                     swiperContainer.getElementsByClassName("photo-caption")[0].innerText = photoCaption.split(".")[0];
  //                   }
  //                 },
  //                 touchStart: function(e) {
  //                   if (e.target.className == "close-btn" || e.target.parentElement.className == "close-btn") {
  //                     // if target element or its parent is close-btn div ..
  //                     closeSwiper = true;
  //                   }
  //                 },
  //                 touchEnd: function(e) {
  //                   if (e.target.className == "close-btn" || e.target.parentElement.className == "close-btn") {
  //                     if (closeSwiper == true) {
  //                       // if close-btn clicked..
  //                       document.getElementsByClassName("swiper-container")[0].classList.remove("active");
  //                     }
  //                   }
  //                   closeSwiper = false;
  //                 }
  //               }
  //             });
    
  //             // set active slie as first one
  //             swiper.activeIndex = 0;
    
  //             // set caption of first photo
  //             // swiperContainer.getElementsByClassName("photo-caption")[0].innerText = photo_captions[0];
    
  //             swiperContainer.className += " active";
  //           },
  //           error: function(e) {
  //             console.log(e);
  //           }
  //         });
          
          
  //       }, false);

  //       markers.push(marker);
  //     });

  //     var markerCluster = new MarkerClusterer(map, markers,  { imagePath: 'js/clustericons/m' });
  //   },
  //   error: function(err) {
  //     console.log("error");
  //     console.log(err);
  //   }
  // })

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
        var photoCaptions = [];
        for (var j=0; j<images.length; j++) {
          gallery_images.push(images[j].getAttribute("url"));
          photoCaptions.push(images[j].textContent);
        }

        var lat = parseFloat(places[i].getElementsByTagName("lat")[0].textContent);
        var long = parseFloat(places[i].getElementsByTagName("long")[0].textContent);
        var name = places[i].getElementsByTagName("title")[0].textContent;
        // var image = {
        //     url: marker_image,
        //     //url: 'assets/marker1.png',
        //     labelOrigin: new google.maps.Point(50,110),
        //     //origin: new google.maps.Point(0, 0),
        //     //anchor: new google.maps.Point(0, 0),
        //     //scaledSize: new google.maps.Size(38, 45)
        //     scaledSize: new google.maps.Size(65, 65)
        // };
        var latLng = new google.maps.LatLng(lat, long);
        // var marker = new google.maps.Marker({
        let marker = createHTMLMapMarker({
          latlng:  latLng,
          map: map,
          // icon: image,
          //title: "Hello world"
          title: String(name),
          customInfo: [name, gallery_images, photoCaptions],
          html: `<div class="custom-marker-div">
                  <div class="custom-marker" style="background-image: url(`+marker_image+`)" ></div>
                  <div class="triangle"></div>
                </div>`
          // label: {text: name, fontSize: "14px", fontWeight: "bold", color: "white"}
        });

        marker.addListener("click", function() { 

          var swiperLoading = document.getElementsByClassName("swiper-loading")[0];
          console.log(swiperLoading.classList);
          console.log("asdf");
          swiperLoading.classList.add("active");
          console.log(swiperLoading.classList);
          console.log("asdf");

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
          var photo_captions = this.customInfo[2];
          gallery_images.forEach((url, idx) => {
            contents += `<div class="swiper-slide" data-photo-caption="` + photo_captions[idx] + `">
                          <img src="` + url + `" style="height:100%">
                        </div>`;
          });
          swiperWrapper.innerHTML = contents;

          swiper = new Swiper('.swiper-container', {
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflowEffect: {
              rotate: 0,
              stretch: 1,
              depth: 200,
              modifier: 1,
              slideShadows : true,
            },
            // pagination: {
            //   // el: '.swiper-pagination',
            // },
            on: {
              sliderMove: function() { // when slider is moving
                // set photo caption 
                var activeSlide = swiperContainer.getElementsByClassName("swiper-slide-active");
                if (activeSlide.length > 0) {
                  var photoCaption = activeSlide[0].getAttribute("data-photo-caption");
                  swiperContainer.getElementsByClassName("photo-caption")[0].innerText = photoCaption.split(".")[0];
                }
              },
              slideChangeTransitionEnd: function() { // when transition is ended
                // set photo caption 
                var activeSlide = swiperContainer.getElementsByClassName("swiper-slide-active");
                if (activeSlide.length > 0) {
                  var photoCaption = activeSlide[0].getAttribute("data-photo-caption");
                  swiperContainer.getElementsByClassName("photo-caption")[0].innerText = photoCaption.split(".")[0];
                }
              },
              touchStart: function(e) {
                if (e.target.className == "close-btn" || e.target.parentElement.className == "close-btn") {
                  // if target element or its parent is close-btn div ..
                  closeSwiper = true;
                }
              },
              touchEnd: function(e) {
                if (e.target.className == "close-btn" || e.target.parentElement.className == "close-btn") {
                  if (closeSwiper == true) {
                    // if close-btn clicked..
                    document.getElementsByClassName("swiper-container")[0].classList.add("wipe");
                    setTimeout(function() {
                      document.getElementsByClassName("swiper-container")[0].classList.remove("active");
                      document.getElementsByClassName("swiper-container")[0].classList.remove("wipe");
                    }, 500);
                  }
                }
                closeSwiper = false;
              }
            }
          });
          
          swiper.init();

          // set active slie as first one
          swiper.activeIndex = 0;

          // set caption of first photo
          swiperContainer.getElementsByClassName("photo-caption")[0].innerText = photo_captions[0];

          if (swiper !== undefined) {
            setTimeout(function() { 
              swiperLoading.classList.remove("active");
              swiperContainer.classList.add("active");
            }, 3000);
          }

        }, false);

        markers.push(marker);
      }

      var markerCluster = new MarkerClusterer(map, markers,  { imagePath: 'js/clustericons/m' });
    }
  })
})();