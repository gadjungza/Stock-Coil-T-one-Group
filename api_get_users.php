<?php
// ตั้งค่าการเชื่อมต่อฐานข้อมูล (เหมือนไฟล์ api_register.php)
$servername = "localhost";
$db_username = "root";
$db_password = "";
$dbname = "t_one_db"; // <-- ตรวจสอบว่าเป็นชื่อฐานข้อมูลที่ถูกต้อง

// ตั้งค่า Header เพื่อให้ตอบกลับเป็น JSON
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // อนุญาตให้เข้าถึงจากทุกที่ (สำหรับ Development)

// สร้างการเชื่อมต่อ
$conn = new mysqli($servername, $db_username, $db_password, $dbname);

// ตรวจสอบการเชื่อมต่อ
if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'การเชื่อมต่อฐานข้อมูลล้มเหลว: ' . $conn->connect_error]);
    exit();
}

$conn->set_charset("utf8mb4");

// เตรียมคำสั่ง SQL เพื่อดึงข้อมูลผู้ใช้ทั้งหมด
// เราไม่ดึง password_hash มาด้วยเพื่อความปลอดภัย
$sql = "SELECT id, fullname, username, user_role, company, branch, branch_code FROM users ORDER BY id DESC";
$result = $conn->query($sql);

$users = [];
if ($result->num_rows > 0) {
    // วนลูปเพื่อเก็บข้อมูลผู้ใช้แต่ละคนลงใน Array
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
    echo json_encode(['success' => true, 'data' => $users]);
} else {
    // ถ้าไม่มีข้อมูลในตาราง
    echo json_encode(['success' => true, 'data' => []]);
}

$conn->close();
?>