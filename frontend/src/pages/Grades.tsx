import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import studentApi from '../services/api/students';
import { useAuth } from '../contexts/AuthContext';

const getGradeColor = (grade: string) => {
  switch (grade) {
    case 'A':
      return 'success';
    case 'B+':
    case 'B':
      return 'primary';
    case 'C+':
    case 'C':
      return 'warning';
    case 'D':
    case 'F':
      return 'error';
    default:
      return 'default';
  }
};

const Grades = () => {
  const { user } = useAuth();

  const { data: studentData, isLoading } = useQuery({
    queryKey: ['student', user?.id],
    queryFn: () => studentApi.getStudent(user?.id || ''),
    enabled: !!user?.id,
  });

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (!studentData) {
    return <Typography>No grade data available</Typography>;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Grades
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Academic Summary
        </Typography>
        <Box sx={{ display: 'flex', gap: 4, mb: 3 }}>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Current GPA
            </Typography>
            <Typography variant="h4">
              {studentData.academicInfo?.gpa.toFixed(2)}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Major
            </Typography>
            <Typography variant="h6">{studentData.academicInfo?.major}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Class Level
            </Typography>
            <Typography variant="h6">
              {studentData.academicInfo?.classLevel}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>Credits</TableCell>
              <TableCell>Semester</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Placeholder data - in a real app, this would come from the API */}
            <TableRow>
              <TableCell>Introduction to Computer Science</TableCell>
              <TableCell>
                <Chip
                  label={studentData.grade}
                  color={getGradeColor(studentData.grade) as any}
                  size="small"
                />
              </TableCell>
              <TableCell>3</TableCell>
              <TableCell>Fall 2023</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Data Structures</TableCell>
              <TableCell>
                <Chip label="B+" color="primary" size="small" />
              </TableCell>
              <TableCell>3</TableCell>
              <TableCell>Fall 2023</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Algorithms</TableCell>
              <TableCell>
                <Chip label="A" color="success" size="small" />
              </TableCell>
              <TableCell>3</TableCell>
              <TableCell>Fall 2023</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Grades;
