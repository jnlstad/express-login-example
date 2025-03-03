import db from "./sequelize.js";

const testConnection = async () => {
  try {
    await db.authenticate();
    console.log("✅ Connected to the database successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

testConnection();
