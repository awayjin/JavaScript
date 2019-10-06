<?php
header("Content-type:text/html;charset=utf-8");

//echo "<root></root>"

//1.0 利用simplexml读取xml文件
/*$booksXML = simplexml_load_file("books.xml");
var_dump($booksXML);
echo "ca:".($booksXML[0]);
foreach($booksXML as $key=>$value){
    echo "<br>".$value->author;
    echo "<br>".$value->title;
    echo "<br>".$value->publisher;
//    echo "<br>:".$key;
}*/

//2.0 利用DOMDocument读取xml文件
$dom = new DOMDocument();
$dom->load("books.xml");
$book = $dom->getElementsByTagName("book");
echo "<br>";
var_dump($dom);
var_dump($book->item(1));
$title=$book->item(1)->getElementsByTagName("title");
var_dump($title->item(0)->nodeValue);

foreach($book as $value){
    $author = $value ->getElementsByTagName("author");
    $author= $author->item(0)->nodeValue;
    $title = $value ->getElementsByTagName("title");
    $title= $title->item(0)->nodeValue;
    $publisher = $value ->getElementsByTagName("publisher");
    $publisher= $publisher->item(0)->nodeValue;

    echo "author:".$author.", title:".$title.", publisher:".$publisher."<br>";
}

//$book->item(0)->getElementsByTagName("title")->item(0)->nodeValue; //PHP And MySQL Development

?>
