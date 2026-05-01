#!/bin/sh
python -c "
import sys
sys.path.insert(0, '.')
from db import get_db
db = get_db()
count = db.Usuarios.count_documents({}) if db is not None else 0
sys.exit(0 if count == 0 else 1)
"
if [ $? -eq 0 ]; then
    echo "[entrypoint] Base de datos vacía, cargando datos de prueba..."
    python seed.py
else
    echo "[entrypoint] Base de datos ya inicializada, saltando seed."
fi
exec python app.py
