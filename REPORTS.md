# Security Audit Report

**Date:** February 7, 2026
**Target:** `server` directory (HungryBuy Backend)
**Auditor:** Gemini CLI

## Executive Summary

A comprehensive security analysis of the `server` codebase was conducted. The application uses Express.js (v5), Prisma, and JWT for authentication. While basic security measures like password hashing (bcrypt) and JWT verification are in place, several critical and medium-severity vulnerabilities were identified that could compromise user data and system integrity.

## Vulnerability Analysis

### 1. Insecure Direct Object References (IDOR) in Cart & Order Operations (High Severity)
**Location:** `src/controllers/cart.controller.ts`, `src/controllers/order.controller.ts`
**Description:**
The application uses `tableId` (a UUID) to identify carts and orders. Several endpoints (e.g., `GET /cart/:tableId`, `POST /cart/add-to-cart/:tableId`) accept `tableId` as a parameter without verifying if the authenticated user has a valid session for that specific table.
**Impact:**
Although `tableId` is a UUID and hard to guess, if a malicious actor obtains a valid `tableId` (e.g., by scanning a QR code or intercepting traffic), they can view, modify, or clear the cart and place orders for that table.
**Recommendation:**
- Implement a "Table Session" mechanism. When a user scans a QR code (`resolveQr`), issue a temporary, signed "Table Token" (JWT) containing the `tableId`.
- Require this token for all cart and order operations instead of identifying the table solely by the URL parameter.

### 2. Stored XSS via File Upload (High Severity)
**Location:** `src/utils/upload.ts`
**Description:**
The file upload mechanism validates files based on `file.mimetype` (e.g., `image/png`), which is controlled by the client and can be spoofed. Furthermore, the uploaded file is saved with its original extension (`path.extname(file.originalname)`).
**Impact:**
An attacker can upload a malicious script (e.g., `exploit.html` or `exploit.php`) with a spoofed content type of `image/png`. Since `server.ts` serves the `uploads` directory via `express.static`, accessing the uploaded file could execute the script in the victim's browser (Stored XSS).
**Recommendation:**
- Validate the file's "magic numbers" (file signature) to ensure it is truly an image.
- **Critical:** Do not use the user-provided file extension. Force the extension to `.png` or `.jpg` based on the detected content type.
- Serve uploaded files with `Content-Disposition: attachment` or host them on a separate domain (CDN).

### 3. Lack of Rate Limiting (Medium Severity)
**Location:** `src/server.ts`, `src/routes/auth.route.ts`
**Description:**
There is no rate limiting configured globally or on sensitive endpoints like `/auth/send-otp` or `/auth/login`.
**Impact:**
- **Brute Force:** Attackers can brute-force the 6-digit OTP in a short period.
- **DDoS:** The API is vulnerable to Denial of Service attacks.
**Recommendation:**
- Install `express-rate-limit`.
- Apply strict limits to OTP generation and login endpoints (e.g., 3 attempts per minute).
- Apply a global rate limit for all API routes.

### 4. Permissive CORS Configuration (Medium Severity)
**Location:** `src/server.ts`
**Description:**
The application uses `cors()` with default settings, which allows requests from any origin (`*`).
**Impact:**
This allows any malicious website to communicate with your API on behalf of a user (if browser-based auth were used) and exposes the API to unauthorized usage.
**Recommendation:**
- Configure CORS to allow only trusted origins (e.g., `process.env.FRONTEND_URL`).

### 5. Missing Security Headers (Low Severity)
**Location:** `src/server.ts`
**Description:**
Standard security headers (e.g., HSTS, X-Content-Type-Options, X-Frame-Options) are missing.
**Recommendation:**
- Install and use `helmet`.

## Proposed Action Plan

1.  **Immediate Fixes:**
    - Install `helmet` and `express-rate-limit`.
    - Secure `upload.ts` by enforcing file extensions.
    - Configure CORS and Rate Limiting in `server.ts`.
2.  **Architectural Improvements:**
    - Refactor Cart/Order flow to use signed Table Tokens.

---
**End of Report**

