![Logo](src/assets/Logos/DigitalDreams.png)

# Digital Dreams

A brief description of what this project does and who it's for

## Installation

Install DigitalDreams with npm

```bash
  npm install my-project
  cd my-project
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
