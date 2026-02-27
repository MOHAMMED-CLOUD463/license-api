const express = require('express');
const app = express();
app.use(express.json());

const licenses = {
  "MYSTORE-XXXX-1111": { active: true },
  "MYSTORE-XXXX-2222": { active: true },
};

app.post('/check', (req, res) => {
  const { key } = req.body;

  if (!key || !licenses[key]) {
    return res.json({ valid: false, reason: "مفتاح غير موجود" });
  }

  if (!licenses[key].active) {
    return res.json({ valid: false, reason: "مفتاح موقوف" });
  }

  return res.json({ valid: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('API شغال على بورت ' + PORT));
