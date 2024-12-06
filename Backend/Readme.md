# API Documentation

## `/user/register` Endpoint

### Description

This endpoint is used to register a new user. Upon successful registration, it returns an authentication token and user details.

---

### Endpoint

`POST /user/register`

---

### Request Body

The request body must be in JSON format and should include the following fields:

- **`fullname`**: Object containing:
    - **`firstname`** (required, string, minimum 3 characters): The first name of the user.
    - **`lastname`** (optional, string, minimum 3 characters): The last name of the user.
- **`email`** (required, string, valid email format): The email address of the user.
- **`password`** (required, string, minimum 5 characters): The user's password.

#### Example Request Body

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword"
}
```

### Response

The response will include an authentication token and user details.

#### Status Codes

- **201 Created**: User successfully registered.
- **400 Bad Request**: Validation errors in the request body.

#### Example Successful Response (201)

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR...",
    "user": {
        "_id": "64f8e5c4b78e410001c8ed9d",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

#### Example Error Response (400)

```json
{
    "errors": [
        {
            "msg": "First name must be at least 3 characters long.",
            "param": "fullname.firstname",
            "location": "body"
        },
        {
            "msg": "Password must be at least 5 characters long.",
            "param": "password",
            "location": "body"
        }
    ]
}
```

### Validation Rules

The following validation rules are applied:

- **`fullname.firstname`**: Must be at least 3 characters long.
- **`fullname.lastname`**: Must be at least 3 characters long (if provided).
- **`email`**: Must be a valid email address.
- **`password`**: Must be at least 5 characters long.

### Implementation Notes

The endpoint:

- Validates the request body using `express-validator`.
- Hashes the user's password before saving to the database.
- Generates a JWT token for the user after successful registration.
- Ensure the `.env` file contains `JWT_SECRET` for token generation.

### Dependencies

The following dependencies are used in this implementation:

- `express-validator`: For input validation.
- `bcryptjs`: For password hashing.
- `jsonwebtoken`: For generating authentication tokens.

<br>
<br>

## `/user/login` Endpoint

### Description
This endpoint is used to register a new user.

### Endpoint

`POST /user/login`

### Request Body

The request body must be in JSON format and should include the following fields:

- **`email`** (required, string, valid email format): The email address of the user.
- **`password`** (required, string, minimum 5 characters): The user's password.

#### Example Request Body

```json
{
    "email": "john.doe@example.com",
    "password": "securepassword"
}
```

### Response

The response will include an authentication token and user details.

#### Status Codes

- **200 OK**: User successfully authenticated.
- **400 Bad Request**: Validation errors in the request body.
- **401 Unauthorized**: Invalid email or password.

#### Example Successful Response (200)

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR...",
    "user": {
        "_id": "64f8e5c4b78e410001c8ed9d",
        "fullname": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com"
    }
}
```

#### Example Error Response (400)

```json
{
    "errors": [
        {
            "msg": "Please enter a valid email address.",
            "param": "email",
            "location": "body"
        },
        {
            "msg": "Password must be at least 5 characters long.",
            "param": "password",
            "location": "body"
        }
    ]
}
```

#### Example Error Response (401)

```json
{
    "message": "Invalid email or password"
}
```

### Validation Rules

The following validation rules are applied:

- **`email`**: Must be a valid email address.
- **`password`**: Must be at least 5 characters long.

### Implementation Notes

The endpoint:

- Validates the request body using `express-validator`.
- Checks if the user exists and the password matches.
- Generates a JWT token for the user upon successful authentication.
- Ensures the `.env` file contains `JWT_SECRET` for token generation.

### Dependencies

The following dependencies are used in this implementation:

- `express-validator`: For input validation.
- `bcryptjs`: For password hashing.
- `jsonwebtoken`: For generating authentication tokens.

<br>
<br>

## `/users/profile` Endpoint

### Description

Retrieves the profile information of the authenticated user.

---

### Endpoint

`GET /users/profile`

---

### Authentication

Requires a valid JWT token sent via:

- **Cookie**: `token={JWT_TOKEN}`
- **Header**: `Authorization: Bearer {JWT_TOKEN}`

---

### Response

#### Status Codes

- **200 OK**: Successfully retrieved user profile.
- **401 Unauthorized**: Missing or invalid authentication token.
- **404 Not Found**: User not found.

#### Example Successful Response (200)

```json
{
    "_id": "64f8e5c4b78e410001c8ed9d",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com"
}
```

#### Example Error Response (401)

```json
{
    "message": "Missing or invalid authentication token"
}
```

#### Example Error Response (404)

```json
{
    "message": "User not found"
}
```

### Implementation Notes

The endpoint:

- Validates the JWT token.
- Retrieves the user profile from the database.

### Dependencies

The following dependencies are used in this implementation:

- `jsonwebtoken`: For validating authentication tokens.

<br>
<br>

## `/user/logout` Endpoint

### Description

Logs out the authenticated user by clearing the authentication token.

---

### Endpoint

`POST /user/logout`

---

### Authentication

Requires a valid JWT token sent via:

- **Cookie**: `token={JWT_TOKEN}`
- **Header**: `Authorization: Bearer {JWT_TOKEN}`

---

### Response

#### Status Codes

- **200 OK**: Successfully logged out.
- **401 Unauthorized**: Missing or invalid authentication token.

#### Example Successful Response (200)

```json
{
    "message": "Successfully logged out"
}
```

#### Example Error Response (401)

```json
{
    "message": "Missing or invalid authentication token"
}
```

### Implementation Notes

The endpoint:

- Clears the JWT token from the client.

### Dependencies

The following dependencies are used in this implementation:

- `jsonwebtoken`: For validating authentication tokens.