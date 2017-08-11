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

function getSqlWhere($mysqli, $config) {
    $result = "";
    $whereCounter = 0;

    foreach($config['userInputParams'] as $param){
        $input = $_GET[$param];
        if($input) {
            if($whereCounter == 0) {
                $result .= "WHERE ".$param." = '". $mysqli->real_escape_string($input) ."' ";
            } else {
                $result .= "AND ".$param." = '". $mysqli->real_escape_string($input) ."' ";
            }
            $whereCounter++;
        }
    }
    return $result;
}
?>
