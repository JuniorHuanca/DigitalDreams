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

### Autenticación con GitHub:

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

### Autenticación con Google:

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

### Autenticación con Spotify:

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

### Cloudinary

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

### Stripe

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

### NEXTAUTH_SECRET

- Visita https://generate-secret.vercel.app/32 en tu navegador.

- En el sitio web, se generará automáticamente un secreto de 32 caracteres.

- Haz clic en el botón de copiar para copiar el secreto generado.

- Pega el secreto en tu entorno de desarrollo o archivo `.env` en el proyecto.

  Ejemplo de archivo `.env`:

  `NEXTAUTH_SECRET=TU_SECRETO_GENERADO`

### NodeMailer

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

### Base de Datos ( postgreSQL)

Agrega la siguiente línea al archivo `.env` para configurar la variable de entorno

Ejemplo de archivo `.env`:
`DATABASE_URL=postgresql://postgres:password@localhost:5432/digitaldreams?schema=public`


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

https://digitaldreams.vercel.app/

## Author

- [@Junior Huanca](https://github.com/JuniorHuanca)

## API Reference

Endpoints created:

#### Get all products

```http
  Get /api/products
```

| Parameter | Type  | Description               |
| :-------- | :---- | :------------------------ |
| `none`    | `any` | All products in the store |

#### Get product

```http
  GET /api/products/${id}
```

#### Get data

```http
  GET /api/data
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |
