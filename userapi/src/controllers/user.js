const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if (!user.username)
      return callback(new Error("Wrong user parameters"), null)
    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }
    // Save to DB

    // TODO check if user already exists
    db.exists(user.username, (err, exists) => {
      if (err) return callback(err, null)
      if (exists) return callback(new Error("User already exists"), null)
      // set user in db with firstname and lastname
      db.hmset(user.username, userObj, (err, res) => {
        if (err) return callback(err, null)
        callback(null, res) // Return callback
      })
    })
  },
  get: (username, callback) => {
    // Check parameters
    if (!username)
      return callback(new Error("Wrong username parameter"), null)

    // Check if user exists first
    db.exists(username, (err, exists) => {
      if (err) return callback(err, null)
      if (!exists) return callback(new Error("User not found"), null)

      // If user exists, get full data
      db.hgetall(username, (err, res) => {
        if (err) return callback(err, null)
        callback(null, res)
      })
    })
  },
  update: (username, user, callback) => {
    // Check parameters
    if (!username)
      return callback(new Error("Wrong username parameter"), null)

    db.exists(username, (err, exists) => {
      if (err) return callback(err, null)
      if (!exists) return callback(new Error("User not found"), null)

      const userObj = {
        firstname: user.firstname,
        lastname: user.lastname
      }

      db.hmset(username, userObj, (err, res) => {
        if (err) return callback(err, null)
        callback(null, res)
      })
    })
  },
  delete: (username, callback) => {
    if (!username)
      return callback(new Error("Wrong username parameter"), null)

    db.del(username, (err, res) => {
      if (err) return callback(err, null)
      // res is the number of keys deleted
      if (res === 1) {
        callback(null, 'OK')
      } else {
        callback(new Error("User not found"), null)
      }
    })
  }
}
