## Get all vehicles by vehicle type id

<table>
    <tr><td> <b>Description</b>: Returns all vehicles by vehicle type id. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/vehicletype/:vehicleTypeId/vehicles </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
<tr><td>

**Example request:**

 `GET http://localhost:3000/api/vehicletype/1/vehicles`

</td></tr>
<tr><td>

**Example result:**

 `Status: 200 OK`

``` json
{
    "data": [
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
}
```

</td></tr>
</table>
