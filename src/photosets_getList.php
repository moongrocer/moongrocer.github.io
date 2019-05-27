<?php

header('Content-type: application/json');

// allow only ajax request, otherwise restrict access
// define('IS_AJAX', isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest');
// if(!IS_AJAX) {die('Restricted access');}

// restrict access only in the host server
$pos = strpos($_SERVER['HTTP_REFERER'],getenv('HTTP_HOST'));
if($pos===false)
  die('Restricted access');

require_once __DIR__ . '/../vendor/autoload.php';

$configFile = __DIR__ . '/config.php';
require_once $configFile;

if (empty($apiKey) || empty($apiSecret)) {
  echo 'Please set $apiKey and $apiSecret in '.$configFile;
  exit(1);
}
$flickr = new \Samwilson\PhpFlickr\PhpFlickr($apiKey, $apiSecret);

$collections = $flickr->photosets()->getList("157870762@N04");
echo json_encode($collections['photoset']);
exit;

// $photos = $flickr->photosets_getPhotos("72157708711880554");
// var_dump($photos["photo"]);