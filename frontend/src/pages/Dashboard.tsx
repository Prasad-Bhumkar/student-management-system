import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
} from '@mui/material';
import {
  School as SchoolIcon,
  Assignment as AssignmentIcon,
  Event as EventIcon,
  Grade as GradeIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import studentApi from '../services/api/students';

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ['studentStats'],
    queryFn: () => studentApi.getStudentStats('overall'),
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SchoolIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
          <Typography variant="h4">{stats?.totalStudents || 0}</Typography>
          <Typography color="textSecondary">Total Students</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SchoolIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
          <Typography variant="h4">{stats?.activeStudents || 0}</Typography>
          <Typography color="textSecondary">Active Students</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <GradeIcon sx={{ fontSize: 40, color: 'info.main', mb: 1 }} />
          <Typography variant="h4">{stats?.averageGpa?.toFixed(2) || '0.00'}</Typography>
          <Typography color="textSecondary">Average GPA</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} md={3}>
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <EventIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
          <Typography variant="h4">2</Typography>
          <Typography color="textSecondary">Upcoming Events</Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

const StudentDashboard = () => {
  const { user } = useAuth();
  const { data: studentData } = useQuery({
    queryKey: ['student', user?.id],
    queryFn: () => studentApi.getStudent(user?.id || ''),
    enabled: !!user?.id,
  });

  const { data: courses } = useQuery({
    queryKey: ['studentCourses', user?.id],
    queryFn: () => studentApi.getStudentCourses(user?.id || ''),
    enabled: !!user?.id,
  });

  const { data: assignments } = useQuery({
    queryKey: ['studentAssignments', user?.id],
    queryFn: () => studentApi.getStudentAssignments(user?.id || ''),
    enabled: !!user?.id,
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Academic Progress
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" color="textSecondary">
                Current GPA
              </Typography>
              <Typography variant="h3">
                {studentData?.academicInfo?.gpa.toFixed(2)}
              </Typography>
            </Box>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Major: {studentData?.academicInfo?.major}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Class Level: {studentData?.academicInfo?.classLevel}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Current Courses
            </Typography>
            <List>
              {courses?.map((course) => (
                <ListItem key={course.id}>
                  <ListItemText
                    primary={course.name}
                    secondary={`Grade: ${course.grade || 'N/A'}`}
                  />
                  <Box sx={{ width: '50%', ml: 2 }}>
                    <LinearProgress
                      variant="determinate"
                      value={course.progress}
                      color={course.grade === 'A' ? 'success' : 'primary'}
                    />
                    <Typography variant="body2" color="textSecondary" align="right">
                      {course.progress}%
                    </Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Upcoming Assignments
            </Typography>
            <List>
              {assignments?.slice(0, 3).map((assignment) => (
                <ListItem key={assignment.id}>
                  <ListItemText
                    primary={assignment.title}
                    secondary={`Due: ${new Date(assignment.dueDate).toLocaleDateString()}`}
                  />
                  <Chip
                    label={assignment.submitted ? 'Submitted' : 'Pending'}
                    color={assignment.submitted ? 'success' : 'warning'}
                    size="small"
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Dashboard
      </Typography>
      
      {user?.role === 'admin' ? <AdminDashboard /> : <StudentDashboard />}
    </Box>
  );
};

export default Dashboard;
