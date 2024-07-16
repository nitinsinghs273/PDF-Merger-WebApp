import express from "express";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { MergePdfs } from "./merge.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

const upload = multer({ dest: "uploads/" });

// Middleware
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/template/index.html"));
});

app.post("/merge", upload.array("pdfs", 2), async (req, res, next) => {
  console.log(req.files);
  const file1Path = path.join(__dirname, req.files[0].path);
  const file2Path = path.join(__dirname, req.files[1].path);

  let d = await MergePdfs(file1Path, file2Path);
  res.redirect(`/static/${d}.pdf`);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
