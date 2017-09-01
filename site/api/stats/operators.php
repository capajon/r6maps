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
        "mode",
        "map",
        "location"
    ],
    "sumFields" => [
        "totalKills",
        "totalDeaths",
        "totalWins",
        "totalPlays"
    ]
);

$cacheKey = str_replace("/","",'OPERATORS,' . getCacheKey($config));

CacheManager::setDefaultConfig(array(
    "path" => '/home/capajon/r6sites/phpfastcachetemp/.'
));
$InstanceCache = CacheManager::getInstance('files');
$CachedString = $InstanceCache->getItem($cacheKey);

if (is_null($CachedString->get())) { // NOT CACHED
    $operators = getOperatorsData($mysqli, $config);
    $encodedResult = json_encode(array("role"=>$operators));

    if(!empty(results)) {
        $CachedString->set($encodedResult)->expiresAfter(86400); // 2419200 = s in month
        $InstanceCache->save($CachedString);
    }

    echo getFinalOutput($encodedResult);
} else { // OUTPUT CACHED CONTENT
    echo getFinalOutput($CachedString->get());
}

function getOperatorsData($mysqli, $config) {
    if (mysqli_connect_errno($mysqli)) {
        echo "Uh oh. Failed to connect to datastore. ";
        return [];
    }

    $sql .= "SELECT role ,operator ,rank ";
    foreach($config["sumFields"] as $f){
        $sql .= ",SUM(".$f.") AS ".$f." ";
    }
    $sql .= "FROM r6maps_stats_operators_s".$config['season']." ";
    $sql .= getSqlWhere($mysqli, $config);
    $sql .= "GROUP BY role ,operator, rank ";

    $operators = array();
    if($result = $mysqli->query($sql)) {
        while ($row = $result->fetch_assoc()) {
            foreach($config["sumFields"] as $sumf){
                $operators[$row["role"]][$row["operator"]][$row["rank"]][$sumf] = $row[$sumf];
            }
        }
    }
    return $operators;
}
?>
