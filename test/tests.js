const Coordinate = require('../index.js');
const expect = require('chai').expect;

describe('Convert from DMS to DD', function () {
  describe('Parsing from string', function () {
    const expectedDms = Object.create(Coordinate.prototype, {
      latitude: {
        value: {
          degrees: 19,
          minutes: 25,
          seconds: 35.85,
          orientation: 'N'
        },
        enumerable: true
      },
      longitude: {
        value: {
          degrees: 99,
          minutes: 12,
          seconds: 7.48,
          orientation: 'W'
        },
        enumerable: true
      }
    });

    const expectedDd = [19.426625, 99.202078];

    it('should parse string delimited by spaces', function () {
      const coordString = '19 25 35.85 N  099 12 07.48 W';
      const parsedDms = new Coordinate(coordString);
      console.log(Object.is(parsedDms, expectedDms))
      console.log(parsedDms)
      console.log(expectedDms)
      
      expect(parsedDms).to.deep.equal(expectedDms);
    });

    it('should convert successfully', function () {
      const coordString = '19 25 35.85 N  099 12 07.48 W';
      const convertedDd = new Coordinate(coordString).toDd();
      
      expect(convertedDd).to.eql(expectedDd);
    })
  });
});
