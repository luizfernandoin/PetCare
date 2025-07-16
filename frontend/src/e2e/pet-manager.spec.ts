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

test("Preenche formulário de pet e clica em salvar", async ({ page }) => {
  // Acessa a página de cadastro do pet
  await page.goto("http://localhost:3000/pets");

  // Clica no botão "Novo Pet"
  await page.click('text=Novo Pet');

  // Preenche os campos do formulário
  await page.fill('input[placeholder="Nome"]', 'Shadow');
  await page.fill('input[placeholder="Raça"]', 'Labrador');
  await page.fill('input[placeholder="Porte"]', 'Grande');
  await page.fill('input[placeholder="Idade"]', '3');
  await page.fill('input[placeholder="Características"]', 'Brincalhão, leal e esperto');
  await page.fill('input[placeholder="Imagem URL"]', 'https://source.unsplash.com/featured/?dog&sig=7');

  // Clica no botão "Salvar"
  await page.click('text=Salvar');

  // Verifica se o pet "Shadow" aparece após salvar
  await expect(page.locator('text=Shadow')).toBeVisible();
});