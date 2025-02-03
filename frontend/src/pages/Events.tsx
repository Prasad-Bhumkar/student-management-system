import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Button,
  IconButton,
} from '@mui/material';
import {
  Event as EventIcon,
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Add as AddIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';

const Events = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Placeholder data - in a real app, this would come from an API
  const events = [
    {
      id: 1,
      title: 'Spring Semester Orientation',
      date: '2024-02-15',
      time: '10:00 AM - 12:00 PM',
      location: 'Main Auditorium',
      type: 'academic',
      description: 'Welcome orientation for new and returning students.',
    },
    {
      id: 2,
      title: 'Career Fair',
      date: '2024-02-20',
      time: '9:00 AM - 4:00 PM',
      location: 'Student Center',
      type: 'career',
      description: 'Annual career fair with top companies in attendance.',
    },
    {
      id: 3,
      title: 'Student Club Fair',
      date: '2024-02-25',
      time: '2:00 PM - 5:00 PM',
      location: 'Campus Quad',
      type: 'social',
      description: 'Explore and join various student clubs and organizations.',
    },
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'academic':
        return 'primary';
      case 'career':
        return 'success';
      case 'social':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Events</Typography>
        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {/* Handle create event */}}
          >
            Create Event
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} md={6} lg={4} key={event.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6" component="div">
                    {event.title}
                  </Typography>
                  {isAdmin && (
                    <IconButton
                      size="small"
                      onClick={() => {/* Handle edit event */}}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EventIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {new Date(event.date).toLocaleDateString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.time}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {event.description}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    color={getEventTypeColor(event.type) as any}
                    size="small"
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => {/* Handle RSVP/view details */}}
                  >
                    {isAdmin ? 'View Details' : 'RSVP'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ mt: 3, p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Upcoming Events Summary
        </Typography>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              Total Events
            </Typography>
            <Typography variant="h4">{events.length}</Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="textSecondary">
              This Month
            </Typography>
            <Typography variant="h4">
              {events.filter(e => new Date(e.date).getMonth() === new Date().getMonth()).length}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Events;
