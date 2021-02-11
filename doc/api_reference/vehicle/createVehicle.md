## Create vehicle

<table>
    <tr><td> <b>Description</b>: Create a new vehicle. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/vehicle/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>POST</code> </td></tr>
    <tr><td> <b>Data constraints</b>: status, positionLongitude, positionLatitude, batteryLevel, vehicleType.</td></tr>
<tr><td>

**Example request:**

 `POST http://localhost:3000/api/vehicle/`

``` json
{
    "status": 1,
    "positionLongitude": 8.651596,
    "positionLatitude": 49.881575,
    "batteryLevel": 100,
    "vehicleType": 1
}
```

</td></tr>
<tr><td>

**Example result:**

 `Status: 201 Created`

``` json
{
    "data": {
        "status": "Free",
        "licencePlate": "DA-BR-6",
        "positionLongitude": 8.651596,
        "positionLatitude": 49.881575,
        "batteryLevel": 100,
        "vehicleType": {
            "vehicleTypeId": 1,
            "type": "scooter",
            "startPrice": "1.00",
            "pricePerMinute": "0.20",
            "minimalBatteryLevel": 15,
            "createdAt": "2021-02-11T10:11:22.548Z",
            "updatedAt": "2021-02-11T10:11:22.548Z"
        },
        "vehicleId": 6,
        "createdAt": "2021-02-11T12:13:21.649Z",
        "updatedAt": "2021-02-11T12:13:21.649Z"
    }
}
```

</td></tr>
</table>
