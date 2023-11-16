# plotly

This project is using Cypress.io, you'll need node to run it, as well as Chrome.

All dependencies are listed in package.json.

I make use of a package called [cypress-real-events](https://github.com/dmtrKovalenko/cypress-real-events)

## Installation
After downloading the repo:
`npm i` in the root folder

## Running tests
- Headless mode
`npm run test:e2e`

- To open the test runner
`npx cypress open`

### Note
Because I need to set browser permissions to enable reading/writing to the clipboard the 3rd test is configured to run only on Chrome.
