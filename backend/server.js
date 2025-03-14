import cloudinary from "cloudinary";
import app from "./app.js";
import connectDB from "./config/db.js";

connectDB();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
});

app.listen(process.env.PORT, () => {
	console.log(`Server is running at port ${process.env.PORT} `);
});
