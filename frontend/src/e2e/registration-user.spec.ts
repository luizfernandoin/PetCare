import { test, expect } from "@playwright/test";

test("Mensagem de sucesso depois do cadastro", async ({ page }) => {
  await page.goto("http://localhost:5173/auth/signup");
  await page.click('text=Entrar');
  await expect(page.locator('text=Cadastro realizado com sucesso')).toBeVisible();
});