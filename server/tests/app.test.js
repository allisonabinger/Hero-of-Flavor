const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('AppController', () => {
    it('should return status code 200 and display the correct message for status', (done) => {
        chai.request('http://localhost:5000/status')
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('{"db":true}')
                done();
            });
    });

    it('should return status code 200 and display the correct message for stats', (done) => {
        chai.request('http://localhost:5000/stats')
            .get('/')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.text).to.equal('{"ingredients":214,"recipes":153}')
                done();
            });
    });
});



// const { expect } = require('chai');
// const sinon = require('sinon');
// 

// describe('DBClient', () => {
//   let sandbox;

//   beforeEach(() => {
//     sandbox = sinon.createSandbox();
//   });

//   afterEach(() => {
//     sandbox.restore();
//   });

//   describe('isAlive', () => {
//     it('should return true if connected', async () => {
//       // Assuming isAlive returns true when connected
//       const isAlive = await dbClient.isAlive();
//       expect(isAlive).to.be.true;
//     });
//   });

//   describe('nbDocs', () => {
//     it('should count documents in a collection', async () => {
//       const mockCollection = {
//         countDocuments: sinon.stub().resolves(10),
//       };

//       const db = {
//         collection: sinon.stub().returns(mockCollection),
//       };

//       sandbox.stub(dbClient, 'connection').resolves(db);

//       const count = await dbClient.nbDocs('files');
//       expect(count).to.equal(10);
//     });

//     it('should handle errors', async () => {
//       const mockCollection = {
//         countDocuments: sinon.stub().rejects(new Error('Count failed')),
//       };

//       const db = {
//         collection: sinon.stub().returns(mockCollection),
//       };

//       sandbox.stub(dbClient, 'connection').resolves(db);

//       try {
//         await dbClient.nbDocs('files');
//       } catch (error) {
//         expect(error.message).to.equal('Error counting recipes and ingredients: Error: Count failed');
//       }
//     });
//   });

//   describe('findRecipesByIngredients', () => {
//     it('should find recipes based on user ingredients', async () => {
//       const mockCollection = {
//         find: sinon.stub().returns({
//           toArray: sinon.stub().resolves([
//             { ingredients: [{ options: ['Hylian Tomato', 'Hylian Shroom'] }] },
//             { ingredients: [{ options: ['Spicy Pepper'] }] },
//           ]),
//         }),
//       };

//       const db = {
//         collection: sinon.stub().returns(mockCollection),
//       };

//       sandbox.stub(dbClient, 'connection').resolves(db);

//       const userIngredients = ['Hylian Tomato', 'Spicy Pepper'];
//       const recipes = await dbClient.findRecipesByIngredients(userIngredients);

//       expect(recipes.length).to.equal(1);
//       expect(recipes[0].ingredients[0].options).to.include('Hylian Tomato');
//       expect(recipes[0].ingredients[0].options).to.include('Spicy Pepper');
//     });
//   });

//   describe('findIngredients', () => {
//     it('should fetch ingredients with default sorting', async () => {
//       // ... test logic
//     });

//     it('should fetch ingredients with specified sorting', async () => {
//       // ... test logic
//     });
//   });

//   describe('getAllRecipes', () => {
//     it('should fetch all recipes without filter', async () => {
//       // ... test logic
//     });

//     it('should fetch recipes with filter', async () => {
//       // ... test logic
//     });
//   });
// });
