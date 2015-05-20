<?php
	//connects to server
    $title = "Achievements";
    $active = "achievements";
	$servername = "mysql10.000webhost.com";
	$username = "a8448796_paullol";
	$password = "paul123";
	$dbname = "a8448796_paullol";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);

	//check connection
	if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
	} 	
	
	//sets cookie
	$cookie_name = "user";
	setcookie($cookie_name);

	//gives cookie a random value
	if(!isset($_COOKIE[$cookie_name])) {
	$cookie_value = rand(0, PHP_INT_MAX);
	setcookie($cookie_name, $cookie_value);
	echo "setting cookie";
	echo "value is " . $cookie_name;
	} else {
    echo "Cookie '" . $cookie_name . "' is set!<br>";
    echo "Value is: " . $_COOKIE[$cookie_name];
	}
		
	//sets variables to form values true or false
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $achiev1 = $_POST["achievement1"];
    $achiev2 = $_POST["achievement2"];
	$achiev3 = $_POST["achievement3"];
			
		//sets achievements in table to complete if true
		If ($achiev1 == 'true'){
			$sql = "INSERT INTO achievements (userID ,Achievement1)
			VALUES ('$cookie_name', '$achiev1')";
			if ($conn->query($sql) === TRUE) {
				echo "New record created successfully";
				} else {
				echo "Error: " . $sql . "<br>" . $conn->error;
			}
		} else{
			echo "not valid";
		}
		If ($achiev2 == true){
			$sql = "INSERT INTO achievements (Achievement2)
			VALUES ($achiev2)";
		}
		If ($achiev3 == true){
			$sql = "INSERT INTO achievements (Achievement3)
			VALUES ($achiev2)";
		}
	}

?>