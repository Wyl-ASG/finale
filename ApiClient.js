export class ApiClient {
    constructor(baseUrl) {
      this.baseUrl = baseUrl;
    }
  
    async post(endpoint, data) {
      const url = `${this.baseUrl}${endpoint}`;
  
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const jsonResponse = await response.json();
      return jsonResponse;
    }
  }
  