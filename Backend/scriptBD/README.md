# Base de datos

Importar el archivo `lanaylino.sql` en phpMyAdmin antes de levantar el backend.

El archivo incluye:

- Estructura completa de la base `lanaylino`
- Datos iniciales
- Tabla `carrito`
- Claves primarias, claves foraneas y `AUTO_INCREMENT`

Pasos recomendados:

1. Abrir phpMyAdmin.
2. Crear una base llamada `lanaylino`.
3. Entrar a esa base.
4. Ir a **Importar**.
5. Seleccionar `Backend/scriptBD/lanaylino.sql`.
6. Ejecutar la importacion.

Despues levantar el backend:

```bash
cd Backend
npm install
npm run dev
```

El archivo `Backend/.env` debe apuntar a la base `lanaylino`.
