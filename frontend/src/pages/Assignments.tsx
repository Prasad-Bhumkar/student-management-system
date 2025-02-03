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
  LinearProgress,
  Button,
} from '@mui/material';
import { Assignment as AssignmentIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Assignments = () => {
  const { user } = useAuth();
  const isStudent = user?.role === 'student';

  // Placeholder data - in a real app, this would come from an API
  const assignments = [
    {
      id: 1,
      title: 'Data Structures Project',
      course: 'Data Structures',
      dueDate: '2024-02-15',
      status: 'in_progress',
      progress: 60,
      grade: null,
    },
    {
      id: 2,
      title: 'Algorithm Analysis',
      course: 'Algorithms',
      dueDate: '2024-02-10',
      status: 'completed',
      progress: 100,
      grade: 'A',
    },
    {
      id: 3,
      title: 'Programming Basics',
      course: 'Introduction to Computer Science',
      dueDate: '2024-02-20',
      status: 'not_started',
      progress: 0,
      grade: null,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'warning';
      case 'not_started':
        return 'error';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          {isStudent ? 'My Assignments' : 'Assignments'}
        </Typography>
        {!isStudent && (
          <Button
            variant="contained"
            startIcon={<AssignmentIcon />}
            onClick={() => {/* Handle create assignment */}}
          >
            Create Assignment
          </Button>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Course</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              {isStudent && <TableCell>Grade</TableCell>}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.course}</TableCell>
                <TableCell>
                  {new Date(assignment.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Chip
                    label={getStatusLabel(assignment.status)}
                    color={getStatusColor(assignment.status) as any}
                    size="small"
                  />
                </TableCell>
                <TableCell sx={{ width: '20%' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ width: '100%', mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={assignment.progress}
                        color={getStatusColor(assignment.status) as any}
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography variant="body2" color="text.secondary">
                        {assignment.progress}%
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                {isStudent && (
                  <TableCell>
                    {assignment.grade ? (
                      <Chip
                        label={assignment.grade}
                        color="success"
                        size="small"
                      />
                    ) : (
                      '-'
                    )}
                  </TableCell>
                )}
                <TableCell>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {/* Handle view/edit assignment */}}
                  >
                    {isStudent ? 'View' : 'Edit'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isStudent && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Assignment Summary
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Total Assignments
              </Typography>
              <Typography variant="h4">{assignments.length}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Completed
              </Typography>
              <Typography variant="h4">
                {assignments.filter(a => a.status === 'completed').length}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                In Progress
              </Typography>
              <Typography variant="h4">
                {assignments.filter(a => a.status === 'in_progress').length}
              </Typography>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Assignments;
