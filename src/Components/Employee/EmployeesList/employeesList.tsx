import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  DataTable,
  TableContainer,
  Table,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  DataTableRow,
  DataTableHeader,
  Pagination,
  DataTableSkeleton,
  Button,
  TableToolbarAction,
  TableToolbarMenu,
  Grid,
} from 'carbon-components-react';
import { Employee, getAllEmployees } from './employee.resource';
import dayjs from 'dayjs';
import { exportPDF } from './exportPDF';
import styles from './employeeList.module.scss';
import { Download16 as Download } from '@carbon/icons-react';
import { CSVLink } from 'react-csv';
import { calculate_age } from '../../../globals/calculateAge';
import { Add16 } from '@carbon/icons-react';

const EmployeeList: React.FC = () => {
  const history = useHistory();
  const [firstRowIndex, setFirstRowIndex] = React.useState(0);
  const [currentPageSize, setCurrentPageSize] = React.useState(5);
  const [employees, setEmployees] = React.useState<Array<Employee>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const tableHeaders: Array<DataTableHeader> = useMemo(
    () => [
      { key: 'pfNumber', header: 'PF Number' },
      { key: 'name', header: 'Name' },
      { key: 'age', header: 'Age' },
      { key: 'telephone', header: 'Phone Number' },
      { key: 'email', header: 'Email' },
      { key: 'kraPin', header: 'KRA Pin' },
      { key: 'nssf', header: 'NSSF' },
      { key: 'nhif', header: 'NHIF' },
      { key: 'employeeStatus', header: 'Contract Status' },
    ],
    [],
  );

  const csvHeaders: Array<any> = useMemo(
    () => [
      { key: 'pfNumber', label: 'PF' },
      { key: 'name', label: 'Name' },
      { key: 'age', label: 'Age' },
      { key: 'telephone', label: 'Phone No' },
      { key: 'email', label: 'Email' },
      { key: 'kraPin', label: 'KRA Pin' },
      { key: 'nssf', label: 'NSSF' },
      { key: 'nhif', label: 'NHIF' },
      { key: 'employeeStatus', label: 'Contract Status' },
      { key: 'department', label: 'Department' },
      { key: 'programArea', label: 'Program' },
      { key: 'project', label: 'Project' },
      { key: 'site', label: 'Site' },
      { key: 'budget', label: 'Budget' },
      { key: 'county', label: 'County' },
    ],
    [],
  );

  const token = sessionStorage.getItem('token');
  useMemo(() => {
    getAllEmployees(token).then((res) => {
      const results = res.map((employee: any) => {
        return {
          ...employee,
          id: employee.id,
          name: `${employee.firstName} ${employee.middleName || ''} ${employee.lastName || ''}`,
          idNumber: employee.idNumber,
          dob: dayjs(employee.dob).format('YYYY-MM-DD'),
          age: calculate_age(employee.dob),
          telephone: employee.telephone,
          email: employee.email,
          gender: employee.gender,
          kraPin: employee.kraPin,
          nssf: employee.nssf,
          nhif: employee.nhif,
          employeeStatus: employee.employeeStatus,
          pfNumber: employee.pfNumber,
          salutation: employee.salutation,
        };
      });
      setEmployees(results);
    });
  }, []);

  const filterField = (search: string, value: string) => value?.toLowerCase().includes(search.toLowerCase());
  const filteredEmployees = employees.filter((item) => {
    if (searchTerm === '') {
      return item;
    } else if (
      filterField(searchTerm, item.firstName) ||
      filterField(searchTerm, item.lastName) ||
      filterField(searchTerm, item.middleName) ||
      item.pfNumber.toString().includes(searchTerm)
    ) {
      return item;
    }
  });
  const getRowItems = (rows: Array<DataTableRow>) => {
    return rows.slice(firstRowIndex, firstRowIndex + currentPageSize).map((row: any) => ({ ...row }));
  };
  const rows = getRowItems(filteredEmployees);

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  const handleRowClick = (pfNumber: any) => {
    history.push(`/EmployeeProfile/${pfNumber}`);
  };

  const registerEmployee = () => {
    history.push(`/EmployeeRegistration`);
  };
  return (
    <Grid>
      <div className={styles.box}></div>Yet to retire
      {employees.length > 0 ? (
        <>
          <DataTable rows={rows} headers={tableHeaders}>
            {({
              rows,
              headers,
              getHeaderProps,
              getTableProps,
            }: {
              rows: any;
              headers: any;
              getHeaderProps: any;
              getTableProps: any;
            }) => (
              <TableContainer title="Employees List">
                <TableToolbar>
                  <TableToolbarContent>
                    <TableToolbarSearch persistent={true} onChange={handleSearch} />
                    <TableToolbarMenu iconDescription="Download" renderIcon={Download}>
                      <TableToolbarAction onClick={() => exportPDF(employees)}>
                        <a href="#">Download as pdf</a>{' '}
                      </TableToolbarAction>
                      <TableToolbarAction>
                        <CSVLink
                          data={employees}
                          headers={csvHeaders}
                          filename={'Employees-List.csv'}
                          className="btn btn-primary"
                          target="_blank"
                        >
                          Download as csv
                        </CSVLink>
                      </TableToolbarAction>
                    </TableToolbarMenu>
                    <Button kind="secondary" onClick={registerEmployee} renderIcon={Add16}>
                      Add
                    </Button>
                  </TableToolbarContent>
                </TableToolbar>
                <Table {...getTableProps()}>
                  <TableHead>
                    <TableRow>
                      {headers.map((header: any) => (
                        <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row: any) => (
                      <TableRow
                        key={row.id}
                        onClick={() => handleRowClick(row.cells[0].value)}
                        title="Click to view profile"
                        style={{ cursor: 'pointer' }}
                        className={`${row.cells[2].value >= 55 ? styles.retire : styles.normal}`}
                      >
                        {row.cells.map((cell: any) => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Pagination
                  totalItems={filteredEmployees.length}
                  backwardText="Previous page"
                  forwardText="Next page"
                  itemsPerPageText="Items per page:"
                  pageNumberText="Page Number"
                  pageSize={currentPageSize}
                  pageSizes={[5, 10, 15, 20, 25]}
                  onChange={({ page, pageSize }) => {
                    if (pageSize !== currentPageSize) {
                      setCurrentPageSize(pageSize);
                    }
                    setFirstRowIndex(pageSize * (page - 1));
                  }}
                />
              </TableContainer>
            )}
          </DataTable>
        </>
      ) : (
        <DataTableSkeleton role="progressbar" />
      )}
    </Grid>
  );
};
export default EmployeeList;
