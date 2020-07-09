export default (req, res) => {
  console.log(req.body);

  res.status(200).json({ msg: 'email enviado con exito'})
}
