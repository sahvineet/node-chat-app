var expect = require('expect');
var { generateMessage, generateLocationMessage } = require('./message');


describe('generateMessage ', () => {
    it('should be correct message object', () => {
        var from = 'Vineet';
        var text = 'Hi Jenny';

        var res = generateMessage(from, text);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({ from, text });
    })
})

describe('generateLocationMessage', () => {
    it('should be correct location message', () => {
        var from = 'Admin';
        var latitude = 28;
        var longitude = 77;
        var url=`https://google.com/maps?q=${latitude},${longitude}`;
        var res = generateLocationMessage(from, latitude, longitude);

        expect(res.createdAt).toBeA('number');
        expect(res).toInclude({ from, url });
    })
})