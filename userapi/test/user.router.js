const app = require('../src/index')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')
const userController = require('../src/controllers/user')

chai.use(chaiHttp)

describe('User REST API', () => {

  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  after(() => {
    app.close()
    db.quit()
  })

  describe('POST /user', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(201)
          chai.expect(res.body.status).to.equal('success')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
    })

    it('pass wrong parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      chai.request(app)
        .post('/user')
        .send(user)
        .then((res) => {
          chai.expect(res).to.have.status(400)
          chai.expect(res.body.status).to.equal('error')
          chai.expect(res).to.be.json
          done()
        })
        .catch((err) => {
          throw err
        })
    })
  })



  describe('GET /user', () => {
    it('get a user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, () => {
        chai.request(app)
          .get('/user/' + user.username)
          .then((res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res.body.status).to.equal('success')
            chai.expect(res.body.msg.firstname).to.equal('Sergei')
            done()
          })
          .catch((err) => {
            throw err
          })
      })
    })
  })

  describe('PUT /user', () => {
    it('update a user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, () => {
        chai.request(app)
          .put('/user/' + user.username)
          .send({ firstname: 'Sergei2', lastname: 'Kudinov2' })
          .then((res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res.body.msg).to.equal('User updated')
            done()
          })
          .catch((err) => {
            throw err
          })
      })
    })
  })

  describe('DELETE /user', () => {
    it('delete a user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, () => {
        chai.request(app)
          .delete('/user/' + user.username)
          .then((res) => {
            chai.expect(res).to.have.status(200)
            chai.expect(res.body.msg).to.equal('User deleted')
            done()
          })
          .catch((err) => {
            throw err
          })
      })
    })
  })
})
