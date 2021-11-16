import React from 'react';
import { Tabs, Tab, FormLabel, Grid } from 'carbon-components-react';
import styles from './dimensions.module.scss';
import Budgets from './budget.dimensions';
import County from './county.dimensions';
import Department from './departments.dimensions';
import Site from './site.dimensions';
import Program from './program.dimensions';
import Project from './project.dimensions';
import User from './user.dimensions';

const Dimensions: React.FC = () => {
  return (
    <>
      <Grid className={styles.form}>
        <FormLabel className={styles.heading}>
          <span>New Dimension</span>
        </FormLabel>
        <Tabs scrollIntoView={false} className={styles.tabs}>
          <Tab id="budget" label="Budget">
            <Budgets />
          </Tab>
          <Tab id="department" label="Department">
            <Department />
          </Tab>
          <Tab id="site" label="Site">
            <Site />
          </Tab>
          <Tab id="program" label="Program">
            <Program />
          </Tab>
          <Tab id="project" label="Project">
            <Project />
          </Tab>
          <Tab id="user" label="User">
            <User />
          </Tab>
        </Tabs>
      </Grid>
    </>
  );
};
export default Dimensions;
