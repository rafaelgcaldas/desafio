import test, { expect } from '@playwright/test'

test('Render character favorite page with favorite list', async ({ page }) => {
  await page.goto('/favorites', { waitUntil: 'networkidle' })
})

test('Render empty state', async ({ page }) => {
  await page.goto('/favorites', { waitUntil: 'networkidle' })

  await Promise.all([
    expect(
      page.getByText('Você não possui nenhum personagem favorito.')
    ).toBeVisible(),
  ])
})

test('Navigate to details page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const favoriteButton = page
    .locator('div')
    .filter({ hasText: /^3-D Man$/ })
    .getByLabel('Favorite character')

  await favoriteButton.click()

  const favoriteLink = page.getByRole('link', { name: 'Favoritos' })

  await favoriteLink.click()

  const navigateToDetailsButton = page.getByRole('button', { name: 'VER MAIS' })

  await navigateToDetailsButton.click()

  expect(page.url()).toContain('/details/1011334')
})
