import React, { useMemo, useState } from 'react';
import {
  Form,
  TextInput,
  FileUploader,
  Button,
  Grid,
  Column,
  Row,
  ToastNotification,
  Modal,
} from 'carbon-components-react';
import { getAllEmployees, uploadTimesheet } from '../Timesheets/timesheet.resource';
import FilterableMultiSelect from 'carbon-components-react/lib/components/MultiSelect/FilterableMultiSelect';
import styles from './timesheet.module.scss';
import { useHistory } from 'react-router-dom';

const TimesheetUpload: React.FC = () => {
  const history = useHistory();
  const [selectedFiles, setSelectedFiles] = useState<any>();
  const [employees, setEmployees] = useState<Array<any>>([]);
  const [selectEmployees, setSelectEmployees] = useState([]);
  const [month, setMonth] = useState('');
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const [open, setOpen] = useState(true);

  const handleImageChange = (e: any) => {
    setSelectedFiles(e.target.files[0]);
  };

  const pfNumber = selectEmployees.map((i: any) => {
    return i.pfNumber;
  });

  const upload = () => {
    let data = new FormData();
    data.append('pfNumber', JSON.stringify(pfNumber));
    data.append('month', month);
    data.append('upload', selectedFiles);

    uploadTimesheet(data)
      .then((res: any) => {
        if (res.status === 200) {
          setFormSuccess(true);
        }
      })
      .catch((error) => {
        if (error) {
          setFormError(true);
        }
      });
  };

  useMemo(() => {
    getAllEmployees().then((res: any[]) => {
      const results = res.map((employee: any) => {
        return {
          id: employee.id,
          name: `${employee.firstName} ${employee.middleName} ${employee.lastName}`,
          pfNumber: employee.pfNumber,
        };
      });
      setEmployees(results);
    });
  }, []);

  return (
    <>
      <Modal
        open={open}
        preventCloseOnClickOutside
        passiveModal
        onRequestClose={() => {
          setOpen(false);
          history.push('/Home');
        }}
      >
        <Grid>
          <Row>
            <Column>
              <Form onSubmit={upload} encType="multipart/form-data" className={styles.form}>
                <h5>Upload Timesheet</h5>
                <br />
                <FilterableMultiSelect
                  id=""
                  items={employees}
                  itemToString={(item: { pfNumber: string; name: string }) =>
                    item ? `${item.pfNumber + ' - ' + item.name}` : ''
                  }
                  placeholder="Select Employee(s)"
                  selectionFeedback="fixed"
                  onChange={(e: any) => setSelectEmployees(e.selectedItems)}
                />
                <TextInput
                  id=""
                  labelText="Month"
                  type="date"
                  className="form-control"
                  min="2018-03"
                  onChange={(e) => setMonth(e.target.value)}
                  value={month}
                />
                <FileUploader
                  buttonKind="secondary"
                  accept={['.jpg', '.png']}
                  buttonLabel="Add file"
                  iconDescription="Clear file"
                  filenameStatus="edit"
                  multiple={false}
                  onChange={handleImageChange}
                />

                <Button
                  type="submit"
                  disabled={!selectedFiles || !month || selectEmployees.length == 0}
                  kind="secondary"
                  style={{ marginTop: '1rem' }}
                >
                  Upload TimeSheet
                </Button>
              </Form>
            </Column>
          </Row>
        </Grid>
      </Modal>
    </>
  );
};
export default TimesheetUpload;
