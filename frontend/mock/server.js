const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults({ noCache: true });
const auth = require('./auth');

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Add CORS headers and logging
server.use((req, res, next) => {
  res.header('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.header('Pragma', 'no-cache');
  res.header('Expires', '0');
  
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`, {
    query: req.query,
    headers: req.headers,
    body: req.body
  });
  
  next();
});

// Use auth middleware
server.use(auth);

// Protected routes
server.get('/api/students/:id', (req, res) => {
  const db = router.db.getState();
  const student = db.students.find(s => s.id === req.params.id);

  if (!student) {
    res.status(404).json({ message: 'Student not found' });
    return;
  }

  res.json(student);
});

server.get('/api/students/:id/courses', (req, res) => {
  const db = router.db.getState();
  const courses = db.courses.map(course => ({
    ...course,
    grade: course.id === 'CS101' ? 'A' : 'B+',
    progress: course.id === 'CS101' ? 85 : 90
  }));

  res.json(courses);
});

server.get('/api/students/:id/schedule', (req, res) => {
  const db = router.db.getState();
  const courses = db.courses.map(course => ({
    id: course.id,
    name: course.name,
    instructor: course.instructor,
    schedule: course.schedule
  }));

  res.json(courses);
});

server.get('/api/students/:id/assignments', (req, res) => {
  const db = router.db.getState();
  const assignments = db.assignments.map(assignment => ({
    ...assignment,
    grade: assignment.id === '1' ? 95 : null,
    submitted: assignment.id === '1'
  }));

  res.json(assignments);
});

server.get('/api/students', (req, res) => {
  const db = router.db.getState();
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';
  
  let students = [...db.students];
  
  if (search) {
    const searchLower = search.toLowerCase();
    students = students.filter(student => 
      student.firstName.toLowerCase().includes(searchLower) ||
      student.lastName.toLowerCase().includes(searchLower) ||
      student.email.toLowerCase().includes(searchLower) ||
      student.studentId.toLowerCase().includes(searchLower)
    );
  }
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedStudents = students.slice(startIndex, endIndex);
  
  const response = {
    students: paginatedStudents,
    total: students.length,
    page: page,
    limit: limit
  };
  
  res.json(response);
});

// Use default router for other routes
server.use('/api', router);

const port = 3001;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
  console.log('Database state:', router.db.getState());
});
