## Get all bookings by user id

<table>
    <tr><td> <b>Description</b>: Returns all bookings by user id. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/user/:userId/bookings </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
<tr><td>

**Example request:**

 `GET http://localhost:3000/api/user/1/bookings`

</td></tr>
<tr><td>

**Example result:**

 `Status: 200 OK`

``` json
{
    "data": [
        {
            "bookingId": 1,
            "startDate": "Thu Feb 11 2021 12:23:44 GMT+0000 (Coordinated Universal Time)",
            "endDate": "Thu Feb 11 2021 12:23:44 GMT+0000 (Coordinated Universal Time)",
            "paymentStatus": "not payed",
            "price": "6.20",
            "createdAt": "2021-02-11T12:24:02.409Z",
            "updatedAt": "2021-02-11T12:24:02.409Z",
            "vehicle": {
                "vehicleId": 1,
                "licencePlate": "DA-IT-21",
                "status": "Used",
                "positionLongitude": "8.651596",
                "positionLatitude": "49.861575",
                "batteryLevel": 100,
                "createdAt": "2021-02-11T12:24:02.387Z",
                "updatedAt": "2021-02-11T12:32:13.000Z",
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
        }
    ]
}
```

</td></tr>
</table>
