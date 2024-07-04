const handler = async (req, res) => {
  const { id } = req.query;

  try {
    const did = Number.parseInt(id);
    const apiRes = await fetch(
      `http://api.bike-csecu.com/api/department/${did}`
    );
    if (apiRes.ok) {
      const data = await apiRes.json();

      return res.status(200).json(data);
    } else {
      return res
        .status(404)
        .json({ message: `Department with id ${did} does not exist.` });
    }
  } catch (ignored) {
    return res.status(400).json({
      message: "Department id cannot be empty or non-integer. Try ?id=1",
    });
  }
};

export default handler;
