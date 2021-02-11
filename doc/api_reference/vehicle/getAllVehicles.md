## Get all vehicles

<table>
    <tr><td> <b>Description</b>: Returns all vehicles. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/vehicle/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
<tr><td>

**Example request:**

 `GET http://localhost:3000/api/vehicle/`

</td></tr>
<tr><td>

**Example result:**

 `Status: 200 OK`

``` json
{
    "data": [
        {
            "vehicleId": 1,
            "licencePlate": "DA-BR-001",
            "status": "Free",
            "positionLongitude": "8.648249",
            "positionLatitude": "49.865158",
            "batteryLevel": 50,
            "createdAt": "2021-02-11T12:24:02.387Z",
            "updatedAt": "2021-02-11T12:24:02.387Z",
            "bookings": [
                {
                    "bookingId": 1,
                    "startDate": "Thu Feb 11 2021 12:23:44 GMT+0000 (Coordinated Universal Time)",
                    "endDate": "Thu Feb 11 2021 12:23:44 GMT+0000 (Coordinated Universal Time)",
                    "paymentStatus": "not payed",
                    "price": "6.20",
                    "createdAt": "2021-02-11T12:24:02.409Z",
                    "updatedAt": "2021-02-11T12:24:02.409Z"
                }
            ],
            "vehicleType": {
                "vehicleTypeId": 1,
                "type": "scooter",
                "startPrice": "1.00",
                "pricePerMinute": "0.20",
                "minimalBatteryLevel": 15,
                "createdAt": "2021-02-11T12:24:02.371Z",
                "updatedAt": "2021-02-11T12:24:02.371Z"
            }
        },
        {
            "vehicleId": 2,
            "licencePlate": "DA-BR-002",
            "status": "Free",
            "positionLongitude": "8.651596",
            "positionLatitude": "49.871575",
            "batteryLevel": 80,
            "createdAt": "2021-02-11T12:24:02.397Z",
            "updatedAt": "2021-02-11T12:24:02.397Z",
            "bookings": [
                {
                    "bookingId": 2,
                    "startDate": "Thu Feb 11 2021 12:23:44 GMT+0000 (Coordinated Universal Time)",
                    "endDate": "Thu Feb 11 2021 12:23:44 GMT+0000 (Coordinated Universal Time)",
                    "paymentStatus": "payed",
                    "price": "10.00",
                    "createdAt": "2021-02-11T12:24:02.420Z",
                    "updatedAt": "2021-02-11T12:24:02.420Z"
                }
            ],
            "vehicleType": {
                "vehicleTypeId": 2,
                "type": "car",
                "startPrice": "2.00",
                "pricePerMinute": "0.40",
                "minimalBatteryLevel": 10,
                "createdAt": "2021-02-11T12:24:02.381Z",
                "updatedAt": "2021-02-11T12:24:02.381Z"
            }
        },
        {
            "vehicleId": 3,
            "licencePlate": "DA-BR-003",
            "status": "Free",
            "positionLongitude": "8.648249",
            "positionLatitude": "49.866158",
            "batteryLevel": 20,
            "createdAt": "2021-02-11T12:24:02.403Z",
            "updatedAt": "2021-02-11T12:24:02.403Z",
            "bookings": [
                {
                    "bookingId": 3,
                    "startDate": "Thu Feb 11 2021 12:23:44 GMT+0000 (Coordinated Universal Time)",
                    "endDate": "Thu Feb 11 2021 12:23:44 GMT+0000 (Coordinated Universal Time)",
                    "paymentStatus": "not payed",
                    "price": "20.00",
                    "createdAt": "2021-02-11T12:24:02.426Z",
                    "updatedAt": "2021-02-11T12:24:02.426Z"
                }
            ],
            "vehicleType": {
                "vehicleTypeId": 1,
                "type": "scooter",
                "startPrice": "1.00",
                "pricePerMinute": "0.20",
                "minimalBatteryLevel": 15,
                "createdAt": "2021-02-11T12:24:02.371Z",
                "updatedAt": "2021-02-11T12:24:02.371Z"
            }
        }
    ]
}
```

</td></tr>
</table>
