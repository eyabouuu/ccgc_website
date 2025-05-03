import User from '../models/User.js';
const initAdmin = async () => {
  const exists = await User.findOne({ role: 'admin' });
  if (!exists) {
    await User.create({
      email: 'admin@system.com',
      password: 'admin1234',
      role: 'admin',
      pseudo: 'superadmin'
    });
    console.log('✅ Default admin created');
  }
};

export default initAdmin;