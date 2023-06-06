![Logo](src/assets/Logos/DigitalDreams.png)

# ES | Digital Dreams

El proyecto es un sitio web de comercio electrónico que ofrece una variedad de productos relacionados con la tecnología y la informática. El objetivo principal del proyecto es proporcionar a los usuarios una plataforma conveniente para comprar productos de calidad en línea. El sitio web incluirá características como filtros de búsqueda avanzados, autenticación de terceros y una pasarela de pagos segura.

Con esta plataforma de comercio electrónico, los clientes podrán explorar las diversas categorías, realizar búsquedas específicas, comparar productos, leer reseñas de otros compradores y realizar compras de manera segura. Además, se brindará un sistema de autenticación de terceros para facilitar el proceso de registro y acceso a la plataforma.

En resumen, el proyecto busca proporcionar una experiencia de compra en línea conveniente y segura para los amantes de la tecnología y los productos relacionados con la informática.

### Categorías de productos disponibles:

- Equipos armados
- Consolas
- Notebooks
- Gabinetes
- Fuentes y UPS
- Motherboards
- Procesadores
- Cooling
- Memorias
- Almacenamiento
- Tarjetas de video
- Periféricos
- Monitores y TV
- Sillas
- Pendrives
- Impresoras

## Instalación

Sigue estos pasos para instalar el proyecto "DigitalDreams" utilizando npm.

Clona el repositorio de GitHub ejecutando el siguiente comando:

```bash
  git clone https://github.com/JuniorHuanca/DigitalDreams.git
```

Navega al directorio del proyecto clonado:

```bash
  cd DigitalDreams
```

Instala las dependencias del proyecto:

```bash
  npm install
```

## Configuración de Variables de Entorno

Para ejecutar este proyecto, deberá agregar las siguientes variables de entorno a su archivo .env

<details>
  <summary>
    <b style="font-size: 18px">Autenticación con GitHub:</b>
  </summary>
  
- Visita https://github.com/settings/developers en tu navegador y asegúrate de iniciar sesión en tu cuenta de GitHub.

- Haz clic en "New OAuth App" para crear una nueva aplicación OAuth.

- Completa los campos requeridos para tu nueva aplicación. Puedes proporcionar un nombre, descripción, URL de inicio de sesión y URL de redireccionamiento. Ten en cuenta que la URL de redireccionamiento debe ser relevante para tu proyecto.

- Después de completar los campos, haz clic en "Register Application" o "Crear aplicación", dependiendo de tu idioma.

- En la página de configuración de tu aplicación, encontrarás las dos variables de entorno necesarias:

  - `GITHUB_CLIENT_ID`: El ID del cliente de GitHub.
  - `GITHUB_CLIENT_SECRET`: El secreto del cliente de GitHub.

- Copia el valor de cada variable y pégalo en tu entorno de desarrollo o archivo `.env` en el proyecto.

  Ejemplo de archivo `.env`:

  `GITHUB_CLIENT_ID=YOUR_CLIENT_ID`

  `GITHUB_CLIENT_SECRET=YOUR_CLIENT_SECRET`
</details>

<details>
  <summary>
    <b style="font-size: 18px">Autenticación con Google:</b>
  </summary>
- Visita https://console.developers.google.com/apis/credentials en tu navegador y asegúrate de iniciar sesión en tu cuenta de Google.

- Crea un nuevo proyecto o selecciona uno existente.

- Navega a la sección de "Credenciales" o "Credentials" en el panel de control del proyecto.

- Haz clic en "Crear credenciales" o "Create credentials" y selecciona "ID de cliente de OAuth" o "OAuth client ID".

- Completa los campos requeridos para tu cliente de OAuth. Asegúrate de configurar la URL de redireccionamiento adecuada para tu proyecto.

- Después de completar los campos, haz clic en "Crear" o "Create" para crear el cliente de OAuth.

- En la página de configuración del cliente de OAuth, encontrarás las dos variables de entorno necesarias:

  - `GOOGLE_ID`: El ID del cliente de Google.
  - `GOOGLE_SECRET`: El secreto del cliente de Google.

- Copia el valor de cada variable y pégalo en tu entorno de desarrollo o archivo `.env` en el proyecto.

  Ejemplo de archivo `.env`:

  `GOOGLE_ID=YOUR_GOOGLE_ID`

  `GOOGLE_SECRET=YOUR_GOOGLE_SECRET`
</details>

<details>
  <summary>
    <b style="font-size: 18px">Autenticación con Spotify:</b>
  </summary>

- Visita https://developer.spotify.com/dashboard/applications en tu navegador y asegúrate de iniciar sesión en tu cuenta de Spotify o crear una cuenta nueva si aún no la tienes.

- Haz clic en "Crear una aplicación" o "Create an App" para crear una nueva aplicación en Spotify.

- Completa los campos requeridos para tu aplicación, como el nombre, descripción y URL de redireccionamiento. Asegúrate de que la URL de redireccionamiento sea relevante para tu proyecto.

- Una vez creada la aplicación, encontrarás las dos variables de entorno necesarias:

  - `SPOTIFY_CLIENT_ID`: El ID del cliente de Spotify.
  - `SPOTIFY_CLIENT_SECRET`: El secreto del cliente de Spotify.

- Copia el valor de cada variable y pégalo en tu entorno de desarrollo o archivo `.env` en el proyecto.

  Ejemplo de archivo `.env`:

  `SPOTIFY_CLIENT_ID=TU_CLIENT_ID_DE_SPOTIFY`

  `SPOTIFY_CLIENT_SECRET=TU_CLIENT_SECRET_DE_SPOTIFY`
</details>
<details>
  <summary>
    <b style="font-size: 18px">Cloudinary:</b>
  </summary>

- Visita https://cloudinary.com en tu navegador y asegúrate de iniciar sesión en tu cuenta de Cloudinary o crear una cuenta nueva si aún no la tienes.

- Navega al panel de control de Cloudinary.

- Haz clic en tu nombre de usuario en la esquina superior derecha y selecciona "Cuenta" o "Account" en el menú desplegable.

- En la página de configuración de la cuenta, encontrarás la sección de "Detalles de la cuenta" o "Account Details". Aquí encontrarás las tres variables de entorno necesarias:

  - `CLOUDINARY_CLOUD_NAME`: El nombre de tu cuenta de Cloudinary.
  - `CLOUDINARY_API_KEY`: La clave de API de tu cuenta de Cloudinary.
  - `CLOUDINARY_API_SECRET`: El secreto de API de tu cuenta de Cloudinary.

- Copia el valor de cada variable y pégalo en tu entorno de desarrollo o archivo `.env` en el proyecto.

  Ejemplo de archivo `.env`:

  `CLOUDINARY_CLOUD_NAME=TU_NOMBRE_DE_CUENTA_CLOUDINARY`

  `CLOUDINARY_API_KEY=TU_CLAVE_DE_API_CLOUDINARY`

  `CLOUDINARY_API_SECRET=TU_SECRETO_DE_API_CLOUDINARY`
</details>
<details>
  <summary>
    <b style="font-size: 18px">Stripe:</b>
  </summary>

- Visita https://dashboard.stripe.com en tu navegador y accede a tu cuenta de Stripe o crea una cuenta nueva si no tienes una.

- Una vez que hayas accedido, dirígete al panel de control de Stripe.

- En la barra lateral izquierda, haz clic en "Desarrolladores" y luego selecciona "Claves de API".

- En la página de Claves de API, encontrarás dos claves:

  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Esta es la clave de publicación utilizada en el lado del cliente.
  - `STRIPE_SECRET_KEY`: Esta es la clave secreta utilizada en el lado del servidor.

- Copia el valor de cada clave y configúralas como variables de entorno en tu entorno de desarrollo o en un archivo `.env` en el proyecto.

  Ejemplo de archivo `.env`:

  `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=TU_CLAVE_DE_PUBLICACIÓN`

  `STRIPE_SECRET_KEY=TU_CLAVE_SECRETA`
</details>
<details>
  <summary>
    <b style="font-size: 18px">NEXTAUTH_SECRET:</b>
  </summary>

- Visita https://generate-secret.vercel.app/32 en tu navegador.

- En el sitio web, se generará automáticamente un secreto de 32 caracteres.

- Haz clic en el botón de copiar para copiar el secreto generado.

- Pega el secreto en tu entorno de desarrollo o archivo `.env` en el proyecto.

  Ejemplo de archivo `.env`:

  `NEXTAUTH_SECRET=TU_SECRETO_GENERADO`
</details>
<details>
  <summary>
    <b style="font-size: 18px">NodeMailer:</b>
  </summary>
  Para que Nodemailer funcione y pueda enviar correos electrónicos, necesitarás utilizar las credenciales de una cuenta de correo de Google. Sigue los siguientes pasos para obtener las credenciales necesarias:

- Abre un navegador web y visita la página de "Contraseñas de aplicaciones" de Google en https://myaccount.google.com/apppasswords.

- Inicia sesión en tu cuenta de Google si se te solicita.

- En la sección "Seleccionar aplicación" o "Select app", elige la aplicación para la cual deseas generar la contraseña. Si la aplicación no aparece en la lista, selecciona "Otra (personalizada)" o "Other (custom)".

- En la sección "Seleccionar dispositivo" o "Select device", elige el dispositivo desde el cual utilizarás la contraseña de aplicación. Si no aparece el dispositivo deseado, selecciona "Otro (personalizado)" o "Other (custom)".

- Haz clic en el botón "Generar" o "Generate".

- Google generará una contraseña de aplicación única. Copia esta contraseña y guárdala en un lugar seguro.

- Pega la contraseña en tu entorno de desarrollo o archivo `.env` en el proyecto.

  Ejemplo de archivo `.env`:

  `GOOGLE_EMAIL=TU_GOOGLE_EMAIL`

  `GOOGLE_PASSWORD=TU_GOOGLE_PASSWORD`
</details>
<details>
  <summary>
    <b style="font-size: 18px">Base de Datos ( postgreSQL):</b>
  </summary>
Agrega la siguiente línea al archivo `.env` para configurar la variable de entorno

Ejemplo de archivo `.env`:
`DATABASE_URL=postgresql://postgres:password@localhost:5432/digitaldreams?schema=public`

</details>

## Tu archivo debería verse así:

    BASE_URL="http://localhost:3000/"
    GITHUB_CLIENT_ID=YOUR_CLIENT_ID
    GITHUB_CLIENT_SECRET=YOUR_CLIENT_SECRET
    GOOGLE_ID=YOUR_GOOGLE_ID
    GOOGLE_SECRET=YOUR_GOOGLE_SECRET
    SPOTIFY_CLIENT_ID=TU_CLIENT_ID_DE_SPOTIFY
    SPOTIFY_CLIENT_SECRET=TU_CLIENT_SECRET_DE_SPOTIFY
    CLOUDINARY_CLOUD_NAME=TU_NOMBRE_DE_CUENTA_CLOUDINARY
    CLOUDINARY_API_KEY=TU_CLAVE_DE_API_CLOUDINARY
    CLOUDINARY_API_SECRET=TU_SECRETO_DE_API_CLOUDINARY
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=TU_CLAVE_DE_PUBLICACIÓN
    STRIPE_SECRET_KEY=TU_CLAVE_SECRETA
    NEXTAUTH_SECRET=TU_SECRETO_GENERADO
    GOOGLE_EMAIL=TU_GOOGLE_EMAIL
    GOOGLE_PASSWORD=TU_GOOGLE_PASSWORD
    DATABASE_URL=postgresql://postgres:password@localhost:5432/digitaldreams?schema=public

## Ejecutar localmente

Para ejecutar el proyecto localmente, sigue estos pasos:

- Abre una terminal en la raíz del proyecto.
- Ejecuta el siguiente comando para aplicar las migraciones de la base de datos:

```bash
  npx prisma migrate dev
```

- Se te pedirá que le des un nombre a la migración. Ingresa un nombre descriptivo y presiona Enter.
- Luego, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

```bash
  npm run dev
```

- Abre tu navegador web y ve a la URL http://localhost:3000.
  Ahora deberías poder ver y utilizar la aplicación localmente en tu navegador.

## Ingresar datos en la aplicación

- La aplicación no tiene datos inicialmente, por lo que existen dos formas de ingresar productos:

1. La primera forma es a través de la interfaz de usuario.
   - Dirígete a http://localhost:3000/auth/SignIn y regístrate.
   - Una vez registrado, inicia sesión. Al ser la primera cuenta registrada, tendrás el rol de "Admin". Con este rol, puedes ir a http://localhost:3000/dashboard y hacer clic en el botón "POST DATA".
   - Si ves una alerta de éxito en la parte izquierda de la pantalla que dice "all data in the app! refresh page to get data", puedes ir nuevamente a http://localhost:3000 y ver la aplicación funcionando correctamente.
2. La segunda forma es usando `Postman` o `Thunder Client` en Visual Studio Code.
   - Haz una solicitud de tipo `POST` a `http://localhost:3000/api/data`

## Respuesta exitosa

Código: `200`

Contenido: Objeto JSON

```json
{
  "brands": 48,
  "categories": 16,
  "countries": 250,
  "subcategories": 34,
  "products": 830
}
```

## Respuesta de error

Código: `400`

Contenido: Objeto JSON

```json
{
  "success": false,
  "message": "the data exists"
}
```

# EN | Digital Dreams

The project is an e-commerce website that offers a variety of technology and computer-related products. The main objective of the project is to provide users with a convenient platform to purchase quality products online. The website will include features such as advanced search filters, third-party authentication, and a secure payment gateway.

With this e-commerce platform, customers will be able to explore various categories, perform specific searches, compare products, read reviews from other buyers, and make secure purchases. Additionally, a third-party authentication system will be provided to streamline the registration and login process.

In summary, the project aims to provide a convenient and secure online shopping experience for technology enthusiasts and those interested in computer-related products.

### Available product categories:

- Built Computers (Equipos armados)
- Consoles (Consolas)
- Notebooks (Portátiles)
- Cabinets (Gabinetes)
- Power Supplies and UPS (Fuentes de alimentación y UPS)
- Motherboards (Placas base)
- Processors (Procesadores)
- Cooling (Refrigeración)
- Memory (Memoria)
- Storage (Almacenamiento)
- Graphics Cards (Tarjetas gráficas)
- Peripherals (Periféricos)
- Monitors and TVs (Monitores y televisores)
- Chairs (Sillas)
- Pendrives (Memorias USB)
- Printers (Impresoras)

## Installation

Follow these steps to install the "DigitalDreams" project using npm.

Clone the GitHub repository by executing the following command:

```bash
git clone https://github.com/JuniorHuanca/DigitalDreams.git
```

Navigate to the cloned project directory:

```bash
  cd DigitalDreams
```

Install the project dependencies:

```bash
  npm install
```

## Demo

https://digitaldreams.vercel.app

# API Reference

## Overview

The API reference provides detailed information on how to interact with our API endpoints. It includes the endpoint structure, supported parameters, HTTP methods, and expected responses. Use this documentation to understand our API.

## Base URL

All API endpoints are accessed via the following base URL:

```http
  http://localhost:3000
```

## Endpoints

### Products

- GET all products

```http
  GET /api/products
```

| Parameter | Type   | Description                           |
| :-------- | :----- | :------------------------------------ |
| `none`    | `none` | You get all the products in the store |

- GET all products recommended

```http
  GET /api/products?recommended=true
```

| Parameter | Type   | Description                          |
| :-------- | :----- | :----------------------------------- |
| `none`    | `none` | You get all the recommended products |

- GET all products by brand

```http
  GET /api/products?brand=${brand}
```

| Parameter | Type     | Description                          |
| :-------- | :------- | :----------------------------------- |
| `brand`   | `string` | **Required**. brand of item to fetch |

- GET one product of each brand

```http
  GET /api/products?brands=true
```

| Parameter | Type   | Description                     |
| :-------- | :----- | :------------------------------ |
| `none`    | `none` | You get a product of each brand |

- GET all the best selling products

```http
  GET /api/products?mostSelling=true
```

| Parameter | Type   | Description                           |
| :-------- | :----- | :------------------------------------ |
| `none`    | `none` | You get all the best selling products |

- GET all related products

```http
  GET /api/products?related=${name}&id=${id}
```

| Parameter | Type     | Description                                           |
| :-------- | :------- | :---------------------------------------------------- |
| `name`    | `string` | **Required**. element name to search for its related  |
| `id`      | `string` | **Required**. id of the element to not bring the same |

- GET all the products of the category

```http
  GET /api/products?category=${category}
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `category` | `string` | **Required**. category of item to fetch |

### Product

- GET product by id

```http
  GET /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. id of item to fetch |

#### GET data

```http
  GET /api/data
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

## Author

- [@Junior Huanca](https://github.com/JuniorHuanca)
