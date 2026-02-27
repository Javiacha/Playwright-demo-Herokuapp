# Playwright + Cucumber Framework

> Enterprise test automation framework targeting [the-internet.herokuapp.com](https://the-internet.herokuapp.com)
> Built with Playwright, Cucumber (BDD), TypeScript and Page Object Model.

**Author:** Javier Acha — QA Lead & Test Automation Architect  
**Contact:** javiacha@yahoo.com | [linkedin.com/in/fjamon](https://linkedin.com/in/fjamon)

---

## Stack

| Layer | Tool |
|---|---|
| Browser automation | Playwright 1.44+ |
| BDD framework | Cucumber JS 10 |
| Language | TypeScript 5 |
| Reporting | multiple-cucumber-html-reporter |
| CI/CD | GitHub Actions |

---

## Project structure

```
src/
├── features/             # Gherkin feature files
│   ├── login.feature
│   ├── checkboxes.feature
│   ├── alerts.feature
│   ├── tables.feature
│   ├── dropdown.feature
│   └── dynamic_loading.feature
├── steps/                # Step definitions (one per feature)
│   ├── login.steps.ts
│   ├── checkboxes.steps.ts
│   ├── alerts.steps.ts
│   ├── tables.steps.ts
│   ├── dropdown.steps.ts
│   └── dynamic_loading.steps.ts
├── pages/                # Page Object Model
│   ├── BasePage.ts
│   ├── LoginPage.ts
│   ├── CheckboxesPage.ts
│   ├── AlertsPage.ts
│   ├── TablesPage.ts
│   ├── DropdownPage.ts
│   ├── IframePage.ts
│   └── DynamicLoadingPage.ts
└── support/
    ├── world.ts          # Cucumber World – shared browser context
    ├── hooks.ts          # Before/After hooks + screenshot on failure
    └── report.js         # HTML report generator
.github/workflows/
    └── playwright.yml
cucumber.js               # Cucumber configuration
```

---

## Quick start

```bash
# 1. Install dependencies
npm install

# 2. Install browsers
npx playwright install --with-deps

# 3. Run all tests
npm test

# 4. Generate HTML report
npm run report
```

---

## Running specific suites

```bash
# Smoke tests only
npm run test:smoke

# Login tests
npm run test:login

# Form tests (checkboxes + dropdown)
npm run test:forms

# Alert tests
npm run test:alerts

# Table tests
npm run test:tables

# Headed mode (visible browser)
npm run test:headed

# Specific browser
BROWSER=firefox npm test
BROWSER=webkit npm test
```

---

## Tags reference

| Tag | Description |
|---|---|
| `@smoke` | Critical path – runs on every PR |
| `@regression` | Full suite – runs on merge and nightly |
| `@login` | Login scenarios |
| `@forms` | Forms: checkboxes, dropdown |
| `@alerts` | JavaScript alert/confirm/prompt |
| `@tables` | HTML table sorting and reading |
| `@dynamic` | Dynamic loading / async content |

---

## Environment variables

| Variable | Description | Default |
|---|---|---|
| `BASE_URL` | Application base URL | `https://the-internet.herokuapp.com` |
| `BROWSER` | Browser: chromium, firefox, webkit | `chromium` |
| `HEADED` | Set to `true` to show browser | `false` |
| `ENV` | Environment name for report | `dev` |

---

## CI/CD

The GitHub Actions workflow runs two jobs:

- **smoke** — triggered on every pull request, Chromium only
- **regression** — triggered on push to main and nightly, runs on Chromium + Firefox + WebKit in parallel

Reports and screenshots are uploaded as artifacts and retained for 14 days.

---

## Test coverage

| Feature | Scenarios | Tags |
|---|---|---|
| Login | 4 | @smoke @regression |
| Checkboxes | 4 | @forms @regression |
| JS Alerts | 4 | @smoke @regression |
| Tables | 5 | @regression |
| Dropdown | 3 | @forms @regression |
| Dynamic Loading | 2 | @regression |
| **Total** | **22** | |
