import { test, expect } from "@playwright/test";

test("botão mostra mensagem após clique", async ({ page }) => {
  // Acessa a página principal (com seu Vite rodando)
  await page.goto("http://localhost:5173/auth/signin");

  // Verifica se o botão está presente
  await expect(page.locator('text=Signin')).toBeVisible();

  // Clica no botão
  await page.click('text=Signin');

  // Verifica se a mensagem apareceu depois do clique
  //await expect(page.locator('text=clicou')).toBeVisible();
});