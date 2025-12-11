# Cypress E2E Test Documentation

## Overview
This document describes the End-to-End (E2E) acceptance tests for the Degrid game application. The suite now contains 10 Cypress specs (Tests 1–10) covering navigation, grid interaction, form submission, challenges (happy/unhappy), player management, and validation.

**Test Coverage:**
- ✅ **Happy Paths**: 2+ (Tests 7, 8, 10) - Complete successful user flows
- ✅ **Unhappy Paths**: 2+ (Tests 5, 6, 9) - Error scenarios and validation
- ✅ **Screens Covered**: All 5 screens (StartPage, GridPage, CellRequestPage, ChallengePage, PlayerInfoPage)

---

## Test Setup

### Prerequisites
- **Frontend Server**: Running on `http://localhost:5173`
- **Backend Server**: Running on `http://localhost:3000`
- **Cypress**: Installed via npm (version 15.7.1+)

### Running Tests

**Headless Mode (CI/CD):**
```bash
cd degrid-frontend/SwE2_degrid-frontend
npm install
npx cypress run --headless --browser chrome
```

**Interactive Mode (Development):**
```bash
cd degrid-frontend/SwE2_degrid-frontend
npm install
npx cypress open
```

**Run Specific Test:**
```bash
npx cypress run --headless --spec "cypress/e2e/test_08_happy_path_acquire_cell.cy.js"
```

**Server prerequisites:** Start backend (`npm start` in `degrid-backend/SwE2_degrid-backend`) and frontend (`npm run dev` in `degrid-frontend/SwE2_degrid-frontend`) before launching Cypress.

---

## Test Files Structure

```
cypress/
├── e2e/
│   ├── test_01_start_game.cy.js               # StartPage → GridPage navigation
│   ├── test_02_restart_game.cy.js             # Restart from GridPage
│   ├── test_03_cell_request.cy.js             # Grid adjacent click → CellRequestPage
│   ├── test_04_form_adjacent_cell.cy.js       # Form submission for adjacent cell (Happy Path)
│   ├── test_05_form_non_adjacent_cell.cy.js   # Unhappy Path: non-adjacent cell validation guard
│   ├── test_06_form_invalid_coords.cy.js      # Unhappy Path: invalid coordinates (out of range)
│   ├── test_07_challenge_flow.cy.js           # Challenge flow end-to-end
│   ├── test_08_happy_path_acquire_cell.cy.js  # Happy Path: Challenge SUCCESS (Math.random = 0.1)
│   ├── test_09_unhappy_path_fail_challenge.cy.js # Unhappy Path: Challenge FAILURE (Math.random = 0.95)
│   └── test_10_players_page.cy.js             # Happy Path: Players page view & edit
├── support/
│   └── e2e.js                          # Cypress support configuration
└── screenshots/                        # Auto-generated on test failures
```

---

## Test Coverage by Page (Tests 1–10)

| Page | Covered By | Status |
|------|------------|--------|
| **StartPage** | Tests 1, 2, 7, 8, 9, 10 | ✅ |
| **GridPage** | Tests 1–4, 6–9 | ✅ |
| **CellRequestPage** | Tests 3–6, 8, 9 | ✅ |
| **ChallengePage** | Tests 4, 7–9 | ✅ |
| **PlayerInfoPage** | Test 10 | ✅ |

**Happy Paths** (2+): Tests 7, 8, 10  
**Unhappy Paths** (2+): Tests 5, 6, 9

---

## Test Case Summary (Tests 1–10)

- **Test 1: Start Game Navigation** – Navigate from StartPage to GridPage via START GAME button. ✅
- **Test 2: Restart Game** – Restart button on GridPage reloads game state. ✅
- **Test 3: Adjacent Cell Click** – Clicking an available adjacent cell opens CellRequestPage. ✅
- **Test 4: Form Adjacent Cell (Happy Path)** – Submitting adjacent coordinates succeeds and opens challenge modal. ✅
- **Test 5: Form Non-Adjacent Cell (Unhappy Path)** – Verifies non-adjacent coordinates are rejected.
- **Test 6: Form Invalid Coordinates (Unhappy Path)** – Rejects coordinates outside 0–9 range with error message. ✅
- **Test 7: Challenge Flow** – Complete request → challenge → redirect to grid. ✅
- **Test 8: Happy Path Challenge (Math.random stubbed to 0.1)** – Challenge succeeds; player acquires cell. ✅ **UPDATED: Now guarantees success via stub**
- **Test 9: Unhappy Path Challenge (Math.random stubbed to 0.95)** – Challenge fails; player doesn't acquire cell; error message shown. ✅ **UPDATED: Now guarantees failure via stub**
- **Test 10: Players Page (Happy Path)** – Navigate to Players page → select player → edit description → save. ✅ **NEW TEST**

---

## Test Configuration

### Cypress Configuration (`cypress.config.js`)
```javascript
{
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'
  }
}
```

### Support File (`cypress/support/e2e.js`)
- Handles uncaught exceptions
- Prevents test failures from expected errors
- Loads before each test file

---

## Test Execution Best Practices

### 1. Server Management
- **Always start backend before running tests**
- **Ensure frontend is running on port 5173**
- Use separate terminal windows for each server

### 2. Test Isolation
- Tests should be independent
- No test should depend on another test's outcome
- Reset game state between test runs if needed

### 3. Debugging Failed Tests
- Check `cypress/screenshots/` for failure screenshots
- Run tests in interactive mode: `npx cypress open`
- Use browser DevTools during interactive runs

### 4. Handling Flaky Tests
- Tests account for random challenge outcomes
- Timeouts are set appropriately (5000ms for challenges)
- Conditional assertions handle both success/failure paths

---

## Future Test Enhancements

### Recommended Additional Tests
1. **Multi-player scenarios** - Test turn-based gameplay
2. **Challenge edge cases** - Test boundary values (1, 100)
3. **Grid state persistence** - Verify cell ownership persists
4. **Network error handling** - Test offline scenarios
5. **Performance testing** - Challenge animation timing
6. **Accessibility testing** - Keyboard navigation, ARIA labels

### Improvements to Consider Before Full Coverage
1. **Error messaging** - Standardize error response format
2. **State management** - Ensure consistent grid updates

---

## Troubleshooting

### Common Issues

**Issue:** Tests fail with "cy.request() failed trying to load"
- **Cause:** Backend server not running
- **Solution:** Start backend: `npm start` in backend directory

**Issue:** Tests fail with "Timed out retrying"
- **Cause:** Frontend not accessible or slow response
- **Solution:** Verify frontend is running, check console for errors

**Issue:** Canvas click doesn't register
- **Cause:** Coordinates may be incorrect for grid layout
- **Solution:** Adjust click coordinates in test or use data-testid attributes

**Issue:** Challenge result is unpredictable
- **Cause:** Random number generation (expected behavior)
- **Solution:** Tests handle both success/failure outcomes

---

## Continuous Integration

### Sample CI/CD Pipeline (GitHub Actions)

```yaml
name: E2E Tests
on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
      
      - name: Install dependencies
        run: npm ci
      
      - name: Start Backend
        run: |
          cd degrid-backend/SwE2_degrid-backend
          npm start &
      
      - name: Start Frontend
        run: |
          cd degrid-frontend/SwE2_degrid-frontend
          npm run dev &
      
      - name: Wait for servers
        run: sleep 10
      
      - name: Run Cypress tests
        run: npx cypress run --headless
      
      - name: Upload screenshots
        if: failure()
        uses: actions/upload-artifact@v3
        with:
          name: cypress-screenshots
          path: cypress/screenshots
```

---

## Conclusion

These E2E tests (1–10) cover the Degrid game's core user flows. They validate:
- ✅ Navigation across all 5 pages
- ✅ User interactions with grid clicks, forms, and challenges
- ✅ Challenge mechanics with controlled random outcomes (happy/unhappy paths)
- ✅ Input validation, including the non-adjacent request guard (Test 5)
- ✅ State updates and redirects back to grid

The tests serve both as **validation** of current functionality and **documentation** of expected behavior for future development.

---

## Contact & Maintenance

**Last Updated:** December 10, 2025  
**Test Framework:** Cypress 15.7.1  
**Coverage:** 10 Specs (Tests 1–10), 5 Pages, no known blocking bugs

For questions or to report test issues, please refer to the project repository or contact the development team.
