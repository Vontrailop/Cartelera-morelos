# Documentación de Endpoints del Backend (TBlackbox)

Este documento detalla los endpoints de la API del backend de TBlackbox, organizados por módulos.

## Autenticación y Usuarios

### `POST /api/users/register`
- **Descripción:** Registra un nuevo usuario en el sistema.
- **Roles requeridos:** Ninguno (público).
- **Body:**
  ```json
  {
    "nombre": "string",
    "email": "string",
    "telefono": "string",
    "rol": "Administrador" | "Colaborador" | "Cliente",
    "password": "string"
  }
  ```
- **Respuesta:** Token JWT si el registro es exitoso.
  Eres un asistente de desarrollo frontend. Estoy construyendo el sistema TBlackbox y necesito que me ayudes a generar el frontend utilizando **Vue 3 + Composition API**, **Vue Router**, y **Axios** para consumir endpoints REST desde el backend (Node.js).

⚠️ Importante:
- La pantalla de **landing-page** ya fue maquetada por separado (está en `/landing`)
- El resto del sistema debe tener **flujo de pantallas funcional**, estilizadas con **TailwindCSS**.
- Cada pantalla debe consumir sus endpoints reales definidos previamente en el backend.
- Usar camelCase, buenas prácticas de modularización, componentes reutilizables y nombres de ruta descriptivos.

---

🎯 Objetivo:
Desarrollar el flujo de navegación del sistema (dashboard y vistas) usando pantallas estilizadas con componentes visuales claros y bien estructurados. Cada pantalla debe reflejar una vista funcional, no solo un wireframe o maqueta estática.

---

📁 Estructura esperada del proyecto Vue:
src/
├── assets/
├── components/
│ ├── forms/
│ ├── tables/
│ └── ui/
├── layouts/
│ ├── AppLayout.vue
│ └── AuthLayout.vue
├── pages/
│ ├── auth/
│ ├── dashboard/
│ ├── pedidos/
│ ├── cotizaciones/
│ ├── contratos/
│ ├── notificaciones/
│ └── configuracion/
├── router/
│ └── index.js
├── services/
│ └── api.js (axios config)
├── store/ (opcional, puede ser Pinia)
└── main.js


---

🖥️ Flujo de pantallas funcionales (fuera de landing-page):

1. **Pantallas de Autenticación:**
  - `/login` (formulario de login con validación, guarda token JWT en localStorage)
  - `/register` (formulario básico para clientes nuevos, opcional según el flujo)

2. **Dashboard principal (`/dashboard`)**
  - Muestra un resumen para el tipo de usuario logueado (Administrador, Cliente, Colaborador)
  - Usa cards, tablas o gráficos con datos obtenidos de los endpoints

3. **Pedidos (`/pedidos`)**
  - Lista de pedidos del usuario (cliente o administrador)
  - Detalle de pedido (`/pedidos/:id`)
  - Crear nuevo pedido (`/pedidos/crear`) para clientes

4. **Cotizaciones (`/cotizaciones`)**
  - Listado de cotizaciones del cliente
  - Vista detallada con botón para aceptar o rechazar

5. **Contratos (`/contratos`)**
  - Visualización de contratos con link al documento
  - Estado del contrato (Activo, Finalizado)

6. **Notificaciones (`/notificaciones`)**
  - Pantalla para enviar mensajes de prueba a WhatsApp
  - Solo visible para administradores

7. **Rentas de equipos (`/equipos/renta`)**
  - Vista para asignar equipos a pedidos
  - Listado de equipos y disponibilidad

---

🔧 Requisitos técnicos:

- Configurar Vue Router con protección de rutas basada en token JWT y rol del usuario
- Axios configurado con baseURL global y token en headers
- Reutilizar componentes de UI (modal, inputs, loader, alertas)
- Usar Tailwind para mantener un diseño limpio y adaptable
- Autenticación persistente (guardar token + rol, recuperar en reload)

📌 Extras:
- Mostrar loading mientras carga cada vista
- Manejo de errores HTTP con alertas visibles
- Componente `<Navbar />` con menú adaptado según el rol

---

✅ Por favor, genera:
- El `router/index.js` con rutas protegidas por rol
- Estructura de carpetas Vue
- Una pantalla funcional completa como ejemplo (por ejemplo, `pedidos/index.vue`)
- Axios config para enviar el JWT automáticamente

Puedes usar JSONs mock si algún endpoint no está disponible, pero estructura el código como si fuera consumo real.

### `POST /api/users/login`
- **Descripción:** Autentica a un usuario y devuelve un token JWT.
- **Roles requeridos:** Ninguno (público).
- **Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Respuesta:** Token JWT si el login es exitoso.

### `GET /api/users/profile`
- **Descripción:** Obtiene el perfil del usuario autenticado.
- **Roles requeridos:** Cualquiera (autenticado).
- **Respuesta:** Datos del usuario (sin contraseña).

### `GET /api/users/`
- **Descripción:** Lista todos los usuarios registrados en el sistema.
- **Roles requeridos:** `Administrador`.
- **Respuesta:** Array de objetos de usuario.

## Pedidos y Servicios

### `POST /api/pedidos`
- **Descripción:** Crea un nuevo pedido con servicios asociados.
- **Roles requeridos:** `Cliente`.
- **Body:**
  ```json
  {
    "servicios": [
      {
        "idServicio": "string",
        "detalles": "string" (opcional)
      }
    ]
  }
  ```
- **Respuesta:** Objeto del pedido creado.

### `GET /api/pedidos/mis`
- **Descripción:** Obtiene todos los pedidos realizados por el cliente autenticado.
- **Roles requeridos:** `Cliente`.
- **Respuesta:** Array de objetos de pedido con detalles de servicios.

### `GET /api/pedidos`
- **Descripción:** Obtiene todos los pedidos del sistema. Permite filtrar por estado, cliente y fecha.
- **Roles requeridos:** `Administrador`.
- **Query Params:** `estado`, `cliente` (ID de usuario), `fechaInicio`, `fechaFin`.
- **Respuesta:** Array de objetos de pedido con detalles de servicios.

### `PATCH /api/pedidos/:id`
- **Descripción:** Actualiza el estado de un pedido específico.
- **Roles requeridos:** `Administrador`.
- **URL Params:** `id` (ID del pedido).
- **Body:**
  ```json
  {
    "estado": "Registrado" | "En proceso" | "Completado" | "Cancelado"
  }
  ```
- **Respuesta:** Objeto del pedido actualizado.

### `POST /api/pedidos/:id/postulaciones`
- **Descripción:** Permite a un colaborador postularse a un pedido en un área específica.
- **Roles requeridos:** `Colaborador`.
- **URL Params:** `id` (ID del pedido).
- **Body:**
  ```json
  {
    "area": "Branding" | "Producción" | "Marketing" | "Desarrollo Web"
  }
  ```
- **Respuesta:** Objeto de la postulación creada.

## Cotizaciones

### `POST /api/cotizaciones`
- **Descripción:** Genera una nueva cotización para un pedido.
- **Roles requeridos:** `Administrador`.
- **Body:**
  ```json
  {
    "idPedido": "string",
    "montoTotal": "number"
  }
  ```
- **Respuesta:** Objeto de la cotización creada.

### `GET /api/cotizaciones/mis`
- **Descripción:** Lista todas las cotizaciones asociadas a los pedidos del cliente autenticado.
- **Roles requeridos:** `Cliente`.
- **Respuesta:** Array de objetos de cotización.

### `GET /api/cotizaciones/:id`
- **Descripción:** Obtiene los detalles de una cotización específica.
- **Roles requeridos:** `Cliente` (si es propietario del pedido) o `Administrador`.
- **URL Params:** `id` (ID de la cotización).
- **Respuesta:** Objeto de la cotización.

### `PATCH /api/cotizaciones/:id`
- **Descripción:** Actualiza el estado de una cotización (aceptar o rechazar).
- **Roles requeridos:** `Cliente` (solo el propietario del pedido).
- **URL Params:** `id` (ID de la cotización).
- **Body:**
  ```json
  {
    "estado": "Aceptada" | "Rechazada"
  }
  ```
- **Respuesta:** Objeto de la cotización actualizada.

## Contratos

### `POST /api/contratos`
- **Descripción:** Crea un nuevo contrato para un pedido con una cotización aceptada.
- **Roles requeridos:** `Administrador`.
- **Body:**
  ```json
  {
    "idPedido": "string",
    "urlDocumento": "string" (URL o ruta local del documento),
    "fechaFirma": "Date" (formato ISO 8601)
  }
  ```
- **Respuesta:** Objeto del contrato creado.

### `GET /api/contratos/mis`
- **Descripción:** Lista todos los contratos asociados a los pedidos del cliente autenticado.
- **Roles requeridos:** `Cliente`.
- **Respuesta:** Array de objetos de contrato.

### `GET /api/contratos/:id`
- **Descripción:** Obtiene los detalles de un contrato específico.
- **Roles requeridos:** `Cliente` (si es propietario del pedido) o `Administrador`.
- **URL Params:** `id` (ID del contrato).
- **Respuesta:** Objeto del contrato.

### `PATCH /api/contratos/:id/finalizar`
- **Descripción:** Finaliza un contrato, cambiando su estado a `Finalizado`.
- **Roles requeridos:** `Administrador`.
- **URL Params:** `id` (ID del contrato).
- **Respuesta:** Objeto del contrato actualizado.

## Registro de Costos

### `POST /api/costos`
- **Descripción:** Agrega un nuevo registro de costo a un pedido.
- **Roles requeridos:** `Administrador`.
- **Body:**
  ```json
  {
    "idPedido": "string",
    "concepto": "string",
    "monto": "number"
  }
  ```
- **Respuesta:** Objeto del costo creado.

### `GET /api/costos/pedido/:idPedido`
- **Descripción:** Lista todos los costos asociados a un pedido específico.
- **Roles requeridos:** `Administrador` o `Cliente` (si es propietario del pedido).
- **URL Params:** `idPedido` (ID del pedido).
- **Respuesta:** Array de objetos de costo.

### `DELETE /api/costos/:id`
- **Descripción:** Elimina un registro de costo.
- **Roles requeridos:** `Administrador`.
- **URL Params:** `id` (ID del costo).
- **Respuesta:** Mensaje de confirmación y el objeto del costo eliminado.

## Notificaciones Personalizadas

### `POST /api/notificaciones/whatsapp`
- **Descripción:** Envía una notificación personalizada vía WhatsApp.
- **Roles requeridos:** `Administrador`.
- **Body:**
  ```json
  {
    "telefonoDestino": "string" (formato E.164, ej: +5215555555555),
    "mensaje": "string",
    "urlOpcional": "string" (URL opcional),
    "eventoRelacionado": "string" (opcional, ej: "Pedido", "Asignacion"),
    "idEvento": "string" (opcional, ID del evento relacionado)
  }
  ```
- **Respuesta:** Estado del envío de la notificación.

## Renta de Equipos

### `POST /api/rentas`
- **Descripción:** Registra el uso de un equipo para un pedido.
- **Roles requeridos:** `Administrador`.
- **Body:**
  ```json
  {
    "idPedido": "string",
    "idEquipo": "string",
    "fechaInicio": "Date" (formato ISO 8601),
    "ubicacionEntrega": "string"
  }
  ```
- **Respuesta:** Objeto de la renta de equipo creada.

### `PATCH /api/rentas/:id/finalizar`
- **Descripción:** Finaliza el uso de un equipo y lo marca como devuelto.
- **Roles requeridos:** `Administrador`.
- **URL Params:** `id` (ID de la renta de equipo).
- **Body:**
  ```json
  {
    "fechaDevolucion": "Date" (formato ISO 8601),
    "ubicacionDevolucion": "string"
  }
  ```
- **Respuesta:** Objeto de la renta de equipo actualizada.

### `GET /api/rentas/pedido/:idPedido`
- **Descripción:** Lista todos los registros de renta de equipos asociados a un pedido.
- **Roles requeridos:** `Administrador` o `Cliente` (si es propietario del pedido).
- **URL Params:** `idPedido` (ID del pedido).
- **Respuesta:** Array de objetos de renta de equipo.

### `GET /api/equipos/disponibles`
- **Descripción:** Lista todos los equipos que se encuentran actualmente disponibles para renta.
- **Roles requeridos:** Cualquiera (autenticado).
- **Respuesta:** Array de objetos de equipo con estado `Disponible`.
