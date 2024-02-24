exports.allAccess = (req, res) => {
  res.status(200).send("Welcome to the Forum.");
};

exports.userData = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminData = (req, res) => {
  res.status(200).send("Admin Content.");
};
