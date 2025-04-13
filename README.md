# Video Progress Tracking System

A modern web application for tracking user progress in video courses. Built with the MERN stack (MongoDB, Express, React, Node.js), this system allows users to track their viewing progress across multiple videos with precise interval tracking.

## Features

- User authentication and profile management
- Video course browsing and categorization
- Precise video progress tracking
- Resume videos from where you left off
- Interactive UI with modern animations
- Responsive design for all devices

## Technical Architecture

### Frontend
- React with JavaScript
- Material-UI for component library
- Responsive design with CSS animations
- Vite for fast development and bundling

### Backend
- Node.js with Express.js
- MongoDB for data storage
- JWT authentication
- RESTful API architecture

## Design Documentation

### How We Track Watched Intervals

The system uses a sophisticated interval tracking approach to record user viewing behavior:

1. **Interval Capture**: As users watch videos, the system captures intervals with start and end timestamps (in seconds) representing portions of the video that have been watched.

2. **Storage Structure**: Each progress record in the database contains:
   - User ID: Reference to the user
   - Video ID: Reference to the specific video
   - Video Duration: Total duration of the video in seconds
   - Watched Intervals: Array of `{start, end}` objects marking watched segments
   - Last Position: The most recent playback position
   - Total Progress: Calculated percentage of unique content viewed

3. **Event-Based Tracking**: The frontend records viewing intervals based on several events:
   - Play/pause actions
   - Seeking within the video
   - Regular interval updates during continuous playback
   - Tab visibility changes
   - Window focus/blur events

### How We Merge Intervals to Calculate Unique Progress

To accurately calculate how much unique content a user has watched, we employ an interval merging algorithm:

```javascript
// Helper function to merge intervals
const mergeIntervals = (intervals) => {
  if (intervals.length <= 1) return intervals;

  intervals.sort((a, b) => a.start - b.start);
  const result = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const current = intervals[i];
    const last = result[result.length - 1];

    if (current.start <= last.end) {
      last.end = Math.max(last.end, current.end);
    } else {
      result.push(current);
    }
  }

  return result;
};

// Calculate total unique time watched
const calculateProgress = (intervals, duration) => {
  const merged = mergeIntervals(intervals);
  const totalWatched = merged.reduce((acc, interval) => acc + (interval.end - interval.start), 0);
  return Math.min(100, (totalWatched / duration) * 100);
};
```

This algorithm:
1. Sorts all intervals by their start time
2. Iterates through them, merging overlapping intervals
3. Calculates the total unique time watched by summing the duration of each merged interval
4. Converts this to a percentage of the total video duration

### Challenges and Solutions

1. **Challenge**: Handling frequent interval updates without overloading the server.
   **Solution**: Implemented a debounced approach that batches interval updates and sends them periodically rather than on every small playback change.

2. **Challenge**: Accurate progress calculation with non-linear viewing patterns.
   **Solution**: The interval merging algorithm ensures that we accurately track unique content watched, even when users skip around or rewatch sections.

3. **Challenge**: Maintaining state during page reloads or network interruptions.
   **Solution**: We regularly persist progress to localStorage as a backup, allowing us to recover state if the connection to the server is lost.

4. **Challenge**: Converting from TypeScript to JavaScript while maintaining code quality.
   **Solution**: We implemented JSDoc annotations to preserve type information and maintained careful code organization to ensure maintainability.

5. **Challenge**: Cross-browser compatibility issues with the HTML5 video API.
   **Solution**: Created a wrapper component that normalizes video events across different browsers and provides a consistent interface.

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/video-progress-system.git
   cd video-progress-system
   ```

2. Install dependencies for backend and frontend
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Set up environment variables
   Create `.env` files in both backend and frontend directories with the required variables.

4. Start the development servers
   ```
   # In backend directory
   npm run dev
   
   # In frontend directory
   npm run dev
   ```

