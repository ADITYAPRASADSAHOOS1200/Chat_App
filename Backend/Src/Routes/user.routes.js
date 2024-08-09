import express from 'express';
import { registerUser } from '../Controller/user.controller.js';
import { signinUser } from '../Controller/user.controller.js';
import { Logout } from '../Controller/user.controller.js';
import { Getuser } from '../Controller/user.controller.js';
import { isAuthenticated } from '../Middleware/auth.middleware.js';
import { Updateuser} from '../Controller/user.controller.js';

const routes=express.Router();

routes.route('/signup').post(registerUser)
routes.route('/signin').post(signinUser)
routes.route('/logout').get(Logout)
routes.route('/getuser').get(isAuthenticated,Getuser)
routes.route('/updateuser').patch(isAuthenticated,Updateuser)

export default routes

