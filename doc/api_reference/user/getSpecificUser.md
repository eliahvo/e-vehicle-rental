## Get user by id

<table>
    <tr><td> <b>Description</b>: Returns a specific user. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/user/:userId </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
<tr><td>

**Example request:**

 `GET http://localhost:3000/api/user/1`

</td></tr>
<tr><td>

**Example result:**

 `Status: 200 OK`

``` json
{
    "data": {
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
        "createdAt": "2021-02-11T12:24:02.319Z",
        "updatedAt": "2021-02-11T12:24:02.000Z",
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
        "actualBooking": null
    }
}
```

</td></tr>
</table>
