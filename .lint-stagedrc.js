module.exports = {
  '*.{js,jsx,ts,tsx}': (fileNames) => [
    `prettier --write ${fileNames.join(' ')}`,
    `npm run lint --fix . ${fileNames.join(' --file')}`,
  ],
}