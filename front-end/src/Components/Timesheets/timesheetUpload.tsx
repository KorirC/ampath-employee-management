import React, { useMemo, useState } from 'react';
import { Form } from 'carbon-components-react';
import { FileUploader } from 'carbon-components-react';
import { Button } from 'carbon-components-react';
import { TextInput } from 'carbon-components-react';
import { getAllEmployees } from '../Timesheets/timesheet.resource';
import FilterableMultiSelect from 'carbon-components-react/lib/components/MultiSelect/FilterableMultiSelect';

const TimesheetUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File>();
  const [employees, setEmployees] = useState<Array<any>>([]);
  const [selectEmployees, setSelectEmployees] = useState<Array<string>>([]);
  const [month, setMonth] = useState('');

  const handleImageChange = (e: any) => {
    const fileList = e.target.files[0];
    if (!fileList) return;
    setSelectedFiles(fileList);
  };

  const upload = () => {
    if (selectedFiles) {
      const formData = new FormData();
      formData.append('image', selectedFiles);

      // fetch('http://', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     Accept: 'multipart/formdata',
      //   },
      // })
      //   .then((res) => res.json())
      //   .then((res) => console.log(res))
      //   .catch((error) => console.log(error));
    }
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
      <Form style={{ marginTop: '3rem' }}>
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
          type="month"
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
          multiple={true}
          onChange={handleImageChange}
        />

        <Button onClick={upload} kind="secondary" style={{ marginTop: '1rem' }}>
          Upload TimeSheet
        </Button>
      </Form>
    </>
  );
};
export default TimesheetUpload;
