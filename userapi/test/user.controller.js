const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {

  beforeEach(() => {
    // Clean DB before each test
    db.flushdb()
  })

  describe('Create', () => {

    it('create a new user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')
        done()
      })
    })

    it('passing wrong user parameters', (done) => {
      const user = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })

    it('avoid creating an existing user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }

      // First creation: should succeed
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')

        // second creation : should fail 
        userController.create(user, (err, result) => {
          expect(err).to.not.be.equal(null)
          expect(err.message).to.equal("User already exists")
          expect(result).to.be.equal(null)
          done()
        })
      })
    })
  })


  describe('Get', () => {
    it('get a user by username', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      // Create user first
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)
        expect(result).to.be.equal('OK')

        // Then get it
        userController.get(user.username, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result.firstname).to.be.equal('Sergei')
          expect(result.lastname).to.be.equal('Kudinov')
          done()
        })
      })
    })

    it('cannot get a user when it does not exist', (done) => {
      userController.get('invalid', (err, result) => {
        expect(err).to.not.be.equal(null)
        expect(result).to.be.equal(null)
        done()
      })
    })
  })

  describe('Update', () => {
    it('update a user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)

        const updatedUser = {
          firstname: 'Sergei2',
          lastname: 'Kudinov2'
        }

        userController.update(user.username, updatedUser, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')

          userController.get(user.username, (err, result) => {
            expect(result.firstname).to.be.equal('Sergei2')
            expect(result.lastname).to.be.equal('Kudinov2')
            done()
          })
        })
      })
    })
  })

  describe('Delete', () => {
    it('delete a user', (done) => {
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      }
      userController.create(user, (err, result) => {
        expect(err).to.be.equal(null)

        userController.delete(user.username, (err, result) => {
          expect(err).to.be.equal(null)
          expect(result).to.be.equal('OK')

          userController.get(user.username, (err, result) => {
            expect(err).to.not.be.equal(null)
            done()
          })
        })
      })
    })
  })
})
