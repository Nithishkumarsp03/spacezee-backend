import dotenv from "dotenv";

import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

console.log("i am running env: ", process.env.PORT);
// new

export default {
  port: process.env.PORT,
  database_url: process.env.DB_URL,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,
  app_env: process.env.NODE_ENV,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  rest_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  super_admin_password: process.env.SUPER_ADMIN_PASS,
  super_admin_email: process.env.SUPER_ADMIN_EMAIL,
  reset_pass_ui_link: process.env.RESET_PASS_UI_LINK,
  email_app_pass: process.env.EMAIL_APP_PASS,
  email_app_id: process.env.EMAIL_NODEMAILER,
  url_front: process.env.URL_FRONT,
};
