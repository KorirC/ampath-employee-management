import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Button,
  Row,
  Column,
  Pagination,
  DataTableRow,
} from 'carbon-components-react';
import { useMemo, useState } from 'react';
import styles from './employee-profile.module.css';
import { deleteTimesheet, getEmployeeProfile, getTimesheet } from './EmployeeProfileConnection';
import dayjs from 'dayjs';
import { useParams, useHistory, Link } from 'react-router-dom';
const headerData = [
  {
    header: 'Month',
    key: 'month',
  },
  {
    header: 'Timesheet Link',
    key: 'timesheetLink',
  },
  {
    header: 'Action',
    key: 'action',
  },
];
interface EmployeeDetails {
  firstName: string;
  middleName: string;
  lastName: string;
  idNumber: string;
  dob: string;
  age: number;
  telephone: string;
  email: string;
  gender: string;
  pfNumber: number;
  Project: string;
  Department: string;
  ProgramArea: string;
  Site: string;
}

const Employeeprofile: React.FC = () => {
  const [timesheets, setTimesheet] = useState([]);
  const [open, setOpen] = useState(false);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(5);
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetails>();
  const history = useHistory();
  const { pfNumber } = useParams<{ pfNumber?: string }>();

  const pf = Number(pfNumber);

  const timesheet = () => {
    getTimesheet(pf).then((res) => {
      const results = res
        .sort((a: any, b: any) => (b.month > a.month ? 1 : -1))
        .map((timesheet: any) => {
          return {
            id: `${timesheet.timesheetsId}`,
            pfNumber: timesheet.pfnumber,
            month: dayjs(timesheet.month).format('MMMM YYYY'),
            timesheetLink: (
              <Link to={`/image/${timesheet.upload}`} onClick={() => setOpen(true)}>
                {timesheet.upload}
              </Link>
            ),
            action: (
              <a
                href="#"
                onClick={(e) => {
                  if (window.confirm('Delete timesheet?')) remove(timesheet.timesheetsId);
                }}
              >
                Delete
              </a>
            ),
          };
        });
      setTimesheet(results);
    });
  };

  useMemo(() => {
    timesheet();
    getEmployeeProfile(pf)
      .then((response) => {
        const result = response.map((resp) => {
          setEmployeeDetails(resp);
        });
      })
      .catch((error) => {
        throw error;
      });
  }, []);

  const remove = (id) => {
    deleteTimesheet(id).then(() => {
      timesheet();
    });
  };

  const handleClick = () => {
    history.push(`/AddEmployeeTracking/${pfNumber}`, history.location.pathname);
  };
  const getRowItems = (rows: Array<DataTableRow>) => {
    return rows.slice(firstRowIndex, firstRowIndex + currentPageSize).map((row: any) => ({ ...row }));
  };
  const rows = getRowItems(timesheets);
  return (
    <>
      <div className={styles.card}>
        <Row>
          <Column>
            <h3>
              {employeeDetails?.firstName} {employeeDetails?.middleName} {employeeDetails?.lastName}
            </h3>
            <p className="title">{employeeDetails?.email}</p>
            <p>{employeeDetails?.telephone}</p>
            <p>PF Number: {employeeDetails?.pfNumber}</p>
            <div>
              <DataTable rows={rows} headers={headerData}>
                {({ rows, headers, getHeaderProps, getTableProps }) => (
                  <TableContainer>
                    <Table {...getTableProps()}>
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => (
                            <TableHeader {...getHeaderProps({ header })}>{header.header}</TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.id}>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>{cell.value}</TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <Pagination
                      totalItems={timesheets.length}
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
            </div>
            <div className={styles.workDetails}>
              <p>Project: {employeeDetails?.Project}</p> <p>Department: {employeeDetails?.Department}</p>{' '}
              <p>Program: {employeeDetails?.ProgramArea}</p> <p>Site: {employeeDetails?.Site}</p>
            </div>
            <p>
              <Button type="submit" className={styles.button} kind="primary" onClick={handleClick}>
                Update tracking details
              </Button>
            </p>
            <p className={styles.updateBtn}>
              <Link to={`/EmployeeRegistration/${pf}`}> Update employee details</Link>
            </p>
          </Column>
        </Row>
      </div>
    </>
  );
};
export default Employeeprofile;
