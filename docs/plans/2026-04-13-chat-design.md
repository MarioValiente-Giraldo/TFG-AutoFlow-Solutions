# Chat Cliente-Admin — Documento de Diseño

**Fecha:** 2026-04-13  
**Estado:** En progreso (diseno parcial, pendiente completar)

---

## Resumen

Chat de mensajeria interna entre clientes autenticados y el administrador. Permite al cliente enviar mensajes de soporte/consulta desde su dashboard, y al admin responder desde el suyo.

---

## Decisiones tomadas

| Pregunta | Decision |
|---|---|
| Usuarios del chat | Cliente autenticado ↔ Admin |
| Tiempo real vs polling | Polling simple (~3s), sin WebSockets |
| Ubicacion en UI | Seccion dedicada en ClienteDashboard y AdminDashboard |
| Indicador de no leidos | Badge/indicador visual en la navegacion |
| Implementacion | MongoDB + Flask endpoints + React polling (stack propio, sin dependencias externas) |

---

## Arquitectura general

**Backend:** Flask + PyMongo  
**Frontend:** React 19 + TypeScript + polling con `setInterval`  
**Almacenamiento:** Coleccion `mensajes` en MongoDB  

---

## Base de datos

### Coleccion `mensajes`

```javascript
{
  _id: ObjectId,
  cliente_id: String,        // identificador_unico_usuario del cliente
  remitente: "cliente" | "admin",
  contenido: String,
  timestamp: DateTime,
  leido: Boolean             // false hasta que el destinatario lo ve
}
```

**Notas:**
- Un hilo por cliente (no por cita).
- Todos los mensajes de un cliente comparten `cliente_id`.
- El admin ve todos los hilos de todos los clientes.
- El cliente solo ve su propio hilo.

---

## Pendiente de disenar

- [ ] Endpoints Flask (enviar mensaje, obtener mensajes, contar no leidos, marcar como leido)
- [ ] Componentes React (ChatPanel para cliente, ChatPanel para admin, lista de hilos del admin)
- [ ] Flujo del badge de no leidos
- [ ] Manejo de errores
- [ ] Consideraciones de seguridad (solo el propio cliente puede ver sus mensajes)
