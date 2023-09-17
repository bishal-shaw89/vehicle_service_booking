# Instructions to run the application

1. Run npm install

2. Change the mongoDB url in src/config.js file

_To test the api, below are the links and the instructions_

**Register**

- Url: http://localhost:3000/auth/register
- Method: POST
- Payloads:

```
{
  "name": "Test User",
  "email": "test@test.com",
  "password": "123456",
  "role": "user",
  "vehicles": ["Vehicle 1", "Vehicle 2"]
}

```

**Login**

- Url: http://localhost:3000/auth/login
- Method: POST
- Payloads:

```
{
  "email": "test@test.com",
  "password": "123456"
}

```

**Viewing booking history**

- Url: http://localhost:3000/users/bookingHistory
- Method: GET
- Headers: Authorization: Bearer <your_token>

**Viewing booking (for service centers)**

- Url: http://localhost:3000/service-centers/viewBookings
- Method: GET
- Headers: Authorization: Bearer <your_token>

**Managing bookings (for service centers)**

- Url: http://localhost:3000/service-centers/manageBooking
- Method: POST
- Headers: Authorization: Bearer <your_token>
- Payloads:

```
{
  "bookingId": "<booking_id>", // Replace <booking_id> with the actual ID of the booking you want to manage
  "action": "approve" // Replace with "reject" or other actions as needed
}

```
