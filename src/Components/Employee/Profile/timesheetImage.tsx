import { Modal } from 'carbon-components-react';
import { useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getSingleTimesheet } from './EmployeeProfileConnection';
import styles from './employee-profile.module.css';

export const ShowTimesheet = () => {
  const [open, setOpen] = useState(true);
  const [image, setImage] = useState('');
  const { filename } = useParams<{ filename }>();
  const history = useHistory();

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
        size="lg"
        preventCloseOnClickOutside
        passiveModal
        style={{ alignContent: 'stretch' }}
        onRequestClose={() => {
          setOpen(false);
          history.goBack();
        }}
      >
        <img className={styles.zoom} width="100%" height="100%" src={image} alt="no image" />
      </Modal>
    </div>
  );
};
