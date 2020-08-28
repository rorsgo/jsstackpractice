import User from "../models/User";
import File from "../models/File";

class ProviderController {
  async index(request, response) {
    const providers = await User.findAll({
      where: { provider: true },
      attributes: ["id", "name", "email", "avatar_id"],
      include: [
        {
          model: File,
          as: "avatar",
          attributes: ["url", "name", "path"]
        }
      ]
    });

    return response.json(providers);
  }
}

export default new ProviderController();