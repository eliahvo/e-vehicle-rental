## Create booking

<table>
    <tr><td> <b>Description</b>: Create a new booking. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/booking/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>POST</code> </td></tr>
    <tr><td> <b>Data constraints</b>: startDate, endDate, paymentStatus, price, vehicleId, userId. </td></tr>
<tr><td>

**Example request:**

 `POST http://localhost:3000/api/booking/`

``` json
{
  "startDate": "19.01.2021",
  "paymentStatus": "payed",
  "vehicleId": 1,
  "userId": 1
}
```

</td></tr>
<tr><td>

**Example result:**

 `Status: 201 Created`

``` json
{
    "data": {
        "startDate": "19.01.2021",
        "paymentStatus": "payed",
        "user": {
            "userId": 1,
            "email": "user1@bretsch.eu",
            "hashedPassword": "$2b$10$gWYo9in8xBDH0IBhlGmHlO8k6FQ27ltzME/dHPbIzHftuybiX30GC",
            "userRole": "admin",
            "firstName": "user1",
            "lastName": "bretsch1",
            "birthDate": "1996-01-31",
            "preferedPayment": "PayPal",
            "streetPlusNumber": "H-DA 2020",
            "city": "Darmstadt",
            "createdAt": "2021-02-11T10:11:22.321Z",
            "updatedAt": "2021-02-11T10:11:22.000Z"
        },
        "vehicle": {
            "vehicleId": 1,
            "licencePlate": "DA-BR-001",
            "status": "Free",
            "positionLongitude": "8.648249",
            "positionLatitude": "49.865158",
            "batteryLevel": 50,
            "createdAt": "2021-02-11T10:11:22.592Z",
            "updatedAt": "2021-02-11T10:11:22.592Z"
        },
        "bookingId": 4,
        "endDate": "Thu Feb 11 2021 10:11:11 GMT+0000 (Coordinated Universal Time)",
        "createdAt": "2021-02-11T11:25:06.260Z",
        "updatedAt": "2021-02-11T11:25:06.260Z"
    }
}
```

</td></tr>
</table>
