# API Backend - Usuarios, Autenticación y Autorización

Backend en Node.js + Express + MongoDB con CRUD de usuarios, autenticación mediante Passport y JWT, y endpoint de validación de sesión actual.

## Índice
- [Descripción](#descripción)
- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Requisitos](#requisitos)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Variables de entorno](#variables-de-entorno)
- [Modelo de Usuario](#modelo-de-usuario)
- [Rutas disponibles](#rutas-disponibles)
- [Guía de pruebas con Postman](#guía-de-pruebas-con-postman)
- [Notas de seguridad](#notas-de-seguridad)

## Descripción
Este proyecto implementa un sistema completo de usuarios con:

- CRUD de usuarios.
- Hashing de contraseña con bcrypt.
- Estrategia de login con Passport (Local).
- Autenticación con JWT.
- Endpoint `/api/sessions/current` para validar la sesión y devolver los datos del usuario asociado al token.

## Tecnologías
- Node.js
- Express
- MongoDB + Mongoose
- Passport (Local + JWT)
- bcrypt
- jsonwebtoken

## Estructura del proyecto
```
src/
	app.js
	config/
		passport.js
	models/
		userModel.js
		cartModel.js
	routes/
		userRouter.js
		sessionsRouter.js
	utils/
		password.js
		jwt.js
```

## Requisitos
- Node.js 18+ recomendado
- MongoDB local o Atlas

## Instalación y ejecución
1. Instalar dependencias:
	 - `npm install`
2. Levantar servidor:
	 - `npm run start`

Servidor por defecto en: `http://localhost:8080`

## Variables de entorno
Opcionalmente podés configurar:

- `JWT_SECRET`: clave para firmar los tokens JWT.

Si no se define, se usa el valor por defecto en `src/utils/jwt.js`. Para producción es obligatorio setear una clave segura.

## Modelo de Usuario
Campos definidos en el modelo:

- `first_name` (String, requerido)
- `last_name` (String, requerido)
- `email` (String, requerido, único)
- `age` (Number, requerido)
- `password` (String, requerido, hash)
- `cart` (ObjectId, referencia a carts)
- `role` (String, default: "user")

## Rutas disponibles

### Usuarios
Base: `/api/users`

- `GET /` → Lista todos los usuarios (sin password).
- `POST /` → Crea un usuario.
- `PUT /:uid` → Actualiza un usuario.
- `DELETE /:uid` → Elimina un usuario.

### Sesiones
Base: `/api/sessions`

- `POST /login` → Login de usuario. Devuelve JWT.
- `GET /current` → Valida JWT y devuelve usuario asociado.

## Guía de pruebas con Postman

### 1) Crear usuario
**Endpoint**: `POST http://localhost:8080/api/users`

**Body (JSON)**:
```
{
	"first_name": "Juan",
	"last_name": "Perez",
	"email": "juan@mail.com",
	"age": 28,
	"password": "123456",
	"role": "user"
}
```

**Respuesta esperada**: `status: success` y usuario creado (sin `password`).

### 2) Login y obtener token
**Endpoint**: `POST http://localhost:8080/api/sessions/login`

**Body (JSON)**:
```
{
	"email": "juan@mail.com",
	"password": "123456"
}
```

**Respuesta esperada**:
```
{
	"status": "success",
	"token": "<JWT>"
}
```

### 3) Validar usuario actual
**Endpoint**: `GET http://localhost:8080/api/sessions/current`

**Headers**:
```
Authorization: Bearer <JWT>
```

**Respuesta esperada**: `status: success` y datos del usuario asociado al token.

### 4) Listar usuarios
**Endpoint**: `GET http://localhost:8080/api/users`

### 5) Actualizar usuario
**Endpoint**: `PUT http://localhost:8080/api/users/:uid`

**Body (JSON)**:
```
{
	"age": 30,
	"role": "admin"
}
```

### 6) Eliminar usuario
**Endpoint**: `DELETE http://localhost:8080/api/users/:uid`

## Notas de seguridad
- Las contraseñas se almacenan en formato hash (bcrypt).
- El endpoint `/current` requiere JWT válido.
- Para producción, definir `JWT_SECRET` con una clave segura.
