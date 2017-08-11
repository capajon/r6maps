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
        "objectiveLocation",
        "skillRank"
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
    "path" => '/home/capajon/phpfastcachetemp/.'
));
$InstanceCache = CacheManager::getInstance('files');
$CachedString = $InstanceCache->getItem($cacheKey);

if (is_null($CachedString->get())) { // NOT CACHED
    $operators = getOperatorsData($mysqli, $config);
    $encodedResult = json_encode(array("role"=>$operators));

    if(!empty(results)) {
        $CachedString->set($encodedResult)->expiresAfter(120); // 2419200 = s in month
        $InstanceCache->save($CachedString);
    }

    echo $_GET['callback'] . '('.$encodedResult.')';
} else { // OUTPUT CACHED CONTENT
    echo $_GET['callback'] . '('.$CachedString->get().')';
}

function getOperatorsData($mysqli, $config) {
    if (mysqli_connect_errno($mysqli)) {
        echo "Uh oh. Failed to connect to datastore. ";
        return [];
    }

    $sqlStatement = "SELECT role ,operator ,totalPlaysAllSkillRank";
    foreach($config["sumFields"] as $f){
        $sqlStatement .= ",SUM(".$f.") as ".$f." ";
    }
    $sqlStatement .= "FROM r6maps_stats_operators_s".$config['season']." ";
    $sqlStatement .= getSqlWhere($mysqli, $config);
    $sqlStatement .= "GROUP BY role ,operator ,totalPlaysAllSkillRank";


    $operators = array();
    if($result = $mysqli->query($sqlStatement)) {
        while ($row = $result->fetch_assoc()) {
            foreach($config["sumFields"] as $sumf){
                $operators[$row["role"]][$row["operator"]][$sumf] = $row[$sumf];
            }
            $operators[$row["role"]][$row["operator"]]['totalPlaysAllSkillRank'] = $row['totalPlaysAllSkillRank'];
        }
    }
    return $operators;
}
?>
