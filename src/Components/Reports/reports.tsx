import React, { useMemo } from 'react';
import {
  Button,
  Column,
  DataTable,
  DataTableHeader,
  DataTableRow,
  DataTableSkeleton,
  FormLabel,
  Grid,
  Pagination,
  Row,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarAction,
  TableToolbarContent,
  TableToolbarMenu,
} from 'carbon-components-react';
import {
  getBudgets,
  getCounties,
  getDepartments,
  getPrograms,
  getProjects,
  getReport,
  getSites,
  trackEmployees,
} from '../../commonResources/common.resource';
import { Download16 as Download } from '@carbon/icons-react';
import { CSVLink } from 'react-csv';
import { exportPDF } from './exportPDF';

export const EmployeeStatusReport: React.FC = () => {
  const [firstRowIndex, setFirstRowIndex] = React.useState(0);
  const [currentPageSize, setCurrentPageSize] = React.useState(10);
  const [report, setReport] = React.useState([]);
  const [selectedValues, setSelectedValues] = React.useState({
    department: '',
    project: '',
    site: '',
    budget: '',
    county: '',
    contractStatus: '',
    programArea: '',
  });
  const { data: department } = getDepartments();
  const { data: budget } = getBudgets();
  const { data: county } = getCounties();
  const { data: program } = getPrograms();
  const { data: project } = getProjects();
  const { data: site } = getSites();

  const handleChange = (e: any) => {
    setSelectedValues((current) => ({
      ...current,
      [e.target.id]: e.target.value,
    }));
  };

  const tableHeaders: Array<DataTableHeader> = useMemo(
    () => [
      { key: 'pfNumber', header: 'PF Number' },
      { key: 'name', header: 'Name' },
      { key: 'status', header: 'Status' },
      { key: 'department', header: 'Department' },
      { key: 'project', header: 'Project' },
      { key: 'site', header: 'Site' },
      { key: 'county', header: 'County' },
      { key: 'program', header: 'Program Area' },
    ],
    [],
  );
  const csvHeaders: Array<any> = useMemo(
    () => [
      { key: 'pfNumber', label: 'PF Number' },
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Contract Status' },
      { key: 'department', label: 'Department' },
      { key: 'project', label: 'Project' },
      { key: 'site', label: 'Site' },
      { key: 'county', label: 'County' },
      { key: 'program', label: 'Program Area' },
    ],
    [],
  );

  const handleReport = () => {
    getReport(selectedValues).then((res) => {
      const results = res.data.map((report: any) => {
        return {
          id: report.pfNumber,
          pfNumber: report.pfNumber,
          name: `${report.firstName} ${report.middleName} ${report.lastName}`,
          status: report.employeeStatus,
          department: report.department,
          project: report.project,
          site: report.site,
          county: report.county,
          program: report.programArea,
        };
      });
      setReport(results);
    });
  };
  const getRowItems = (rows: Array<DataTableRow>) => {
    return rows.slice(firstRowIndex, firstRowIndex + currentPageSize).map((row: any) => ({ ...row }));
  };

  const rows = getRowItems(report);
  return (
    <>
      <Grid style={{ marginTop: '7rem' }}>
        <Row>
          <Column sm={12} md={12} lg={3}>
            <FormLabel>
              <span>Filter By</span>
            </FormLabel>
            <Select id="contractStatus" labelText="Contract Status: " defaultValue="" onChange={handleChange}>
              <SelectItem value="" text="All" />
              <SelectItem text="Active" value="Active" />
              <SelectItem text="InActive" value="InActive" />
            </Select>

            <Select id="department" labelText="Department: " defaultValue="" onChange={handleChange}>
              <SelectItem value="" text="All" />
              {department?.data?.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.name} />
              ))}
            </Select>

            <Select id="project" labelText="Project: " defaultValue="" onChange={handleChange}>
              <SelectItem value="" text="All" />
              {project?.data?.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.name} />
              ))}
            </Select>

            <Select id="site" labelText="Site: " defaultValue="" onChange={handleChange}>
              <SelectItem value="" text="All" />
              {site?.data?.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.name} />
              ))}
            </Select>

            <Select id="budget" labelText="Budget: " defaultValue="" onChange={handleChange}>
              <SelectItem value="" text="All" />
              {budget?.data?.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.name} />
              ))}
            </Select>

            <Select id="county" labelText="County: " defaultValue="" onChange={handleChange}>
              <SelectItem value="" text="All" />
              {county?.data?.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.name} />
              ))}
            </Select>

            <Select id="programArea" labelText="Program Area: " defaultValue="" onChange={handleChange}>
              <SelectItem value="" text="All" />
              {program?.data?.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.name} />
              ))}
            </Select>
            <br />
            <Button style={{ width: '100%' }} kind="secondary" onClick={handleReport}>
              Generate report
            </Button>
          </Column>
          <Column sm={12} md={12} lg={9}>
            <DataTable rows={rows} headers={tableHeaders} isSortable useZebraStyles>
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
                <TableContainer title="Employees Report" style={{ marginTop: '3rem' }}>
                  <TableToolbar>
                    <TableToolbarContent>
                      <TableToolbarMenu iconDescription="Download" renderIcon={Download}>
                        <TableToolbarAction onClick={() => exportPDF(report)}>
                          <a href="#">Download as pdf</a>{' '}
                        </TableToolbarAction>
                        <TableToolbarAction>
                          <CSVLink
                            data={report}
                            headers={csvHeaders}
                            filename={'Employee-Status-Report.csv'}
                            className="btn btn-primary"
                            target="_blank"
                          >
                            Download as csv
                          </CSVLink>
                        </TableToolbarAction>
                      </TableToolbarMenu>
                    </TableToolbarContent>
                  </TableToolbar>
                  <Table {...getTableProps()}>
                    <TableHead>
                      <TableRow>
                        {headers.map((header: any) => (
                          <TableHeader key={header.key} {...getHeaderProps({ header })}>
                            {header.header}
                          </TableHeader>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.length > 0 ? (
                        rows.map((row: any) => (
                          <TableRow key={row.id}>
                            {row.cells.map((cell: any) => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          {headers.map((header: any) => (
                            <TableHeader key={header.key} {...getHeaderProps({ header })}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <Pagination
                    totalItems={report.length}
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
          </Column>
        </Row>
      </Grid>
    </>
  );
};
