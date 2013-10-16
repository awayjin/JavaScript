<?php
header("Content-Type: text/html;charset=utf-8");
$host = 'localhost';
$user = 'root';
$psd = '123';

$link = mysql_connect($host, $user, $psd) or die("服务器连接错误:".mysql_error());
mysql_select_db('jwwebsite', $link) or die("数据库连接错误:".mysql_error());
$row_resource = mysql_query("select detail from books") or die("查询错误:".mysql_error());
$row_detail = mysql_fetch_row($row_resource);
//foreach($row_detail as $result){
//	print($result[2]);	
//}
$i = 0;
while($row = mysql_fetch_row($row_resource)){
	foreach($row as $result){
		print("<h2>mysql_fetch_row:".$result."</h2>");
	}
}

$entries = array(
	'eavesdrop' => array(
		'name' => 'j-01',
		'detail' => array(
			'A',
			'B'
		)
	),
	'edible' => array(
		'name' => 'j-02'
	)
);

$name = strtolower($_POST['term']);
$entry = $entries[$name];
$html = '<div>';
$html .= '<p>'.$entry['name'].'</p>';
if(isset($entry['detail'])){
	foreach($entry['detail'] as $term){
			$html .= '<h5>'.$term.'</h5>';
	}
}
$html .= '</div>';
print($html);

//$html = '';
//foreach($entries as $nameIndex => $name){
//	foreach($name as $termIndex => $term){
//		if(isset($entry['detail'])){
//			
//		}else{
//			$html .= $term;
//		}
//			
//	}
//	
//}
//print $html;


//$entries = array(
//	'eavesdrop' => array(
//		'part' => 'j-01',
//		'definition' => 'jw-01 php test!',
//		'quote' => array(
//			"A",
//			"B"
//		),
//		'author' => 'jinwei'
//	),
//	
//	'edible' => array(
//		'part' => 'j-02',
//		'definition' => 'jw-02 repeat'
//	),
//);
//
//$term = strtolower($_POST['term']);
//
//if(isset($term)){
//	$entry = $entries[$term];	
//	if(isset($entries[$term])){
//		$html = '<div class="term">';
//		$html .= '<h3 class="part">'.$entry['part'].'</h3>';
//		if(isset($entry['quote'])){
//			foreach($entry['quote'] as $line){
//				$html .= '<div class="quote-line">'.$line.'</div>';
//			}
//		}
//		$html .= '</div>';
//		print($html );		
//	}

//}


