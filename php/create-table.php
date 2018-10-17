<?php
require("./header.php");

for($iDay = 1; $iDay < 4; $iDay++){
    $create_table .= "CREATE TABLE `Day$iDay-Booth-Time` (
        `id` int(11) NOT NULL,
        `booth` int(11) NOT NULL,
        `time` int(11) NOT NULL,
        `candidate` int(11) NOT NULL,
        `interviwer1` int(11) NOT NULL,
        `interviwer2` int(11) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    ALTER TABLE `Day$iDay-Booth-Time` ADD PRIMARY KEY (`id`);
    ALTER TABLE `Day$iDay-Booth-Time` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT; ";
    for($iBooth = 1; $iBooth < 8; $iBooth++){
        for($iTime = 0; $iTime < 18; $iTime++){
            $insert_table .= "INSERT INTO `Day$iDay-Booth-Time` (`id`, `booth`, `time`, `candidate`, `interviwer1`, `interviwer2`) VALUES (NULL, '$iBooth', '$iTime', '0', '0', '0'); ";
        }
    }
}

$create_day_table = "CREATE TABLE `Day` (
    `id` int(11) NOT NULL,
    `day` int(11) NOT NULL,
    `schedule` int(11) NOT NULL,
    `date` varchar(255) NOT NULL,
    `week` varchar(255) NOT NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8;  
ALTER TABLE `Day` ADD PRIMARY KEY (`id`);
ALTER TABLE `Day` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT; ";

$dateArray = array("Wednesday", "Thursday", "Friday");
$weekArray = array("12/05/2018", "12/06/2018", "12/07/2018");

for($iDays = 1; $iDays < 4; $iDays++){
    for($iSchedule = 1; $iSchedule < 127; $iSchedule++){
        $insert_day_table .= "INSERT INTO `Day` (`id`, `day`, `schedule`, `date`, `week`) VALUES (NULL, '$iDays', '$iSchedule', '".$dateArray[$iDays-1]."', '".$weekArray[$iDays-1]."'); ";
    }
}

$sql = $create_table.$insert_table.$create_day_table.$insert_day_table;
print_r($sql);
mysqli_multi_query($con,$sql);
mysqli_close($con);
?>