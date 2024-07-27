import uniqid from "uniqid";
import bcrypt from "bcrypt";
import { UserRole } from "../modules/user/user.constant.js";
import { User } from "../modules/user//user.model.js";
import config from "../config.js";

const superUser = {
  id: uniqid(),
  email: config.super_admin_email,
  name: "Super Admin",
  role: UserRole.superAdmin,
  status: "in-progress",
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  //when database is connected, we will check is there any user who is super admin
  const isSuperAdminExits = await User.findOne({ role: UserRole.superAdmin });

  if (!isSuperAdminExits) {
    const newHashedPassword = await bcrypt.hash(
      config.super_admin_password,
      Number(config.bcrypt_salt_round)
    );
    superUser.password = newHashedPassword;
    await User.create(superUser);
  }
};

export default seedSuperAdmin;
