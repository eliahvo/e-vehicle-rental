## Get all vehicle types

<table>
    <tr><td> <b>Description</b>: Returns all vehicle types. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/vehicletype/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
<tr><td>

**Example request:**

 `GET http://localhost:3000/api/vehicletype/`

</td></tr>
<tr><td>

**Example result:**

 `Status: 200 OK`

``` json
{
    "data": [
        {
            "vehicleTypeId": 1,
            "type": "scooter",
            "startPrice": "1.00",
            "pricePerMinute": "0.20",
            "minimalBatteryLevel": 15,
            "createdAt": "2021-02-11T12:24:02.371Z",
            "updatedAt": "2021-02-11T12:24:02.371Z",
            "vehicles": [
                {
                    "vehicleId": 1,
                    "licencePlate": "DA-IT-21",
                    "status": "Used",
                    "positionLongitude": "8.651596",
                    "positionLatitude": "49.861575",
                    "batteryLevel": 100,
                    "createdAt": "2021-02-11T12:24:02.387Z",
                    "updatedAt": "2021-02-11T12:32:13.000Z"
                },
                {
                    "vehicleId": 3,
                    "licencePlate": "DA-BR-003",
                    "status": "Free",
                    "positionLongitude": "8.648249",
                    "positionLatitude": "49.866158",
                    "batteryLevel": 20,
                    "createdAt": "2021-02-11T12:24:02.403Z",
                    "updatedAt": "2021-02-11T12:24:02.403Z"
                }
            ]
        },
        {
            "vehicleTypeId": 2,
            "type": "car",
            "startPrice": "2.00",
            "pricePerMinute": "0.40",
            "minimalBatteryLevel": 10,
            "createdAt": "2021-02-11T12:24:02.381Z",
            "updatedAt": "2021-02-11T12:24:02.381Z",
            "vehicles": [
                {
                    "vehicleId": 2,
                    "licencePlate": "DA-BR-002",
                    "status": "Free",
                    "positionLongitude": "8.651596",
                    "positionLatitude": "49.871575",
                    "batteryLevel": 80,
                    "createdAt": "2021-02-11T12:24:02.397Z",
                    "updatedAt": "2021-02-11T12:24:02.397Z"
                }
            ]
        },
        {
            "vehicleTypeId": 4,
            "type": "moped",
            "startPrice": "1.00",
            "pricePerMinute": "0.19",
            "minimalBatteryLevel": 10,
            "createdAt": "2021-02-11T16:23:59.236Z",
            "updatedAt": "2021-02-11T16:23:59.236Z",
            "vehicles": []
        }
    ]
}
```

</td></tr>
</table>
