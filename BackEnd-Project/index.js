
const myConnectiontoDB = require('./db')
const express = require("express")
const app = express()
//package allows communication with frontend
const cors = require("cors");

//allowing express to communicate on base of json with help of cors package
app.use(cors()); //using cors as middleware
app.use(express.json()); //using json as middleware

//userschema: hum jo communication krwa rhy cors package ko use krky, express aur frontend ki json mein 

// Track DB connection status for the health endpoint
let dbConnected = false;

async function init() {
	try {
		// `myConnectiontoDB` (BackEnd-Project/db.js) returns a Promise that resolves when connected
		await myConnectiontoDB();
		dbConnected = true;
		console.log('DB connected');
	} catch (err) {
		dbConnected = false;
		console.error('DB connection failed:', err);
		// don't exit here; allow server to run but health will report disconnected
	}
}
// initialize DB connection but do not block module export
init();

// Health endpoint to verify server + DB status
app.get('/health', (req, res) => {
	res.json({
		server: 'ok',
		db: dbConnected ? 'connected' : 'disconnected'
	});
});

// Mount API routes
app.use('/api', require('./myFiles/register'));
app.use('/api', require('./myFiles/auth'));
app.use('/api', require('./myFiles/users'));

const PORT = process.env.PORT || 5000;

// Export app so tests can import without starting listener
module.exports = app;

// Only start server when run directly
if (require.main === module) {
	app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}