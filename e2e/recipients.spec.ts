import { test, expect } from '@playwright/test';

test('create+select new recipient', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByLabel('Email address:').click();
  await page.getByLabel('Email address:').click();
  await page.getByLabel('Email address:').fill('simbashumi@lipaworld.com');
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill('P8ssword');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('link', { name: 'My Recipients' }).click();
  // not displaying My recipients early
  await expect(page.getByRole('main')).toContainText('My recipients');
  await expect(page.getByRole('main')).toContainText('Drew Collins');
  await page.getByRole('link', { name: 'Create Recipient' }).click();
  await expect(page.getByRole('main')).toContainText("Recipient's details");
  await page.getByLabel('First name*:').click();
  await page.getByLabel('First name*:').fill('Slick');
  await page.getByLabel('Last name*:').click();
  await page.getByLabel('Last name*:').fill('Rick');
  await page.getByPlaceholder('Enter phone number').click();
  await page.getByPlaceholder('Enter phone number').fill('+27 11 111 1111');
  await page.getByLabel('Email address (optional)').click();
  await page.getByLabel('Email address (optional)').fill('slick@lipaworld.com');
  await page.getByLabel('Electricity meter number (').click();
  await page.getByLabel('Electricity meter number (').fill('1284748474');
  await page.getByRole('button', { name: 'Create Recipient' }).click();
  await page.getByRole('link', { name: 'My Recipients' }).click();
  await expect(page.getByText('Slick Rick')).toBeVisible();
  await expect(page.getByRole('main')).toContainText(
    'Mobile Number: +27111111111'
  );
  await expect(page.getByRole('main')).toContainText(
    'Email: slick@lipaworld.com'
  );
  await expect(page.getByRole('main')).toContainText(
    'Meter Number: 1284748474'
  );
  await page.getByRole('link', { name: 'Shopping' }).click();
  await expect(
    page.locator('.RecipientSelect_selectLabel__ZBKgo').first()
  ).toBeVisible();
  await page.locator('.MuiSelect-select').first().click();
  await expect(page.getByRole('option', { name: 'Slick Rick' })).toBeVisible();
  await page.getByRole('option', { name: 'Slick Rick' }).click();
  await expect(page.getByText("Slick's mobile number: +")).toBeVisible();
  await page.locator('.CartButtons_cart__uEGtK').first().click();
  await page.getByRole('navigation').locator('path').click();
  await expect(page.getByText('Slick Rick')).toBeVisible();
  await page.getByRole('link', { name: 'My Recipients' }).click();
  await expect(page.getByText('Slick Rick')).toBeVisible();
});
