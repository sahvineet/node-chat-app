const expect = require('expect');

const { Users } = require('./user');


describe('User Test', () => {

    beforeEach(() => {
        users = new Users();
        users.users = [{
          id: '1',
          name: 'Mike',
          room: 'Node Course'
        }, {
          id: '2',
          name: 'Jen',
          room: 'React Course'
        }, {
          id: '3',
          name: 'Julie',
          room: 'Node Course'
        }];
      });



    it('should be add a user', () => {
        var user = new Users();
        var data = {
            id: '123',
            name: 'Vineet',
            room: 'node'
        };

        var res = user.addUser(data.id, data.name, data.room);
        expect(user.users).toEqual([data]);

    })
})