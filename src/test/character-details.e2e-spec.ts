import test, { expect } from '@playwright/test'

test('Render character details page', async ({ page }) => {
  await page.goto('/details/1011334', { waitUntil: 'networkidle' })

  await Promise.all([
    expect(page.getByRole('heading', { name: '3-D Man' })).toBeVisible(),
    expect(page.getByRole('heading', { name: 'Séries (3)' })).toBeVisible(),
    expect(page.getByRole('heading', { name: 'Eventos (1)' })).toBeVisible(),
    expect(
      page.getByRole('heading', { name: 'Histórias em quadrinhos (12)' })
    ).toBeVisible(),
    expect(page.getByRole('heading', { name: 'Histórias (21)' })).toBeVisible(),
  ])
})

test('Add favorite character', async ({ page }) => {
  await page.goto('/details/1011334', { waitUntil: 'networkidle' })

  const favoriteButton = page.getByRole('button', {
    name: 'Favoritar personagem',
  })

  await favoriteButton.click()

  page.getByRole('button', { name: 'Remover favorito' })

  await Promise.all([
    expect(
      page.getByRole('button', { name: 'Remover favorito' })
    ).toBeVisible(),
  ])
})

test('Remove favorite character', async ({ page }) => {
  await page.goto('/details/1011334', { waitUntil: 'networkidle' })

  const favoriteButton = page.getByRole('button', {
    name: 'Favoritar personagem',
  })

  await favoriteButton.click()

  const removeFavoriteButton = page.getByRole('button', {
    name: 'Remover favorito',
  })

  await removeFavoriteButton.click()

  await Promise.all([expect(favoriteButton).toBeVisible()])
})

test('Navigate to home page', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })

  await page.getByRole('link', { name: 'Home' }).click()

  expect(page.url()).toContain('/')
})
