const express = require('express');
const app = express();
const serverPort = process.env.PORT || 2000;

app.use('/assets', express.static(__dirname + '/pictures'))
app.use(express.json());
app.use(express.static(__dirname + '/../build'));

//Require routes
const chartsRoute = require('./routes/charts');
app.use('/api/charts', chartsRoute);

const gamesRoute = require('./routes/games');
app.use('/api/games', gamesRoute);

const hamstersRoute = require('./routes/hamsters');
app.use('/api/hamsters', hamstersRoute);

const statsRoute = require('./routes/stats');
app.use('/api/stats', statsRoute);

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/public/index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
//App listening to port 
app.listen(serverPort, () => {
    console.log(`Get ready for hamster wars on port ${serverPort}!`)
})