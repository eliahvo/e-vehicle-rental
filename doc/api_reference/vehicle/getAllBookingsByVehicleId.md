## Get all bookings by vehicle id

<table>
    <tr><td> <b>Description</b>: Returns all bookings by vehicle id. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/vehicle/:vehicleId/bookings </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
<tr><td>

**Example request:**

 `GET http://localhost:3000/api/vehicle/1/bookings`

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
            "updatedAt": "2021-02-11T12:24:02.409Z"
        }
    ]
}
```

</td></tr>
</table>
