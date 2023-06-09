export const dataPDF = {
  totalCustomers: 1,
  yearlyTotalSoldUnits: 7,
  yearlySalesTotal: 1179,
  monthlyData: [
    {
      id: 2,
      month: "June",
      totalSales: 1179,
      totalUnits: 7,
      productStatId: null,
      overallStatId: 1,
    },
  ],
  salesByCategory: {
    Sillas: 279,
    Periféricos: 183,
    Procesadores: 717,
  },
  todayStats: null,
  thisMonthStats: null,
  transactions: [
    {
      id: 2,
      userId: "clinblbj70000l50811b844n8",
      checkoutSession:
        "cs_test_b1L2MokpTVCVPaL6lJqqSAqZooE0Zg8HaoY7ixnWfb2eoRWFpPCoICKGeH",
      cost: 900,
      createdAt: "2023-06-08T15:59:11.118Z",
      updatedAt: "2023-06-08T15:59:11.118Z",
      products: [
        {
          id: 240,
          name: "CPU Intel Core i5 11400F Rocket Lake 1200",
          image:
            "https://res.cloudinary.com/dyhvabxfm/image/upload/v1679540486/E-commerce/240.webp",
          brandId: 2,
          subcategoryId: 12,
          price: 239,
          description:
            "##2Descripción##4##4  ##3##1Cantidad de núcleos 6 ##1Cantidad de subprocesos 12 ##1Frecuencia básica del procesador 2,60 GHz ##1Frecuencia turbo máxima 4,40 GHz ##1Caché 12 MB Intel® Smart Cache ##1Velocidad del bus 8 GT/s ##1TDP 65 W",
          rating: 0,
          stock: 16,
          soldCount: 3,
          deleted: false,
          createdAt: "2023-06-08T15:55:35.033Z",
          updatedAt: "2023-06-08T15:59:11.888Z",
        },
        {
          id: 557,
          name: "Teclado Logitech G213",
          image:
            "https://res.cloudinary.com/dyhvabxfm/image/upload/v1679540486/E-commerce/557.webp",
          brandId: 4,
          subcategoryId: 23,
          price: 61,
          description:
            "##2Descripción   ##4##4##2Cada tecla de G213 está optimizada para mejorar la experiencia táctil y ofrecer una respuesta superrápida, hasta 4 veces superior a la de los teclados estándar. ##2La matriz de prevención de efecto fantasma para juegos está programada para dominar el control al pulsar simultáneamente varias teclas de juego. ##2Añade un toque personal con cinco zonas de iluminación individuales con un espectro de hasta 16,8 millones de colores. Cambia colores según una configuración o un juego específico o simplemente para usar tus favoritos. ##2El bajo índice de fuga luminosa alrededor de las teclas significa que pasa más luz por las letras, con lo que cada tecla es más brillante y más fácil de encontrar.*  ##2Más inmformación en la web del fabricante: http://gaming.logitech.com/es-es/product/g213-rgb-gaming-keyboard",
          rating: 0,
          stock: 9,
          soldCount: 3,
          deleted: false,
          createdAt: "2023-06-08T15:55:35.033Z",
          updatedAt: "2023-06-08T15:59:15.492Z",
        },
      ],
    },
    {
      id: 1,
      userId: "clinblbj70000l50811b844n8",
      checkoutSession:
        "cs_test_a1JaJkQJSEI80k3hqBOBSU0pDSG2W1YNkqhuzZaE31XqpGFk2omWuypasV",
      cost: 279,
      createdAt: "2023-06-08T15:57:28.416Z",
      updatedAt: "2023-06-08T15:57:28.416Z",
      products: [
        {
          id: 501,
          name: "Silla Cooler Master Caliber R1 Red Gaming",
          image:
            "https://res.cloudinary.com/dyhvabxfm/image/upload/v1679540486/E-commerce/501.webp",
          brandId: 6,
          subcategoryId: 31,
          price: 279,
          description:
            "##2Descripción##4##4    ##2La calidad y el diseño premium lo distinguen de la competencia. El PU transpirable proporciona la máxima comodidad para todo tipo de cuerpo y te mantiene fresco y con energía en todo momento.   DISEÑO ERGONOMICO Ajuste el ángulo con el respaldo reclinable y colóquelo en su lugar. Los apoyabrazos móviles y el elevador de gas ajustable en altura minimizan la fatiga y maximizan la comodidad de sus sesiones de juego.   ALMOHADAS PARA LA CABEZA Y LA ZONA LUMBAR El reposacabezas y la almohada lumbar le proporcionarán el mejor nivel de comodidad para reducir el dolor de espalda y aliviar la tensión del cuello.  https://www.coolermaster.com/catalog/setup/chairs/caliber-r1/",
          rating: 0,
          stock: 17,
          soldCount: 1,
          deleted: false,
          createdAt: "2023-06-08T15:55:35.033Z",
          updatedAt: "2023-06-08T15:57:29.054Z",
        },
      ],
    },
  ],
  customers: "0.00",
  dailySales: "0.00",
  monthlySales: "0.00",
  yearSales: "0.00",
  date: "9/6/2023",
  lastMonth: "mayo",
  lastYear: 2022,
  month: "junio",
  year: 2023,
  yesterday: "2023-06-08T20:40:07.502Z",
};

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { formatDate } from "./backend";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const generatePDFReport = (data: any) => {
  const docDefinition = {
    content: [
      { text: "DigitalDreams", style: "header" },
      { text: "Reporte de ventas", style: "subheader" },
      { text: `Total de clientes: ${data.totalCustomers}` },
      {
        text: `Total de unidades vendidas anuales: ${data.yearlyTotalSoldUnits}`,
      },
      { text: `Total de ventas anuales: $${data.yearlySalesTotal}` },
      { text: "Datos mensuales:", style: "subheader" },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto", "auto"],
          body: [
            [
              { text: "ID", style: "tableHeader" },
              { text: "Mes", style: "tableHeader" },
              { text: "Ventas totales", style: "tableHeader" },
              { text: "Unidades totales", style: "tableHeader" },
            ],
            ...data.monthlyData.map((sale: any) => [
              sale.id,
              sale.month,
              `$${sale.totalSales}`,
              `$${sale.totalUnits}`,
            ]),
          ],
        },
      },
      { text: "Ventas por categoría:", style: "subheader" },
      {
        ul: Object.entries(data.salesByCategory).map(
          ([category, sales]) => `${category}: $${sales}`
        ),
      },
      { text: "Transacciones:", style: "subheader" },
      {
        table: {
          headerRows: 1,
          widths: ["auto", "auto", "auto", "auto", "*"],
          body: [
            [
              { text: "ID", style: "tableHeader" },
              { text: "ID Usuario", style: "tableHeader" },
              { text: "Costo", style: "tableHeader" },
              { text: "Fecha", style: "tableHeader" },
              { text: "Productos", style: "tableHeader" },
            ],
            ...data.transactions.map((transaction: any) => [
              transaction.id,
              transaction.userId,
              `$${transaction.cost}`,
              formatDate(transaction.createdAt),
              {
                ul: transaction.products.map((product: any) => product.name),
              },
            ]),
          ],
        },
      },
    ],
    styles: {
      header: {
        fontSize: 24,
        bold: true,
        margin: [0, 0, 0, 10],
      },
      subheader: {
        fontSize: 16,
        bold: true,
        margin: [0, 10, 0, 5],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: "black",
        fillColor: "#c2c2c2",
      },
    },
    defaultStyle: {
      fontSize: 11,
    },
    fonts: {
      Arial: {
        normal: "Arial",
        bold: "Arial-Bold",
        italics: "Arial-Italic",
        bolditalics: "Arial-BoldItalic",
      },
    },
  };

  pdfMake.createPdf(docDefinition).open();
};
