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
  Modal,
  Row,
  Column,
} from 'carbon-components-react';
import { useEffect, useMemo, useState } from 'react';
import styles from './employee-profile.module.css';
import { getEmployeeProfile, getTimesheet } from './EmployeeProfileConnection';
import dayjs from 'dayjs';
import { ShowTimesheet } from '../Profile/timesheetImage';
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
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeDetails>();
  const history = useHistory();
  const { pfNumber } = useParams<{ pfNumber?: string }>();

  const pf = Number(pfNumber);

  useMemo(() => {
    getTimesheet(pf).then((res) => {
      const results = res.map((timesheet: any) => {
        return {
          id: `${timesheet.timesheetsId}`,
          pfNumber: timesheet.pfnumber,
          month: dayjs(timesheet.month).format('MMMM YYYY'),
          timesheetLink: (
            <Link to={`/image/${timesheet.upload}`} onClick={() => setOpen(true)}>
              {timesheet.upload}
            </Link>
          ),
        };
      });
      setTimesheet(results);
    });
    getEmployeeProfile(pf)
      .then((response) => {
        const result = response.map((resp) => {
          setEmployeeDetails(resp);
        });
      })
      .catch((error) => {
        throw error;
      });
  }, [getTimesheet]);

  const handleClick = () => {
    history.push(`/AddEmployeeTracking/${pfNumber}`, history.location.pathname);
  };
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
              <DataTable rows={timesheets} headers={headerData}>
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
                  </TableContainer>
                )}
              </DataTable>
            </div>
            <div className={styles.workDetails}>
              <p>Project: {employeeDetails?.Project}</p> <p>Department: {employeeDetails?.Department}</p>{' '}
              <p>Program: {employeeDetails?.ProgramArea}</p> <p>Site: {employeeDetails?.Site}</p>
            </div>
            <p>
              <Button type="submit" className={styles.button} onClick={handleClick}>
                Update Details
              </Button>
            </p>
          </Column>
        </Row>
      </div>
    </>
  );
};
export default Employeeprofile;
