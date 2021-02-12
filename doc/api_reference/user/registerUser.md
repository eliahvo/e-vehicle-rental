## Register user

<table>
    <tr><td> <b>Description</b>: Registers a new user. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/user/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>POST</code> </td></tr>
    <tr><td> <b>Data constraints</b>: email, password, firstName, lastName, birthDate, preferedPayment, streetPlusNumber, city. </td></tr>
<tr><td>

**Example request:**

 `POST http://localhost:3000/api/user/`

``` json
{
  "email": "123@gmail.com",
  "password":  "User password",
  "firstName": "User firstName",
  "lastName":  "User lastName",
  "birthDate": "User birthDate",
  "preferedPayment":  "PayPal",
  "streetPlusNumber":  "User streetPlusNumber",
  "city":  "User city"
}
```

</td></tr>
<tr><td>

**Example result:**

 `Status: 201 Created`

``` json
{
    "data": {
        "email": "123@gmail.com",
        "firstName": "User firstName",
        "lastName": "User lastName",
        "birthDate": "User birthDate",
        "preferedPayment": "PayPal",
        "streetPlusNumber": "User streetPlusNumber",
        "city": "User city",
        "userRole": "user",
        "userId": 4,
        "createdAt": "2021-02-11T17:26:15.970Z",
        "updatedAt": "2021-02-11T17:26:15.970Z"
    }
}
```

</td></tr>
</table>
