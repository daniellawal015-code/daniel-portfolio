<?php
/**
 * Contact form endpoint.
 *
 * Validates and sanitizes input server-side (never trusts the client),
 * checks a honeypot field for basic bot filtering, and sends mail via
 * PHP's native mail(). No credentials live here — if you move to an SMTP
 * service (e.g. Postmark, SendGrid, Resend), set its API key as a server
 * environment variable and read it with getenv(), never hardcode it here.
 *
 * NOTE: PHP's mail() depends on the server having a configured mail
 * transport (sendmail/postfix). Many local dev environments and some
 * hosts don't have this set up out of the box — see README.md for notes
 * on swapping this for an SMTP-based sender in production.
 */

header('Content-Type: application/json');

const RECIPIENT_EMAIL = 'daniellawal015@gmail.com';
const MAX_MESSAGE_LENGTH = 5000;
const MAX_NAME_LENGTH = 120;

function respond(int $status, bool $success, string $message): void
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

$raw = file_get_contents('php://input');
$input = json_decode($raw, true);

if (!is_array($input)) {
    respond(400, false, 'Malformed request.');
}

// Honeypot: real visitors never populate this hidden field.
if (!empty($input['website'])) {
    // Return a success-shaped response so bots don't learn the honeypot failed.
    respond(200, true, 'Message sent.');
}

$name = trim((string) ($input['name'] ?? ''));
$email = trim((string) ($input['email'] ?? ''));
$phone = trim((string) ($input['phone'] ?? ''));
$message = trim((string) ($input['message'] ?? ''));

$errors = [];

if ($name === '' || mb_strlen($name) > MAX_NAME_LENGTH) {
    $errors[] = 'name';
}

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'email';
}

if ($message === '' || mb_strlen($message) > MAX_MESSAGE_LENGTH) {
    $errors[] = 'message';
}

if (!empty($errors)) {
    respond(422, false, 'Please check the following field(s): ' . implode(', ', $errors));
}

$safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$safePhone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$safeMessage = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

$subject = 'Portfolio contact — ' . $safeName;
$body = "New message from the portfolio contact form:\n\n"
    . "Name: {$safeName}\n"
    . "Email: {$email}\n"
    . ($safePhone !== '' ? "Phone: {$safePhone}\n" : '')
    . "\nMessage:\n{$safeMessage}\n";

$headers = [
    'From: no-reply@' . ($_SERVER['SERVER_NAME'] ?? 'localhost'),
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8'
];

$sent = @mail(RECIPIENT_EMAIL, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    respond(200, true, 'Message sent — thanks, I\'ll reply soon.');
}

respond(500, false, 'The message could not be sent right now. Please email directly instead.');
