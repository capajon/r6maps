<?php
include("credentials.private.php"); //should contain $mysqli = mysqli_connect("server","user","password","database");
include("stats-common.php");

$config = array(
    "season" => getSeason($mysqli),
    "userInputParams" => [
        "platform",
        "gameMode",
        "mapName",
        "objectiveLocation"
    ],
    "sumFields" => [
        "allTeamsDead",
        "attackersEliminated",
        "attackersKilledHostage",
        "attackersSurrendered",
        "bombDeactivated_OneBomb",
        "bombExploded",
        "defendersEliminated",
        "defendersKilledHostage",
        "defendersSurrendered",
        "defuserDeactivated",
        "hostageExtracted",
        "noEnemies",
        "objectiveCaptured",
        "objectiveProtected",
        "timeExpired"
    ]
);

if (mysqli_connect_errno($mysqli)) {
    echo "Uh oh. Failed to connect to datastore. ";
}

$sqlStatement = "SELECT winRole ";
foreach($config["sumFields"] as $f){
    $sqlStatement .= ",SUM(".$f.") as ".$f." ";
}
$sqlStatement .= ",AVG(averageRoundDuration) as averageRoundDuration
,SUM(totalRounds) as totalRounds
FROM r6maps_stats_maps_s".$config['season']." ";
$sqlStatement .= getSqlWhere($mysqli, $config);
$sqlStatement .= "GROUP BY winRole";

$maps = array();
if($result = $mysqli->query($sqlStatement)) {
    while ($row = $result->fetch_assoc()) {
        foreach($config["sumFields"] as $sumf){
            $maps["winRole"][$row["winRole"]][$sumf] = $row[$sumf];
        }
        $maps["winRole"][$row["winRole"]]["averageRoundDuration"] = round($row["averageRoundDuration"],5);
        $maps["winRole"][$row["winRole"]]["totalRounds"] = $row["totalRounds"];
    }
}

echo json_encode($maps);

?>
