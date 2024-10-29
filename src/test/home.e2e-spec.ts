import { expect, test } from '@playwright/test'

test('Open search modal', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByLabel('Open search').click()

  const modal = page.getByText('Pesquisar personagens')

  await Promise.all([expect(modal).toBeVisible()])
})

test('Search character', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByLabel('Open search').click()

  await page
    .getByPlaceholder('Pesquise personagens pelo nome...')
    .fill('3-d Man')

  const label = page.getByText('3-d Man')

  await Promise.all([expect(label).toBeVisible()])
})

test('Navigate to details page for search result', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByLabel('Open search').click()

  await page
    .getByPlaceholder('Pesquise personagens pelo nome...')
    .fill('3-d Man')

  await page.waitForTimeout(500)

  await page.getByRole('link', { name: '-D Man' }).click()

  expect(page.url()).toContain('/details/1011334')
})

test('Navigate to details page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('button', { name: 'VER MAIS' }).first().click()

  expect(page.url()).toContain('/details/1011334')
})

test('Navigate to favorites page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Favoritos' }).click()

  expect(page.url()).toContain('/favorites')
})

test('Add favorite character', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  const button = page
    .locator('div')
    .filter({ hasText: /^3-D Man$/ })
    .getByLabel('Favorite character')

  await button.click()

  const favoriteButton = page
    .locator('div')
    .filter({ hasText: /^3-D Man$/ })
    .getByLabel('Favorite character')
    .first()

  await Promise.all([
    expect(
      page.getByRole('heading', { name: 'Personagens favoritos' })
    ).toBeVisible(),
    expect(favoriteButton).toHaveClass(/text-yellow-500/),
  ])
})
