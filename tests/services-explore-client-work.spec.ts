import { test, expect } from '@playwright/test';

test.describe('Web Tester - epam.com', () => {
  test('Scenario: Explore Client Work via Services menu', async ({ page }) => {
    // Navigate to the site
    await page.goto('https://www.epam.com/');

    // Dismiss common cookie/privacy banner if present (best-effort)
    const acceptButtons = [
      page.getByRole('button', { name: /accept all|accept|agree|got it|allow cookies/i }),
      page.getByRole('button', { name: /accept cookies/i }),
      page.getByText(/Accept All/i),
    ];
    for (const btn of acceptButtons) {
      try {
        if (await btn.count() > 0) {
          await btn.first().click();
          break;
        }
      } catch (e) {
        // ignore errors from optional handlers
      }
    }

    // Open the header Services menu and click the target link
    const services = page.getByRole('link', { name: /services/i });
    await services.first().click();

    // Click the "Explore Our Client Work" link
    const exploreLink = page.getByRole('link', { name: /Explore (Our )?Client Work/i });
    await exploreLink.first().click();

    // Verify that "Client Work" text is visible on the page
    await expect(page.getByText(/Client Work/i)).toBeVisible();
  });
});
