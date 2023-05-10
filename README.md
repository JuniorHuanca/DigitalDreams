
![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


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

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `none` | `any` | All products in the store |

#### Get product

```http
  GET /api/products/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

