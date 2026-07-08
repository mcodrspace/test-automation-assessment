# Test Automation Assessment

## Overview

This repository contains my submission for the Test Automation Assessment. The project uses Playwright with TypeScript to automate UI and API testing against publicly available applications.

The solution focuses on building a small, maintainable test suite that demonstrates UI automation, API testing, meaningful assertions, and negative test scenarios without introducing unnecessary complexity.

## Project Structure

```text
pages/
├── CartPage.ts
├── CheckoutPage.ts
├── InventoryPage.ts
└── LoginPage.ts

tests/
├── API/
│   └── restful-booker.spec.ts
└── Web UI/
    ├── checkout.spec.ts
    └── login.spec.ts

.github/
playwright.config.ts
package.json
README.md
```

## Prerequisites

* Node.js (LTS)
* npm

## Installation

Clone the repository and install the project dependencies.

```bash
git clone https://github.com/mcodrspace/test-automation-assessment.git
cd test-automation-assessment
npm install
npx playwright install
```

## Running the Test Suite

Run all tests:

```bash
npx playwright test
```

Run only UI tests:

```bash
npx playwright test tests/web-ui
```

Run only API tests:

```bash
npx playwright test tests/api
```

Run only happy path tests:

```bash
npx playwright test --grep @happy
```

Run only unhappy path tests:

```bash
npx playwright test --grep @unhappy
```

View the HTML report:

```bash
npx playwright show-report
```

The GitHub Actions workflow can also be executed manually from the **Actions** tab.

## Tools Chosen

I chose **Playwright** with **TypeScript** because it supports both browser automation and API testing within a single framework. This allowed me to validate the application's critical user journey through the UI while testing backend CRUD operations directly through the API using the same tooling.

For the UI tests, I implemented the **Page Object Model (POM)** to separate page interactions from test logic, improving readability and maintainability.

## Testing Strategy

### UI Tests

The UI suite focuses on the application's most critical user journey while keeping the test suite intentionally small.

**Happy path**

* Standard user successfully logs in
* Adds products to the cart
* Completes the checkout process

**Unhappy path**

* Locked-out user is prevented from logging in

These scenarios validate the core business workflow from the user's perspective while avoiding unnecessary UI coverage.

### API Tests

The API suite covers the application's core CRUD operations:

* Create booking
* Read booking
* Update booking
* Delete booking

It also includes a negative test that verifies unauthorized updates are rejected using invalid authentication.

CRUD operations are better suited for API testing because they execute faster, are less brittle than UI tests, and validate backend behavior directly.

## What I Would Add With More Time

* Expand UI coverage to include additional authentication, cart, checkout validation, and product management scenarios.
* Expand API coverage with additional negative cases such as invalid IDs, missing required fields, and malformed requests.
* Introduce Playwright authentication state (`storageState`) once the UI suite grows to reduce repeated logins and improve execution time.
* Add environment-specific configuration using environment variables for different test environments.
* Improve reporting by attaching screenshots, traces, and request/response details for failed tests.

## AI Usage

I used AI as a development assistant throughout this assessment to accelerate research, review design decisions, and generate initial implementations.

AI assisted with explaining unfamiliar concepts, brainstorming test strategies, generating initial Playwright code, reviewing the Page Object Model structure, refining the API test suite, and improving the project documentation.

I treated AI-generated content as a starting point rather than a final answer. I reviewed each suggestion, challenged recommendations that did not fit the assessment, corrected inaccurate or overly complex implementations, simplified explanations, and refined the final solution based on my own judgment and understanding.

