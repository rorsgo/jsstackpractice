import jwt from "jsonwebtoken";
import * as Yup from "yup";

import User from "../models/User";
import File from "../models/File";

class SessionController {
  async store(request, response) {
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().required()
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: "Fields not valid" });
    }

    const { email, password } = request.body;
    const user = await User.findOne({
      where: { email },
      include: [
        {
          model: File,
          as: "avatar",
          attributes: ["id", "path", "url"],
        }
      ]
    });

    if (!user && !(await user.checkPassword(password))) {
      return response.status(401).json({ error: "You've entered with an email or password incorrect." })
    }

    const { id, name, avatar, provider } = user;

    return response.json({
      user: {
        id,
        name,
        email,
        provider,
        avatar
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
