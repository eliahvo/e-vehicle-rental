## Get all users

<table>
    <tr><td> <b>Description</b>: Returns all users. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/user/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>GET</code> </td></tr>
<tr><td>

**Example request:**

 `GET http://localhost:3000/api/user/`

</td></tr>
<tr><td>

**Example result:**

 `Status: 200 OK`

``` json
{
    "data": [
        {
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
            "updatedAt": "2021-02-11T12:24:02.000Z"
        },
        {
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
            "createdAt": "2021-02-11T12:24:02.351Z",
            "updatedAt": "2021-02-11T12:24:02.000Z"
        },
        {
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
            "createdAt": "2021-02-11T12:24:02.362Z",
            "updatedAt": "2021-02-11T12:24:02.000Z"
        }
    ]
}
```

</td></tr>
</table>
