<?php
/**
 * Created by JetBrains PhpStorm.
 * User: jinwei
 * Date: 13-7-25
 * Time: 上午9:40
 * To change this template use File | Settings | File Templates.
 */
header("Content-type:text/html;charset=utf-8");

$xml = file_get_contents("books.xml");
echo $xml;