import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const exportPDF = (employees) => {
  let row: any[] = [];
  let rowD: any[] = [];
  let col = ['', 'PF Number', 'Name', 'Phone Number', 'Email', 'KRA Pin', 'NSSF', 'NHIF'];
  let title = 'Employees List';
  for (let a = 0; a < employees.length; a++) {
    row.push(a + 1);
    row.push(employees[a].pfNumber);
    row.push(`${employees[a].firstName} ${employees[a].middleName} ${employees[a].lastName} `);
    row.push(employees[a].telephone);
    row.push(employees[a].email);
    row.push(employees[a].kraPin);
    row.push(employees[a].nssf);
    row.push(employees[a].nhif);
    rowD.push(row);
    row = [];
  }
  getReport(col, rowD, title);
};

function getReport(col: any[], rowD: any[], title: any) {
  let date = new Date();
  const totalPagesExp = '{total_pages_count_string}';
  let pdf = new jsPDF('l', 'pt', 'legal');
  pdf.setTextColor(51, 156, 255);
  pdf.text(title, 435, 100);
  pdf.setLineWidth(1.5);
  // pdf.line(5, 107, 995, 107);
  var pageContent = function (data: { pageCount: string; settings: { margin: { left: any } } }) {
    var str = 'Page ' + data.pageCount;
    if (typeof pdf.putTotalPages === 'function') {
      str = str + ' of ' + totalPagesExp + `          ` + `Generated on ${date}`;
    }
    pdf.setFontSize(10);
    var pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    pdf.text(str, data.settings.margin.left, pageHeight - 10);
  };
  (pdf as any).autoTable(col, rowD, {
    addPageContent: pageContent,
    margin: { top: 110 },
  });

  if (typeof pdf.putTotalPages === 'function') {
    pdf.putTotalPages(totalPagesExp);
  }

  pdf.save(title + '.pdf');
}
