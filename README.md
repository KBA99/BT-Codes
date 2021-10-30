Do npm install to install all dependencies
===

- Add a proxies.txt to src file
- Add a .env file to the root of the file

.env example
```
  proxy=host:port
  username=username
  password=password
```

src file setup
---
```
src
|--emails.txt
|--proxies.txt
|--successfullyEntered.txt

```

Set headless to false if you want to run in backgroud (line 75)
---

`Expected proxies are HTTP, host:port:user:password`
If no proxies are used, the bot will still run