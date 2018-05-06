var expect = require('expect');
var { generateMessage } = require('./message');


describe('Message ', () => {
    it('should be correct message object', () => {
        var from = 'Vineet';
        var text = 'Hi Jenny';

        var res = generateMessage(from, text);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({ from, text });
    })
})