# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AdGenie is a React + TypeScript + Vite application that transforms product photos into stunning advertisements using AI. Users can upload product images, select from 9 different themes, and generate professional ads using Google's Gemini 2.5 Flash image generation model.

## Key Features

- **Drag & Drop Upload**: Upload product images with validation (PNG, JPG, WEBP up to 10MB)
- **Theme Selection**: Choose from 9 professional ad themes (Minimalist, Festive, Lifestyle, Luxury, Office, Nature, Summer, Bold, Sale)
- **AI Generation**: Real-time ad generation using Google Gemini 2.5 Flash Image API
- **Download**: Download generated ads in high quality
- **Settings**: Configure Google AI Studio API key through secure settings modal
- **Fallback**: Mock generation service when API is not configured

## Development Commands

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (runs TypeScript compilation and Vite build)
- `npm run lint` - Run ESLint linting
- `npm run preview` - Preview production build locally

## Project Structure

- **src/main.tsx** - Application entry point that renders the React app into the DOM
- **src/App.tsx** - Main application component with routing and settings modal
- **src/components/** - React components for different screens and UI elements
  - **UploadScreen.tsx** - File upload interface with drag & drop functionality
  - **ThemeSelection.tsx** - Theme selection grid with 9 different ad styles
  - **ResultsScreen.tsx** - Ad generation results and download interface
  - **Header.tsx** - Application header with logo and settings button
  - **SettingsModal.tsx** - API key configuration modal
- **src/services/aiService.ts** - Google Gemini 2.5 Flash integration and mock fallback
- **src/hooks/useAppContext.tsx** - React Context for global state management
- **src/utils/** - Utility functions for storage, downloads, etc.
- **src/types.ts** - TypeScript type definitions
- **src/index.css** - Global Tailwind CSS styles
- **public/** - Static assets served directly
- **index.html** - HTML template with root div for React mounting

## Technology Stack

- **React 19** with TypeScript
- **Vite** for build tooling and development server
- **React Router** for client-side routing
- **React Dropzone** for file upload functionality
- **Tailwind CSS 3.4.0** for styling
- **Lucide React** for consistent iconography
- **Google Gemini 2.5 Flash Image API** for AI-powered ad generation
- **ESLint** with TypeScript, React Hooks, and React Refresh plugins
- Modern ES modules (type: "module" in package.json)

## Build Configuration

- Uses Vite with the React plugin for fast refresh and HMR
- TypeScript compilation runs before Vite build (`tsc -b && vite build`)
- ESLint configured for TypeScript files with React-specific rules
- Output directory: `dist/` (ignored by ESLint)

## Google AI Studio API Setup

To use the actual AI-powered ad generation (instead of mock responses):

1. **Get API Key**: Visit [Google AI Studio](https://aistudio.google.com/app/apikey) and create an API key
2. **Configure in App**: Click the settings button in the header and enter your API key
3. **Test Generation**: Upload a product image, select a theme, and generate an ad

### API Integration Details

- **Model**: `gemini-2.5-flash-image-preview`
- **Endpoint**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image-preview:generateContent`
- **Authentication**: API key in `x-goog-api-key` header
- **Input**: Product image (base64) + detailed theme-based prompt
- **Output**: Generated advertisement image (base64)
- **Pricing**: $30.00 per 1M output tokens (~$0.039 per image)
- **Features**: Supports character consistency, targeted transformations, world knowledge integration

### Fallback Behavior

- If no API key is configured, the app uses mock placeholder images
- If API call fails, it falls back to mock generation
- Users see clear error messages for configuration issues

## Code Standards

The project uses ESLint with:
- TypeScript ESLint recommended rules
- React Hooks plugin for hook usage validation
- React Refresh plugin for HMR compatibility
- Browser globals configured for client-side development