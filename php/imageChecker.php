<?php
$dir = $_POST['dir'];
$handle = opendir("../".$dir);
$export = "";
$export .= "{";

$i = 0;
while($file = readdir($handle)){
    if($file != "." && $file != ".."){
    $export .= '"' . $i . '"' . ':' . '"' . $file . '",';
    $i++;
    }
}

$export = substr($export,0,strlen($export) - 1);
$export .= "}";
echo $export;
closedir($handle);
?>