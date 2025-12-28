import { Request, Response } from 'express';
import config from './Config'
import { app } from './app';

const port = config.port;
app.get("/",(req:Request, res:Response)=>{
res.send("hello bangladesh")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
