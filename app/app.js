import bodyParser from 'body-parser';
import {config, databaseUrl} from './config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import routes from './REST/routes';

const app = express();

app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/', (request, response) => {
   response.render(__dirname + '/index.html', {subject: 'Technologie webowe w aplikacjach Internetu'})
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit: '2048kb'}));

app.use(cors());

mongoose.connect(databaseUrl.databaseUrl, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useFindAndModify: false
  }, (error) => {
   if (error) {
     console.error(error);
   }
   else {
     console.info('Connect with database established');
   }
  });
  
  process.on('SIGINT', () => {
   mongoose.connection.close(function () {
     console.error('Mongoose default connection disconnected through app termination');
     process.exit(0);
   });
  });
  

routes(app);

app.listen(config.port, function () {
   console.info(`Server is running at port ${config.port}`);
});
