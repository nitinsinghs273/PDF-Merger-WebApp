// merge.js
import PDFMerger from "pdf-merger-js";

export const MergePdfs = async (p1, p2) => {
  const merger = new PDFMerger();
  await merger.add(p1); // Merge all pages. Parameter is the path to file and filename.
  await merger.add(p2); // Merge only page 2
  let d = new Date().getTime();
  await merger.save(`public/${d}.pdf`); // Save under given name and reset the internal document
  return d;

  // Export the merged PDF as a Node.js Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
};
