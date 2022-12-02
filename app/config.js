const config = {
    port: process.env.PORT || 3000,
};

const database = {
    databaseUrl: "mongodb+srv://twwai:KTp5wYwutrLHPLT@cluster0.ooees.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
};
   
module.exports = {
    config: config,
    databaseUrl: database
}