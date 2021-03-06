const db = require('./db/index');

module.exports = {
  leads: {
    post: (req, res) => {
      req.body.user = req.user.username;
      db.Leads.create(req.body)
        .then(() => res.sendStatus(201))
        .catch((err) => {
          console.error('POST fail', err.stack);
          res.sendStatus(500);
        });
      },
    get: (req, res) => {
      db.Leads.read({ user: req.user.username })
        .then((docs) => {res.json(docs)})
        .catch((err) => {
          console.error('GET fail', err.stack);
          res.sendStatus(500);
        });
      }
  },
  lead: {
    get: (req, res) => {
      db.Leads.read(req.params)
        .then((docs) => res.json(docs))
        .catch((err) => {
          console.error('GET fail', err.stack);
          res.sendStatus(500);
        });
      },
    patch: (req, res) => {
      db.Leads.update(req.params, req.body)
        .then(() => res.sendStatus(202))
        .catch((err) => {
          console.error('PATCH fail', err.stack);
          res.sendStatus(500);
        });
      },
    delete: (req, res) => {
      db.Leads.destroy(req.params)
        .then(() => res.sendStatus(202))
        .catch((err) => {
          console.error('PATCH fail', err.stack);
          res.sendStatus(500);
        });
      }
  }
};
