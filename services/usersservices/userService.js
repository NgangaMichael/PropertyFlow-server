import db from '../../models/index.js';

export const getAllUsersService = async () => {
  return await db.User.findAll({
    order: [['id', 'ASC']],
  });
};

export const createUserService = async ({ username, email, designation, password, phone }) => {
  const existing = await db.User.findOne({
    where: { email },
  });

  if (existing) {
    throw new Error('A user with this email already exists.');
  }

  return await db.User.create({
    username,
    email,
    designation,
    phone,
    password,
  });
};

export const updateUserService = async (id, data) => {
  const user = await db.User.findByPk(id);
  if (!user) throw new Error("User not found");

  await user.update(data);
  return user;
};


export const deleteUserService = async (id) => {
  const user = await db.User.findByPk(id);
  if (!user) throw new Error('User not found');
  await user.destroy();
  return user;
};