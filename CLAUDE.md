# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Ad-Genie is a React + TypeScript + Vite application. This is currently a minimal Vite-React template with basic counter functionality.

## Development Commands

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (runs TypeScript compilation and Vite build)
- `npm run lint` - Run ESLint linting
- `npm run preview` - Preview production build locally

## Project Structure

- **src/main.tsx** - Application entry point that renders the React app into the DOM
- **src/App.tsx** - Main application component (currently a basic counter demo)
- **src/index.css** - Global styles
- **src/App.css** - Component-specific styles
- **public/** - Static assets served directly
- **index.html** - HTML template with root div for React mounting

## Technology Stack

- **React 19** with TypeScript
- **Vite** for build tooling and development server
- **ESLint** with TypeScript, React Hooks, and React Refresh plugins
- Modern ES modules (type: "module" in package.json)

## Build Configuration

- Uses Vite with the React plugin for fast refresh and HMR
- TypeScript compilation runs before Vite build (`tsc -b && vite build`)
- ESLint configured for TypeScript files with React-specific rules
- Output directory: `dist/` (ignored by ESLint)

## Code Standards

The project uses ESLint with:
- TypeScript ESLint recommended rules
- React Hooks plugin for hook usage validation
- React Refresh plugin for HMR compatibility
- Browser globals configured for client-side development