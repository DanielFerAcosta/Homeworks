import { inject } from '@angular/core';
import { AuthService } from '../services/auth';

export function useAuth() {
  const service = inject(AuthService);

  return {
    currentUser: service.currentUser,
    username: service.username,
    email: service.email,
    isLoggedIn: service.isLoggedIn,
    loading: service.loading,

    login: (email: string, password: string) => {
      return service.login(email, password);
    },

    register: (
      name: string,
      email: string,
      password: string
    ) => {
      return service.register(name, email, password);
    },

    logout: () => {
      return service.logout();
    },

    waitForSession: () => {
      return service.waitForSession();
    }
  };
}