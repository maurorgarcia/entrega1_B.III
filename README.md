# Programación Backend III - Entrega N°1

Proyecto correspondiente a la **Entrega N°1** del curso de **Programación Backend III** de Coderhouse (base del proyecto Adoptme).

---

## 📋 Requerimientos Implementados

1. **Router `mocks.router.js`**:
   - Montado bajo la ruta base `/api/mocks`.

2. **Migración de `/mockingpets`**:
   - Se movió el endpoint dentro del router de mocks (`GET /api/mocks/mockingpets`).
   - Genera mascotas simuladas con nombre, especie, fecha de nacimiento, estado de adopción e imagen.

3. **Módulo de Mocking de Usuarios (`src/utils/mocking.js`)**:
   - Genera usuarios según un parámetro numérico con las siguientes características:
     - Contraseña: `'coder123'` encriptada con `bcrypt`.
     - Rol: asignado aleatoriamente entre `'user'` y `'admin'`.
     - Mascotas: `pets: []` (array vacío).
     - Formato de documento Mongo (`_id`, `first_name`, `last_name`, `email`, `password`, `role`, `pets`).

4. **Endpoint `GET /api/mocks/mockingusers`**:
   - Genera y devuelve 50 usuarios con el formato entregado por MongoDB.

5. **Endpoint `POST /api/mocks/generateData`**:
   - Recibe los parámetros numéricos `users` y `pets` en el cuerpo de la petición (`req.body`).
   - Genera los registros indicados y los inserta en la base de datos MongoDB utilizando `usersService` y `petsService`.

6. **Comprobación de registros**:
   - Los registros insertados son verificables mediante los servicios GET:
     - `GET /api/users`: Lista de usuarios en base de datos.
     - `GET /api/pets`: Lista de mascotas en base de datos.

---

## 📁 Estructura del Proyecto

```text
├── src/
│   ├── app.js                          # Servidor Express principal y montaje de /api/mocks
│   ├── controllers/
│   │   ├── mocks.controller.js         # Controlador de mockingpets, mockingusers y generateData
│   │   ├── pets.controller.js          # Controlador de mascotas
│   │   ├── users.controller.js         # Controlador de usuarios
│   │   ├── adoptions.controller.js     # Controlador de adopciones
│   │   └── sessions.controller.js      # Controlador de sesiones
│   ├── routes/
│   │   ├── mocks.router.js             # Enrutador /api/mocks
│   │   ├── pets.router.js              # Enrutador /api/pets
│   │   ├── users.router.js              # Enrutador /api/users
│   │   ├── adoption.router.js          # Enrutador /api/adoptions
│   │   └── sessions.router.js          # Enrutador /api/sessions
│   ├── services/                       # Servicios y repositorios
│   ├── dao/                            # Capa DAO y modelos de Mongoose
│   └── utils/
│       ├── mocking.js                  # Módulo de generación de mocks (Faker + Bcrypt)
│       ├── index.js                    # Hash y validación de contraseñas
│       └── uploader.js                 # Manejo de imágenes con Multer
├── .env                                # Variables de entorno
├── .env.example                        # Plantilla de variables de entorno
└── package.json                        # Dependencias y scripts
```

---

## 🚀 Instalación y Puesta en Marcha

### 1. Instalar dependencias
```bash
npm install
```

### 2. Configurar variables de entorno
Verificar el archivo `.env` con la URL de conexión a tu base de datos MongoDB:
```env
PORT=8080
MONGODB_URI=mongodb://127.0.0.1:27017/adoptme
```
*(Puedes sustituir `MONGODB_URI` por tu cadena de conexión de MongoDB Atlas si no usas MongoDB local).*

### 3. Iniciar el servidor
```bash
# Modo desarrollo con nodemon:
npm run dev

# Modo producción:
npm start
```

---

## 📮 Guía de Pruebas en Postman

### 1. Obtener mascotas mockeadas
- **Método**: `GET`
- **URL**: `http://localhost:8080/api/mocks/mockingpets`
- **Respuesta esperada**: `200 OK` con un array de mascotas generadas por Faker.

### 2. Obtener 50 usuarios mockeados
- **Método**: `GET`
- **URL**: `http://localhost:8080/api/mocks/mockingusers`
- **Respuesta esperada**: `200 OK` con un array de 50 usuarios, cada uno con contraseña encriptada, rol variable y array de `pets` vacío.

### 3. Generar e insertar usuarios y mascotas en la Base de Datos
- **Método**: `POST`
- **URL**: `http://localhost:8080/api/mocks/generateData`
- **Headers**:
  - `Content-Type: application/json`
- **Body** (`raw` -> `JSON`):
  ```json
  {
    "users": 10,
    "pets": 5
  }
  ```
- **Respuesta esperada**: `200 OK`
  ```json
  {
    "status": "success",
    "message": "Data generated successfully"
  }
  ```

### 4. Comprobar registros insertados
- **Ver usuarios guardados**:
  - **Método**: `GET`
  - **URL**: `http://localhost:8080/api/users`
- **Ver mascotas guardadas**:
  - **Método**: `GET`
  - **URL**: `http://localhost:8080/api/pets`
