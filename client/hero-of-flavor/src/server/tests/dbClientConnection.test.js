const chai = require('chai');
const { expect } = chai;
const DBClient = require('../utils/db.js');

const dotenv = require('dotenv');

// gets .env
dotenv.config({ path: '.env.test' });

describe('DBClient Integration Test', function() {
    let dbClient;

    before(async function() {
        dbClient = new DBClient();
        await dbClient.connection; // Wait for the connection to be established
    });

    it('should connect to the database', async function() {
        expect(dbClient.isAlive()).to.be.true;
    });

    it('should count documents in the ingredients collection', async function() {
        const count = await dbClient.nbDocs('ingredients');
        expect(count).to.be.a('number'); // Check that the count is a number
    });

    it('should count documents in the recipes collection', async function() {
        const count = await dbClient.nbDocs('recipes');
        expect(count).to.be.a('number'); // Check that the count is a number
    });

    after(async function() {
        await dbClient.client.close(); // Close the database connection after tests
    });
});
