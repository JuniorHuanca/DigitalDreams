import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head >
        <meta name="description" content="Encuentra los mejores productos tecnológicos en nuestro e-commerce: computadoras, ratones, teclados, y luces LED. Ofrecemos una amplia variedad de marcas y modelos, con características que se adaptan a las necesidades de cada usuario. Además, contamos con precios competitivos y un servicio de atención al cliente excepcional. ¡Visítanos y encuentra todo lo que necesitas para estar a la vanguardia de la tecnología!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preload" href="https://fonts.googleapis.com/css?family=Montserrat:400,800&display=swap" as="font" />
        <link rel="icon" href="/github.png" />
      </Head>
      <body>
        <div className="app">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  )
}
