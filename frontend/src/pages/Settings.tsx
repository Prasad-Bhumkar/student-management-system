import {
  Box,
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  TextField,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    assignments: true,
    grades: true,
    events: true,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    language: 'English',
    timezone: 'UTC-5',
  });

  const handleNotificationChange = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Settings
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Notification Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Receive important updates via email"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Assignment Updates"
                  secondary="Get notified about new and due assignments"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.assignments}
                    onChange={() => handleNotificationChange('assignments')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Grade Updates"
                  secondary="Receive notifications when grades are posted"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.grades}
                    onChange={() => handleNotificationChange('grades')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Event Reminders"
                  secondary="Get reminded about upcoming events"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={notifications.events}
                    onChange={() => handleNotificationChange('events')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Account Settings
            </Typography>
            <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Email"
                value={user?.email}
                disabled
                fullWidth
              />
              <TextField
                label="First Name"
                value={user?.firstName}
                fullWidth
              />
              <TextField
                label="Last Name"
                value={user?.lastName}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => {/* Handle save account settings */}}
              >
                Save Changes
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Preferences
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={preferences.darkMode}
                    onChange={() => setPreferences(prev => ({
                      ...prev,
                      darkMode: !prev.darkMode,
                    }))}
                  />
                }
                label="Dark Mode"
              />
              <TextField
                select
                label="Language"
                value={preferences.language}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  language: e.target.value,
                }))}
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </TextField>
              <TextField
                select
                label="Timezone"
                value={preferences.timezone}
                onChange={(e) => setPreferences(prev => ({
                  ...prev,
                  timezone: e.target.value,
                }))}
                fullWidth
                SelectProps={{
                  native: true,
                }}
              >
                <option value="UTC-5">Eastern Time (UTC-5)</option>
                <option value="UTC-6">Central Time (UTC-6)</option>
                <option value="UTC-7">Mountain Time (UTC-7)</option>
                <option value="UTC-8">Pacific Time (UTC-8)</option>
              </TextField>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {/* Handle save preferences */}}
              >
                Save Preferences
              </Button>
            </Box>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Security
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {/* Handle change password */}}
              >
                Change Password
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {/* Handle enable 2FA */}}
              >
                Enable Two-Factor Authentication
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
