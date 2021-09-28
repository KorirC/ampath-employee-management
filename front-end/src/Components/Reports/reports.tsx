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
} from './reports.resource';

export const Report: React.FC = () => {
  const [firstRowIndex, setFirstRowIndex] = React.useState(0);
  const [currentPageSize, setCurrentPageSize] = React.useState(10);
  const [counties, setCounties] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [budgets, setBudgets] = React.useState([]);
  const [sites, setSites] = React.useState([]);
  const [programs, setPrograms] = React.useState([]);
  const [report, setReport] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [selectedValues, setSelectedValues] = React.useState({
    department: '',
    project: '',
    site: '',
    budget: '',
    county: '',
    contractStatus: '',
    programArea: '',
  });

  const handleChange = (e: any) => {
    setSelectedValues((current) => ({
      ...current,
      [e.target.id]: e.target.value,
    }));
  };

  const tableHeaders: Array<DataTableHeader> = useMemo(
    () => [
      // { key: 'id', header: 'ID' },
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

  useMemo(() => {
    getCounties().then((res) => {
      const results = res.map((county: any) => {
        return {
          ...county,
          counties: county.name,
        };
      });
      setCounties(results);
    });
    getDepartments().then((res) => {
      const results = res.map((department: any) => {
        return {
          ...department,
          departments: department.name,
        };
      });
      setDepartments(results);
    });
    getProjects().then((res) => {
      const results = res.map((project: any) => {
        return {
          ...project,
          projects: project.name,
        };
      });
      setProjects(results);
    });
    getBudgets().then((res) => {
      const results = res.map((budget: any) => {
        return {
          ...budget,
          budgets: budget.name,
        };
      });
      setBudgets(results);
    });
    getSites().then((res) => {
      const results = res.map((site: any) => {
        return {
          ...site,
          sites: site.name,
        };
      });
      setSites(results);
    });
    trackEmployees().then((res) => {
      const results = res.map((report: any) => {
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
    getPrograms().then((res) => {
      const results = res.map((program: any) => {
        return {
          ...program,
          programs: program.name,
        };
      });
      setPrograms(results);
    });
  }, []);

  const handleReport = () => {
    getReport(selectedValues).then((res) => {
      const results = res.map((report: any) => {
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
  React.useEffect(() => {
    if (rows.length) {
      setShow(true);
    }
  }, [rows.length]);
  return (
    <>
      <Grid style={{ marginTop: '4rem' }}>
        <Row>
          <Column sm={6} md={6} lg={3}>
            <FormLabel>
              <span>Filter By</span>
            </FormLabel>
            <Select
              id="contractStatus"
              labelText="Contract Status: "
              defaultValue="placeholder-item"
              onChange={handleChange}
            >
              <SelectItem disabled hidden value="placeholder-item" text=" " />
              <SelectItem text="Active" value="Active" />
              <SelectItem text="InActive" value="InActive" />
            </Select>

            <Select id="department" labelText="Department: " defaultValue="placeholder-item" onChange={handleChange}>
              <SelectItem disabled hidden value="placeholder-item" text=" " />
              {departments.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.name} />
              ))}
            </Select>

            <Select id="project" labelText="Project: " defaultValue="placeholder-item" onChange={handleChange}>
              <SelectItem disabled hidden value="placeholder-item" text=" " />
              {projects.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.name} />
              ))}
            </Select>

            <Select id="site" labelText="Site: " defaultValue="placeholder-item" onChange={handleChange}>
              <SelectItem disabled hidden value="placeholder-item" text=" " />
              {sites.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.name} />
              ))}
            </Select>

            <Select id="budget" labelText="Budget: " defaultValue="placeholder-item" onChange={handleChange}>
              <SelectItem disabled hidden value="placeholder-item" text=" " />
              {budgets.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.name} />
              ))}
            </Select>

            <Select id="county" labelText="County: " defaultValue="placeholder-item" onChange={handleChange}>
              <SelectItem disabled hidden value="placeholder-item" text=" " />
              {counties.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.name} />
              ))}
            </Select>

            <Select id="programArea" labelText="Program Area: " defaultValue="placeholder-item" onChange={handleChange}>
              <SelectItem disabled hidden value="placeholder-item" text=" " />
              {programs.map((item: any, index: any) => (
                <SelectItem text={item.name} key={index} value={item.name} />
              ))}
            </Select>
            <br />
            <Button style={{ width: '100%' }} kind="secondary" onClick={handleReport}>
              Generate report
            </Button>
          </Column>
          <Column sm={6} md={6} lg={9}>
            <DataTable rows={rows} headers={tableHeaders} isSortable useZebraStyles>
              {({
                rows,
                headers,
                getHeaderProps,
                getRowProps,
                getTableProps,
              }: {
                rows: any;
                headers: any;
                getRowProps: any;
                getHeaderProps: any;
                getTableProps: any;
              }) => (
                <TableContainer title="Employees Report" style={{ marginTop: '3rem' }}>
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
                          <TableCell style={{ columnSpan: 'all' }}>
                            <h5>No records found</h5>
                          </TableCell>
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
