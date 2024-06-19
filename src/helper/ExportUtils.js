import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
const exportToPdf = (data) => {
  const doc = new jsPDF();

  const headers = Object.keys(data[0]);
  const table = data.map((row) => headers.map((header) => row[header]));

  doc.autoTable({
    head: [headers],
    body: table,
  }); 

  doc.save('exported_data.pdf');
};

const exportToExcel = (data, name) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const excelBlob = new Blob([excelBuffer], {
    type: 'application/octet-stream',
  });
  saveAs(excelBlob, `${name}.xlsx`);
};

export { exportToPdf, exportToExcel };
