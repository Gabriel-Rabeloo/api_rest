const jwt = require('jsonwebtoken');

const nodeMailer = require('nodemailer');
const User = require('../models/User');

const SMTP_CONFIG = require('../config/smtpConfig');

function confirmationEmail(email) {
  const transporter = nodeMailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
      user: SMTP_CONFIG.user,
      pass: SMTP_CONFIG.pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  try {
    const code = TokenController.rand();

    transporter.sendMail({
      text: code,
      subject: 'Código de confirmação',
      from: 'Gabriel Rabelo <dev.gabriel.rabelo@gmail.com>',
      to: email,
    });

    return code;
  } catch (e) {
    return e;
  }
}

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    if (!(await user.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    if (user.email_checked === null || user.email_checked === 0 || user.email_checked === false) {
      try {
        const code = confirmationEmail(email);

        await User.update({ code }, { where: { email } });

        return res.status(403).json({
          errors: ['Confirme seu e-mail para fazer login'],
        });
      } catch (err) {
        console.log(err);
      }
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user: { nome: user.nome, id, email } });
  }

  async validateCode(req, res) {
    try {
      const { code, email } = req.body;

      const user = await User.findOne({ where: { email } });
      console.log(user);

      if (code !== user.code) {
        return res.status(401).json({
          errors: ['Código errado'],
        });
      }
      await User.update({ email_checked: true }, { where: { email } });

      return res.json('Conta confirmada com sucesso');
    } catch (err) {
      return res.json({
        errors: ['Erro desconhecido ao confirmar conta'],
      });
    }
  }

  static rand(min = 100000000, max = 999999999) {
    return String(Math.floor(Math.random() * (max - min) + min));
  }
}

module.exports = new TokenController();
