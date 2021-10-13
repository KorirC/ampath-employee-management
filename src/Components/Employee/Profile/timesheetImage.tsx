import { Modal } from 'carbon-components-react';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleTimesheet } from './EmployeeProfileConnection';

export const ShowTimesheet = () => {
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState('');
  const { filename } = useParams<{ filename }>();

  useMemo(() => {
    getSingleTimesheet(filename).then((res) => {
      setImage(res.url);
    });
  }, []);
  return (
    <div>
      <Modal
        modalHeading="Employee Timesheet"
        open={open}
        preventCloseOnClickOutside
        passiveModal
        onRequestClose={() => {
          setOpen(false);
        }}
      >
        <img src={image} />
      </Modal>
    </div>
  );
};
