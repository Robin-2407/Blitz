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
