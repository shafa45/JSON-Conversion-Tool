const express = require('express');
const axios = require('axios');
const rules = require('./utils/rules');
const mappings = require('./utils/mappings');
const dummyData = require('./utils/dummyData');
const dataRoutes = require('./routes/dataRoutes');

const port = 3000;
const app = express();
app.use(express.json());
app.use(dataRoutes);


app.listen(port, () => {
  console.log(`app listening on ${port}`);
});
