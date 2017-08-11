<?php
error_reporting(0);
include("credentials.private.php"); //should contain $mysqli = mysqli_connect("server","user","password","database");
include("common.php");
require __DIR__ . '/vendor/autoload.php';
use phpFastCache\CacheManager;

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

$cacheKey = str_replace("/","",'MAPS,' . getCacheKey($config));

CacheManager::setDefaultConfig(array(
    "path" => '/home/capajon/phpfastcachetemp/.'
));
$InstanceCache = CacheManager::getInstance('files');
$CachedString = $InstanceCache->getItem($cacheKey);

if (is_null($CachedString->get())) { // NOT CACHED
    $maps = getMapsData($mysqli, $config);
    $encodedResult = json_encode($maps);

    if(!empty(results)) {
        $CachedString->set($encodedResult)->expiresAfter(120); // 2419200 = s in month
        $InstanceCache->save($CachedString);
    }

    echo $_GET['callback'] . '('.$encodedResult.')';
} else { // OUTPUT CACHED CONTENT
    echo $_GET['callback'] . '('.$CachedString->get().')';
}

function getMapsData($mysqli, $config) {
    if (mysqli_connect_errno($mysqli)) {
        echo "Uh oh. Failed to connect to datastore. ";
        return [];
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
    return $maps;
}

?>
