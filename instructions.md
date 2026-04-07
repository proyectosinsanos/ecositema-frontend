

# Ecosistema | Front
El ecosistema de Cistem Labs se compone de varios microservicios, este repositorio viene a ser la pantalla de inicio, la cual se encarga de mostrar el estado de cada uno de los microservicios, así como también introducir al ecosistema.

## Funcionalidades 
* Login: Permite a los usuarios autenticarse para acceder a las funcionalidades del ecosistema.
* Recuperación de contraseña: Esta funcionalidad consta de dos partes, la primera es el formulario donde el usuario ingresa su correo electrónico para recibir un enlace de recuperación, y la segunda parte es el formulario donde el usuario ingresa su nueva contraseña después de hacer clic en el enlace recibido por correo electrónico.
* Dashboard: Aún no están definidos los indicadores que se mostrarán, pero dejar lo que se pueda dejar listo para mostrar indicadores de los microservicios.
* Barra lateral: Mostrará los microservicios que tenga contratado el cliente, dejarlos listos para que el icono solo aparezca con un condicional: 
```jsx
{cliente.tieneMicroservicioX && <IconoMicroservicioX />}
```
* Icono Microservicio: Este icono en realidad es un botón que redirige a otro microservicio, dejar en variables de entorno las URLs de cada microservicio para que se pueda redirigir sin problemas, por ejemplo:
```jsx
const urlMicroservicioX = process.env.REACT_APP_URL_MICROSERVICIO_X;
```
* ApiClient: Crear un cliente de API que se encargue de manejar las solicitudes a los microservicios, esto permitirá centralizar la lógica de las solicitudes y facilitar el mantenimiento del código.