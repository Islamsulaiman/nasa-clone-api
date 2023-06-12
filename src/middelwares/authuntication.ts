import bcrypt from 'bcrypt';

const hashPassword = (password: String): String => bcrypt.hashSync(password as string, 10);

export const authMethods = {
  hashPassword,
};
