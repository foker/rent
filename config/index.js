/**
 * Created by macbook on 31.03.15.
 */
try{
    module.exports = require('./'+process.env.NODE_ENV);
} catch (e) {
    console.error("Env not found");
    process.exit(0);
}
