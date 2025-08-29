#!/usr/bin/env node

// Custom server entry point for Firebase App Hosting
// This ensures the app listens on the correct port

// Set PORT to 8080 if not already set (Firebase App Hosting default)
if (!process.env.PORT) {
  process.env.PORT = '8080';
}

// Set HOST to 0.0.0.0 to allow external connections
if (!process.env.HOST) {
  process.env.HOST = '0.0.0.0';
}

console.log(`Starting server on ${process.env.HOST}:${process.env.PORT}`);

// Import and run the built SvelteKit app
import('./build/index.js');