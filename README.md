Do npm install to install all dependencies
===

- Add a proxies.txt to `src/proxies.txt` file
- Add a emails.txt to `src/emails.txt` file

```
src
|--emails.txt
|--proxies.txt
|--successfullyEntered.txt

```

To generate emails use 
`http://psyduckrawr.github.io/catchall` for catchall generator 
`https://generator.email/blog/gmail-generator` for gmail jigging generator

Set headless to false if you want to run in backgroud (line 75)
---

`Expected proxies are HTTP, host:port:user:password`
If no proxies are used, the bot will still run

### Debugging with .env files
- Add a .env file to the root of the file

.env example
```
  proxy=host:port
  username=username
  password=password
```
