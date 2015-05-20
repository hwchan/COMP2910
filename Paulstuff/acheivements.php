<?php
	//connects to server
    $title = "Achievements";
    $css = "css/calc.css";
    $active = "achievements";
	$servername = "mysql10.000webhost.com";
	$username = "a8448796_paullol";
	$password = "paul123";
	$dbname = "a8448796_paullol";
	
	//check connection
	if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 
	//sets cookie
	$cookie_name = "user";
	setcookie($cookie_name);
		
	//sets variables to form values true or false
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $achiev1 = $_POST["achievement1"];
    $achiev2 = $_POST["achievement2"];
	$achiev3 = $_POST["achievement3"];

	
		//sets achievements in table to complete if true
		If ($achiev1 == 'true'){
			$sql = "INSERT INTO table_name (Achievement1)
			VALUES ($achiev1)";
		}
		If ($achiev2 == 'true'){
			$sql = "INSERT INTO table_name (Achievement2)
			VALUES ($achiev2)";
		}
		If ($achiev3 == 'true'){
			$sql = "INSERT INTO table_name (Achievement3)
			VALUES ($achiev2)";
		}
	}

?>