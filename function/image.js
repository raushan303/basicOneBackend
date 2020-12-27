export default function index(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return null;
  }
  let sampleFile = req.files.sampleFile;
  var ext = sampleFile.name.substr(sampleFile.name.lastIndexOf('.') + 1);
  var newName = Date.now() + '.' + ext;
  sampleFile.mv('./public/uploads/' + newName);
  return newName;
}
