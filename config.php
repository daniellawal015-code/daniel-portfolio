<?php
/**
 * Single environment toggle. In development, run `npm run dev` and set this
 * to 'development' so includes/vite.php points asset tags at the Vite dev
 * server (with HMR). Before deploying, run `npm run build` and set this to
 * 'production' so includes/vite.php reads the built manifest instead.
 */
define('APP_ENV', 'development');
