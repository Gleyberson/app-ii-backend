# API Backend - Arquitectura Profesional Ecommerce

Backend en Node.js + Express + MongoDB refactorizado con arquitectura por capas y enfoque profesional:

- Patrón DAO + Repository.
- DTO para datos sensibles.
- Autenticación con Passport + JWT.
- Autorización por rol (`admin`, `user`).
- Recuperación de contraseña por mail con expiración de 1 hora.
- Lógica de compra con ticket y manejo de compra parcial por stock.

## Tecnologías

- Node.js
- Express
- MongoDB + Mongoose
- Passport (`local`, `jwt`)
- bcrypt
- jsonwebtoken
- nodemailer
- dotenv

## Arquitectura

```
src/
	app.js
	config/
		env.js
		mailer.js
		passport.js
	controllers/
		cartsController.js
		productsController.js
		sessionsController.js
		userController.js
	dao/
		cartDao.js
		productDao.js
		ticketDao.js
		userDao.js
	dto/
		currentUserDto.js
	middlewares/
		authorization.js
	models/
		cartModel.js
		productModel.js
		ticketModel.js
		userModel.js
	repositories/
		cartRepository.js
		productRepository.js
		ticketRepository.js
		userRepository.js
	routes/
		cartsRouter.js
		productsRouter.js
		sessionsRouter.js
		userRouter.js
	services/
		cartService.js
		productService.js
		purchaseService.js
		sessionService.js
		userService.js
	utils/
		jwt.js
		password.js
```

## Instalación

1. Instalar dependencias:
	 - `npm install`
2. Completar variables de entorno en `.env`.
3. Levantar servidor:
	 - `npm run start`

Servidor por defecto: `http://localhost:8080`

## Variables de entorno

Archivo incluido: `.env`

Variables:

- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `FRONTEND_URL`
- `MAIL_HOST`
- `MAIL_PORT`
- `MAIL_USER`
- `MAIL_PASS`
- `MAIL_FROM`

> Si no configurás SMTP, el servicio de mail usa `jsonTransport` para desarrollo.

## Autorización por rol

- Solo `admin` puede crear, actualizar y eliminar productos.
- Solo `user` puede agregar productos al carrito y ejecutar compra de carrito.

## Endpoints

### Usuarios (`/api/users`)

- `GET /` Listar usuarios (sin datos sensibles).
- `POST /` Crear usuario.
- `PUT /:uid` Actualizar usuario.
- `DELETE /:uid` Eliminar usuario.

### Sesiones (`/api/sessions`)

- `POST /login` Login y obtención de JWT.
- `GET /current` Usuario actual usando DTO (`id`, `first_name`, `last_name`, `email`, `role`).
- `POST /forgot-password` Solicitar recuperación (envía mail con link).
- `POST /reset-password` Restablecer contraseña con token temporal (1h).

Body ejemplo `forgot-password`:

```json
{
	"email": "user@mail.com"
}
```

Body ejemplo `reset-password`:

```json
{
	"email": "user@mail.com",
	"token": "token_recibido_en_mail",
	"newPassword": "nuevaClave123"
}
```

Reglas de reset:

- El token expira a la hora.
- No se permite reutilizar la contraseña actual.

### Productos (`/api/products`)

- `GET /` Listar productos.
- `POST /` Crear producto (`admin`).
- `PUT /:pid` Actualizar producto (`admin`).
- `DELETE /:pid` Eliminar producto (`admin`).

### Carritos (`/api/carts`)

- `POST /:cid/products/:pid` Agregar producto al carrito (`user`).
- `POST /:cid/purchase` Comprar carrito (`user`).

Respuesta de compra:

- Genera `ticket` cuando hay productos procesados.
- Devuelve productos no procesados por falta de stock.
- Vacía del carrito los comprados y mantiene solo pendientes.
