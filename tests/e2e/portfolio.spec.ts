import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', title: /Muhammad Arslan/ },
  { path: '/about.html', title: /About/ },
  { path: '/experience.html', title: /Experience/ },
  { path: '/projects.html', title: /Projects/ },
  { path: '/projects/dealeriq.html', title: /DealerIQ AI/ },
  { path: '/projects/befer.html', title: /Befer AI/ },
  { path: '/projects/leadly.html', title: /Leadly.ai/ },
  { path: '/skills.html', title: /Skills/ },
  { path: '/qa-artifacts.html', title: /QA Artifacts/ },
  { path: '/certifications.html', title: /Certifications/ },
  { path: '/contact.html', title: /Contact/ },
  { path: '/404.html', title: /BUG-404/ }
];

test.describe('Portfolio Multi-Page & Status Verification', () => {
  for (const pageInfo of pages) {
    test(`should load ${pageInfo.path} successfully with status 200`, async ({ page }) => {
      const response = await page.goto(pageInfo.path);
      expect(response?.status()).toBe(200);
      await expect(page).toHaveTitle(pageInfo.title);
      await expect(page.locator('header.site-header')).toBeVisible();
      await expect(page.locator('footer.site-footer')).toBeVisible();
    });
  }
});

test.describe('Theme Toggle State Verification', () => {
  test('should toggle between dark and light themes and persist in localStorage', async ({ page }) => {
    await page.goto('/');
    const html = page.locator('html');
    await expect(html).toHaveAttribute('data-theme', 'dark');

    const themeToggle = page.locator('#themeToggle');
    await themeToggle.click();
    await expect(html).toHaveAttribute('data-theme', 'light');

    // Reload page to verify persistence
    await page.reload();
    await expect(html).toHaveAttribute('data-theme', 'light');

    // Switch back to dark
    await page.locator('#themeToggle').click();
    await expect(html).toHaveAttribute('data-theme', 'dark');
  });
});

test.describe('Projects Filter Functionality', () => {
  test('should filter project cards by category on projects.html', async ({ page }) => {
    await page.goto('/projects.html');
    const projectCards = page.locator('.project-grid-card');
    await expect(projectCards).toHaveCount(5);

    // Filter by Web
    await page.getByRole('button', { name: /Web Applications/i }).click();
    const visibleAfterWeb = await page.locator('.project-grid-card:visible').count();
    expect(visibleAfterWeb).toBeGreaterThanOrEqual(3);

    // Filter by Reset All
    await page.getByRole('button', { name: /All Projects/i }).click();
    await expect(page.locator('.project-grid-card:visible')).toHaveCount(5);
  });
});

test.describe('Contact Form Validation & Honeypot Defense', () => {
  test('should trigger validation errors on empty submission', async ({ page }) => {
    await page.goto('/contact.html');
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Check that has-error class was applied to invalid fields
    await expect(page.locator('.form-group.has-error')).toHaveCount(4);
    await expect(page.locator('.form-field-error:visible')).toHaveCount(4);
  });

  test('should flag invalid email addresses', async ({ page }) => {
    await page.goto('/contact.html');
    await page.locator('#cName').fill('John Doe');
    await page.locator('#cEmail').fill('not-a-valid-email');
    await page.locator('#cSubject').fill('Test Subject');
    await page.locator('#cMessage').fill('This is a valid length message for testing.');
    await page.getByRole('button', { name: /Send Message/i }).click();

    const emailParent = page.locator('#cEmail').locator('..');
    await expect(emailParent).toHaveClass(/has-error/);
  });

  test('honeypot should intercept bot submissions', async ({ page }) => {
    await page.goto('/contact.html');
    await page.locator('#cName').fill('Spam Bot');
    await page.locator('#cEmail').fill('bot@spam.com');
    await page.locator('#cSubject').fill('Spam Subject');
    await page.locator('#cMessage').fill('Buy our spam products now!');
    // Fill the hidden honeypot (bots set hidden input values directly)
    await page.locator('#website_hp').evaluate((el: HTMLInputElement) => {
      el.value = 'http://spam-link.com';
    });
    await page.getByRole('button', { name: /Send Message/i }).click();

    // Success banner should NOT show
    await expect(page.locator('#contactSuccessMsg')).not.toBeVisible();
  });
});

test.describe('404 Page Bug Ticket Layout', () => {
  test('should display formal BUG-404 layout with reproduction steps', async ({ page }) => {
    await page.goto('/404.html');
    await expect(page.locator('.bug-id-tag')).toHaveText('BUG-404');
    await expect(page.getByText('HTTP STATUS: 404 NOT FOUND')).toBeVisible();
    await expect(page.locator('.error-repro-box')).toBeVisible();
    await expect(page.getByRole('link', { name: /Back to Safe Territory/i })).toBeVisible();
  });
});

