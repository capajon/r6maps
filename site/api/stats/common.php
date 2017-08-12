<?php
function getCacheKey($config) {
  $key = '';
  foreach($config['userInputParams'] as $param){
      $key .= $param . '=' . $_GET[$param] . ',';
  }
  return $key;
}

function getFinalOutput($content) {
  $callbackRequest = $_GET['callback'];
  if($callbackRequest) {
    return $callbackRequest . '('.$content.')';
  } else {
    return $content;
  }
}

function getSeason($mysqli) {
    $currentDefaultSeason = "5";
    $allowedSeasons = [
        "5",
        $currentDefaultSeason
    ];

    $userSeason = $_GET["season"];
    if(in_array($userSeason, $allowedSeasons)) {
        return $mysqli->real_escape_string($userSeason);
    }
    return $currentDefaultSeason;
}

function getSqlWhere($mysqli, $config) {
    $counter = 0;

    foreach($config['userInputParams'] as $param){
        $input = $_GET[$param];
        if($input) {
            $result .= ($counter == 0) ? "WHERE " : "AND ";
            $result .= $param." = '". $mysqli->real_escape_string($input) ."' ";
            $counter++;
        }
    }
    return $result;
}
?>
