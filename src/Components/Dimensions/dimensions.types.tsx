import { number } from 'yup/lib/locale';

export interface formInputProps {
  name: string;
  mflCode: string;
  county: string;
  countyid: string;
  counties: string;
  department: string;
  departmentid: string;
  site: string;
  programs: string;
  budgets: string;
  project: string;
  user: string;
}

export const formValues: formInputProps = {
  name: '',
  mflCode: '',
  county: '',
  countyid: '',
  counties: '',
  department: '',
  departmentid: '',
  site: '',
  programs: '',
  budgets: '',
  project: '',
  user: '',
};

export interface budgetInputProps {
  mflCode: string;
  name: string;
  county: string;
}

export const budgetValues: budgetInputProps = { mflCode: '', name: '', county: '' };

export interface countyInputProps {
  name: string;
  countyId: string;
}

export const countyValues: countyInputProps = { name: '', countyId: '' };

export interface departmentInputProps {
  name: string;
}

export const departmentValues: departmentInputProps = { name: '' };

export interface siteInputProps {
  name: string;
  county: string;
}

export const siteValues: siteInputProps = { name: '', county: '' };

export interface programInputProps {
  name: string;
  budget: string;
}

export const programValues: programInputProps = { name: '', budget: '' };

export interface projectInputProps {
  name: string;
}

export const projectValues: projectInputProps = { name: '' };

export interface userInputProps {
  name: string;
}

export const userValues: projectInputProps = { name: '' };
