import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { EmployeeRegistrationForm } from './employee-registration.component';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({}),
}));

describe('"<EmployeeRegistrationForm>" component', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <EmployeeRegistrationForm />
      </BrowserRouter>,
    );
  });

  describe('User interface texts', () => {
    it('Should display "Create Employee"', () => {
      expect(screen.getByRole('heading', { name: /Create Employee/i })).toBeInTheDocument();
    });
    it('Should display "Basic info"', () => {
      expect(screen.getByRole('heading', { name: /Basic info/i })).toBeInTheDocument();
    });
    it('Should display "Contact details"', () => {
      expect(screen.getByRole('heading', { name: /Contact details/i })).toBeInTheDocument();
    });
    it('Should display "Employee details"', () => {
      expect(screen.getByRole('heading', { name: /Employee details/i })).toBeInTheDocument();
    });
    it('Should display "Salutation"', () => {
      expect(screen.getByRole('group', { name: /Salutation/i })).toBeInTheDocument();
    });
    it('Should display "Choose gender"', () => {
      expect(screen.getByRole('group', { name: /Choose gender/i })).toBeInTheDocument();
    });
    it('Should display "Mr"', () => {
      expect(screen.getByRole('radio', { name: /Mr/gi })).toBeInTheDocument();
    });
    it('Should display "Mrs"', () => {
      expect(screen.getByRole('radio', { name: /Mrs/i })).toBeInTheDocument();
    });
    it('Should display "Miss"', () => {
      expect(screen.getByRole('radio', { name: /Miss/i })).toBeInTheDocument();
    });
    it('Should display "Male"', () => {
      expect(screen.getByRole('radio', { name: /Male/gi })).toBeInTheDocument();
    });
    it('Should display "Female"', () => {
      expect(screen.getByRole('radio', { name: /Female/i })).toBeInTheDocument();
    });
    it('Should display "First name"', () => {
      expect(screen.getByRole('textbox', { name: /First name/i })).toBeInTheDocument();
    });
    it('Should display "Middle name"', () => {
      expect(screen.getByRole('textbox', { name: /Middle name/i })).toBeInTheDocument();
    });
    it('Should display "Last name"', () => {
      expect(screen.getByRole('textbox', { name: /Last name/i })).toBeInTheDocument();
    });
    it('Should display "Id number"', () => {
      expect(screen.getByRole('textbox', { name: /id number/i })).toBeInTheDocument();
    });
    it('Should display "Date of birth"', () => {
      expect(screen.getByRole('textbox', { name: /Date of birth/i })).toBeInTheDocument();
    });
    it('Should display "Phone number"', () => {
      expect(screen.getByRole('textbox', { name: /Phone number/i })).toBeInTheDocument();
    });
    it('Should display "Email"', () => {
      expect(screen.getByRole('textbox', { name: /Email/i })).toBeInTheDocument();
    });
    it('Should display "PF number"', () => {
      expect(screen.getByRole('textbox', { name: /PF number/i })).toBeInTheDocument();
    });
    it('Should display "KRA pin"', () => {
      expect(screen.getByRole('textbox', { name: /KRA pin/i })).toBeInTheDocument();
    });
    it('Should display "NSSF number"', () => {
      expect(screen.getByRole('textbox', { name: /NSSF number/i })).toBeInTheDocument();
    });
    it('Should display "NHIF number"', () => {
      expect(screen.getByRole('textbox', { name: /NHIF number/i })).toBeInTheDocument();
    });
    it('Should display "Save" button', () => {
      expect(screen.getByRole('button', { name: /Save/i })).toBeInTheDocument();
    });
  });

  describe('User events', () => {
    describe('Submitting empty fields', () => {
      it('Should display error messages on submitting empty fields', async () => {
        user.click(screen.getByRole('button', { name: /Save/i }));
        await waitFor(() => {
          expect(screen.getByText(/Firstname is required/i)).toBeInTheDocument();
          expect(screen.getByText(/Lastname is required/i)).toBeInTheDocument();
          expect(screen.getByText(/Id number is required/i)).toBeInTheDocument();
          expect(screen.getByText(/Birthdate is required/i)).toBeInTheDocument();
          expect(screen.getByText(/Phone number is required/i)).toBeInTheDocument();
          expect(screen.getByText(/Gender is required/i)).toBeInTheDocument();
          expect(screen.getByText(/KRA pin is required/i)).toBeInTheDocument();
          expect(screen.getByText(/NSSF number is required/i)).toBeInTheDocument();
          expect(screen.getByText(/NHIF number is required/i)).toBeInTheDocument();
          expect(screen.getByText(/PF number is required/i)).toBeInTheDocument();
          expect(screen.getByText(/Salutation is required/i)).toBeInTheDocument();
        });
      });
    });

    describe('Entering invalid values', () => {
      it('Should not accept letters in "Id number" input field', async () => {
        user.type(screen.getByRole('textbox', { name: /id number/i }), 'abcd');
        user.tab();
        await waitFor(() => {
          expect(screen.getByText(/Enter numbers only/i)).toBeInTheDocument();
        });
      });
      it('Should not accept letters in "PF number" input field', async () => {
        user.type(screen.getByRole('textbox', { name: /PF number/i }), 'abcd');
        user.tab();
        await waitFor(() => {
          expect(screen.getByText(/Enter numbers only/i)).toBeInTheDocument();
        });
      });
      it('Should not accept letters in "NSSF number" input field', async () => {
        user.type(screen.getByRole('textbox', { name: /NSSF number/i }), 'abcd');
        user.tab();
        await waitFor(() => {
          expect(screen.getByText(/Enter numbers only/i)).toBeInTheDocument();
        });
      });
      it('Should not accept letters in "NHIF number" input field', async () => {
        user.type(screen.getByRole('textbox', { name: /NHIF number/i }), 'abcd');
        user.tab();
        await waitFor(() => {
          expect(screen.getByText(/Enter numbers only/i)).toBeInTheDocument();
        });
      });
      it('Should not accept invalid phone number in "Phone number" input field', async () => {
        user.type(screen.getByRole('textbox', { name: /Phone number/i }), '0890567432');
        user.tab();
        await waitFor(() => {
          expect(
            screen.getByText('Valid format: (+254/0) followed by (1/7) and finally the last 8 digits'),
          ).toBeInTheDocument();
        });
      });
      it('Should not accept invalid email in "Email" input field', async () => {
        user.type(screen.getByRole('textbox', { name: /Email/i }), 'abcd');
        user.tab();
        await waitFor(() => {
          expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
        });
      });
    });
  });
});
