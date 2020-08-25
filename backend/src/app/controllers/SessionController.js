import jwt from "jsonwebtoken";
import User from "../models/User";

class SessionController {
  async store(request, response) {
    const { email, password } = request.body;
    const user = await User.findOne({ where: { email } });

    if (!user && !(await user.checkPassword(password))) {
      return response.status(401).json({ error: "You've entered with an email or password incorrect." })
    }

    const { id, name } = user;

    return response.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign(
        {
          id
        },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_EXPIRETIME,
        }),
    });
  }
}

export default new SessionController();
