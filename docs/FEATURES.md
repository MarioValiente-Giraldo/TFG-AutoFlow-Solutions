# 📝 Funcionalidades del Sistema — AutoFlow Solutions

Este documento enumera las características implementadas y funcionales de la plataforma.

---

## 🔐 Autenticación y Usuarios

- **Registro de clientes:** Formulario con validación de campos, verificación de email único y aceptación de términos.
- **Login con JWT dual:** Access token (15 min) + Refresh token (7 días). Renovación automática y silenciosa desde el frontend.
- **Rutas protegidas por rol:** Los paneles de cliente y admin son inaccesibles sin el rol correspondiente en el JWT.
- **Logout seguro:** Invalida el refresh token en el servidor.
- **Asignación de rol admin:** Deliberadamente fuera del alcance de la UI; solo modificable en MongoDB para mayor seguridad.

---

## 📅 Citas (Consultoría)

- **Solicitud de cita:** El cliente indica tipo de automatización, descripción, fecha preferida y franja horaria desde el panel `/agendar`.
- **Gestión admin:** El administrador visualiza todas las solicitudes pendientes y puede marcarlas como atendidas.
- **Historial de citas:** El cliente consulta el estado de sus citas desde su dashboard.

---

## ⚙️ Automatizaciones (Ciclo de vida completo)

- **Creación de proyecto:** El cliente solicita una automatización con nombre, tipo y descripción.
- **Revisión admin:** El administrador acepta (asignando presupuesto) o rechaza (indicando motivo) cada solicitud.
- **Pago de anticipo:** Tras la aceptación, el cliente paga el 50% del presupuesto mediante Stripe Checkout.
- **Seguimiento de desarrollo:** El administrador publica hitos de progreso con porcentaje y mensaje descriptivo.
- **Pago final:** Al finalizar el desarrollo, el cliente paga el 50% restante para recibir la entrega.
- **Valoración:** El cliente puede puntuar el servicio del 1 al 5 con comentario opcional.
- **Cancelación:** El cliente puede cancelar en cualquier estado anterior a `terminada` y `rechazada`.

---

## 💳 Integración con Stripe

- **Sesiones de pago seguras:** Toda transacción se canaliza por Stripe Checkout sin que el backend maneje datos de tarjeta.
- **Webhook automático:** Stripe notifica al backend al confirmar un pago; el estado de la automatización se actualiza automáticamente.
- **Modo test completo:** Soporte para tarjetas de prueba de Stripe sin necesidad de credenciales reales.
- **Doble pago:** Flujo diferenciado para anticipo (50%) y pago final (50%), con IDs de sesión independientes.

---

## 💬 Chat Cliente — Administrador

- **Mensajería en tiempo real:** Canal de comunicación directo entre cliente y equipo de AutoFlow dentro del contexto de cada proyecto.
- **Historial de mensajes:** Persistencia de la conversación en MongoDB, visible desde ambos paneles.

---

## 🌗 Experiencia de Usuario

- **Modo oscuro/claro:** Soporte completo con ThemeContext. Estado persistido en localStorage.
- **Diseño responsive:** Interfaz adaptada a escritorio y móvil con TailwindCSS v4.
- **Animación hero (N8N):** Animación SVG interactiva de workflow N8N en la página principal usando `@remotion/player`.
- **Páginas públicas:** Landing page, Servicios, Nosotros y Recursos con contenido informativo.
- **Feedback visual:** Estados de carga, mensajes de error y confirmaciones en todos los formularios.

---

## 🧑‍💼 Paneles de Usuario

### Dashboard de Cliente
- Vista unificada de citas y automatizaciones propias.
- Acciones contextuales según el estado del proyecto (pagar, cancelar, valorar).
- Indicador visual de progreso de desarrollo.

### Dashboard de Administrador
- Vista global de todas las citas y automatizaciones del sistema.
- Acciones de gestión completas: aceptar, rechazar, publicar avances, marcar como terminada.
- Filtrado y agrupación por estado.

---

## 🐳 Infraestructura y Despliegue

- **Docker Compose:** Orquestación completa del stack (frontend, backend, MongoDB) con un único comando.
- **Variables de entorno:** Toda configuración sensible (claves JWT, Stripe, MongoDB URI) externalizada en archivos `.env`.
- **Hot reload en desarrollo:** El frontend (Vite) y backend (Flask debug) detectan cambios en tiempo real.
