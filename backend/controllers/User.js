import { encryptPassowrd, decryptPassowrd, getToken } from "../helper.js";
import User from "../models/User.js";

class userController {
  async register(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const existingUser = await User.findOne({ email: data.email });
        if (existingUser) {
          reject({
            msg: "Email already registered",
            status: 0,
          });
        } else {
          const user = new User({
            name: data.name,
            email: data.email,
            password: encryptPassowrd(data.password),
          });
          user
            .save()
            .then((success) => {
              const token = getToken(user.toObject()); // generating token after user is created
              resolve({
                msg: "User registered successfully",
                status: 1,
                user,
                token,
              });
            })
            .catch((err) => {
              reject({
                msg: "Error while registering user",
                status: 0,
                error: err.message,
              });
            });
        }
      } catch (err) {
        reject({
          msg: "Error registering user",
          status: 0,
          error: err.message,
        });
      }
    });
  }

  async login(data) {
    return new Promise(async (res, rej) => {
      try {
        const user = await User.findOne({ email: data.email });
        if (user) {
          if (decryptPassowrd(user.password) == data.password) {
            const token = getToken(user.toObject()); // generating token after user logs in
            res({
              msg: "Login successful",
              status: 1,
              user,
              token,
            });
          } else {
            rej({
              msg: "Wrong password",
              status: 0,
            });
          }
        } else {
          rej({
            msg: "Invalid email",
            status: 0,
          });
        }
      } catch (err) {
        console.log(err.message);
        rej({
          msg: "Internal server error",
          status: 0,
        });
      }
    });
  }

  async edit(name, email, userId) {
    return new Promise(async (resolve, reject) => {
      console.log(name, email, userId);
      try {
        resolve(data.name);
      } catch (err) {
        reject({
          msg: "Error fetching data",
          status: 0,
          error: err.message,
        });
      }
    });
  }
}

export default userController;