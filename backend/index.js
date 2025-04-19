const express = require('express');
const dotenv = require('dotenv');
const usersRoute = require('./routes/users');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/users', usersRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});