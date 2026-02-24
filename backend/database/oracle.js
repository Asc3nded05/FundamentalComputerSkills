// Database connection setup------------------------------------
import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config();

// Track whether the Oracle client has been initialized
let clientInitialized = false;

async function initOracle() {
  try {
    // Initialize the Oracle client ONCE
    if (!clientInitialized) {
      oracledb.initOracleClient({
        libDir: process.env.DB_LIB_DIR || undefined,
        configDir: process.env.DB_WALLET_PATH
      });
      clientInitialized = true;
      console.log("Oracle client initialized");
    }

    // Create a new connection
    const connection = await oracledb.getConnection({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      connectString: process.env.DB_CONNECT_STRING
    });

    return connection;
  } catch (err) {
    console.error("Oracle connection error:", err);
    throw err;
  }
}

export default initOracle;