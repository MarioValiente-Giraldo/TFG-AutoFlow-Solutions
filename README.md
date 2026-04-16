# AutoFlow Solutions

**Trabajo de Fin de Grado — Desarrollo de Aplicaciones Web**
**Autor:** Mario Valiente Giraldo
**Centro:** IES Hermenegildo Lanz
**Curso:** 2024/2025

---

## Descripcion del proyecto

AutoFlow Solutions es una plataforma web orientada a empresas que desean automatizar sus procesos de negocio. La aplicacion simula el flujo real de una consultora de automatizacion: un cliente puede registrarse, solicitar una consultoría, y una vez que el equipo valora su caso, se le asigna un proyecto de automatizacion que avanza por distintas fases hasta su entrega.

El sistema contempla el ciclo de vida completo de un proyecto: desde la solicitud de cita inicial hasta el pago fraccionado mediante Stripe y la valoracion final del servicio. Todo ello con una interfaz moderna, soporte para modo oscuro, autenticacion basada en JWT con renovacion automatica de tokens, y un panel de administracion diferenciado para gestionar todos los clientes y proyectos en curso.

---

## Capturas de pantalla

### Pagina principal

![Pagina principal](frontend/public/langindPage.png)

### Dashboard de cliente

![Dashboard cliente](frontend/public/clientDashboard.png)

### Dashboard de administrador

![Dashboard admin](frontend/public/adminDashboard.png)

---

## Funcionalidades principales

### Usuarios y autenticacion
- Registro de nuevos usuarios con validacion de campos y aceptacion de terminos
- Inicio de sesion con JWT: access token (15 min) + refresh token (7 dias) con renovacion automatica
- Rutas protegidas por rol: cliente y administrador
- Soporte para modo oscuro/claro persistido en localStorage

### Clientes
- **Agendar cita**: solicitud de consultoría indicando tipo de automatizacion, descripcion, fecha preferida y franja horaria
- **Dashboard de cliente**: vista de todas las citas y automatizaciones propias con su estado actualizado en tiempo real
- **Pago de anticipo**: cuando el admin acepta un proyecto, el cliente recibe el presupuesto y puede pagar el 50% inicial mediante Stripe Checkout
- **Seguimiento del desarrollo**: visualizacion de actualizaciones de progreso publicadas por el equipo (porcentaje + mensaje)
- **Pago final**: al terminar el desarrollo, el cliente paga el 50% restante para recibir la entrega
- **Valoracion**: una vez terminado el proyecto, el cliente puede puntuarlo del 1 al 5 con comentario
- **Cancelacion**: posibilidad de cancelar un proyecto en cualquier fase antes de su entrega

### Administrador
- **Panel de administracion**: vista global de todas las citas y automatizaciones del sistema
- **Gestion de citas**: marcar citas como atendidas
- **Gestion de automatizaciones**: aceptar solicitudes asignando presupuesto, o rechazarlas indicando el motivo
- **Actualizaciones de progreso**: publicar avances de desarrollo con porcentaje incremental
- **Ciclo de entrega**: marcar proyectos como terminados cuando el desarrollo este listo

### Integracion con Stripe
- Sesiones de pago seguras mediante Stripe Checkout
- Webhook para actualizar automaticamente el estado del proyecto al confirmar el pago
- Modo test completo sin necesidad de tarjeta real

---

## Tecnologias

| Capa | Tecnologia |
|---|---|
| Frontend | React 19 + TypeScript + Vite + TailwindCSS v4 |
| Backend | Flask (Python 3.9) + PyJWT + Stripe |
| Base de datos | MongoDB |
| Infraestructura | Docker + Docker Compose |

---

## Puertos

| Servicio | Puerto local | Puerto interno (Docker) |
|---|---|---|
| Frontend | `5173` | `5173` |
| Backend (API) | `5000` | `5000` |
| MongoDB | `27018` | `27017` |

> MongoDB se expone en el puerto **27018** del host (no 27017) para evitar conflictos con instancias locales.

---

## Datos de prueba

### Crear usuario cliente

Registrarse directamente desde la interfaz en `http://localhost:5173/register` con cualquier correo y contrasena. El rol asignado por defecto es `cliente`.

### Crear usuario administrador

El rol `admin` no se puede asignar desde la interfaz por seguridad. El proceso es:

**Paso 1** — Registrar un usuario normal desde `/register`.

**Paso 2** — Con los contenedores corriendo, abrir una terminal y acceder al shell de MongoDB:

```bash
docker exec autoflow_mongo mongosh n8n_consultoria_db
```

**Paso 3** — Ejecutar la siguiente consulta sustituyendo el correo por el que se acaba de registrar:

```javascript
db.Usuarios.updateOne(
  { correo_electronico_acceso: "tu@email.com" },
  { $set: { rol: "admin" } }
)
```

**Paso 4** — Cerrar sesion en el navegador y volver a iniciarla. El token JWT ya incluira el rol `admin` y se tendra acceso a `/dashboard/admin`.

### Stripe (pagos en modo test)

```
Tarjeta de prueba: 4242 4242 4242 4242
Fecha expiración:  Cualquier fecha futura (ej. 12/28)
CVC:               Cualquier número de 3 dígitos (ej. 123)
CP:                Cualquier código postal (ej. 12345)
```

---

## Instrucciones de uso

### Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución
- Git

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd TFG-MARIOVALIENTE
```

### 2. Configurar las variables de entorno

**Backend** — crear el archivo `backend/.env`:

```env
MONGO_URI=mongodb://mongo_db:27017/n8n_consultoria_db
SECRET_KEY=una_clave_secreta_segura_aqui
PORT=5000
DEBUG=True
STRIPE_SECRET_KEY=tu_clave_aqui_o_vacio
STRIPE_WEBHOOK_SECRET=tu_webhook_secret_aqui
FRONTEND_URL=http://localhost:5173
```

**Frontend** — crear el archivo `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

> **Nota:** Las claves de Stripe en modo test se obtienen desde el [Dashboard de Stripe](https://dashboard.stripe.com/test/apikeys). Para pruebas locales sin Stripe, los endpoints de pago devolveran error pero el resto de la aplicacion funciona con normalidad.

### 3. Levantar los contenedores

```bash
docker-compose up --build
```

La primera vez descarga las imagenes y construye los contenedores (~2-3 minutos). Las siguientes veces:

```bash
docker-compose up
```

### 4. Crear el usuario administrador

Con los contenedores corriendo, abrir una nueva terminal y ejecutar:

```bash
docker exec -it autoflow_mongo mongosh
```

Dentro del shell de MongoDB:

```javascript
use n8n_consultoria_db

db.Usuarios.insertOne({
  identificador_unico_usuario: "admin-uuid-fijo-001",
  correo_electronico_acceso: "admin@autoflow.com",
  contrasena: "pbkdf2:sha256:600000$salt$hash",
  telefono: "600000000",
  datos_perfil_comercial: {
    nombre: "Administrador",
    empresa: "AutoFlow Solutions"
  },
  rol: "admin",
  fecha_registro: new Date(),
  aceptacion_terminos: true
})
```

> **Alternativa recomendada:** Registrar un usuario desde `/register` y luego cambiar su rol a `admin` directamente en MongoDB:
>
> ```javascript
> use n8n_consultoria_db
> db.Usuarios.updateOne(
>   { correo_electronico_acceso: "tu@email.com" },
>   { $set: { rol: "admin" } }
> )
> ```

### 5. Acceder a la aplicacion

| URL | Descripcion |
|---|---|
| `http://localhost:5173` | Aplicacion frontend |
| `http://localhost:5000/api` | API backend (health check) |
| `http://localhost:27018` | MongoDB (cliente externo como Compass) |

---

## Flujo de prueba completo

### Como cliente

1. Ir a `http://localhost:5173/register` y crear una cuenta
2. Iniciar sesion en `/login`
3. Explorar las paginas publicas: **Servicios**, **Nosotros**, **Recursos**
4. En `/agendar`, solicitar una cita de consultoría (requiere login)
5. En `/dashboard/cliente`, ver el estado de las citas y automatizaciones asignadas
6. Cuando una automatizacion este en estado `pendiente_pago_anticipo`, pagar el anticipo con la tarjeta de test de Stripe
7. Una vez en `pendiente_pago_final`, realizar el pago final
8. Al terminar, valorar la automatizacion (puntuacion del 1 al 5)

### Como administrador

1. Iniciar sesion con la cuenta a la que se le haya asignado rol `admin` (ver seccion "Datos de prueba")
2. Ir a `/dashboard/admin`
3. Gestionar citas: ver todas las solicitudes y marcarlas como atendidas
4. Gestionar automatizaciones:
   - **Aceptar** una solicitud asignando el gasto estimado
   - **Rechazar** una solicitud indicando el motivo
   - Publicar **actualizaciones de progreso** (porcentaje + mensaje) mientras esta en desarrollo
   - Marcar el desarrollo como **terminado** (pasa a pendiente de pago final)

---

## Estados de una automatizacion

```
pendiente_revision
       |
   [admin acepta / rechaza]
       |
pendiente_pago_anticipo  ──── rechazada
       |
   [cliente paga anticipo via Stripe]
       |
  en_desarrollo
       |
   [admin publica avances y marca como terminada]
       |
pendiente_pago_final
       |
   [cliente paga pago final via Stripe]
       |
   terminada
       |
   [cliente valora]
```

El cliente puede **cancelar** en cualquier estado excepto `terminada` y `rechazada`.

---

## API — Endpoints principales

### Autenticacion

| Metodo | Ruta | Descripcion | Auth |
|---|---|---|---|
| POST | `/api/register` | Registrar nuevo usuario | No |
| POST | `/api/login` | Iniciar sesion | No |
| POST | `/api/auth/refresh` | Renovar access token | No |
| POST | `/api/logout` | Cerrar sesion | No |

### Citas

| Metodo | Ruta | Descripcion | Auth |
|---|---|---|---|
| POST | `/api/agendar-cita` | Crear solicitud de cita | Cliente |
| GET | `/api/citas?email=<email>` | Ver citas propias | Cliente |
| GET | `/api/admin/citas` | Ver todas las citas | Admin |
| PATCH | `/api/citas/<id>/marcar-atendida` | Marcar cita como atendida | Admin |

### Automatizaciones

| Metodo | Ruta | Descripcion | Auth |
|---|---|---|---|
| POST | `/api/automatizaciones` | Crear automatizacion | Cliente |
| GET | `/api/automatizaciones/mis-automatizaciones?userId=<id>` | Ver mis automatizaciones | Cliente |
| GET | `/api/automatizaciones/<id>` | Ver detalle | Cliente |
| GET | `/api/automatizaciones` | Ver todas | Admin |
| PATCH | `/api/automatizaciones/<id>/aceptar-admin` | Aceptar revision | Admin |
| PATCH | `/api/automatizaciones/<id>/rechazar` | Rechazar | Admin |
| PATCH | `/api/automatizaciones/<id>/actualizar-desarrollo` | Publicar avance | Admin |
| PATCH | `/api/automatizaciones/<id>/marcar-terminada` | Marcar como terminada | Admin |
| PATCH | `/api/automatizaciones/<id>/cancelar` | Cancelar | Cliente |
| POST | `/api/automatizaciones/<id>/crear-sesion-pago-anticipo` | Pago anticipo Stripe | Cliente |
| POST | `/api/automatizaciones/<id>/crear-sesion-pago-final` | Pago final Stripe | Cliente |
| POST | `/api/automatizaciones/<id>/valorar` | Valorar automatizacion | Cliente |

---

## Comandos utiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio concreto
docker-compose logs -f backend
docker-compose logs -f frontend

# Parar todos los contenedores
docker-compose down

# Parar y eliminar volumenes (borra datos de MongoDB)
docker-compose down -v

# Reconstruir tras cambios en dependencias
docker-compose up --build

# Acceder al shell de MongoDB
docker exec -it autoflow_mongo mongosh

# Acceder al shell del backend
docker exec -it autoflow_backend bash
```

---

## Estructura del proyecto

```
TFG-MARIOVALIENTE/
├── backend/
│   ├── app.py                    # Entrada principal Flask
│   ├── db.py                     # Conexion a MongoDB
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── blueprints/
│   │   ├── auth.py               # Registro, login, JWT
│   │   ├── citas.py              # Gestion de citas
│   │   ├── automatizaciones.py   # Ciclo de vida de automatizaciones + Stripe
│   │   └── stripe_webhook.py     # Webhook de Stripe
│   └── middleware/
│       └── auth.py               # Decoradores require_auth / require_admin
├── frontend/
│   ├── src/
│   │   ├── App.tsx               # Rutas de la aplicacion
│   │   ├── pages/                # Paginas por ruta
│   │   ├── components/           # Componentes reutilizables
│   │   ├── context/              # AuthContext, ThemeContext
│   │   ├── services/             # Llamadas a la API
│   │   └── types/                # Interfaces TypeScript compartidas
│   └── Dockerfile
└── docker-compose.yml
```

---

## Notas adicionales

- **JWT**: El access token expira en **15 minutos**. El frontend lo renueva automaticamente con el refresh token (validez 7 dias) antes de cada peticion autenticada.
- **Tema**: La aplicacion soporta modo oscuro/claro. Se persiste en `localStorage` con la clave `autoflow_theme`.
- **Stripe en local**: Para recibir webhooks de Stripe en desarrollo local es necesario usar [Stripe CLI](https://stripe.com/docs/stripe-cli) (`stripe listen --forward-to localhost:5000/api/stripe/webhook`). Sin esto, los pagos se completan en Stripe pero el estado de la automatizacion no se actualiza automaticamente en la base de datos.
- **MongoDB Compass**: Para explorar la base de datos visualmente, conectar a `mongodb://localhost:27018`.
