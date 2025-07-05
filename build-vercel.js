#!/usr/bin/env node
import { execSync } from 'child_process';
import { cpSync, mkdirSync } from 'fs';
import { join } from 'path';

console.log('Building for Vercel deployment...');

// Build the client
console.log('Building client...');
execSync('npx vite build', { stdio: 'inherit' });

// Create dist directory structure
mkdirSync('dist', { recursive: true });

// Copy server files (we'll let Vercel handle the compilation)
console.log('Copying server files...');
cpSync('server', 'dist/server', { recursive: true });
cpSync('shared', 'dist/shared', { recursive: true });

console.log('Build complete! Ready for Vercel deployment.');