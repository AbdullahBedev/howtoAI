import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should display login page', async ({ page }) => {
    await page.goto('/login');
    
    // Check page title
    await expect(page).toHaveTitle(/Login/);
    
    // Check form elements
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
    await expect(page.getByText('Forgot password?')).toBeVisible();
    await expect(page.getByText('Don\'t have an account?')).toBeVisible();
  });
  
  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/login');
    
    // Fill in the form with invalid credentials
    await page.getByLabel('Email').fill('invalid@example.com');
    await page.getByLabel('Password').fill('wrong-password');
    
    // Submit the form
    await page.getByRole('button', { name: /sign in/i }).click();
    
    // Wait for error message
    const errorMessage = page.getByText(/Invalid/i);
    await expect(errorMessage).toBeVisible();
  });
  
  test('should redirect to dashboard after login', async ({ page }) => {
    // Mock API response for login
    await page.route('/api/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Login successful',
          user: {
            id: 'user-123',
            email: 'test@example.com',
            name: 'Test User',
            role: 'USER',
          }
        }),
      });
    });
    
    await page.route('/api/auth/me', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          user: {
            id: 'user-123',
            email: 'test@example.com',
            name: 'Test User',
            role: 'USER',
          }
        }),
      });
    });
    
    await page.goto('/login');
    
    // Fill in the form
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('ValidPassword123');
    
    // Submit the form and wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      page.getByRole('button', { name: /sign in/i }).click(),
    ]);
    
    // Check we've been redirected to dashboard
    expect(page.url()).toContain('/dashboard');
  });
  
  test('should respect redirect parameter', async ({ page }) => {
    // Mock API response for login
    await page.route('/api/auth/login', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          message: 'Login successful',
          user: {
            id: 'user-123',
            email: 'test@example.com',
            name: 'Test User',
            role: 'USER',
          }
        }),
      });
    });
    
    await page.goto('/login?redirect=%2Fprofile');
    
    // Fill in the form
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Password').fill('ValidPassword123');
    
    // Submit the form and wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      page.getByRole('button', { name: /sign in/i }).click(),
    ]);
    
    // Check we've been redirected to the profile page
    expect(page.url()).toContain('/profile');
  });
}); 