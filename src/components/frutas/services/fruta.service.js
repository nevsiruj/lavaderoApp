export class FrutaService {
  constructor() {
    this.FrutaAPI = 'https://localhost:44308';
  }

  async getFrutas() {
    try {
      const response = await fetch(`${this.FrutaAPI}/api/Fruta`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }

  async postFruta(fruta) {
    await fetch('https://localhost:44308/api/Fruta', {
      method: 'POST',
      body: JSON.stringify(fruta),
    });
  }
}

export default FrutaService;
