const express = require('express')
const morgan = require('morgan')
const { urlencoded, json } = require('body-parser')
const users = require('./users')
const app = express()

app.use(morgan('dev'))
app.use(urlencoded({ extended: true }))
app.use(json())

app.get('/user/:id', async(req, res) => {
  const id = req.params.id;
  // should ge user by given id in route param
  try {
    const user = await users.findUser(id);
    res.status(200).send(user);
  } catch (err) {
    res.status(404).send(err.message);
  }
})

app.delete('/user/:id', async(req, res) => {
  const id = req.id
  try {
    const deletedUser = await users.deleteUser(id)
    res.status(201).send(deletedUser);
  } catch (error) {
    res.status(404).send(err.message);
  }
})

module.exports = app