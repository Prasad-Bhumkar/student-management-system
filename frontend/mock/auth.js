module.exports = (req, res, next) => {
  // Handle login
  if (req.method === 'POST' && req.path === '/api/auth/login') {
    let { email, password } = req.body;
    
    // Trim whitespace from email and password
    email = (email || '').trim();
    password = (password || '').trim();
    
    console.log('Login attempt:', { email, password });
    
    const db = require('./db.json');
    const user = db.users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );

    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      const response = {
        user: userWithoutPassword,
        token: 'mock-jwt-token',
        refreshToken: 'mock-refresh-token'
      };
      console.log('Login successful:', response);
      res.json(response);
    } else {
      console.log('Login failed: Invalid credentials');
      res.status(401).json({ message: 'Invalid email or password' });
    }
    return;
  }

  // Handle get current user
  if (req.method === 'GET' && req.path === '/api/auth/me') {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token')) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    const db = require('./db.json');
    const user = db.users[1]; // Return the student user for testing
    const { password: _, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
    return;
  }

  // Handle logout
  if (req.method === 'POST' && req.path === '/api/auth/logout') {
    res.status(200).json({ message: 'Logged out successfully' });
    return;
  }

  // Handle other routes
  if (req.path.startsWith('/api/') && req.path !== '/api/auth/login') {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer mock-jwt-token')) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  }

  next();
};
