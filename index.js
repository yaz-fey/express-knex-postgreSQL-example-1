const express = require('express');
const aktorlerRouter =require('./routers/aktorlerRouter2');
const logger = require('./middlewares/logger');
const errorHandling = require('./middlewares/errorHandling');

const server = express();
server.use(express.json());

//Logger en başta kullanılır o yüzden buraya koyuyoruz.
server.use(logger);
server.use("/aktorler", aktorlerRouter);


server.get('/', (req, res) => {
    res.send("Express Geldi...");
});


//errorHandlingler en sonda kullanılır o yüzden buraya yazıyoruz.
server.use(errorHandling);

server.listen(5000, () => {
    console.log("http://localhost:5000 adresine gelen istekler dinleniyor");
});


