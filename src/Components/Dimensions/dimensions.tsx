import React from 'react';
import {
  Tabs,
  Select,
  SelectItem,
  TextInput,
  Tab,
  Button,
  FormLabel,
  Search,
  ToastNotification,
  Grid,
} from 'carbon-components-react';
import {
  getBudgets,
  getCounties,
  getDepartments,
  getPrograms,
  getProjects,
  getSites,
} from '../../commonResources/common.resource';
import { useEffect, useMemo, useState } from 'react';
import styles from './dimensions.module.scss';
import { addBudget, addProgram } from './dimensions.resource';
import { useHistory } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import { formValues, formInputProps } from './dimensions.types';
import Budgets from './budget.dimensions';
import County from './county.dimensions';
import Department from './departments.dimensions';
import Site from './site.dimensions';
import Program from './program.dimensions';
import Project from './project.dimensions';
import User from './user.dimensions';

const Dimensions: React.FC = () => {
  const history = useHistory();
  const [counties, setCounties] = React.useState([]);
  const [departments, setDepartments] = React.useState([]);
  const [projects, setProjects] = React.useState([]);
  const [budgets, setBudgets] = React.useState([]);
  const [Sites, setSites] = React.useState([]);
  const [programs, setPrograms] = React.useState([]);
  const [open, setOpen] = useState(true);
  const [dimensionCreated, setDimensionCreated] = useState<boolean>(false);
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

  useMemo(async () => {
    await Promise.all([
      getCounties().then((res) => {
        const results = res.data.map((county: any) => {
          return {
            ...county,
            counties: county.name,
          };
        });
        setCounties(results);
      }),
      getDepartments().then((res) => {
        const results = res.data.map((department: any) => {
          return {
            ...department,
            departments: department.name,
          };
        });
        setDepartments(results);
      }),
      getProjects().then((res) => {
        const results = res.data.map((project: any) => {
          return {
            ...project,
            projects: project.name,
          };
        });
        setProjects(results);
      }),
      getBudgets().then((res) => {
        const results = res.data.map((budget: any) => {
          return {
            ...budget,
            budgets: budget.nFame,
          };
        });
        setBudgets(results);
      }),
      getSites().then((res) => {
        const results = res.data.map((site: any) => {
          return {
            ...site,
            Sites: site.name,
          };
        });
        setSites(results);
      }),
      getPrograms().then((res) => {
        const results = res.data.map((program: any) => {
          return {
            ...program,
            programs: program.name,
          };
        });
        setPrograms(results);
      }),
    ]);
  }, []);

  const onFormSubmit = (values: formInputProps, helpers: FormikHelpers<formInputProps>) => {
    console.log(values);
    helpers.setSubmitting(true);
    addProgram(values).then((resp) => {
      if (resp.status === 200) {
        setDimensionCreated(true);
        console.log('success');
      } else {
        console.log('fail');
      }
    });

    addProgram(values).then((resp) => {
      if (resp.status === 200) {
        setDimensionCreated(true);
        console.log('success');
      } else {
        console.log('fail');
      }
    });
  };
  return (
    <>
      {dimensionCreated && (
        <ToastNotification title="Success!" timeout={5000} subtitle="Dimension Added" kind="success" />
      )}
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
