// write some tests
const {
  findUser,
  deleteUser,
  fixId
} = require('./users');
describe('users', () => {
  describe('#fixId', () => {
    test('it should convert string to integer', () => {
      expect(fixId("300")).toBe(300);
    })
  });
  describe('#findUser', () => {
    test('it should return JSON object corresponding to id if it exists', async() => {
      expect.assertions(1);
      const user = await findUser('1');
      expect(user).toMatchObject({
        email: "readycoder1@gmail.com",
        id: 1,
      });
    });
    test('it should return error message when no user found for given id', async() => {
      expect.assertions(1);
      try {
        await findUser('100');
      } catch (err) {
        expect(err.message).toBe('No user with id \"100\"');
      }
    });
  });
  describe('#deleteUser', () => {
    test('it removes the user with given id if it exist in user database', async() => {
      expect.assertions(1);
      const deletedUser = await deleteUser('3');
      expect(deletedUser).toMatchObject({ id: '3' });
    });
    test('throws error if user is not found in database', async() => {
      expect.assertions(1);
      try {
        await deleteUser('100');
      } catch (error) {
        expect(error.message).toBe('No user with id \"100\"');
      }
    });
  });
})