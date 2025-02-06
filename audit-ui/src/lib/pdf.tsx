import jsPDF from "jspdf";

export const createDocument = (
  title: string,
  content: string,
  filename: string
): void => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text(title, 20, 20);

  doc.setFontSize(12);
  const textLines = doc.splitTextToSize(content, 170); // 170 is the max width
  doc.text(textLines, 20, 40);

  downloadPDF(doc, filename);
};

const downloadPDF = (doc: jsPDF, filename: string): void => {
  doc.save(filename);
};
