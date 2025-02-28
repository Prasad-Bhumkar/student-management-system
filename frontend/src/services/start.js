const db = require('./db');

const startApp = async () => {
  try {
    // Initialize the database
    await db.initializeDatabase();
    
    // Optionally create sample students
    await db.createStudent({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      studentId: 'S12345',
      dateOfBirth: '2000-01-01',
      enrollmentDate: '2020-09-01',
      major: 'Computer Science'
    });

    await db.createStudent({
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      studentId: 'S54321',
      dateOfBirth: '2001-02-02',
      enrollmentDate: '2021-09-01',
      major: 'Mathematics'
    });

    console.log('Database initialized and sample students created.');
  } catch (error) {
    console.error('Error starting the application:', error);
  }
};

startApp();
