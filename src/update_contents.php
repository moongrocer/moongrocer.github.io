<?php

// header('Content-type: application/json');

// // restrict access only in the host server
// $pos = strpos($_SERVER['HTTP_REFERER'],getenv('HTTP_HOST'));
// if($pos===false)
//   die('Restricted access');

require_once __DIR__ . '/../vendor/autoload.php';

$configFile = __DIR__ . '/config.php';
require_once $configFile;

if (empty($apiKey) || empty($apiSecret)) {
  echo 'Please set $apiKey and $apiSecret in '.$configFile;
  exit(1);
}
$flickr = new \Samwilson\PhpFlickr\PhpFlickr($apiKey, $apiSecret);

$user_id = "157870762@N04";
$collections = $flickr->photosets()->getList($user_id);

foreach ($collections["photoset"] as $photoset) {
  // var_dump($photoset);
  $album_id = $photoset["id"];
  // var_dump($album_id);
  $photos = $flickr->photosets()->getPhotos($album_id, $user_id);
  
  foreach ($photos["photo"] as $photo) {
    var_dump($photo);
  }
  exit;
}
