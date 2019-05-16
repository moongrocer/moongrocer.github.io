<?php

// require 'src/common/common.php';

// use Google\Photos\Library\V1\PhotosLibraryClient;
// // use Google\Photos\Library\V1\ListAlbumsRequest;

// // if session not exist
// if (!isset($_SESSION['credentials'])) {
//   connectWithGooglePhotos(
//     ['https://www.googleapis.com/auth/photoslibrary'],
//     $ini['albums_authentication_redirect_url']
//   );
// }

// /**
//  * Removes the app's access to the user's Photos account.
//  */
// if (isset($_GET['clear'])) {
//   unset($_SESSION['credentials']);
// }

// $photosLibraryClient = new PhotosLibraryClient(['credentials' => $_SESSION['credentials']]);

// /**
//  * Retrieves the user's albums, and renders them in a grid.
//  */
// try {
//   // $pagedResponse = $photosLibraryClient->listAlbums();
//   $pagedResponse = $photosLibraryClient->listSharedAlbums();

//   $data = array();

//   foreach ($pagedResponse->iteratePages() as $page) {
//     foreach ($page as $album) {
//       // album id
//       $albumId = $album->getId();
//       // album title
//       $title = $album->getTitle();
//       // get cover photo media itemId
//       $coverMediaItemId = $album->getCoverPhotoMediaItemId();
//       // share info
//       // $shareInfo = $album->getShareInfo();
//       // $shareableUrl = $shareInfo.getShareableUrl();

//       // get media items from album
//       $pagedResponse = $photosLibraryClient->searchMediaItems(array('albumId' => $albumId));
//       $photos = array();
//       $lat = '';
//       $long = '';

//       foreach ($pagedResponse->iteratePages() as $page) {
//         foreach ($page as $mediaItem) {
//           $mediaItemId = $mediaItem->getId();
//           if ($mediaItemId == $coverMediaItemId) {
//             $description = $mediaItem->getDescription();
//             $latlong = explode(",", $description);
//             $lat = trim($latlong[0]);
//             $long = trim($latlong[1]);
//           }
//           $imgUrl = $mediaItem->getBaseUrl();
//           array_push($photos, $imgUrl);
//         }
//       }

//       $location = array(
//         'title' => $title,
//         'lat' => $lat,
//         'long' => $long,
//         'photos' => $photos
//       );
      
//       array_push($data, $location);
//     }
//   }

//   var_dump($data);

// } catch (\Google\ApiCore\ApiException $e) {
//     echo $templates->render('error', ['exception' => $e]);
// }

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fc9228">
    <!-- <link rel="stylesheet" href="css/photoswipe.css">  -->
    <!-- <link rel="stylesheet" href="css/default-skin/default-skin.css">  -->
    <link rel="stylesheet" href="css/swiper.min.css" />
    <link rel="stylesheet" href="css/style.css" />
    <meta name="apple-mobile-web-app-title" content="project_zanzibar">
    <meta name="application-name" content="project_zanzibar">
    <meta name="msapplication-TileColor" content="#02a1c1">
    <meta name="theme-color" content="#fc9228">
    <meta charset="UTF-8">
    <title>project_zanzibar</title>

    <!-- <script src="js/photoswipe.min.js"></script> 
    <script src="js/photoswipe-ui-default.min.js"></script>  -->
    <script src="https://code.jquery.com/jquery-3.4.0.js" integrity="sha256-DYZMCC8HTC+QDr5QNaIcfR7VSPtcISykd+6eSmBW5qo=" crossorigin="anonymous"></script>
  </head>
  <body>
    
    <!-- Swiper -->
    <div class="swiper-container">
      <!-- Album name -->
      <h1 class="album-name">&nbsp;</h1>
      <div class="close-btn">
        <img src="img/cross_white.png">
      </div>

      <!-- swiper wrapper -->
      <div class="swiper-wrapper">
        <!-- <div class="swiper-slide" style="background-image:url('assets/Acadia_Park_Maine_USA_2006/IMG_0441.jpg'); width: 100px;"></div>
        <div class="swiper-slide" style="background-image:url('assets/Acadia_Park_Maine_USA_2006/IMG_0461.jpg'); width: 200px;"></div>
        <div class="swiper-slide" style="background-image:url('assets/Acadia_Park_Maine_USA_2006/IMG_0487.jpg'); width: 300px;"></div>
        <div class="swiper-slide" style="background-image:url('assets/Acadia_Park_Maine_USA_2006/IMG_0493.jpg'); width: 400px;"></div> -->
      </div>

      <!-- Photo Captions -->
      <p class="photo-caption">&nbsp;</p>

      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>

    
    <div id="map"></div>

    <script async defer
      src="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyAcRXtclGL8lFBwkx4sD3X_XH_e3yN9hUM">
    </script>
    <script src="js/markerclusterer.js"></script>
    <script src="js/swiper.min.js"></script> 
    <script src="js/index.js" type="module"></script>
    <script>
      function closeSwiper() {
        document.getElementsByClassName("swiper-container")[0].classList.remove("active");
      }
    </script>
  </body>
</html>