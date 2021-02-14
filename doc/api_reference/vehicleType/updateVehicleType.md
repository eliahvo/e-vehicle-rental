## Update vehicle type

<table>
    <tr><td> <b>Description</b>: Updates a specific vehicle type. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/vehicletype/:vehicleTypeId </code> </td></tr>
    <tr><td> <b>Method</b>: <code>PATCH</code> </td></tr>
    <tr><td> <b>Data constraints</b>: type, startPrice, pricePerMinute, minimalBatteryLevel. </td></tr>
<tr><td>

**Example request:**

 `PATCH http://localhost:3000/api/vehicletype/4`

``` json
{
    "type": "plane",
    "startPrice": 2.00,
    "pricePerMinute": 0.37,
    "minimalBatteryLevel": 15
}
```

</td></tr>
<tr><td>

**Example result:**

 `Status: 200 OK`

``` json
{
    "data": {
        "vehicleTypeId": 4,
        "type": "plane",
        "startPrice": 2,
        "pricePerMinute": 0.37,
        "minimalBatteryLevel": 15,
        "createdAt": "2021-02-11T16:23:59.236Z",
        "updatedAt": "2021-02-11T16:44:44.000Z"
    }
}
```

</td></tr>
</table>
