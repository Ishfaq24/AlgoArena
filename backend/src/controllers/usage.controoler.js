const User = require("../models/User");

exports.trackUsage = async (req, res) => {
  const { page, timeSpent } = req.body;
  const userId = req.userId;
  const date = new Date().toISOString().slice(0, 10);

  let usage = await Usage.findOne({ userId, date });

  if (!usage) {
    usage = await Usage.create({ userId, date });
  }

  usage.totalTime += timeSpent;
  usage.pageWiseTime.set(
    page,
    (usage.pageWiseTime.get(page) || 0) + timeSpent
  );

  await usage.save();

  res.json({ message: "Usage tracked" });
};

exports.getTodayUsage = async (req, res) => {
  const date = new Date().toISOString().slice(0, 10);
  const usage = await Usage.findOne({
    userId: req.userId,
    date
  });

  res.json(usage || {});
};
