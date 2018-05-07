
var { isRealString } = require('./validation')
var expect = require('expect');

describe('Validation Test', () => {

    it('should be a non-numberic value', () => {
        var str = 98;
        var res = isRealString(str);
        expect(res).toBe(false);
    })

    it('should be a no space value', () => {
        var str = '   ';
        var res = isRealString(str);
        expect(res).toBe(false);
    })

    it('should be string and length greather than 0', () => {
        var str = 'vineet';
        var res = isRealString(str);
        expect(res).toBe(true);
    })
})