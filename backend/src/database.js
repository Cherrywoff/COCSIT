const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

function initDb() {
  db.serialize(() => {
    // 1. Users Table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      department TEXT,
      email TEXT
    )`);

    // 2. Notices Table
    db.run(`CREATE TABLE IF NOT EXISTS notices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      content TEXT,
      date TEXT NOT NULL,
      category TEXT NOT NULL
    )`);

    // 3. Attendance Table
    db.run(`CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id TEXT NOT NULL,
      date TEXT NOT NULL,
      subject TEXT NOT NULL,
      status TEXT NOT NULL,
      FOREIGN KEY(student_id) REFERENCES users(id)
    )`);

    // 4. Grades Table
    db.run(`CREATE TABLE IF NOT EXISTS grades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id TEXT NOT NULL,
      subject TEXT NOT NULL,
      marks_obtained INTEGER NOT NULL,
      marks_total INTEGER NOT NULL,
      exam_name TEXT NOT NULL,
      FOREIGN KEY(student_id) REFERENCES users(id)
    )`);

    // 5. Student Details Table
    db.run(`CREATE TABLE IF NOT EXISTS student_details (
      id TEXT PRIMARY KEY,
      course TEXT NOT NULL,
      roll_number TEXT NOT NULL,
      prn_number TEXT NOT NULL UNIQUE,
      semester TEXT NOT NULL,
      division TEXT NOT NULL,
      FOREIGN KEY(id) REFERENCES users(id)
    )`);

    // 6. Fees Ledger Table
    db.run(`CREATE TABLE IF NOT EXISTS fees_ledger (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id TEXT NOT NULL,
      installment_name TEXT NOT NULL,
      amount NUMERIC NOT NULL,
      status TEXT NOT NULL,
      FOREIGN KEY(student_id) REFERENCES users(id)
    )`);

    // 7. Assignments Table
    db.run(`CREATE TABLE IF NOT EXISTS assignments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL,
      title TEXT NOT NULL,
      due_date TEXT NOT NULL,
      created_by TEXT NOT NULL,
      FOREIGN KEY(created_by) REFERENCES users(id)
    )`);

    // 8. Study Materials Table
    db.run(`CREATE TABLE IF NOT EXISTS study_materials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subject TEXT NOT NULL,
      title TEXT NOT NULL,
      file_url TEXT NOT NULL,
      uploaded_by TEXT NOT NULL,
      FOREIGN KEY(uploaded_by) REFERENCES users(id)
    )`);

    // 9. Website Settings (CMS)
    db.run(`CREATE TABLE IF NOT EXISTS website_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )`);

    // 10. Notifications Table
    db.run(`CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      title TEXT NOT NULL,
      message TEXT NOT NULL,
      is_read INTEGER DEFAULT 0,
      created_at TEXT NOT NULL,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    // Seed initial users if table is empty
    db.get("SELECT COUNT(*) as count FROM users", (err, row) => {
      if (err) {
        console.error("Error checking users count:", err.message);
        return;
      }
      if (row.count === 0) {
        console.log("Seeding initial users database...");
        const salt = bcrypt.genSaltSync(10);
        const defaultHash = bcrypt.hashSync("password123", salt);

        const usersToSeed = [
          { id: "admin_01", username: "admin", password: defaultHash, name: "Super Admin", role: "admin", department: null, email: "admin@cocsit.org.in" },
          { id: "principal", username: "principal", password: defaultHash, name: "Dr. R. S. Awasthi", role: "principal", department: null, email: "principal@cocsit.org.in" },
          { id: "hod_cs", username: "hod_cs", password: defaultHash, name: "Dr. N. S. Zulpe", role: "hod", department: "Computer Science", email: "nszulpe@cocsit.org.in" },
          { id: "hod_mgmt", username: "hod_mgmt", password: defaultHash, name: "Dr. K. S. Patil", role: "hod", department: "Management Science", email: "kspatil@cocsit.org.in" },
          { id: "teacher_cs", username: "teacher_cs", password: defaultHash, name: "Prof. Rajesh Patil", role: "teacher", department: "Computer Science", email: "rpatil@cocsit.org.in" },
          { id: "teacher_mgmt", username: "teacher_mgmt", password: defaultHash, name: "Prof. Sanjay Shah", role: "teacher", department: "Management Science", email: "sshah@cocsit.org.in" },
          { id: "student_bca", username: "student_bca", password: defaultHash, name: "Rahul Sharma", role: "student", department: "Computer Science", email: "rahul.bca@cocsit.org.in" },
          { id: "student_bsc", username: "student_bsc", password: defaultHash, name: "Priya Deshmukh", role: "student", department: "Computer Science", email: "priya.bsc@cocsit.org.in" },
          { id: "student_se", username: "student_se", password: defaultHash, name: "Amit Kamble", role: "student", department: "Computer Science", email: "amit.se@cocsit.org.in" },
          { id: "student_bba", username: "student_bba", password: defaultHash, name: "Pooja Joshi", role: "student", department: "Management Science", email: "pooja.bba@cocsit.org.in" }
        ];

        const stmt = db.prepare("INSERT INTO users (id, username, password, name, role, department, email) VALUES (?, ?, ?, ?, ?, ?, ?)");
        usersToSeed.forEach((u) => {
          stmt.run(u.id, u.username, u.password, u.name, u.role, u.department, u.email);
        });
        stmt.finalize();
        console.log("Users seeded successfully.");
      }
    });

    // Seed notices if empty
    db.get("SELECT COUNT(*) as count FROM notices", (err, row) => {
      if (err) return;
      if (row.count === 0) {
        console.log("Seeding initial notices...");
        const noticesToSeed = [
          { title: "Registration for MAH-B.Sc/BCA/BBA/BMS/BBM CET (A.Y. 2026-27)", content: "State Common Entrance Test Cell, Maharashtra, has announced the registration schedule for MAH-B.Sc/BCA/BBA/BMS/BBM CET 2026. Eligible candidates must fill out the form online. Refer to document under: /documents/2026-27/CET-Registration-Notice_-BBA_BCA_BBM_BMS_-CET-2026.pdf", date: "2026-03-21", category: "academics" },
          { title: "Tech Mahindra Campus Placement Drive", content: "Campus placement drive by Tech Mahindra for 2026 passing out batch. Eligible streams: BCA, B.Sc (CS/SE/IT), M.Sc (CS/SE), MCA, MBA. Refer to document under: /documents/2025-26/announcements/Tech%20Mahindra%20Campus%20drive%2024-04-2026.jpeg", date: "2026-04-24", category: "placement" },
          { title: "Academic Calendar 2025-26 Released", content: "The College Academic Calendar for the term 2025-26 has been published. All departments and students are required to follow the session timelines. Refer to document under: /documents/2025-26/academic_calendar_2025_26.pdf", date: "2026-04-15", category: "academics" },
          { title: "BCA & BBA FRA Proposal Fees Structure A.Y. 2026-27", content: "FRA proposal approval details for BBA & BCA program fees structure for Academic Year 2026-27. Students can inspect proposal terms in the college records or online.", date: "2026-04-12", category: "general" },
          { title: "Audit Report 2024-25 Published", content: "The official Institutional Financial Audit report for the year 2024-2025 has been approved by the management. Refer to document under: /autonomous/Audit/Audit Report 2024-2025.pdf", date: "2026-04-10", category: "general" },
          { title: "Hall Wise Seating Arrangement - Summer 2026", content: "The seating charts and hall allocations for the Summer 2025-26 exams are now published. Refer to document under: /download/timetable-2025-26/Hall Wise Seating Arrangement Summer 2025-2026.pdf", date: "2026-04-05", category: "academics" },
          { title: "Prospectus 2025-26 Released", content: "The general admission handbook and courses catalog prospectus for the academic session has been released. Refer to document under: /autonomous/PROSPECTUS_2025-26.pdf", date: "2026-03-10", category: "general" }
        ];

        const stmt = db.prepare("INSERT INTO notices (title, content, date, category) VALUES (?, ?, ?, ?)");
        noticesToSeed.forEach((n) => {
          stmt.run(n.title, n.content, n.date, n.category);
        });
        stmt.finalize();
        console.log("Notices seeded successfully.");
      }
    });

    // Seed attendance if empty
    db.get("SELECT COUNT(*) as count FROM attendance", (err, row) => {
      if (err) return;
      if (row.count === 0) {
        console.log("Seeding initial attendance data for student profiles...");
        const attendanceLogs = [];
        const csSubjects = ["Java Programming", "Software Engineering", "Database Systems", "Web Technology"];
        const mgmtSubjects = ["Business Management", "Marketing Strategies", "Financial Accounting", "Organizational Behavior"];
        const studentsList = ["student_bca", "student_bsc", "student_se", "student_bba"];
        const startDate = new Date("2026-04-01");

        // Seed 15 days of attendance logs
        for (let i = 0; i < 15; i++) {
          const currentDate = new Date(startDate);
          currentDate.setDate(startDate.getDate() + i);
          const dateStr = currentDate.toISOString().slice(0, 10);

          // Sunday skip
          if (currentDate.getDay() === 0) continue;

          studentsList.forEach(studentId => {
            const subjects = (studentId === "student_bba") ? mgmtSubjects : csSubjects;
            subjects.forEach(subject => {
              // 80% to 90% attendance probability
              const status = Math.random() > 0.18 ? "Present" : "Absent";
              attendanceLogs.push({
                student_id: studentId,
                date: dateStr,
                subject: subject,
                status: status
              });
            });
          });
        }

        const stmt = db.prepare("INSERT INTO attendance (student_id, date, subject, status) VALUES (?, ?, ?, ?)");
        attendanceLogs.forEach(log => {
          stmt.run(log.student_id, log.date, log.subject, log.status);
        });
        stmt.finalize();
        console.log("Attendance seeded successfully.");
      }
    });

    // Seed grades if empty
    db.get("SELECT COUNT(*) as count FROM grades", (err, row) => {
      if (err) return;
      if (row.count === 0) {
        console.log("Seeding initial grades for student profiles...");
        const gradesToSeed = [];
        const csSubjects = ["Java Programming", "Software Engineering", "Database Systems", "Web Technology"];
        const mgmtSubjects = ["Business Management", "Marketing Strategies", "Financial Accounting", "Organizational Behavior"];
        const studentsList = ["student_bca", "student_bsc", "student_se", "student_bba"];

        studentsList.forEach(studentId => {
          const subjects = (studentId === "student_bba") ? mgmtSubjects : csSubjects;
          subjects.forEach(subject => {
            const marks = Math.floor(Math.random() * 8) + 17; // Random mark between 17 and 25
            gradesToSeed.push({
              student_id: studentId,
              subject: subject,
              marks_obtained: marks,
              marks_total: 25,
              exam_name: "Internal Test 1"
            });
          });
        });

        const stmt = db.prepare("INSERT INTO grades (student_id, subject, marks_obtained, marks_total, exam_name) VALUES (?, ?, ?, ?, ?)");
        gradesToSeed.forEach(g => {
          stmt.run(g.student_id, g.subject, g.marks_obtained, g.marks_total, g.exam_name);
        });
        stmt.finalize();
        console.log("Grades seeded successfully.");
      }
    });

    // Seed Website Settings (CMS)
    db.get("SELECT COUNT(*) as count FROM website_settings", (err, row) => {
      if (err) return;
      if (row.count === 0) {
        console.log("Seeding initial CMS settings...");
        const seedSettings = [
          {
            key: 'master_content',
            value: JSON.stringify({
              "girls_hostel": {
                "title": "Girls Hostels Limits",
                "details": ["Safe residential boarding inside secure campus perimeters for outstation students."],
                "rules": ["Located inside campus limits.", "24/7 security wardens present."]
              },
              "scholarships": {
                "title": "Welfare Scholarships Assistance",
                "details": ["Rajarshi Chhatrapati Shahu Maharaj concessions.", "Government Post-Matric schemes."]
              },
              "infrastructure": {
                "title": "Infrastructure assets",
                "details": ["Modern computing centers and smart classrooms guidelines."]
              }
            })
          }
        ];

        const stmt = db.prepare("INSERT INTO website_settings (key, value) VALUES (?, ?)");
        seedSettings.forEach(s => {
          stmt.run(s.key, s.value);
        });
        stmt.finalize();
        console.log("CMS Settings seeded successfully.");
      }
    });

  });
}

initDb();

module.exports = db;
