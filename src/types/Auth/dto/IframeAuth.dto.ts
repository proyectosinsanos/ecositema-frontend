export interface IframeAuthMessage {
  type:    'CISTEM_AUTH';
  usuario: {
    id_usuario: number;
    name:       string;
    last_name:  string;
    email:      string;
  };
}
