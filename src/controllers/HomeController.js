class HomeController {
  async index(req, res) {
    res.json('index');
  }
}
module.exports = new HomeController();
