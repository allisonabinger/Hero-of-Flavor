// NOT fUNCTIONAL YET!!
//
// test suite for api.js : use npm test
// Uses mocha's describe and it syntax for testing
// Uses chai for expect assertions
// Uses sinon stub and mock to control external dependencies
const chai = require('chai');
const sinon = require('sinon');
const { dbClient } = require('../utils/db');

const { expect } = chai;

describe('DBClient', () => {
    let db;
    let stubbedDb;
    let stubbedCollection;

    beforeEach(async () => {
        db = new dbClient();
        stubbedDb = {
            collection: sinon.stub().returns(stubbedCollection),
        };
        stubbedCollection = {
            countDocuments: sinon.stub().resolves(5),
        };

        // stub the connection promise to resolve with the stubbed database object
        sinon.stub(dbClient, 'connection').resolves(stubbedDb);
    });

    // restores functionality of countDocuments
    afterEach(() => {
        sinon.restore();
    });

    
    it('should count documents in the ingredients collection', async () => {
        const count = await db.nbDocs('ingredients');
        expect(count).to.equal(5);
        expect(stubbedDb.collection.calledOnceWith('ingredients')).to.be.true;
        expect(stubbedCollection.countDocuments.calledOnce).to.be.true;
    });

    it('should count documents in the recipes collection', async () => {
        const count = await db.nbDocs('recipes');
        expect(count).to.equal(5);
        expect(stubbedDb.collection.calledOnceWith('recipes')).to.be.true;
        expect(stubbedCollection.countDocuments.calledOnce).to.be.true;
    });
});
