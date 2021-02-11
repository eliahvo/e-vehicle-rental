## Validate password

<table>
    <tr><td> <b>Description</b>: Check if password is valide. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/user/checkpwd </code> </td></tr>
    <tr><td> <b>Method</b>: <code>POST</code> </td></tr>
    <tr><td> <b>Data constraints</b>: email, password. </td></tr>
<tr><td>

**Example request:**

 `POST http://localhost:3000/api/user/checkpwd`

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


</td></tr>
</table>
