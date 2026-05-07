/**
 * Proyección del usuario devuelta por el backend en la sesión activa.
 * No incluye campos internos de BD (id_empresa, timestamps, deleted).
 */
export interface UsuarioSesionDto {
  id_usuario: number;
  name:       string;
  last_name:  string;
  email:      string;
  avatar?:    string; // URL de la foto de perfil
}
