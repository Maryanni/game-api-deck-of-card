class PrincipalAPIPage {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  createRequest(method, endpoint, queryParams = {}) {
    cy.log(`Endpoint: ${endpoint}`);

    return cy.request({
      method,
      url: `${this.baseUrl}${endpoint}`,
      qs: queryParams,
      failOnStatusCode: false,
    });
  }

  checkResponse(response) {
    cy.log(`Status: ${response.status}`);
    cy.log(`Body: ${JSON.stringify(response.body)}`);
    return response;
  }
}

export default PrincipalAPIPage;
