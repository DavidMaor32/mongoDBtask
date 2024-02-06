# api ducumentation

The api manages a library using simple http requests.

> **Note:** for each `GET` request, there's a default `pagination=10&offset=0`.
> - GET `api/authors:1234` -> `api/authors:1234?pagination=10&offset=0`

## Table of Contents

- [Authors](#Authors)

  - [create](#create)
  - [update](#update)
  - [getBooks](#getBooks)
  <!-- - [Books](#Books)

<!-- - [Orders](#usage) -->
<!-- - [Contributing](#contributing)  -->


## Authors

### create

creates a new author.

- Method:`POST`
- Path:`/authors`
- Headers:
  - Content-Type: application/json
- Body:

```json
{
  "name": "John Doe",
  "country": "USA"
}
```

#### response:

- status:201
- body:

```json
{
  "_id": "609b8c857fc0e41d10fd06ef",
  "name": "John Doe",
  "country": "USA",
  "createdAt": "2021-05-12T12:34:56.789Z",
  "updatedAt": "2021-05-12T12:34:56.789Z"
}
```

---

### update

updates the author with id `id` with the given values.

- Method:`PUT`
- Path:`/authors:id`
- Headers:
  - Content-Type: application/json
- Body:

```json
{
  "name": "John Doe",
  "country": "USA"
}
```

> the fiels are optional and will update accordingly.

#### response:

- status:201
- body:

```json
{
  "_id": "609b8c857fc0e41d10fd06ef",
  "name": "John Doe",
  "country": "USA",
  "createdAt": "2021-05-12T12:34:56.789Z",
  "updatedAt": "2021-05-12T12:34:56.789Z"
}
```

#### example

- URL: `domain/api/authors/609b8c857fc0e41d10fd06ef`

---

### getBooks

- Method:`GET`
- Path:`/authors:id`

#### response:

- status:201
- body:

```json
{}
```

---

## License

[MIT](https://choosealicense.com/licenses/mit/)
