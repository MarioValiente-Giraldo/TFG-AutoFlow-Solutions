"""
Script de datos de prueba — ejecutar dentro del contenedor backend:
  docker exec autoflow_backend python seed.py
"""
import uuid
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash
from db import get_db

db = get_db()
if db is None:
    print("❌ No se pudo conectar a MongoDB")
    exit(1)

db.Usuarios.drop()
db.Automatizaciones.drop()
db.Citas.drop()
print("🗑️  Colecciones limpiadas")

now = datetime.utcnow()

# ── Usuarios (15) ─────────────────────────────────────────────────────────────
admin_id = str(uuid.uuid4())

clientes = [
    {"id": str(uuid.uuid4()), "nombre": "Ana García",       "empresa": "Distribuciones García SL", "email": "ana.garcia@empresa.com",       "tel": "+34 611 111 111", "dias": 120},
    {"id": str(uuid.uuid4()), "nombre": "Carlos López",     "empresa": "TechVenture SL",            "email": "carlos.lopez@empresa.com",     "tel": "+34 622 222 222", "dias": 100},
    {"id": str(uuid.uuid4()), "nombre": "Laura Martínez",   "empresa": "Consultoría LM",            "email": "laura.martinez@empresa.com",   "tel": "+34 633 333 333", "dias": 90},
    {"id": str(uuid.uuid4()), "nombre": "Pedro Sánchez",    "empresa": "Logística PS SL",           "email": "pedro.sanchez@empresa.com",    "tel": "+34 644 444 444", "dias": 80},
    {"id": str(uuid.uuid4()), "nombre": "Marta Ruiz",       "empresa": "Marta Ruiz Eventos",        "email": "marta.ruiz@empresa.com",       "tel": "+34 655 555 555", "dias": 70},
    {"id": str(uuid.uuid4()), "nombre": "Javier Moreno",    "empresa": "Moreno & Asociados",        "email": "javier.moreno@empresa.com",    "tel": "+34 666 666 666", "dias": 60},
    {"id": str(uuid.uuid4()), "nombre": "Sofía Torres",     "empresa": "Torres Digital SL",         "email": "sofia.torres@empresa.com",     "tel": "+34 677 777 777", "dias": 50},
    {"id": str(uuid.uuid4()), "nombre": "Alejandro Díaz",   "empresa": "Díaz Inmobiliaria",         "email": "alejandro.diaz@empresa.com",   "tel": "+34 688 888 888", "dias": 45},
    {"id": str(uuid.uuid4()), "nombre": "Elena Fernández",  "empresa": "EF Consulting",             "email": "elena.fernandez@empresa.com",  "tel": "+34 699 999 999", "dias": 40},
    {"id": str(uuid.uuid4()), "nombre": "David Jiménez",    "empresa": "Jiménez Tech",              "email": "david.jimenez@empresa.com",    "tel": "+34 610 101 010", "dias": 35},
    {"id": str(uuid.uuid4()), "nombre": "Isabel Romero",    "empresa": "Romero & Partners",         "email": "isabel.romero@empresa.com",    "tel": "+34 611 202 020", "dias": 30},
    {"id": str(uuid.uuid4()), "nombre": "Miguel Herrera",   "empresa": "Herrera Soluciones",        "email": "miguel.herrera@empresa.com",   "tel": "+34 622 303 030", "dias": 20},
    {"id": str(uuid.uuid4()), "nombre": "Carmen Navarro",   "empresa": "Navarro Retail SL",         "email": "carmen.navarro@empresa.com",   "tel": "+34 633 404 040", "dias": 15},
    {"id": str(uuid.uuid4()), "nombre": "Roberto Gil",      "empresa": "Gil & Sons SL",             "email": "roberto.gil@empresa.com",      "tel": "+34 644 505 050", "dias": 7},
]

usuarios = [
    {
        "identificador_unico_usuario": admin_id,
        "correo_electronico_acceso": "admin@autoflow.com",
        "contrasena": generate_password_hash("Admin1234!"),
        "telefono": "+34 600 000 001",
        "datos_perfil_comercial": {"nombre": "Mario Admin", "empresa": "AutoFlow Solutions"},
        "rol": "superadmin",
        "fecha_registro": now,
        "aceptacion_terminos": True,
    }
] + [
    {
        "identificador_unico_usuario": c["id"],
        "correo_electronico_acceso": c["email"],
        "contrasena": generate_password_hash("Cliente1234!"),
        "telefono": c["tel"],
        "datos_perfil_comercial": {"nombre": c["nombre"], "empresa": c["empresa"]},
        "rol": "cliente",
        "fecha_registro": now - timedelta(days=c["dias"]),
        "aceptacion_terminos": True,
    }
    for c in clientes
]

db.Usuarios.insert_many(usuarios)
print(f"✅ {len(usuarios)} usuarios insertados")

# ── Citas (15) ────────────────────────────────────────────────────────────────
citas_data = [
    {"c": clientes[0],  "tipo": "Gestión de pedidos",         "desc": "Automatizar pedidos entrantes desde WooCommerce.",                  "dias_atras": 110, "dias_pref": 5,  "franja": "mañana", "estado": "atendida"},
    {"c": clientes[1],  "tipo": "Facturación automática",     "desc": "Generar y enviar facturas PDF al cerrar cada venta.",               "dias_atras": 95,  "dias_pref": 3,  "franja": "tarde",  "estado": "atendida"},
    {"c": clientes[2],  "tipo": "Onboarding de clientes",     "desc": "Flujo de bienvenida con email, Drive y Notion.",                   "dias_atras": 85,  "dias_pref": 7,  "franja": "mañana", "estado": "atendida"},
    {"c": clientes[3],  "tipo": "Gestión de inventario",      "desc": "Alertas cuando el stock baje del umbral definido.",                 "dias_atras": 75,  "dias_pref": 10, "franja": "tarde",  "estado": "atendida"},
    {"c": clientes[4],  "tipo": "Reporting",                  "desc": "Informe PDF semanal con métricas de ventas enviado cada lunes.",    "dias_atras": 65,  "dias_pref": 4,  "franja": "mañana", "estado": "atendida"},
    {"c": clientes[5],  "tipo": "Integración CRM",            "desc": "Sincronizar contactos entre HubSpot y la base de datos interna.",   "dias_atras": 55,  "dias_pref": 6,  "franja": "tarde",  "estado": "atendida"},
    {"c": clientes[6],  "tipo": "Notificaciones WhatsApp",    "desc": "Enviar notificaciones automáticas de estado de pedido por WA.",    "dias_atras": 45,  "dias_pref": 8,  "franja": "mañana", "estado": "atendida"},
    {"c": clientes[7],  "tipo": "Automatización de RRHH",     "desc": "Generar contratos y notificar incorporaciones nuevas.",             "dias_atras": 40,  "dias_pref": 5,  "franja": "tarde",  "estado": "atendida"},
    {"c": clientes[8],  "tipo": "Scraping de precios",        "desc": "Monitorizar precios de competidores y alertar por email.",          "dias_atras": 35,  "dias_pref": 3,  "franja": "mañana", "estado": "atendida"},
    {"c": clientes[9],  "tipo": "Gestión de tickets",         "desc": "Clasificar y asignar tickets de soporte automáticamente.",          "dias_atras": 28,  "dias_pref": 9,  "franja": "tarde",  "estado": "atendida"},
    {"c": clientes[10], "tipo": "Email marketing",            "desc": "Segmentar y enviar campañas basadas en comportamiento del usuario.", "dias_atras": 20,  "dias_pref": 5,  "franja": "mañana", "estado": "pendiente"},
    {"c": clientes[11], "tipo": "Sincronización Google",      "desc": "Exportar datos de ventas a Google Sheets diariamente.",             "dias_atras": 14,  "dias_pref": 7,  "franja": "tarde",  "estado": "pendiente"},
    {"c": clientes[12], "tipo": "Reservas online",            "desc": "Automatizar confirmaciones y recordatorios de reservas.",           "dias_atras": 8,   "dias_pref": 10, "franja": "mañana", "estado": "pendiente"},
    {"c": clientes[13], "tipo": "Facturación Stripe",         "desc": "Conectar Stripe con el sistema contable para registro automático.", "dias_atras": 4,   "dias_pref": 14, "franja": "tarde",  "estado": "pendiente"},
    {"c": clientes[0],  "tipo": "Chatbot de soporte",         "desc": "Implementar chatbot con IA para responder FAQs de clientes.",       "dias_atras": 2,   "dias_pref": 20, "franja": "mañana", "estado": "pendiente"},
]

citas = []
cita_ids = []
for cd in citas_data:
    cid = str(uuid.uuid4())
    cita_ids.append(cid)
    citas.append({
        "identificador_unico_cita": cid,
        "nombre": cd["c"]["nombre"],
        "email": cd["c"]["email"],
        "telefono": cd["c"]["tel"],
        "empresa": cd["c"]["empresa"],
        "tipo_automatizacion": cd["tipo"],
        "descripcion": cd["desc"],
        "fecha_preferida": (now + timedelta(days=cd["dias_pref"])).strftime("%Y-%m-%d"),
        "franja_horaria": cd["franja"],
        "estado": cd["estado"],
        "fecha_solicitud": now - timedelta(days=cd["dias_atras"]),
    })

db.Citas.insert_many(citas)
print(f"✅ {len(citas)} citas insertadas")

# ── Automatizaciones (15) ─────────────────────────────────────────────────────
estados_ciclo = [
    "terminada", "terminada", "terminada",
    "pendiente_pago_final",
    "en_desarrollo", "en_desarrollo",
    "pendiente_pago_anticipo", "pendiente_pago_anticipo",
    "pendiente_revision", "pendiente_revision", "pendiente_revision",
    "rechazada", "rechazada",
    "cancelada",
    "terminada",
]

autos_data = [
    {"c": clientes[0],  "titulo": "Automatización de pedidos WooCommerce",    "tipo": "Gestión de pedidos",      "gasto": 1200.0, "dias": 100, "cita_idx": 0},
    {"c": clientes[1],  "titulo": "Sistema de facturación automática",         "tipo": "Facturación automática",  "gasto": 900.0,  "dias": 90,  "cita_idx": 1},
    {"c": clientes[2],  "titulo": "Onboarding automatizado de clientes",       "tipo": "Onboarding",              "gasto": 750.0,  "dias": 80,  "cita_idx": 2},
    {"c": clientes[3],  "titulo": "Control de stock con alertas Slack",        "tipo": "Gestión de inventario",   "gasto": 600.0,  "dias": 70,  "cita_idx": 3},
    {"c": clientes[4],  "titulo": "Informe semanal de ventas en PDF",          "tipo": "Reporting",               "gasto": 500.0,  "dias": 60,  "cita_idx": 4},
    {"c": clientes[5],  "titulo": "Sincronización HubSpot ↔ BD interna",       "tipo": "Integración CRM",         "gasto": 850.0,  "dias": 50,  "cita_idx": 5},
    {"c": clientes[6],  "titulo": "Notificaciones WhatsApp de pedidos",        "tipo": "Notificaciones",          "gasto": 400.0,  "dias": 40,  "cita_idx": 6},
    {"c": clientes[7],  "titulo": "Automatización de contratos RRHH",          "tipo": "Automatización RRHH",     "gasto": 700.0,  "dias": 35,  "cita_idx": 7},
    {"c": clientes[8],  "titulo": "Monitor de precios de competidores",        "tipo": "Scraping",                "gasto": None,   "dias": 30,  "cita_idx": 8},
    {"c": clientes[9],  "titulo": "Clasificación automática de tickets",       "tipo": "Gestión de tickets",      "gasto": None,   "dias": 25,  "cita_idx": 9},
    {"c": clientes[10], "titulo": "Campañas de email marketing segmentadas",   "tipo": "Email marketing",         "gasto": None,   "dias": 18,  "cita_idx": None},
    {"c": clientes[11], "titulo": "Exportación diaria a Google Sheets",        "tipo": "Reporting",               "gasto": None,   "dias": 12,  "cita_idx": None},
    {"c": clientes[12], "titulo": "Confirmaciones automáticas de reservas",    "tipo": "Reservas",                "gasto": None,   "dias": 6,   "cita_idx": None},
    {"c": clientes[13], "titulo": "Integración Stripe con contabilidad",       "tipo": "Facturación",             "gasto": None,   "dias": 3,   "cita_idx": None},
    {"c": clientes[0],  "titulo": "Chatbot IA para soporte al cliente",        "tipo": "IA / Chatbot",            "gasto": 1500.0, "dias": 110, "cita_idx": None},
]

motivos_rechazo = [
    "Requiere acceso a sistemas legacy incompatibles con n8n en este momento.",
    "El alcance supera el presupuesto disponible del cliente para este trimestre.",
]

automatizaciones = []
for i, ad in enumerate(autos_data):
    estado = estados_ciclo[i]
    c = ad["c"]
    dias = ad["dias"]
    gasto = ad["gasto"]
    cita_id = cita_ids[ad["cita_idx"]] if ad["cita_idx"] is not None else None

    doc = {
        "identificador_unico": str(uuid.uuid4()),
        "identificador_propietario": c["id"],
        "email_propietario": c["email"],
        "nombre_propietario": c["nombre"],
        "titulo": ad["titulo"],
        "descripcion": f"Proyecto de {ad['tipo'].lower()} para {c['empresa']}.",
        "tipo_automatizacion": ad["tipo"],
        "estado": estado,
        "gasto_estimado": gasto if estado not in ("pendiente_revision", "rechazada", "cancelada") else None,
        "motivo_rechazo": None,
        "identificador_admin": admin_id if estado != "pendiente_revision" else None,
        "nombre_admin": "Mario Admin" if estado != "pendiente_revision" else None,
        "id_cita_origen": cita_id,
        "fecha_solicitud": now - timedelta(days=dias),
        "fecha_actualizacion": now - timedelta(days=max(dias - 5, 1)),
    }

    if estado in ("terminada", "en_desarrollo", "pendiente_pago_final"):
        doc["fecha_pago_anticipo"] = (now - timedelta(days=dias - 10)).isoformat()
        doc["actualizaciones_desarrollo"] = [
            {"mensaje": "Inicio del desarrollo y configuración del entorno.", "porcentaje": 25, "fecha": (now - timedelta(days=dias - 12)).isoformat()},
            {"mensaje": "Primera integración completada y probada.", "porcentaje": 60, "fecha": (now - timedelta(days=dias - 20)).isoformat()},
        ]
        if estado in ("terminada", "pendiente_pago_final"):
            doc["actualizaciones_desarrollo"].append(
                {"mensaje": "Desarrollo terminado. Pruebas finales superadas.", "porcentaje": 100, "fecha": (now - timedelta(days=dias - 25)).isoformat()}
            )
        if estado == "terminada":
            doc["fecha_pago_final"] = (now - timedelta(days=max(dias - 30, 1))).isoformat()
            doc["valoracion"] = {
                "puntuacion": [5, 4, 5, 4, 5][i % 5],
                "comentario": ["Excelente trabajo.", "Muy satisfecho con el resultado.", "Superó nuestras expectativas.", "Rápido y profesional.", "Lo recomendaría sin duda."][i % 5],
                "fecha": (now - timedelta(days=max(dias - 32, 1))).isoformat(),
            }

    if estado == "rechazada":
        doc["motivo_rechazo"] = motivos_rechazo[i % len(motivos_rechazo)]

    automatizaciones.append(doc)

db.Automatizaciones.insert_many(automatizaciones)
print(f"✅ {len(automatizaciones)} automatizaciones insertadas")

print("\n📋 Credenciales de acceso:")
print("   Superadmin → admin@autoflow.com      / Admin1234!")
print("   Clientes   → ana.garcia@empresa.com  / Cliente1234!  (y similares)")
