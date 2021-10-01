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
} from 'carbon-components-react';
import { Employee, getAllEmployees } from './employee.resource';
import dayjs from 'dayjs';

const EmployeeList: React.FC = () => {
  const history = useHistory();
  const [firstRowIndex, setFirstRowIndex] = React.useState(0);
  const [currentPageSize, setCurrentPageSize] = React.useState(10);
  const [employees, setEmployees] = React.useState<Array<Employee>>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const tableHeaders: Array<DataTableHeader> = useMemo(
    () => [
      { key: 'id', header: 'ID' },
      { key: 'pfNumber', header: 'PF Number' },
      { key: 'name', header: 'Name' },
      { key: 'dob', header: 'D.O.B' },
      { key: 'gender', header: 'Gender' },
      { key: 'telephone', header: 'Phone Number' },
      { key: 'email', header: 'Email' },
      { key: 'kraPin', header: 'KRA Pin' },
      { key: 'nssf', header: 'NSSF' },
      { key: 'nhif', header: 'NHIF' },
    ],
    [],
  );

  useMemo(() => {
    getAllEmployees().then((res) => {
      const results = res.map((employee: any) => {
        return {
          ...employee,
          id: employee.id,
          name: `${employee.firstName} ${employee.lastName}`,
          idNumber: employee.idNumber,
          dob: dayjs(employee.dob).format('YYYY-MM-DD'),
          age: employee.age,
          telephone: employee.telephone,
          email: employee.email,
          gender: employee.gender,
          kraPin: employee.kraPin,
          nssf: employee.nssf,
          nhif: employee.nhif,
          pfNumber: employee.pfNumber,
          salutation: employee.salutation,
        };
      });
      setEmployees(results);
    });
  }, []);

  const filterField = (search: string, value: string) => value.toLowerCase().includes(search.toLowerCase());
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
    <>
      {employees.length > 0 ? (
        <DataTable rows={rows} headers={tableHeaders} useZebraStyles>
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
            <TableContainer title="Employees List" style={{ marginTop: '10rem' }}>
              <TableToolbar>
                <TableToolbarContent>
                  <TableToolbarSearch persistent={true} onChange={handleSearch} />
                  <Button kind="secondary" onClick={registerEmployee}>
                    Create New Employee
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
                    <TableRow key={row.id} onClick={() => handleRowClick(row.cells[1].value)}>
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
      ) : (
        <DataTableSkeleton role="progressbar" />
      )}
    </>
  );
};
export default EmployeeList;
