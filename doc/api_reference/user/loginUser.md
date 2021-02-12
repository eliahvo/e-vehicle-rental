## Login user

<table>
    <tr><td> <b>Description</b>: Returns a token if credentials are valid. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/user/token </code> </td></tr>
    <tr><td> <b>Method</b>: <code>POST</code> </td></tr>
    <tr><td> <b>Data constraints</b>: email, password. </td></tr>
<tr><td>

**Example request:**

 `POST http://localhost:3000/api/user/token`

``` json
{
    "email": "user1@bretsch.eu",
    "password": "bretsch1"
}
```

</td></tr>
<tr><td>

**Example result:**

 `Status: 200 OK`

``` json
{
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGJyZXRzY2guZXUiLCJpZCI6IjEiLCJuYW1lIjoidXNlcjEiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MTMwNjkzNzUsImV4cCI6MTYxMzA3Mjk3NX0.t9DlcTNOcdEWH1DseTkPI2G2kRfHaIRUk9QhMdUsZRk"
}
```

</td></tr>
</table>
