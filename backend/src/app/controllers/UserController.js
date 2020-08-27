import * as Yup from "yup";
import User from "../models/User";

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6)
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: "Fields not valid." });
    }

    const userExists = await User.findOne({ where: { email: request.body.email } });
    if (userExists) {
      return response.status(400).json({ error: "Email address already registered." });
    }
    const { id, name, email, provider } = await User.create(request.body);
    return response.json({
      id,
      name,
      email,
      provider
    });
  }

  async update(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string().min(6)
        .when("oldPassword", (oldPassword, password) =>
          oldPassword ? password.required() : password
        ),
      passwordConfirmation: Yup.string()
        .when("password", (password, passwordConfirmation) =>
          password ? passwordConfirmation.required().oneOf([Yup.ref("password")]) : passwordConfirmation
        ),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: "Fields not valid." });
    }

    const { email, oldPassword } = request.body;
    const user = await User.findByPk(request.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return response.status(400).json({ error: "Email address already registered." });
      }
    }

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return response.status(401).json({ error: "Password doesn't match." });
    }

    const { id, name, provider } = await user.update(request.body);
    return response.json({
      id,
      name,
      email,
      provider
    });
  }
}

export default new UserController();