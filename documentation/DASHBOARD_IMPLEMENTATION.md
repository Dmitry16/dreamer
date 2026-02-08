# Dashboard Feature

This document describes the Dashboard implementation for the Dreamer MVP.

## Overview

The Dashboard is the main entry point for the Dreamer application. It displays:
- A list of dream entries ordered by date (most recent first)
- Status badges showing the progress of each dream session
- Empty state when no dreams exist
- A primary CTA button to record a new dream

## Components

### DashboardPage (`src/screens/DashboardPage.tsx`)
Main screen component that:
- Authenticates users anonymously via Firebase
- Subscribes to real-time dream updates from Firestore
- Shows loading state during initialization
- Renders empty state or dream list based on data

### DreamListItem (`src/entities/dream/ui/DreamListItem.tsx`)
Individual dream card component that displays:
- Dream date (formatted)
- Dream excerpt (truncated to 120 characters)
- Status badge
- Optional mood indicator
- Click handler to navigate to full dream session

### StatusBadge (`src/shared/ui/StatusBadge/StatusBadge.tsx`)
Reusable badge component that displays dream status:
- Draft
- Structured
- Associated
- Interpreted
- Integrated

## Testing

All components are fully tested using Jest and React Testing Library:
- **StatusBadge**: 6 tests
- **DreamListItem**: 6 tests
- **DashboardPage**: 5 tests
- **App**: 1 test

Run tests with:
```bash
npm test
```

## Setup

1. Copy `.env.example` to `.env`
2. Fill in your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Architecture Alignment

This implementation follows the PROJECT_ARCHITECTURE.md guidelines:
- **screens/**: Top-level routing pages
- **entities/dream/ui/**: Domain-specific UI components
- **shared/ui/**: Reusable UI components
- **services/firestore/**: Data access layer

## Design Tokens

The Dashboard uses design tokens from DESIGN_TOKENS.md:
- Colors: Calm, neutral palette with soft accent colors
- Typography: Readable, non-clinical fonts
- Spacing: Generous whitespace for reflective experience
- No aggressive success/error signaling

## Data Flow

1. User loads Dashboard
2. Firebase anonymous auth is ensured
3. Real-time subscription to `/users/{uid}/dreams` collection
4. Dreams are displayed in reverse chronological order
5. Status is derived from existing artifacts (elements, associations, hypotheses)

## Future Enhancements

- Navigation to dream entry page (Record a Dream button)
- Navigation to read-only session view (clicking dream item)
- Filtering by status
- Search functionality
- Date range filters
