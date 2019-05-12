<?php
function loadFile($xml, $xsl)
{
$xmlDoc = new DOMDocument();
$xmlDoc->load($xml);

$xslDoc = new DOMDocument();
$xslDoc->load($xsl);

$proc = new XSLTProcessor();
$proc->importStyleSheet($xslDoc);
echo $proc->transformToXML($xmlDoc);
}

function updateFile($xml)
{
$xmlLoad = simplexml_load_file($xml);
$postKeys = array_keys($_POST);

foreach($xmlLoad->children() as $graf)
{ 
	foreach($graf->children() as $x){
	foreach($_POST as $key=>$value)
		{	 
		if($key == $x->attributes())
		{ 
		$x[0]=$value;
		}
	}
} }
$xmlLoad->asXML($xml);
echo "<script>
             window.history.go(-1);
     </script>";
}

if($_POST["btn_sub"] == "")
{
  loadFile("data.xml", "data.xsl");
}
else
{
  updateFile("data.xml");
}
?>