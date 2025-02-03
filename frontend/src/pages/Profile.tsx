import { Box, Paper, Typography, Grid, Avatar, Chip } from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        My Profile
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 150,
                height: 150,
                margin: '0 auto',
                mb: 2,
                fontSize: '3rem',
              }}
            >
              {user.firstName[0]}
              {user.lastName[0]}
            </Avatar>
            <Typography variant="h5">
              {user.firstName} {user.lastName}
            </Typography>
            <Chip
              label={user.role.toUpperCase()}
              color="primary"
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary">
                  Email
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary">
                  Account Status
                </Typography>
                <Typography variant="body1">
                  {user.isEmailVerified ? 'Verified' : 'Not Verified'}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1" color="textSecondary">
                  Member Since
                </Typography>
                <Typography variant="body1">
                  {new Date(user.createdAt).toLocaleDateString()}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;
