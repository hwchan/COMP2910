<?php
	//connects to server
    $title = "Achievements";
    $css = "css/calc.css";
    $active = "achievements";
	$servername = "mysql10.000webhost.com";
	$username = "a8448796_paullol";
	$password = "paul123";
	$dbname = "a8448796_paullol";
	
	//sets cookie
	$cookie_name = "user";
	setcookie($cookie_name);
	
	//inserts user id into table
	INSERT INTO table_name (column1,column2,column3,...)
	VALUES (value1,value2,value3,...);
		
	//sets variables to form values true or false
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $achiev1 = $_POST["achievement1"];
    $achiev2 = $_POST["achievement2"];
	$achiev3 = $_POST["achievement3"];
	}
	
	//sets achievements in table to complete if true
	If ($achiev1 == 'true'){
		INSERT INTO table_name (column1,column2,column3,...)
		VALUES (value1,value2,value3,...);
	}
	If ($achiev2 == 'true'){
		INSERT INTO table_name (column1,column2,column3,...)
		VALUES (value1,value2,value3,...);
	}
	If ($achiev3 == 'true'){
		INSERT INTO table_name (column1,column2,column3,...)
		VALUES (value1,value2,value3,...);
	}
	

?>