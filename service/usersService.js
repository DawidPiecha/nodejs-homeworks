const { User } = require("./schemas/user.schema");

const signup = async (body) => {
  try {
    const newUser = await User.create(body);
    newUser.setPassword(body.password);
    return newUser;
  } catch (error) {
    console.log("Adding contact error:", error.message);
  }
};

module.exports = {
  signup,
};
