import User from '../entity/User';
import db from '../config/db';

const UserRepo = db.getRepository(User).extend({});

export default UserRepo;
