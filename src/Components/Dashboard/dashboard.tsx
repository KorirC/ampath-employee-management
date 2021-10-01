import EmployeesList from '../Employee/EmployeesList/employeesList';
import { Grid } from 'carbon-components-react/lib/components/Grid';
export const Dashboard: React.FC = () => {
  return (
    <>
      <Grid>
        <EmployeesList />
      </Grid>
    </>
  );
};
