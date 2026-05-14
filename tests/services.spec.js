// @ts-check
const { test, expect } = require('@playwright/test');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5500';

test.describe('Services page', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/services.html`);
  });

  test('hero heading is visible', async ({ page }) => {
    const heading = page.locator('[data-testid="hero"] h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Our Event Programme - Cloud Saucer');
  });

  test('all 6 service cards render', async ({ page }) => {
    const cards = page.locator('[data-testid="service-card"]');
    await expect(cards).toHaveCount(6);
    for (let i = 0; i < 6; i++) {
      await expect(cards.nth(i)).toBeVisible();
    }
  });

  test('programme titles are present', async ({ page }) => {
    const expectedProgrammes = [
      'Networking Evenings',
      'Clinical Workshops',
      'Speaker Series',
      'Mentorship Programme',
      'Online Community',
      'Annual Conference',
    ];
    const section = page.locator('[data-testid="services-section"]');
    for (const title of expectedProgrammes) {
      await expect(section.getByText(title, { exact: true })).toBeVisible();
    }
  });

  test('featured sessions section has 4 cards', async ({ page }) => {
    const cards = page.locator('[data-testid="process-section"] .featured-card');
    await expect(cards).toHaveCount(4);
  });

  test('bottom CTA button is present and labelled', async ({ page }) => {
    const cta = page.locator('[data-testid="cta-button"]');
    await expect(cta).toBeVisible();
    await expect(cta).toHaveText('Register Now');
  });

  test('hero Book Appointment button is visible', async ({ page }) => {
    const btn = page.locator('[data-testid="hero"] [data-testid="hero-cta"]');
    await expect(btn).toBeVisible();
    await expect(btn).toHaveText('Book Appointment');
  });

  test('nav logo links to page root', async ({ page }) => {
    const logo = page.locator('.nav-logo');
    await expect(logo).toBeVisible();
    await expect(logo.locator('.nav-logo-text')).toHaveText('Tooth Talk');
  });

});
