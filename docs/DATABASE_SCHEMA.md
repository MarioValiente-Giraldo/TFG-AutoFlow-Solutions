# 🗄️ Esquema de Base de Datos — AutoFlow Solutions

Este documento detalla el modelo de datos utilizado en AutoFlow Solutions. La persistencia se gestiona mediante **MongoDB** (base de datos documental), accedida desde el backend con **PyMongo**.

---

## 📊 Diagrama de Entidad-Relación (Conceptual)

```mermaid
erDiagram
    USUARIO ||--o{ CITA : "agenda"
    USUARIO ||--o{ AUTOMATIZACION : "solicita"
    AUTOMATIZACION ||--o{ ACTUALIZACION : "tiene"
```

---

## 📁 Base de Datos

**Nombre:** `n8n_consultoria_db`

---

## 📋 Colección: `Usuarios`

Almacena tanto clientes como administradores. El campo `rol` diferencia el tipo de acceso.

| Campo | Tipo | Descripción |
|---|---|---|
| `_id` | ObjectId | Identificador interno de MongoDB |
| `identificador_unico_usuario` | String (UUID) | Identificador público único del usuario |
| `correo_electronico_acceso` | String | Email de acceso (único) |
| `contrasena` | String | Hash Werkzeug (pbkdf2:sha256) |
| `telefono` | String | Teléfono de contacto |
| `datos_perfil_comercial.nombre` | String | Nombre completo |
| `datos_perfil_comercial.empresa` | String | Empresa del cliente |
| `rol` | String | `"cliente"` o `"admin"` |
| `fecha_registro` | Date | Fecha de alta |
| `aceptacion_terminos` | Boolean | Aceptación de términos de uso |

---

## 📋 Colección: `Citas`

Registra las solicitudes de consultoría previas a una automatización.

| Campo | Tipo | Descripción |
|---|---|---|
| `_id` | ObjectId | Identificador interno |
| `userId` | String (UUID) | Referencia al usuario que agenda |
| `tipo_automatizacion` | String | Tipo de proceso a automatizar |
| `descripcion` | String | Descripción detallada de la necesidad |
| `fecha_preferida` | String | Fecha preferida para la reunión |
| `franja_horaria` | String | `"manana"`, `"tarde"` o `"indiferente"` |
| `estado` | String | `"pendiente"` o `"atendida"` |
| `fecha_solicitud` | Date | Timestamp de creación |

---

## 📋 Colección: `Automatizaciones`

Colección central del sistema. Representa el ciclo de vida completo de un proyecto de automatización.

| Campo | Tipo | Descripción |
|---|---|---|
| `_id` | ObjectId | Identificador interno |
| `userId` | String (UUID) | Referencia al cliente propietario |
| `nombre_proyecto` | String | Nombre descriptivo del proyecto |
| `descripcion` | String | Descripción detallada |
| `tipo_automatizacion` | String | Categoría de la automatización |
| `estado` | String | Estado actual del ciclo (ver diagrama) |
| `fecha_solicitud` | Date | Timestamp de creación |
| `gasto_estimado` | Number | Presupuesto total asignado por admin (€) |
| `motivo_rechazo` | String | Razón del rechazo (si aplica) |
| `actualizaciones_desarrollo` | Array | Lista de hitos publicados por el admin |
| `actualizaciones_desarrollo[].porcentaje` | Number | Porcentaje completado (0-100) |
| `actualizaciones_desarrollo[].mensaje` | String | Descripción del avance |
| `actualizaciones_desarrollo[].fecha` | Date | Timestamp del hito |
| `pago_anticipo_completado` | Boolean | `true` tras confirmar el pago del 50% inicial |
| `pago_final_completado` | Boolean | `true` tras confirmar el pago del 50% restante |
| `stripe_session_id_anticipo` | String | ID de sesión Stripe para el anticipo |
| `stripe_session_id_final` | String | ID de sesión Stripe para el pago final |
| `valoracion` | Number | Puntuación del cliente (1-5) |
| `comentario_valoracion` | String | Comentario de la valoración |

---

## 🔄 Estados de una Automatización

```mermaid
stateDiagram-v2
    [*] --> pendiente_revision : Cliente solicita
    pendiente_revision --> pendiente_pago_anticipo : Admin acepta
    pendiente_revision --> rechazada : Admin rechaza
    pendiente_pago_anticipo --> en_desarrollo : Cliente paga anticipo (Stripe)
    en_desarrollo --> pendiente_pago_final : Admin marca terminada
    pendiente_pago_final --> terminada : Cliente paga final (Stripe)
    terminada --> terminada : Cliente valora

    pendiente_revision --> cancelada : Cliente cancela
    pendiente_pago_anticipo --> cancelada : Cliente cancela
    en_desarrollo --> cancelada : Cliente cancela
    pendiente_pago_final --> cancelada : Cliente cancela
```

---

## 🔑 Índices Recomendados

| Colección | Campo | Motivo |
|---|---|---|
| `Usuarios` | `correo_electronico_acceso` | Búsqueda en login (único) |
| `Usuarios` | `identificador_unico_usuario` | Referencias cruzadas |
| `Citas` | `userId` | Filtrado por cliente |
| `Automatizaciones` | `userId` | Filtrado por cliente |
| `Automatizaciones` | `estado` | Filtrado en panel admin |
| `Automatizaciones` | `stripe_session_id_anticipo` | Lookup en webhook Stripe |
| `Automatizaciones` | `stripe_session_id_final` | Lookup en webhook Stripe |
