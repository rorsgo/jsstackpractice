import { resolve } from "path";
import nodemailer from "nodemailer";
import nodemailerhbs from "nodemailer-express-handlebars";
import expresshbs from "express-handlebars";

import mailConfig from "../config/mail";

class Mailer {
  constructor() {
    const { host, port, secure, auth } = mailConfig;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth ? auth : null
    });

    this.configureTemplates();
  }
  
  configureTemplates() {
    const viewPath = resolve(__dirname, "..", "app", "views", "email");

    this.transporter.use(
      "compile",
      nodemailerhbs({
        viewEngine: expresshbs.create({
          layoutsDir: resolve(viewPath, "layouts"),
          partialsDir: resolve(viewPath, "partials"),
          defaultLayout: "default",
          extname: ".hbs"
        }),
        viewPath,
        extName: ".hbs"
      })
    );
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message
    });
  }

}

export default new Mailer();