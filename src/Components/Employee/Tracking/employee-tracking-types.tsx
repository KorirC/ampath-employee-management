export interface EmployeeTrackingInputProps {
  pfNumber: string;
  project: string;
  department: string;
  site: string;
  county: string;
  countyBudget: string;
  programArea: string;
  endOfContract: string;
  dateOfJoining: string;
  dateOfLeaving: string;
  jobSpecification: string;
}

export const FormValues: EmployeeTrackingInputProps = {
  pfNumber: '',
  project: '',
  department: '',
  site: '',
  county: '',
  countyBudget: '',
  programArea: '',
  endOfContract: '',
  dateOfJoining: '',
  dateOfLeaving: '',
  jobSpecification: '',
};
