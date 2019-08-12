import config, { nodeEnv, logStars } from './config';
import express from 'express';
import routes from './api';
import sassMiddleware from 'node-sass-middleware'; 
import path from 'path';
import bodyParser from 'body-parser';

const server = express();
server.use(bodyParser.json());

server.use(bodyParser.urlencoded({
  extended: true
}));

server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, 'public')
}));
server.set('view engine', 'ejs');
import serverRender from './serverRender';

server.use(express.static('public'));
server.get(['/', '/contest/:contestId'], (req, res) => {
  serverRender(req.params.contestId)
    .then(({initialMarkup, initialData}) =>{
       res.render('index', {
        initialMarkup,
        initialData
      });
  })
    .catch(console.error);
});
server.use('/api',routes);

server.listen(config.port, config.host, () => {
  console.log("express listening on port ", config.port);
});
