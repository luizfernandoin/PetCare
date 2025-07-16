import { test, expect } from "@playwright/test";

test("Carregando corretamente os dados", async ({ page }) => {
  await page.goto("http://localhost:3000/pets");
  await expect(page.locator('text=Thor')).toBeVisible();
  await expect(page.locator('text=Luna')).toBeVisible();
  await expect(page.locator('text=Max')).toBeVisible();
});


test("Deletar corretamente um pet", async ({ page }) => {
  await page.goto("http://localhost:3000/pets");
  await expect(page.locator('text=Thor')).toBeVisible();
  await page.click('[data-testid="delete-Thor"]');
  await expect(page.locator('text=Thor')).not.toBeVisible();
});