## Update user

<table>
    <tr><td> <b>Description</b>: Updates a specific user. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/user/:userId </code> </td></tr>
    <tr><td> <b>Method</b>: <code>PATCH</code> </td></tr>
    <tr><td> <b>Data constraints</b>: email, password, firstName, lastName, birthDate, preferedPayment, streetPlusNumber, city, actualBookingId. </td></tr>
<tr><td>

**Example request:**

 `PATCH http://localhost:3000/api/user/6`

``` json
{
    "email": "test@test.de",
    "password": "testpwd",
    "firstName": "User  Update",
    "lastName":  "User lastName Update",
    "birthDate": "01.01.2000",
    "preferedPayment": "PayPal",
    "streetPlusNumber": "Teststraße 1",
    "city": "berlin",
    "actualBookingId": -1
}
```

</td></tr>
<tr><td>

**Example result:**

 `Status: 200 OK`

``` json
{
    "data": {
        "userId": 6,
        "email": "test@test.de",
        "hashedPassword": "$2b$10$pwYsWiLGCkg1GD4N8MnEx.nbwGPuZXnnnL.ACLzUzk8xl.PK1Z0uO",
        "userRole": "user",
        "firstName": "User  Update",
        "lastName": "User lastName Update",
        "birthDate": "01.01.2000",
        "preferedPayment": "PayPal",
        "streetPlusNumber": "Teststraße 1",
        "city": "berlin",
        "createdAt": "2021-02-11T18:41:05.996Z",
        "updatedAt": "2021-02-11T18:41:40.000Z",
        "bookings": [],
        "actualBooking": null
    }
}
```

</td></tr>
</table>
