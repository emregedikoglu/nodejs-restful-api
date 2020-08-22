const request = require('request');

describe('Sample Project API Test', () => {
    it('POST request to /sampleProject should be successful', async () => {
        await request.post({
            url: 'https://gentle-earth-46665.herokuapp.com/sampleProject',
            json: {
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2700,
                "maxCount": 3000
            }
        }, function (error, response, body) {
            expect(body.code).toBe(0);
        });
    })
});