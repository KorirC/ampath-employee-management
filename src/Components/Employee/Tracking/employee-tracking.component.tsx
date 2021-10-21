import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import {
  Form,
  Button,
  TextInput,
  DatePicker,
  DatePickerInput,
  Select,
  SelectItem,
  Column,
  ToastNotification,
} from 'carbon-components-react';
import { EmployeeTrackingInputProps } from './employee-tracking-types';
import { validationSchema } from './employee-tracking-validation';
import { saveEmployeeTrackingInformation } from './employee-tracking-resource';
import styles from './employee-tracking.module.scss';
import {
  getBudgets,
  getCounties,
  getDepartments,
  getPrograms,
  getProjects,
  getSites,
} from '../../../commonResources/common.resource';
import { useHistory, useParams } from 'react-router-dom';
import { getEmployeeProfile } from './employee-tracking-resource';

export const EmployeeTrackingForm: React.FC = () => {
  const [projectId, setProject] = useState<Array<any>>([]);
  const [departmentId, setDepartment] = useState<Array<any>>();
  const [siteId, setSite] = useState<Array<any>>();
  const [countyId, setCounty] = useState<Array<any>>();
  const [budgetId, setBudget] = useState<Array<any>>();
  const [programId, setProgram] = useState<Array<any>>();
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const [editValues, setEditValues] = useState<Object>();
  const [edited, setEdited] = useState<boolean>(false);
  const history = useHistory();
  const { pfNumber } = useParams<{ pfNumber: string }>();
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'all' });
  const inputNames = [
    'projectId',
    'departmentId',
    'siteId',
    'countyId',
    'budgetId',
    'programId',
    'endOfContract',
    'dateOfJoining',
    'dateOfLeaving',
    'jobSpecification',
  ];

  useEffect(() => {
    getEmployeeProfile(Number(pfNumber))
      .then((response) => {
        response
          .filter(
            (resp) =>
              resp.projectId != null &&
              resp.departmentId != null &&
              resp.siteId != null &&
              resp.countyId != null &&
              resp.budgetId != null &&
              resp.programId != null,
          )
          .map((resp) => setEditValues(resp));
      })
      .catch((errors) => {
        throw errors;
      });
  }, [pfNumber]);

  useMemo(() => {
    editValues && setEdited(true);
    inputNames.map((name) => {
      Object.entries({ ...editValues })
        .filter(([key]) => key == name)
        .map((values) => {
          const initialValues =
            values[0] === 'endOfContract' || values[0] === 'dateOfJoining' || values[0] === 'dateOfLeaving'
              ? new Date(`${values[1]}`)
              : values[1];
          setValue(values[0], initialValues);
        });
    });
  }, [editValues]);

  useEffect(() => {
    Object.keys(touchedFields).map((names) => {
      Object.entries({ ...editValues })
        .filter(([key]) => key == names)
        .map((values) => {
          const insertedValue =
            typeof watch(names) == 'object' ? dayjs(watch(names)).format('YYYY-MM-DD') : watch(names);
          if (insertedValue != values[1]) {
            setEdited(false);
          } else {
            setEdited(true);
          }
        });
    });
  }, [{ ...touchedFields }, editValues]);

  const handleFormSubmit = (values: EmployeeTrackingInputProps) => {
    values.pfNumber = Number(pfNumber);
    values.project = values.projectId;
    values.department = values.departmentId;
    values.site = values.siteId;
    values.county = values.countyId;
    values.countyBudget = values.budgetId;
    values.programArea = values.programId;
    values.endOfContract = dayjs(values.endOfContract).format('YYYY-MM-DD');
    values.dateOfJoining = dayjs(values.dateOfJoining).format('YYYY-MM-DD');
    values.dateOfLeaving = dayjs(values.dateOfLeaving).format('YYYY-MM-DD');
    saveEmployeeTrackingInformation(values)
      .then((response) => {
        if (response.status === 200) {
          setFormSuccess(true);
          setTimeout(() => history.push(`/EmployeeProfile/${pfNumber}`), 2000);
        }
      })
      .catch((error) => {
        setFormError(true);
      });
  };

  useMemo(() => {
    getProjects().then((response) => {
      let results = response.data.map((resp) => {
        return resp;
      });
      setProject(results);
    });
    getDepartments().then((response) => {
      let results = response.data.map((resp) => {
        return resp;
      });
      setDepartment(results);
    });
    getSites().then((response) => {
      let results = response.data.map((resp) => {
        return resp;
      });
      setSite(results);
    });
    getCounties().then((response) => {
      let results = response.data.map((resp) => {
        return resp;
      });
      setCounty(results);
    });
    getBudgets().then((response) => {
      let results = response.data.map((resp) => {
        return resp;
      });
      setBudget(results);
    });
    getPrograms().then((response) => {
      let results = response.data.map((resp) => {
        return resp;
      });
      setProgram(results);
    });
  }, []);

  return (
    <>
      {formSuccess && (
        <ToastNotification
          title="Data saved successfully"
          className={styles.toast}
          timeout={3000}
          subtitle="Employee tracking data saved successfully"
          kind="success"
        />
      )}
      {formError && (
        <ToastNotification
          title="Error saving data"
          className={styles.toast}
          timeout={3000}
          subtitle="Employee tracking data not saved"
          kind="error"
        />
      )}

      <Form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <h4 className={styles.header}>Update Details</h4>
        <Column>
          <Select
            id="project"
            labelText="Project"
            {...register('projectId')}
            invalid={!!errors.projectId}
            invalidText={errors.projectId?.message}
            value={watch('projectId')}
          >
            <SelectItem text="--Choose project--" value="" />
            {projectId?.map((item, index) => (
              <SelectItem key={index} text={item.name} value={item.projectId} />
            ))}
          </Select>
        </Column>
        <Column>
          <Select
            id="department"
            labelText="Department"
            {...register('departmentId')}
            invalid={!!errors.departmentId}
            invalidText={errors.departmentId?.message}
            value={watch('departmentId')}
          >
            <SelectItem text="--Choose department--" value="" />
            {departmentId?.map((item, index) => (
              <SelectItem key={index} text={item.name} value={item.departmentId} />
            ))}
          </Select>
        </Column>
        <Column>
          <Select
            id="site"
            labelText="Site"
            {...register('siteId')}
            invalid={!!errors.siteId}
            invalidText={errors.siteId?.message}
            value={watch('siteId')}
          >
            <SelectItem text="--Choose site--" value="" />
            {siteId?.map((item, index) => (
              <SelectItem key={index} text={item.name} value={item.siteId} />
            ))}
          </Select>
        </Column>
        <Column>
          <Select
            id="county"
            labelText="County"
            {...register('countyId')}
            invalid={!!errors.countyId}
            invalidText={errors.countyId?.message}
            value={watch('countyId')}
          >
            <SelectItem text="--Choose county--" value="" />
            {countyId?.map((item, index) => (
              <SelectItem key={index} text={item.name} value={item.countyId} />
            ))}
          </Select>
        </Column>
        <Column>
          <Select
            id="countyBudget"
            labelText="County budget"
            {...register('budgetId')}
            invalid={!!errors.budgetId}
            invalidText={errors.budgetId?.message}
            value={watch('budgetId')}
          >
            <SelectItem text="--Choose county budget--" value="" />
            {budgetId?.map((item, index) => (
              <SelectItem key={index} text={item.name} value={item.budgetId} />
            ))}
          </Select>
        </Column>
        <Column>
          <Select
            id="programArea"
            labelText="Program area"
            {...register('programId')}
            invalid={!!errors.programId}
            invalidText={errors.programId?.message}
            value={watch('programId')}
          >
            <SelectItem text="--Choose program area--" value="" />
            {programId?.map((item, index) => (
              <SelectItem key={index} text={item.name} value={item.programId} />
            ))}
          </Select>
        </Column>
        <Column>
          <DatePicker
            datePickerType="single"
            onChange={([event]) => setValue('endOfContract', new Date(event), { shouldValidate: true })}
            value={watch('endOfContract')}
          >
            <DatePickerInput
              id="endOfContract"
              labelText="End of contract"
              {...register('endOfContract')}
              placeholder="mm/dd/yyyy"
              invalid={!!errors.endOfContract}
              invalidText={errors.endOfContract?.message}
            />
          </DatePicker>
        </Column>
        <Column>
          <DatePicker
            datePickerType="single"
            onChange={([event]) => setValue('dateOfJoining', new Date(event), { shouldValidate: true })}
            value={watch('dateOfJoining')}
          >
            <DatePickerInput
              id="dateOfJoining"
              labelText="Date of joining"
              {...register('dateOfJoining')}
              placeholder="mm/dd/yyyy"
              invalid={!!errors.dateOfJoining}
              invalidText={errors.dateOfJoining?.message}
            />
          </DatePicker>
        </Column>
        <Column>
          <DatePicker
            datePickerType="single"
            onChange={([event]) => setValue('dateOfLeaving', new Date(event), { shouldValidate: true })}
            value={watch('dateOfLeaving')}
          >
            <DatePickerInput
              id="dateOfLeaving"
              labelText="Date of leaving"
              {...register('dateOfLeaving')}
              placeholder="mm/dd/yyyy"
              invalid={!!errors.dateOfLeaving}
              invalidText={errors.dateOfLeaving?.message}
            />
          </DatePicker>
        </Column>
        <Column>
          <TextInput
            id="jobSpecification"
            labelText="Job specification"
            {...register('jobSpecification')}
            invalid={!!errors.jobSpecification}
            invalidText={errors.jobSpecification?.message}
          />
        </Column>
        <Column>
          <Button type="submit" className={styles.submitBtn} disabled={edited} kind="primary">
            Save
          </Button>
        </Column>
      </Form>
    </>
  );
};
