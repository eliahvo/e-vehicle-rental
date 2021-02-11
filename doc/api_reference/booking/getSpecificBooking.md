## Get booking by id

<table>
    <tr><td> <b>Description</b>: Returns a specific booking. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/booking/:bookingId </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
<tr><td>

**Example request:**

 `GET http://localhost:3000/api/booking/2`

</td></tr>
<tr><td>

**Example result:**

 `Status: 200 OK`

``` json
{
    "data": {
        "bookingId": 2,
        "startDate": "Thu Feb 11 2021 10:11:11 GMT+0000 (Coordinated Universal Time)",
        "endDate": "Thu Feb 11 2021 10:11:11 GMT+0000 (Coordinated Universal Time)",
        "paymentStatus": "payed",
        "price": "10.00",
        "createdAt": "2021-02-11T10:11:22.668Z",
        "updatedAt": "2021-02-11T10:11:22.668Z",
        "vehicle": {
            "vehicleId": 2,
            "licencePlate": "DA-BR-002",
            "status": "Free",
            "positionLongitude": "8.651596",
            "positionLatitude": "49.871575",
            "batteryLevel": 80,
            "createdAt": "2021-02-11T10:11:22.616Z",
            "updatedAt": "2021-02-11T10:11:22.616Z",
            "vehicleType": {
                "vehicleTypeId": 2,
                "type": "car",
                "startPrice": "2.00",
                "pricePerMinute": "0.40",
                "minimalBatteryLevel": 10,
                "createdAt": "2021-02-11T10:11:22.576Z",
                "updatedAt": "2021-02-11T10:11:22.576Z"
            }
        },
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
        }
    }
}
```

</td></tr>
</table>
