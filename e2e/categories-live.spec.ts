import { test, expect } from '@playwright/test';

test('Flip through online categories', async ({ page }) => {
  await page.goto('https://dsw3grf708zy.cloudfront.net/');
  await page.getByRole('link', { name: 'Shopping' }).nth(1).click();
  await expect(page.getByText('HifiCorp Voucher')).toBeVisible();
  await page.getByRole('link', { name: 'Fuel' }).click();
  await page.getByText('Fuel vouchers', { exact: true }).click();
  await expect(page.getByText('Fuel vouchers', { exact: true })).toBeVisible();
  await expect(page.getByText('BP Fleetmove Voucher').nth(3)).toBeVisible();
  await page.getByRole('link', { name: 'Healthcare' }).click();
  await expect(page.getByText('Healthcare vouchers')).toBeVisible();
  await expect(page.getByText('Single Vision Lenses and')).toBeVisible();
  await page.getByRole('link', { name: 'Airtime' }).click();
  await expect(page.getByText('Airtime vouchers')).toBeVisible();
  await expect(page.getByText('CellC South Africa, 200 ZAR')).toBeVisible();
  await page.getByRole('link', { name: 'Data' }).click();
  await expect(page.getByText('Data vouchers')).toBeVisible();
  await expect(page.getByText('12GB data + 6GB Nite data, 30')).toBeVisible();
  await page.getByRole('link', { name: 'All categories +' }).click();
  await expect(page.getByText('Select a category to get')).toBeVisible();
});
