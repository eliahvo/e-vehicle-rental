## Create booking

<table>
    <tr><td> <b>Description</b>: Create a new task. </td></tr>
    <tr><td> <b>URL</b>: <code> /api/task/ </code> </td></tr>
    <tr><td> <b>Method</b>: <code>POST</code> </td></tr>
    <tr><td> <b>Data constraints</b>: Provide name and/or description. </td></tr>
<tr><td>

**Example request:**

 `POST http://localhost:3000/api/task/`

``` json
{
  "name": "Example Task",
  "description": "Hey there, this is a simple example task!"
}
```

</td></tr>
<tr><td>

**Example result:**

 `Status: 201 Created`

``` json
{
  "data": {
    "name": "Example Task",
    "description": "Hey there, this is a simple example task!",
    "id": "0cb23bc4-bc7c-4512-b749-37a74e7a03d1",
    "createdAt": "2020-11-22T15:56:57.121Z",
    "updatedAt": "2020-11-22T15:56:57.121Z"
  }
}
```

</td></tr>
</table>
