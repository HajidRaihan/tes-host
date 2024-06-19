import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const exportToPdf = (data) => {
  // Show alert before showing PDF preview
  if (confirm("Apakah Anda ingin melihat preview PDF terlebih dahulu?")) {
    const doc = new jsPDF();

    // Tambahkan header
    doc.setFontSize(12);
    doc.setFont('bold');
    doc.text('JADWAL MAINTENANCE ' + new Date().getFullYear(), 75, 20);
    doc.text('HARDWARE DAN SOFTWARE PERALATAN TOL', 60, 30);

    // Tambahkan data tabel
    let startY = 40; // Mulai tabel setelah tulisan "HARDWARE DAN SOFTWARE PERALATAN TOL"
    data.forEach((row) => {
      // Tambahkan lokasi
      doc.autoTable({
        body: [
          [{ content: row.lokasi, colSpan: 2, styles: { fontStyle: 'bold' } }]
        ],
        startY: startY + 4, // Mengatur jarak vertikal antara tabel-tabel
      });

      // Tambahkan waktu
      row.waktu.forEach((waktu) => {
        doc.autoTable({
          body: [[{ content: waktu, styles: { fontStyle: 'normal' } }]],
          startY: doc.autoTable.previous.finalY,
        });
      });

      // Perbarui nilai startY untuk tabel berikutnya
      startY = doc.autoTable.previous.finalY + 5; // Mengatur jarak vertikal antara tabel berikutnya
    });

    // Simpan PDF ke blob dan buka dalam jendela baru
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    const pdfWindow = window.open();
    pdfWindow.document.write(`<iframe width='100%' height='100%' src='${pdfUrl}'></iframe>`);
  } else {
    // Continue without showing preview
    const doc = new jsPDF();

    // Tambahkan header
    doc.setFontSize(12);
    doc.setFont('bold');
    doc.text('JADWAL MAINTENANCE ' + new Date().getFullYear(), 70, 20);
    doc.text('HARDWARE DAN SOFTWARE PERALATAN TOL', 60, 30);

    // Tambahkan data tabel
    let startY = 40; // Mulai tabel setelah tulisan "HARDWARE DAN SOFTWARE PERALATAN TOL"
    data.forEach((row) => {
      // Tambahkan lokasi
      doc.autoTable({
        body: [
          [{ content: row.lokasi, colSpan: 2, styles: { fontStyle: 'bold' } }]
        ],
        startY: startY + 5, // Mengatur jarak vertikal antara tabel-tabel
      });

      // Tambahkan waktu
      row.waktu.forEach((waktu) => {
        doc.autoTable({
          body: [[{ content: waktu, styles: { fontStyle: 'normal' } }]],
          startY: doc.autoTable.previous.finalY,
        });
      });

      // Perbarui nilai startY untuk tabel berikutnya
      startY = doc.autoTable.previous.finalY + 5; // Mengatur jarak vertikal antara tabel berikutnya
    });

    // Simpan atau tampilkan PDF
    doc.save('exported_data.pdf');
  }
};


const exportToExcel = (data) => {
  // Show alert before downloading Excel
  if (confirm('Apakah Anda ingin mengunduh file Excel?')) {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const excelBlob = new Blob([excelBuffer], {
      type: 'application/octet-stream',
    });

    saveAs(excelBlob, 'exported_data.xlsx');
  }
};

export { exportToPdf, exportToExcel };
