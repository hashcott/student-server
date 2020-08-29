const StudentAPI = require("student-api");
const api = new StudentAPI();
api.config({ baseURL: "http://dkh.tlu.edu.vn" });

module.exports = api;
