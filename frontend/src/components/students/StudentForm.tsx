import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  MenuItem,
  Box,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Student, CreateStudentData, UpdateStudentData } from '../../types/student';

interface StudentFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStudentData | UpdateStudentData) => Promise<void>;
  student?: Student;
  isLoading?: boolean;
}

type AddressInput = {
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
};

type GuardianInfoInput = {
  name?: string;
  relationship?: string;
  phoneNumber?: string;
  email?: string;
};

type AcademicInfoInput = {
  gpa?: number;
  major?: string;
  classLevel?: string;
  advisorId?: string;
};

interface FormInputs {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  studentId: string;
  dateOfBirth: string;
  enrollmentDate: string;
  grade: string;
  status: 'active' | 'inactive' | 'pending';
  phoneNumber: string;
  address?: AddressInput;
  guardianInfo?: GuardianInfoInput;
  academicInfo?: AcademicInfoInput;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().when('$isNew', {
    is: true,
    then: (schema) => schema.required('Password is required'),
    otherwise: (schema) => schema.optional(),
  }),
  studentId: yup.string().required('Student ID is required'),
  dateOfBirth: yup.string().required('Date of birth is required'),
  enrollmentDate: yup.string().required('Enrollment date is required'),
  grade: yup.string().required('Grade is required'),
  status: yup.string().oneOf(['active', 'inactive', 'pending']).required('Status is required'),
  phoneNumber: yup.string().required('Phone number is required'),
  address: yup.object().shape({
    street: yup.string().optional(),
    city: yup.string().optional(),
    state: yup.string().optional(),
    zipCode: yup.string().optional(),
    country: yup.string().optional(),
  }).optional().default(undefined),
  guardianInfo: yup.object().shape({
    name: yup.string().optional(),
    relationship: yup.string().optional(),
    phoneNumber: yup.string().optional(),
    email: yup.string().email('Invalid guardian email').optional(),
  }).optional().default(undefined),
  academicInfo: yup.object().shape({
    gpa: yup.number().min(0).max(4).optional(),
    major: yup.string().optional(),
    classLevel: yup.string().optional(),
    advisorId: yup.string().optional(),
  }).optional().default(undefined),
}) as yup.ObjectSchema<FormInputs>;

const StudentForm = ({
  open,
  onClose,
  onSubmit,
  student,
  isLoading,
}: StudentFormProps) => {
  const isNew = !student;

  const defaultValues: FormInputs = {
    firstName: '',
    lastName: '',
    email: '',
    studentId: '',
    dateOfBirth: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    grade: '',
    status: 'pending',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    guardianInfo: {
      name: '',
      relationship: '',
      phoneNumber: '',
      email: '',
    },
    academicInfo: {
      gpa: 0,
      major: '',
      classLevel: '',
      advisorId: '',
    },
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(schema),
    context: { isNew },
    defaultValues,
  });

  useEffect(() => {
    if (student) {
      const formData: FormInputs = {
        ...student,
        dateOfBirth: student.dateOfBirth.split('T')[0],
        enrollmentDate: student.enrollmentDate.split('T')[0],
      };
      reset(formData);
    } else {
      reset(defaultValues);
    }
  }, [student, reset]);

  const handleFormSubmit = async (data: FormInputs) => {
    try {
      const submissionData = isNew
        ? {
            ...data,
            password: data.password!,
            address: data.address ? {
              street: data.address.street || '',
              city: data.address.city || '',
              state: data.address.state || '',
              zipCode: data.address.zipCode || '',
              country: data.address.country || '',
            } : undefined,
            guardianInfo: data.guardianInfo ? {
              name: data.guardianInfo.name || '',
              relationship: data.guardianInfo.relationship || '',
              phoneNumber: data.guardianInfo.phoneNumber || '',
              email: data.guardianInfo.email || '',
            } : undefined,
            academicInfo: data.academicInfo ? {
              gpa: data.academicInfo.gpa || 0,
              major: data.academicInfo.major || '',
              classLevel: data.academicInfo.classLevel || '',
              advisorId: data.academicInfo.advisorId || '',
            } : undefined,
          } as CreateStudentData
        : {
            ...data,
            address: data.address,
            guardianInfo: data.guardianInfo,
            academicInfo: data.academicInfo,
          } as UpdateStudentData;

      await onSubmit(submissionData);
      onClose();
      reset(defaultValues);
    } catch (error) {
      console.error('Form submission failed:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{student ? 'Edit Student' : 'Add New Student'}</DialogTitle>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            {/* Personal Information */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2, fontWeight: 'bold' }}>Personal Information</Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="First Name"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Last Name"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Email"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                )}
              />
            </Grid>
            {isNew && (
              <Grid item xs={12} sm={6}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="password"
                      label="Password"
                      fullWidth
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  )}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Controller
                name="phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Phone Number"
                    fullWidth
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Date of Birth"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dateOfBirth}
                    helperText={errors.dateOfBirth?.message}
                  />
                )}
              />
            </Grid>

            {/* Academic Information */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2, mt: 2, fontWeight: 'bold' }}>Academic Information</Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="studentId"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Student ID"
                    fullWidth
                    error={!!errors.studentId}
                    helperText={errors.studentId?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="enrollmentDate"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Enrollment Date"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.enrollmentDate}
                    helperText={errors.enrollmentDate?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="grade"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Grade"
                    fullWidth
                    error={!!errors.grade}
                    helperText={errors.grade?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Status"
                    fullWidth
                    error={!!errors.status}
                    helperText={errors.status?.message}
                  >
                    <MenuItem value="active">Active</MenuItem>
                    <MenuItem value="inactive">Inactive</MenuItem>
                    <MenuItem value="pending">Pending</MenuItem>
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="academicInfo.gpa"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="GPA"
                    type="number"
                    fullWidth
                    inputProps={{ step: 0.01, min: 0, max: 4 }}
                    error={!!errors.academicInfo?.gpa}
                    helperText={errors.academicInfo?.gpa?.message}
                  />
                )}
              />
            </Grid>

            {/* Guardian Information */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2, mt: 2, fontWeight: 'bold' }}>Guardian Information</Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="guardianInfo.name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Guardian Name"
                    fullWidth
                    error={!!errors.guardianInfo?.name}
                    helperText={errors.guardianInfo?.name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="guardianInfo.relationship"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Relationship"
                    fullWidth
                    error={!!errors.guardianInfo?.relationship}
                    helperText={errors.guardianInfo?.relationship?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="guardianInfo.phoneNumber"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Guardian Phone"
                    fullWidth
                    error={!!errors.guardianInfo?.phoneNumber}
                    helperText={errors.guardianInfo?.phoneNumber?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="guardianInfo.email"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Guardian Email"
                    fullWidth
                    error={!!errors.guardianInfo?.email}
                    helperText={errors.guardianInfo?.email?.message}
                  />
                )}
              />
            </Grid>

            {/* Address Information */}
            <Grid item xs={12}>
              <Box sx={{ mb: 2, mt: 2, fontWeight: 'bold' }}>Address</Box>
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address.street"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Street Address"
                    fullWidth
                    error={!!errors.address?.street}
                    helperText={errors.address?.street?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    fullWidth
                    error={!!errors.address?.city}
                    helperText={errors.address?.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.state"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="State"
                    fullWidth
                    error={!!errors.address?.state}
                    helperText={errors.address?.state?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.zipCode"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="ZIP Code"
                    fullWidth
                    error={!!errors.address?.zipCode}
                    helperText={errors.address?.zipCode?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="address.country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    fullWidth
                    error={!!errors.address?.country}
                    helperText={errors.address?.country?.message}
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
          >
            {student ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default StudentForm;
