export class CajaService {
  static instance = null;

  static getInstance() {
    if (!CajaService.instance) {
      CajaService.instance = new AuthService();
    }
    return CajaService.instance;
  }

  constructor() {
    this.cajaAbierta = {};
  }

  getCaja() {
    this.cajaAbierta.monto = 200;
    this.cajaAbierta.responsable = 'Kevin';

    return this.cajaAbierta
  }

  // login(username, password) {
  //     // implementar lógica de inicio de sesión
  //     // ...
  //     // actualizar estado de autenticación y token de acceso
  //     this.isLoggedIn = true;
  //     this.accessToken = 'abc123';
  // }

  // logout() {
  //     // implementar lógica de cierre de sesión
  //     // ...
  //     // actualizar estado de autenticación y token de acceso
  //     this.isLoggedIn = false;
  //     this.accessToken = null;
  // }

  // async getLoggedInUser() {
  //     try {
  //         const response = await fetch('/api/auth/userLoged');
  //         const data = await response.json();
  //         this.user = data;
  //         return data;
  //     } catch (error) {
  //         throw new Error(error);
  //     }
  // }
}
