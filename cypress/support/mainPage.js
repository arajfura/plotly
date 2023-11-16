class mainPage {
  get copyToClipboardButton() {
    return '[data-cy="modal-install-copy"]'
  }

  get mainMenu() {
    return '[data-cy="main"]'
  }

  get mainMenuCompany() {
    return '[data-cy="dropdown-company"]'
  }

  get mainMenuProduct() {
    return '[data-cy="dropdown-product"]'
  }

  get modalLabel() {
    return '#cy_modal_label'
  }

  get testAnalyticsAnchor() {
    return '[href="#test_analytics"]'
  }

  enableClipboardReadWrite() {
    Cypress.automation('remote:debugger:protocol', {
      command: 'Browser.grantPermissions',
      params: {
        permissions: ['clipboardReadWrite', 'clipboardSanitizedWrite'],
        origin: window.location.origin,
      },
    })
  }
}

export default new mainPage()
