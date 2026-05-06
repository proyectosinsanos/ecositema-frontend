// TODO: reemplazar con fetch a endpoints reales

export const kpis = {
  serviciosHoy:        247,
  serviciosSemana:     1834,
  tiempoPromedioMin:   2.4,
  tasaAtencion:        87.3,
  vehiculosStuck:      3,
  sinDespachadorHoy:   31,
};

export const serviciosPorHora = [
  { hora: '06:00', servicios: 8,  tiempoPromedio: 1.9, sinDespachador: 1 },
  { hora: '07:00', servicios: 22, tiempoPromedio: 2.1, sinDespachador: 2 },
  { hora: '08:00', servicios: 38, tiempoPromedio: 2.4, sinDespachador: 4 },
  { hora: '09:00', servicios: 41, tiempoPromedio: 2.8, sinDespachador: 5 },
  { hora: '10:00', servicios: 35, tiempoPromedio: 2.6, sinDespachador: 3 },
  { hora: '11:00', servicios: 29, tiempoPromedio: 2.3, sinDespachador: 3 },
  { hora: '12:00', servicios: 44, tiempoPromedio: 3.1, sinDespachador: 6 },
  { hora: '13:00', servicios: 51, tiempoPromedio: 3.4, sinDespachador: 7 },
  { hora: '14:00', servicios: 48, tiempoPromedio: 3.2, sinDespachador: 6 },
  { hora: '15:00', servicios: 37, tiempoPromedio: 2.7, sinDespachador: 4 },
  { hora: '16:00', servicios: 32, tiempoPromedio: 2.5, sinDespachador: 3 },
  { hora: '17:00', servicios: 28, tiempoPromedio: 2.2, sinDespachador: 2 },
  { hora: '18:00', servicios: 19, tiempoPromedio: 2.0, sinDespachador: 1 },
  { hora: '19:00', servicios: 11, tiempoPromedio: 1.8, sinDespachador: 1 },
  { hora: '20:00', servicios: 6,  tiempoPromedio: 1.7, sinDespachador: 0 },
];

export const serviciosPorDia = [
  { dia: 'Lun', servicios: 312 },
  { dia: 'Mar', servicios: 289 },
  { dia: 'Mié', servicios: 341 },
  { dia: 'Jue', servicios: 298 },
  { dia: 'Vie', servicios: 387 },
  { dia: 'Sáb', servicios: 421 },
  { dia: 'Dom', servicios: 201 },
];

export const porDispensario = [
  { dispensario: 'Disp. A', servicios: 89,  tiempoPromedio: 2.1, sinDespachador: 5  },
  { dispensario: 'Disp. B', servicios: 74,  tiempoPromedio: 2.6, sinDespachador: 8  },
  { dispensario: 'Disp. C', servicios: 102, tiempoPromedio: 2.3, sinDespachador: 11 },
  { dispensario: 'Disp. D', servicios: 61,  tiempoPromedio: 3.1, sinDespachador: 7  },
];

export const distribucionTiempos = [
  { rango: '<1 min',  cantidad: 38  },
  { rango: '1–2 min', cantidad: 97  },
  { rango: '2–3 min', cantidad: 72  },
  { rango: '3–5 min', cantidad: 29  },
  { rango: '>5 min',  cantidad: 11  },
];
