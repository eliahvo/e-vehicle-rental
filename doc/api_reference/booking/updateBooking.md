## Update Booking

<table>
    <tr><td> <b>Description</b>: Updates a specific booking. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/booking/:bookingId </code> </td></tr>
    <tr><td> <b>Method</b>: <code>PATCH</code> </td></tr>
    <tr><td> <b>Data constraints</b>: endDate, price, paymentStatus. </td></tr>
<tr><td>

**Example request:**

 `PATCH http://localhost:3000/api/booking/2`

``` json
{
    "endDate": "23.01.2021",
    "price": 120,
    "paymentStatus": "payed"
}
```

</td></tr>
<tr><td>

**Example result:**

 `Status: 200 OK`

``` json
{
    "data": {
        "bookingId": 2,
        "startDate": "Thu Feb 11 2021 10:11:11 GMT+0000 (Coordinated Universal Time)",
        "endDate": "23.01.2021",
        "paymentStatus": "payed",
        "price": 120,
        "createdAt": "2021-02-11T10:11:22.668Z",
        "updatedAt": "2021-02-11T11:50:47.000Z",
        "user": {
            "userId": 2,
            "email": "user2@bretsch.eu",
            "hashedPassword": "$2b$10$ezgvxVBevnWtKO5YJt8wjexQEs5TtDnuQGgI4V4MQRpyeavxqsm5G",
            "userRole": "user",
            "firstName": "user2",
            "lastName": "bretsch2",
            "birthDate": "2000-06-17",
            "preferedPayment": "PayPal",
            "streetPlusNumber": "H-DA 2020",
            "city": "Darmstadt",
            "createdAt": "2021-02-11T10:11:22.442Z",
            "updatedAt": "2021-02-11T10:11:22.000Z"
        },
        "vehicle": {
            "vehicleId": 2,
            "licencePlate": "DA-BR-002",
            "status": "Free",
            "positionLongitude": "8.651596",
            "positionLatitude": "49.871575",
            "batteryLevel": 80,
            "createdAt": "2021-02-11T10:11:22.616Z",
            "updatedAt": "2021-02-11T10:11:22.616Z"
        }
    }
}
```

</td></tr>
</table>
