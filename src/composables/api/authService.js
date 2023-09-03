import { API_URL } from '../../config.js';

const authService = (() => {
  async function login(email, password) {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
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
      const response = await fetch(`${API_URL}/auth/GetCurrentUser`);
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
      const response = await fetch(`${API_URL}/auth/register`, {
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
      const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
      });

      if (response.ok) {
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
      const response = await fetch(`${API_URL}/auth/tenant-id`);
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
      const response = await fetch(`${API_URL}/auth/users`);
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
