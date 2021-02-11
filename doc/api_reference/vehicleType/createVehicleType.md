## Create vehicle type

<table>
    <tr><td> <b>Description</b>: Create a new vehicle type. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/vehicletype/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>POST</code> </td></tr>
    <tr><td> <b>Data constraints</b>: type, startPrice, pricePerMinute, minimalBatteryLevel.</td></tr>
<tr><td>

**Example request:**

 `POST http://localhost:3000/api/vehicletype/`

``` json
{
    "type": "moped",
    "startPrice": 1.00,
    "pricePerMinute": 0.19,
    "minimalBatteryLevel": 10
}
```

</td></tr>
<tr><td>

**Example result:**

 `Status: 201 Created`

``` json
{
    "data": {
        "type": "moped",
        "startPrice": 1,
        "pricePerMinute": 0.19,
        "minimalBatteryLevel": 10,
        "vehicleTypeId": 4,
        "createdAt": "2021-02-11T16:23:59.236Z",
        "updatedAt": "2021-02-11T16:23:59.236Z"
    }
}
```

</td></tr>
</table>
