## Get all bookings

<table>
    <tr><td> <b>Description</b>: Returns all bookings. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/booking/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
<tr><td>

**Example request:**

 `GET http://localhost:3000/api/booking/`

</td></tr>
<tr><td>

**Example result:**

 `Status: 200 OK`

``` json
{
    "data": [
        {
            "bookingId": 2,
            "startDate": "Thu Feb 11 2021 10:11:11 GMT+0000 (Coordinated Universal Time)",
            "endDate": "Thu Feb 11 2021 10:11:11 GMT+0000 (Coordinated Universal Time)",
            "paymentStatus": "payed",
            "price": "10.00",
            "createdAt": "2021-02-11T10:11:22.668Z",
            "updatedAt": "2021-02-11T10:11:22.668Z",
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
        },
        {
            "bookingId": 3,
            "startDate": "Thu Feb 11 2021 10:11:11 GMT+0000 (Coordinated Universal Time)",
            "endDate": "Thu Feb 11 2021 10:11:11 GMT+0000 (Coordinated Universal Time)",
            "paymentStatus": "not payed",
            "price": "20.00",
            "createdAt": "2021-02-11T10:11:22.681Z",
            "updatedAt": "2021-02-11T10:11:22.681Z",
            "user": {
                "userId": 3,
                "email": "user3@bretsch.eu",
                "hashedPassword": "$2b$10$FubzMT4kvfbNY8EjD/4.yOlliQ/IJl.Y0ODLSo6yXFnQrbwdRHRTC",
                "userRole": "user",
                "firstName": "user3",
                "lastName": "bretsch",
                "birthDate": "1980-04-20",
                "preferedPayment": "PayPal",
                "streetPlusNumber": "H-DA 2020",
                "city": "Darmstadt",
                "createdAt": "2021-02-11T10:11:22.511Z",
                "updatedAt": "2021-02-11T10:11:22.000Z"
            },
            "vehicle": {
                "vehicleId": 3,
                "licencePlate": "DA-BR-003",
                "status": "Free",
                "positionLongitude": "8.648249",
                "positionLatitude": "49.866158",
                "batteryLevel": 20,
                "createdAt": "2021-02-11T10:11:22.631Z",
                "updatedAt": "2021-02-11T10:11:22.631Z"
            }
        },
        {
            "bookingId": 4,
            "startDate": "19.01.2021",
            "endDate": "Thu Feb 11 2021 10:11:11 GMT+0000 (Coordinated Universal Time)",
            "paymentStatus": "payed",
            "price": "0.00",
            "createdAt": "2021-02-11T11:25:06.260Z",
            "updatedAt": "2021-02-11T11:25:06.260Z",
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
            }
        }
    ]
}
```

</td></tr>
</table>
