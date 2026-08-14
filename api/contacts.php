<?php
/**
 * Contact form endpoint.
 *
 * Phase 1: request-method guard and a JSON response contract only, so
 * src/js/contact.js has a stable shape to build against in Phase 12.
 * Real validation, sanitization, and mail-sending logic (with no
 * credentials ever exposed to the frontend) is implemented at that phase.
 */

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed.'
    ]);
    exit;
}

http_response_code(501);
echo json_encode([
    'success' => false,
    'message' => 'Contact endpoint not yet implemented (Phase 12).'
]);
