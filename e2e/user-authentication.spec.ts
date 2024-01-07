import { test, expect } from '@playwright/test';

test('login and logout Simba', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address:').click();
  await page.getByLabel('Email address:').fill('simbashumi@lipaworld.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('P8ssword');
  await page.getByLabel('toggle password visibility').click();
  await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
  await page.getByLabel('toggle password visibility').click();
  await expect(page.getByLabel('Password', { exact: true })).toBeVisible();
  await expect(page.getByText('New on Lipaworld? Join Now')).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText(
    'New on Lipaworld? Join Now.'
  );
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.goto('/select-deal?recipientCountryCode=ZA&category=Airtime');
  await expect(page.getByRole('main')).toContainText('Airtime vouchers');
  //simba not showing up when expected
  // await page.waitForTimeout(10000);
  await expect(page.getByRole('main')).toContainText('Simba');
  await expect(page.getByRole('link', { name: 'Simba' })).toBeVisible();
  await page.getByRole('link', { name: 'Simba' }).click();
  await expect(page.getByRole('main')).toContainText('Settings');
  await page.getByRole('button', { name: 'Log me out' }).click();
  await expect(page.getByRole('link', { name: 'Login' })).toBeVisible();
});
