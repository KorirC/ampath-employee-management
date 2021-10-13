import React, { useState, useMemo } from 'react';
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

export interface EmployeeTrackingFormProps {
  pfNumber: number | undefined;
  parentCallback?(evnt): void;
  edit?: EmployeeTrackingInputProps;
}

export const EmployeeTrackingForm: React.FC<EmployeeTrackingFormProps> = (props) => {
  const [project, setProject] = useState<Array<any>>([]);
  const [department, setDepartment] = useState<Array<any>>();
  const [site, setSite] = useState<Array<any>>();
  const [county, setCounty] = useState<Array<any>>();
  const [budget, setBudget] = useState<Array<any>>();
  const [program, setProgram] = useState<Array<any>>();
  const [formSuccess, setFormSuccess] = useState<boolean>(false);
  const [formError, setFormError] = useState<boolean>(false);
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm({ resolver: yupResolver(validationSchema), mode: 'onChange' });
  const editValues = props.edit;

  useMemo(
    () =>
      editValues &&
      (setValue('project', editValues?.projectId),
      setValue('department', editValues?.departmentId),
      setValue('site', editValues?.siteId),
      setValue('county', editValues?.countyId),
      setValue('countyBudget', editValues?.budgetId),
      setValue('programArea', editValues?.programId),
      setValue('endOfContract', new Date(editValues?.endOfContract)),
      setValue('dateOfJoining', new Date(editValues?.dateOfJoining)),
      setValue('dateOfLeaving', new Date(editValues?.dateOfLeaving)),
      setValue('jobSpecification', editValues?.jobSpecification)),
    [editValues],
  );

  const handleFormSubmit = (values: EmployeeTrackingInputProps) => {
    values.pfNumber = props.pfNumber;
    values.endOfContract = dayjs(values.endOfContract).format('YYYY-MM-DD');
    values.dateOfJoining = dayjs(values.dateOfJoining).format('YYYY-MM-DD');
    values.dateOfLeaving = dayjs(values.dateOfLeaving).format('YYYY-MM-DD');
    saveEmployeeTrackingInformation(values)
      .then((response) => {
        if (response.status === 200) {
          setFormSuccess(true);
          props.parentCallback?.({ formSuccess: true });
        }
      })
      .catch((error) => {
        setFormError(true);
        props.parentCallback?.({ formSuccess: false });
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
        <Column>
          <Select
            id="project"
            labelText="Project"
            {...register('project')}
            invalid={!!errors.project}
            invalidText={errors.project?.message}
            value={watch('project')}
          >
            <SelectItem text="--Choose project--" value="" />
            {project?.map((item, index) => (
              <SelectItem key={index} text={item.name} value={item.projectId} />
            ))}
          </Select>
        </Column>
        <Column>
          <Select
            id="department"
            labelText="Department"
            {...register('department')}
            invalid={!!errors.department}
            invalidText={errors.department?.message}
            value={watch('department')}
          >
            <SelectItem text="--Choose department--" value="" />
            {department?.map((item, index) => (
              <SelectItem key={index} text={item.name} value={item.departmentId} />
            ))}
          </Select>
        </Column>
        <Column>
          <Select
            id="site"
            labelText="Site"
            {...register('site')}
            invalid={!!errors.site}
            invalidText={errors.site?.message}
            value={watch('site')}
          >
            <SelectItem text="--Choose site--" value="" />
            {site?.map((item, index) => (
              <SelectItem key={index} text={item.name} value={item.siteId} />
            ))}
          </Select>
        </Column>
        <Column>
          <Select
            id="county"
            labelText="County"
            {...register('county')}
            invalid={!!errors.county}
            invalidText={errors.county?.message}
            value={watch('county')}
          >
            <SelectItem text="--Choose county--" value="" />
            {county?.map((item, index) => (
              <SelectItem key={index} text={item.name} value={item.countyId} />
            ))}
          </Select>
        </Column>
        <Column>
          <Select
            id="countyBudget"
            labelText="County budget"
            {...register('countyBudget')}
            invalid={!!errors.countyBudget}
            invalidText={errors.countyBudget?.message}
            value={watch('countyBudget')}
          >
            <SelectItem text="--Choose county budget--" value="" />
            {budget?.map((item, index) => (
              <SelectItem key={index} text={item.name} value={item.budgetId} />
            ))}
          </Select>
        </Column>
        <Column>
          <Select
            id="programArea"
            labelText="Program area"
            {...register('programArea')}
            invalid={!!errors.programArea}
            invalidText={errors.programArea?.message}
            value={watch('programArea')}
          >
            <SelectItem text="--Choose program area--" value="" />
            {program?.map((item, index) => (
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
          <Button type="submit" className={styles.submitBtn} kind="primary">
            Save
          </Button>
        </Column>
      </Form>
    </>
  );
};
