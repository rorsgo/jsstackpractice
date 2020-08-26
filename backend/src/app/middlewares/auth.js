import jwt from "jsonwebtoken";
import { promisify } from "util";

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ error: "Access Denied." });
  }
  const [, token] = authHeader.split(" ");
  try {
    const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    request.userId = decodedToken.id;
    next();
  } catch (error) {
    return response.status(401).json({ error: "Access Denied."});
  }
}