# Movie Catalog & Client-Side Search (Moveo.AI Frontend Challenge)

A single-page React application built with **TypeScript**, **Tailwind CSS**, and **Framer Motion** that consumes the static paginated endpoint `https://jsonfakery.com/movies/paginated`.

---

## Technical Highlights & Architecture

1. **Client-Side Data Aggregation for Search:**
   - The endpoint `https://jsonfakery.com/movies/paginated` is static and does not support server-side search.
   - When a user enters a query into the search box, the custom `useMovies` hook fetches all available pages in parallel and aggregates them into a complete local dataset before executing debounced client-side filtering on `original_title`.
2. **In-Place Accordion Expansion:**
   - Clicking a movie card expands it smoothly *in place* using Framer Motion layout transitions without re-rendering or navigating away.
   - Reveals full Cast Members (`casts` array: names, character roles, and avatars) and static JSON metadata.
3. **Resilience & Fallback Strategy:**
   - Includes full error handling and graceful offline/CORS fallback data if the external static endpoint is unavailable.

---

## How to Run

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Run Unit Tests (Vitest & React Testing Library)
```bash
npm test
```

### 4. Production Build
```bash
npm run build
```

---

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Header.tsx           # Navigation bar with search input and sort controls
│   │   ├── MovieCard.tsx        # Expandable movie card with Framer Motion in-place animation
│   │   ├── MovieGrid.tsx        # Skeleton loaders, empty search views, grid container
│   │   └── Pagination.tsx       # Page-by-page catalog browsing control
│   ├── data/
│   │   └── mockMovies.ts        # Fallback offline dataset
│   ├── hooks/
│   │   └── useMovies.ts         # Central custom hook managing pagination, full-scan search, and sorting
│   ├── types/
│   │   └── movie.ts             # TypeScript interfaces for Movie, CastMember, PaginatedResponse
│   └── test/
│       └── setup.ts             # Vitest test setup with @testing-library/jest-dom
```
