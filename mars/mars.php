<?php
require('MAASapi.php');
$maas = new MaasApi;
$data = $maas->getLatestJson();
print($data);
?>
