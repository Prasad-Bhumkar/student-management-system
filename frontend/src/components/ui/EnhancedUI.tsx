import React from 'react';
import { Button, TextField, Typography, Alert, FormControlLabel, Checkbox } from '@mui/material';

interface EnhancedUIProps {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  error: string | null;
  credentials: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EnhancedUI: React.FC<EnhancedUIProps> = ({ onSubmit, error, credentials, handleChange }) => {
  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Enhanced UI
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={onSubmit}>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          name="email"
          value={credentials.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <FormControlLabel
          control={
            <Checkbox
              name="rememberMe"
              checked={credentials.rememberMe}
              onChange={handleChange}
            />
          }
          label="Remember Me"
        />
        <Button variant="contained" color="primary" fullWidth type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default EnhancedUI;
