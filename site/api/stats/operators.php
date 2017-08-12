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

    $sql ="SELECT t1.role ,t1.operator ";
    foreach($config["sumFields"] as $f){
        $sql .= ",t1.".$f." ";
    }
    $sql .= ",t2.totalPlaysAllSkillRank AS totalPlaysAllSkillRank ";

    $sql .= "FROM (SELECT role ,operator";
    foreach($config["sumFields"] as $f){
        $sql .= ",SUM(".$f.") AS ".$f." ";
    }
    $sql .= "FROM r6maps_stats_operators_s".$config['season']." ";
    $sql .= getSqlWhere($mysqli, $config);
    $sql .= "GROUP BY role ,operator) AS t1 ";

    $sql .= "LEFT JOIN (SELECT role, operator, SUM(totalPlays) AS totalPlaysAllSkillRank ";
    $sql .= "FROM r6maps_stats_operators_s".$config['season']." ";
    $sql .= getSqlWhere($mysqli, $config, 'skillRank');
    $sql .= "GROUP BY role, operator) AS t2 ";
    $sql .= "ON t2.operator = t1.operator AND t2.role = t1.role ";

    $operators = array();
    if($result = $mysqli->query($sql)) {
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
