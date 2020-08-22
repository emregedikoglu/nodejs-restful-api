const mongoose = require('mongoose');

let exampleSchema = require('./model');

let uri = 'mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true';

const sampleProject = async (req, res) => {
    try {
        // Connect to the given URI
        await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        }).then(async () => {
            await console.log('DB Connected!');

            // await insertData(); // Run only once the first time to create the schema and insert datas

            // Create a query with values ​​from POST Request
            let query = {
                createdAt: {
                    $gt: new Date(req.startDate),
                    $lt: new Date(req.endDate)
                },
                totalCount: {
                    $gt: req.minCount,
                    $lt: req.maxCount
                }
            };

            // Run query
            await exampleSchema.find(query, async (err, datas) => {
                if (err) throw err;
                let responseSuccess = { code: 0, msg: 'Success', records: datas };
                // Send the response
                await res.send(responseSuccess);
            });
        });
    } catch (error) {
        let errMessage = 'Error: ';
        errMessage += error.message;
        errMessage += errMessage.replace(/(\r\n|\n|\r)/gm, '');
        let responseError = { code: 1, msg: errMessage };
        // Send the error response
        await res.send(responseError);
        await console.log(error);
    }
}

// Create a schema then insert the datas to the schema
const insertData = async () => {
    await exampleSchema.insertMany(
        [
            {
                key: 'TAKwGc6Jr4i8Z487',
                createdAt: '2017-01-28T01:22:14.398Z',
                totalCount: 2800
            },
            {
                key: 'NAeQ8eX7e5TEg7oH',
                createdAt: '2017-01-27T08:19:14.135Z',
                totalCount: 2900
            },
            {
                key: 'CBAs784Jr4i43543',
                createdAt: '2018-05-20T05:30:10.398Z',
                totalCount: 3500
            }
        ],
        function (err, result) {
            if (err) {
                console.log(error);
            } else {
                console.log(result);
            }
        }
    );
}

module.exports = {
    sampleProject
}