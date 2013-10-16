<?php
$entries = array(
	'faith' => array(
		'part' => 'j01',
		'definition' => 'Belief!'
	),
	"famous" => array(
		'part' => 'j02',
		'definition' => 'Conspicuously miserable.',
		'quote' => array(
		  'Done to a turn on the iron, behold',
		  'Him who to be famous aspired.',
		  'Content?  Well, his grill has a plating of gold,',
		  'And his twistings are greatly admired.'
		 ), 
		 'author' => 'jinwei',
	),
);

$link = mysql_connect("localhost", "root", "123");
mysql_select_db("jwwebsite");
$book_name = mysql_query("select bookName from books order by bookId desc");
echo($book_name);

$bn_html = "";
//while($bn_row = mysql_fetch_row($book_name)){
//	foreach($bn_row as $bn_value){
//		$bn_html .='<p>'.$bn_value.'</p>';
//	}
//}

$arr_push = array();
while($bn_row = mysql_fetch_row($book_name)){
	for($i=0; $i<count($bn_row); $i++){
		//if(strpos($bn_row[$i], $_GET['t_value'])){
			//$bn_html .="<p>$i:".$bn_row[$i].'</p>';
		//}
		array_push($arr_push, $bn_row[$i]);
	}
//	foreach($bn_row as $bn_i => $bn_value){
//		echo "<br>".$bn_i;
//		if(strpos($bn_value, $_GET['t_value'])){
//			$bn_html .="<p>$bn_i:".$bn_value.'</p>';	
//		}
//	}
	
}
echo($arr_push);
echo $bn_html;

foreach($entries as $term => $entry){
	if(isset($term) && $_GET['t_value'] != NULL){
		if(strpos($term, $_GET['t_value']) !== false){
			$html = "";
			//foreach($entry as $term2 => $entry2){
				$html .='<p>'.$entry['part'].'</p>';
				$html .='<p>'.$entry['definition'].'</p>';
				if(isset($entry['quote'])){
					foreach($entry['quote'] as $val1){
						$html .= '<p class="a1">'.$val1.'</p>';
					}
					if(isset($entry['author'])){
						$html .= '<p class="a2">'.$entry['author'].'</p>';
					}
				}
			//}
			print $html;
		}
	}
}



//			$term = strtolower($_GET['term']);
//			if(isset($term) && $term != NULL){
//				$entry = $entries[$term];
//				$html = "";
//				$html .= '<p>'.$entry['part'].'<p>';
//				$html .= '<p>'.$entry['definition'].'</p>';
//				if(isset($entry['quote'])){
//					foreach($entry['quote'] as $termKey => $termValue){
//						$html .= '<div>'.$termKey.':'.$termValue.'</div>';
//					}
//					if(isset($entry['author'])){
//						$html .= '<div class="quote-author">'.$entry['author'].'</div>';	
//					}
//				}
//				print $html;
//			}

//foreach($entries as $term => $entry){
//	if(strpos($term, strtolower($_GET['term'])) !== false){
//		$html = '<div class="entry">';
//		$html .= '<h2>'.$term.'</h2>';
//		$html .= '<h5>'.$entry['part'].'</h5>';
//		if(isset($entry['quote'])){
//			foreach($entry['quote'] as $line){
//				$html .= '<div class="quote-line">'.$line.'</div>';	
//			}
//			if(isset($entry['author'])){
//				$html .= '<div class="quote-author">'.$entry['author'].'</div>';	
//			}
//		}
//
//		$html .= '</div>';
//		print $html;
//	}
//}

?>