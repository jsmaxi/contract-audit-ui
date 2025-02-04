export const downloadJSON = (val: any, fileName: string) => {
  if (!val) return;
  if (!fileName) fileName = "default.json";
  const blob = new Blob([JSON.stringify(val, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
