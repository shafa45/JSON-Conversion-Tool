const express = require('express');
const dataRoutes = require('./routes/dataRoutes');

const port = 3000;
const app = express();
app.use(express.json());
app.use(dataRoutes);

app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
