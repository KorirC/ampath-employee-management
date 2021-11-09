import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ampath from '../../../images/ampath.png';

export const exportPDF = (employees) => {
  let row: any[] = [];
  let rowD: any[] = [];
  let col = [
    '',
    'PF',
    'Name',
    'Phone No',
    'Email',
    'KRA Pin',
    'NSSF',
    'NHIF',
    'Contract status',
    'Department',
    'Program',
    'Project',
    'Site',
    'Budget',
    'County',
  ];
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
    row.push(employees[a].employeeStatus);
    row.push(employees[a].department);
    row.push(employees[a].programArea);
    row.push(employees[a].project);
    row.push(employees[a].site);
    row.push(employees[a].budget);
    row.push(employees[a].county);
    rowD.push(row);
    row = [];
  }
  getReport(col, rowD, title);
};

let base64Img = null;

function toDataUrl(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.send();
}
toDataUrl(ampath, function (myBase64) {
  base64Img = myBase64;
});
function getReport(col: any[], rowD: any[], title: any) {
  let date = new Date();
  const totalPagesExp = '{total_pages_count_string}';
  let pdf = new jsPDF('l', 'pt', 'legal');
  pdf.setTextColor(51, 156, 255);
  pdf.text(title, 435, 100);
  pdf.setLineWidth(1.5);

  // pdf.line(5, 107, 995, 107);
  var pageContent = function (data: { pageCount: string; settings: { margin: { left: any } } }) {
    if (base64Img) {
      pdf.addImage(base64Img, 'JPEG', data.settings.margin.left, 20, 0, 30);
    }
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
