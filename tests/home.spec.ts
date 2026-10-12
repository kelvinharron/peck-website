// Home
// ------------
// NOTE • The two things the page exists to do: sell the idea, and get people
// to the App Store
import { expect, test } from '@playwright/test';

test('leads with the pitch and links to the App Store', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toHaveText(/minus the counting/);
	await expect(page.getByRole('heading', { name: /you ain.t my pal/ })).toBeVisible();
	await expect(page.getByRole('link', { name: 'Download Peck on the App Store' }).first()).toHaveAttribute(
		'href',
		'https://apps.apple.com/app/id6760778069'
	);
});

test('the composer demo grows an estimate out of the bar', async ({ page }) => {
	await page.goto('/');
	await page.locator('#how').scrollIntoViewIfNeeded();
	// NOTE • The card is always in the DOM — data-show is what puts it on screen
	await expect(page.locator('#how [data-show="true"]', { hasText: 'About 405 kcal' })).toHaveCount(1, {
		timeout: 10_000,
	});
});
