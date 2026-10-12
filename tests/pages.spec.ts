// Pages
// ------------
// NOTE • The static export on its own: the 404 page, and the hand-written
// files from public/ that other places link to (privacy policies, ads.txt)
import { expect, test } from '@playwright/test';

test('unknown URLs get the styled 404 with a 404 status', async ({ page }) => {
	const response = await page.goto('/this-page-does-not-exist/');
	expect(response?.status()).toBe(404);
	await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible();
});

test('every privacy policy linked from the footer exists', async ({ page, request }) => {
	await page.goto('/');
	const links = await page.getByRole('navigation', { name: 'Privacy policy' }).getByRole('link').all();
	expect(links).toHaveLength(5);

	for (const link of links) {
		const href = await link.getAttribute('href');
		const response = await request.get(href ?? '');
		expect(response.status(), href ?? '').toBe(200);
	}
});

test('app-ads.txt is still published for AdMob', async ({ request }) => {
	const response = await request.get('/app-ads.txt');
	expect(response.status()).toBe(200);
	expect(await response.text()).toContain('google.com');
});
