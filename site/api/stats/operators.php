<?php
error_reporting(0);
include("credentials.private.php"); //should contain $mysqli = mysqli_connect("server","user","password","database");
include("common.php");

$config = array(
    "season" => getSeason($mysqli),
    "userInputParams" => [
        "platform",
        "gameMode",
        "mapName",
        "objectiveLocation",
        "skillRank"
    ],
    "sumFields" => [
        "totalKills",
        "totalDeaths",
        "totalWins",
        "totalPlays",
        "totalPlaysAllSkillRank"
    ]
);

if (mysqli_connect_errno($mysqli)) {
    echo "Uh oh. Failed to connect to datastore. ";
}

$sqlStatement = "SELECT role ,operator ";
foreach($config["sumFields"] as $f){
    $sqlStatement .= ",SUM(".$f.") as ".$f." ";
}
$sqlStatement .= "FROM r6maps_stats_operators_s".$config['season']." ";
$sqlStatement .= getSqlWhere($mysqli, $config);
$sqlStatement .= "GROUP BY role ,operator";


$operators = array();
if($result = $mysqli->query($sqlStatement)) {
    while ($row = $result->fetch_assoc()) {
        foreach($config["sumFields"] as $sumf){
            $operators[$row["role"]][$row["operator"]][$sumf] = $row[$sumf];
        }
    }
}

echo $_GET['callback'] . '('.json_encode(array("role"=>$operators)).')';

?>
