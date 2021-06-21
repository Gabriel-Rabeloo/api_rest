const Matter = require('../models/Matter');

class MatterController {
  async index(req, res) {
    const { name, aluno_id } = req.body;
    const newMatter = await Matter.create({ name, aluno_id });
    res.json(newMatter);
  }
}

module.exports = new MatterController();
