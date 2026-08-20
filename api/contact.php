<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../PHPMailer/src/Exception.php';
require __DIR__ . '/../PHPMailer/src/PHPMailer.php';
require __DIR__ . '/../PHPMailer/src/SMTP.php';

header('Content-Type: application/json');

function respond(int $status, bool $success, string $message): void
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

// Read raw JSON body if $_POST is empty
$input = $_POST;
if (empty($input)) {
    $rawInput = file_get_contents('php://input');
    $decoded = json_decode($rawInput, true);
    if (is_array($decoded)) {
        $input = $decoded;
    }
}

// Honeypot check
if (!empty($input['website'])) {
    respond(200, true, 'Message sent successfully.');
}

// Collect form fields
$name    = trim($input['name'] ?? '');
$email   = trim($input['email'] ?? '');
$phone   = trim($input['phone'] ?? 'N/A');
$message = trim($input['message'] ?? '');

if (empty($name) || empty($email) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(400, false, 'Please fill in all required fields accurately.');
}

$mail = new PHPMailer(true);

try {
    // SMTP configuration
    $mail->isSMTP();
    $mail->Host       =  getenv('MAIL_HOST') ?: 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = getenv('MAIL_USERNAME') ?: 'daniellawal015@gmail.com';
    $mail->Password   = getenv('MAIL_PASSWORD') ?: 'iphfrykkxtieapim';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Email details
    $mail->setFrom('daniellawal015@gmail.com', 'Portfolio Contact');
    $mail->addAddress('daniellawal015@gmail.com');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = "New Portfolio Message from " . htmlspecialchars($name);
    $mail->Body    = "
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> " . htmlspecialchars($name) . "</p>
        <p><strong>Email:</strong> " . htmlspecialchars($email) . "</p>
        <p><strong>Phone:</strong> " . htmlspecialchars($phone) . "</p>
        <p><strong>Message:</strong><br>" . nl2br(htmlspecialchars($message)) . "</p>
    ";

    $mail->send();
    respond(200, true, 'Your message has been sent successfully!');
} catch (Exception $e) {
    respond(500, false, 'The message could not be sent right now. Please email directly instead.');
}