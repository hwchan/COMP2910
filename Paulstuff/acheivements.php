<?php
$cookie_name = "user";
$cookie_value;
$achiev1;
$achiev2;
$achiev3;
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
	
	//sets variables to form values true or false
	if ($_SERVER["REQUEST_METHOD"] == "POST") {
		$achiev1 = $_POST["achievement1"];
		$achiev2 = $_POST["achievement2"];
		$achiev3 = $_POST["achievement3"];
	}
			If($_COOKIE == null) {
				//gives cookie a random value
				$cookie_value = rand(0, PHP_INT_MAX);
				setcookie($cookie_name, $cookie_value, time() + (86400 * 40000), "/");
				//echo "setting cookie <br>";
				//echo $cookie_value . "<br>";
				echo 'please refresh page to see your achievements';
				//inserts records into table
				if($achiev1 == 'true'){
					$sql = "INSERT INTO achievements (userID ,Achievement1)
					VALUES ('$cookie_value', '$achiev1')";
					if ($conn->query($sql) === TRUE) {
						//echo "New record created successfully<br>";
					} else {
						//echo "Error: " . $sql . "<br>" . $conn->error;
					}
				} else if ($achiev2 == 'true'){
					$sql = "INSERT INTO achievements (userID ,Achievement2)
					VALUES ('$cookie_value', '$achiev2')";
					if ($conn->query($sql) === TRUE) {
						//echo "New record created successfully<br>";
					} else {
						//echo "Error: " . $sql . "<br>" . $conn->error;
					}
				} else if ($achiev3 == 'true'){
					$sql = "INSERT INTO achievements (userID ,Achievement3)
					VALUES ('$cookie_value', '$achiev3')";
					if ($conn->query($sql) === TRUE) {
						//echo "New record created successfully<br>";
					} else {
						//echo "Error: " . $sql . "<br>" . $conn->error;
					}
				} else {
					$sql = "INSERT INTO achievements (userID)
					VALUES ('$cookie_value')";
					if ($conn->query($sql) === TRUE) {
						//echo "New record created successfully<br>";
					} else {
						//echo "Error: " . $sql . "<br>" . $conn->error;
					}
				} 
			} else {
				//echo "cookie is set <br>";
				//echo $_COOKIE[$cookie_name] . "<br>";
				if($achiev1 == 'true'){
					$sql = "UPDATE achievements
					SET Achievement1 = '$achiev1'
					WHERE userID = '$_COOKIE[$cookie_name]'";
					if ($conn->query($sql) === TRUE) {
						//echo "<br>New record created successfully<br>";
					} else {
						//echo "Error: " . $sql . "<br>" . $conn->error;
					}
				} else if ($achiev2 == 'true'){
					$sql = "UPDATE achievements
					SET Achievement2 = '$achiev2'
					WHERE userID = '$_COOKIE[$cookie_name]'";
					if ($conn->query($sql) === TRUE) {
						//echo "<br>New record created successfully<br>";
					} else {
						//echo "Error: " . $sql . "<br>" . $conn->error;
					}
				} else if ($achiev3 == 'true'){
					$sql = "UPDATE achievements
					SET Achievement3 = '$achiev3'
					WHERE userID = '$_COOKIE[$cookie_name]'";
					if ($conn->query($sql) === TRUE) {
						//echo "<br>New record created successfully<br>";
					} else {
						//echo "Error: " . $sql . "<br>" . $conn->error;
					}
				} else{
					// do nothing
				}
			}

		$sql = "SELECT Achievement1
		FROM achievements
		WHERE userID = '$_COOKIE[$cookie_name]'";
		$itemList = $conn->query($sql);
		if($row = $itemList->fetch_assoc()) {
			if ($row['Achievement1'] == 'true'){
				echo '<br>You have unlocked achievement 1: Out of Time.<br>';
			} else{
				echo 'achievement 1 not unlocked yet<br>';
			}
		}
		$sql = "SELECT Achievement2
		FROM achievements
		WHERE userID = '$_COOKIE[$cookie_name]'";
		$itemList = $conn->query($sql);
		if($row = $itemList->fetch_assoc()) {
			if ($row['Achievement2'] == 'true'){
				echo 'You have unlocked achievement 2: First steps.<br>';
			} else{
				echo 'achievement 2 not unlocked yet<br>';
			}
		}
		$sql = "SELECT Achievement3
		FROM achievements
		WHERE userID = '$_COOKIE[$cookie_name]'";
		$itemList = $conn->query($sql);
		if($row = $itemList->fetch_assoc()) {
			if ($row['Achievement3'] == 'true'){
				echo 'You have unlocked achievement 3: Master of the walk.<br>';
			} else{
				echo 'achievement 3 not unlocked yet<br>';
			}
		}

?>