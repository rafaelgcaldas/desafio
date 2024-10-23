module.exports = {
  '*.{js,jsx,ts,tsx}': (fileNames) => [
    `npm run lint --fix . ${fileNames.join(' --file')}`,
    `prettier --write ${fileNames.join(' ')}`,
  ],
}
