import { FirebaseError } from 'firebase/app';

export function getAuthErrorMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return 'Ocurrió un error inesperado. Intenta nuevamente.';
  }

  switch (error.code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'El correo o la contraseña son incorrectos.';

    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con ese correo.';

    case 'auth/invalid-email':
      return 'El correo electrónico no es válido.';

    case 'auth/weak-password':
    case 'auth/password-does-not-meet-requirements':
      return 'La contraseña no cumple los requisitos de seguridad.';

    case 'auth/user-disabled':
      return 'Esta cuenta está deshabilitada.';

    case 'auth/requires-recent-login':
      return 'Inicia sesión nuevamente para realizar esta operación.';

    case 'auth/too-many-requests':
      return 'Demasiados intentos. Espera antes de volver a intentar.';

    case 'auth/network-request-failed':
      return 'No se pudo conectar. Revisa tu conexión a internet.';

    case 'auth/operation-not-allowed':
      return 'Debes habilitar Email/Password en Firebase Authentication.';

    default:
      return 'No se pudo completar la operación. Intenta nuevamente.';
  }
}