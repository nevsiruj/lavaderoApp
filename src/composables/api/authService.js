import { API_URL } from '../../config.js';

const authService = (() => {

  async function login(email, password) {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      // Asegúrate de que el nombre de la propiedad del token es correcto
      localStorage.setItem('jwt-token', data.token); 
      return data;
    } else {
      throw new Error('Login failed');
    }
  } catch (error) {
    throw error;
  }
}


  async function getCurrentUser() {
    try {
      const response = await fetchWithToken(`${API_URL}/auth/GetLoggedDUser`, {
        headers: {
        },
      });

      if (response.ok) {
        const user = await response.json();
        return user;
      } else {
        throw new Error('Failed to retrieve current user');
      }
    } catch (error) {
      throw error;
    }
  }


  async function register(registerData) {
    try {
      const response = await fetchWithToken(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(`Registration failed: ${errorData.Message}`);
      }
    } catch (error) {
      throw error;
    }
  }


  async function logout() {
    try {
      const response = await fetchWithToken(`${API_URL}/auth/logout`, {
        method: 'POST',
      });

      if (response.ok) {
        localStorage.removeItem('jwt-token'); // Elimina el token al cerrar sesión
        const data = await response.json();
        return data;
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      throw error;
    }
  }
  async function getUserTenantId() {
    try {
      const response = await fetchWithToken(`${API_URL}/auth/tenant-id`);

      if (response.ok) {
        const data = await response.json();
        return data.TenantId;
      } else {
        throw new Error('Failed to retrieve Tenant ID');
      }
    } catch (error) {
      throw error;
    }
  }

  async function getUsers() {
    try {
      const response = await fetchWithToken(`${API_URL}/auth/users`);

      if (response.ok) {
        const users = await response.json();
        return users;
      } else {
        throw new Error('Failed to retrieve users');
      }
    } catch (error) {
      throw error;
    }
  }


  async function fetchWithToken(url, options = {}) {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      options.headers = options.headers || {};
      options.headers['Authorization'] = 'Bearer ' + token;
    }
    options.credentials = 'include';
    const response = await fetch(url, options);
    return response;
  }


  // Agrega aquí las demás funciones que necesites

  return {
    login,
    getCurrentUser,
    register,
    logout,
    getUserTenantId,
    getUsers,
    // Agrega aquí las demás funciones que necesites
  };
})();

export default authService;
