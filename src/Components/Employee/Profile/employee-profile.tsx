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
import { useMemo, useState } from 'react';
import styles from './employee-profile.module.css';
import { getEmployeeProfile, getTimesheet } from './EmployeeProfileConnection';
import dayjs from 'dayjs';
import ShoTimesheet from './timesheetImage';
import { useParams, useHistory } from 'react-router-dom';
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

interface EmployeeProfileProps {
  parentCallback?(evnt): void;
}

export type Action = 'Add' | 'Edit';
interface ParentCallbackProps {
  pfNumber: number;
  Action: Action;
}

const Employeeprofile: React.FC<EmployeeProfileProps> = (props) => {
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
            <a onClick={() => setOpen(true)} href={'#'}>
              {timesheet.upload}
            </a>
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
    props.parentCallback?.({ pfNumber: pf, edit: employeeDetails });
    history.push('/AddEmployeeTracking');
  };
  return (
    <>
      <div className={styles.profileItems}>
        <Row>
          <Column>
            <div className={styles.employeeProfile}>
              NAME:
              <a>
                {employeeDetails?.firstName} {employeeDetails?.middleName} {employeeDetails?.lastName}
              </a>
              <br />
              PF NUMBER:<a>{employeeDetails?.pfNumber}</a>
              <br />
              AGE:<a>{employeeDetails?.age}</a>
              <br />
              GENDER:<a>{employeeDetails?.gender}</a>
              <br />
              EMAIL:<a>{employeeDetails?.email}</a>
              <br />
              TEL:<a>{employeeDetails?.telephone}</a>
              <br />
              PROJECT:<a>{employeeDetails?.Project}</a>
              <br />
              DEPARTMENT:<a>{employeeDetails?.Department}</a>
              <br />
              PROGRAM:<a>{employeeDetails?.ProgramArea}</a>
              <br />
              SITE:<a>{employeeDetails?.Site}</a>
            </div>
          </Column>
          <Column>
            <div className={styles.datatable}>
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
            <div className={styles.btn}>
              <Button type="submit" className="bx--btn--secondary" onClick={handleClick}>
                Update Details
              </Button>
            </div>
          </Column>

          <Modal
            modalHeading="Employee Timesheet"
            open={open}
            preventCloseOnClickOutside
            passiveModal
            onRequestClose={() => {
              setOpen(false);
            }}
          >
            <ShoTimesheet />
          </Modal>
        </Row>
      </div>
    </>
  );
};
export default Employeeprofile;
