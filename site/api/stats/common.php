<?php
function getCacheKey($config) {
  $key = '';
  foreach($config['userInputParams'] as $param){
      $key .= $param . '=' . $_GET[$param] . ',';
  }
  return $key;
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

function getSqlWhere($mysqli, $config, $exception = '') {
    $result = "WHERE 1=1 ";

    foreach($config['userInputParams'] as $param){
        if($param != $exception) {
          $input = $_GET[$param];
          if($input) {
              $result .= "AND ".$param." = '". $mysqli->real_escape_string($input) ."' ";
          }
        }
    }
    return $result;
}
?>
