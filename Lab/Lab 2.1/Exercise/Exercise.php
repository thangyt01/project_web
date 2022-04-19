<?php
    $name = $_POST["name"];
    $class = $_POST["class"];
    $university = $_POST["university"];
    $st = array();
    if ($_POST["reading_book"] == "Yes") array_push($st, "reading book");
    if ($_POST["playing_soccer"] == "Yes") array_push($st, "playing soccer");
    if ($_POST["watching_film"] == "Yes") array_push($st, "watching film");
    if ($_POST["sleeping"] == "Yes") array_push($st, "sleeping");
    print("Your name is: $name <br>");
    print("You class: $class <br>");
    print("Your university: $university<br>");
    print("Your hobby: ");
    foreach($st as $i)  print("$i, ");
    print("<br> Have a nice day !");

?>