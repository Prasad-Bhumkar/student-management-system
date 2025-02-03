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

const Schedule = () => {
  // Placeholder data - in a real app, this would come from an API
  const schedule = [
    {
      id: 1,
      course: 'Introduction to Computer Science',
      time: '9:00 AM - 10:30 AM',
      days: ['Monday', 'Wednesday'],
      room: 'Room 101',
      instructor: 'Dr. Smith',
    },
    {
      id: 2,
      course: 'Data Structures',
      time: '11:00 AM - 12:30 PM',
      days: ['Tuesday', 'Thursday'],
      room: 'Room 203',
      instructor: 'Dr. Johnson',
    },
    {
      id: 3,
      course: 'Algorithms',
      time: '2:00 PM - 3:30 PM',
      days: ['Monday', 'Wednesday'],
      room: 'Room 305',
      instructor: 'Dr. Williams',
    },
  ];

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Class Schedule
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course</TableCell>
              <TableCell>Time</TableCell>
              <TableCell>Days</TableCell>
              <TableCell>Room</TableCell>
              <TableCell>Instructor</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {schedule.map((class_) => (
              <TableRow key={class_.id}>
                <TableCell>{class_.course}</TableCell>
                <TableCell>{class_.time}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {daysOfWeek.map((day) => (
                      <Chip
                        key={day}
                        label={day.slice(0, 3)}
                        size="small"
                        color={class_.days.includes(day) ? 'primary' : 'default'}
                        variant={class_.days.includes(day) ? 'filled' : 'outlined'}
                      />
                    ))}
                  </Box>
                </TableCell>
                <TableCell>{class_.room}</TableCell>
                <TableCell>{class_.instructor}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Schedule Summary
        </Typography>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Total Courses
            </Typography>
            <Typography variant="h4">{schedule.length}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Total Credit Hours
            </Typography>
            <Typography variant="h4">{schedule.length * 3}</Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Schedule;
