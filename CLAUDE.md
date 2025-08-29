# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Quail is a landing page for a memory-optimized reader application. This is a Next.js 15 project with TypeScript, using Tailwind CSS for styling and Vercel Analytics for tracking.

## Key Architecture

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4 with custom theme variables in `app/globals.css`
- **Fonts**: Google Fonts (Literata for headers, Mulish for body text)
- **Analytics**: Vercel Analytics integration
- **Email Collection**: Notion API integration via `/api/subscribe` endpoint

## Common Commands

Development:
```bash
npm run dev          # Start development server
npm run build        # Build for production  
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Project Structure

```
app/
├── api/subscribe/   # Email subscription endpoint (Notion integration)
├── components/      # Reusable UI components
├── sections/        # Page section components (features, testimonials, faq)
├── globals.css      # Tailwind config with custom theme
├── layout.tsx       # Root layout with fonts and analytics
└── page.tsx         # Main landing page
```

## Environment Requirements

The email subscription feature requires:
- `NOTION_KEY` - Notion API token
- `NOTION_DATABASE_ID` - Target database ID

The Notion database must have an "Email" column (case-sensitive) for the integration to work.

## Styling System

- Custom color palette defined in CSS variables in `globals.css`
- Two font families: `--font-header` (Literata) and `--font-body` (Mulish)  
- Responsive design with mobile-first approach
- Custom highlight animations using the `FadingHighlight` component

## Component Architecture

- `page.tsx`: Main landing page with hero, testimonials, features, and CTA sections
- `components/`: Shared UI components (navbar, email signup, fading text animations)
- `sections/`: Larger page sections organized by functionality