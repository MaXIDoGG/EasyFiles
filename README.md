## REST API документация для браузерного расширения

#### Получение всех

<details>
 <summary><code>GET</code> <code><b>/</b></code> <code>Получение списка всех доступных файлов</code></summary>

##### Parameters

> |  name  | type |       data type       | description |
> | :----: | :--: | :-------------------: | :---------: |
> | userId | GUID | object (JSON or YAML) |     N/A     |

##### Responses

> | http code | content-type               | response                                 |
> | --------- | -------------------------- | ---------------------------------------- |
> | `201`     | `text/plain;charset=UTF-8` | `Configuration created successfully`     |
> | `400`     | `application/json`         | `{"code":"400","message":"Bad Request"}` |
> | `405`     | `text/html;charset=utf-8`  | None                                     |

##### Example cURL

> ```javascript
>  curl -X POST -H "Content-Type: application/json" --data @post.json http://localhost:8889/
> ```

</details>

---
