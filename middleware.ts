import { NextRequest, NextResponse } from 'next/server';
import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define routes that are always public (accessible without authentication)
const publicRoutes = createRouteMatcher([
  '/', // Home page
  '/events/:id', // Event details page with dynamic ID
]);

// Define routes that should be completely ignored by Clerk middleware
const ignoredRoutes = createRouteMatcher([
  '/api/webhook/clerk', // Clerk webhook endpoint
  '/api/webhook/stripe', // Stripe webhook endpoint
  '/api/uploadthing', // Upload API endpoint
]);

// Clerk middleware to protect routes
export default clerkMiddleware((auth, request) => {
  // Check for public routes first (highest priority)
  if (publicRoutes(request)) {
    return NextResponse.next(); // Allow access for public routes
  }

  // Check for ignored routes (next priority)
  if (ignoredRoutes(request)) {
    return NextResponse.next(); // Bypass Clerk middleware for ignored routes
  }

  // If not a public or ignored route, enforce authentication using Clerk
  auth().protect();
});

// Configuration for routes matching
export const config = {
  matcher: [
    "/((?!\\..|_next).)*", // Match any route except those starting with dot (.) or _next
    "/", // Match root route
    "/(api|trpc)(.)*", // Match routes starting with /api or /trpc
  ],
};
