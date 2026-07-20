//functions getStudent
function getStudent(studentId, callback) {
  console.log("Fetching Student data...");

  setTimeout(() => {
    const students = [
      { id: "1", name: "Eijkeyal", class: "Bachelor" },
      { id: "2", name: "John", class: "Bachelor" },
      { id: "3", name: "Hancy", class: "Bachelor" },
      { id: "4", name: "Kalu", class: "Bachelor" },
      { id: "5", name: "Cimona", class: "Bachelor" },
      { id: "6", name: "Ram", class: "Bachelor" },
      { id: "7", name: "Jessica", class: "Bachelor" },
    ];

    let foundStudent = null;

    for (let i = 0; i < students.length; i++) {
      if (students[i].id === studentId) {
        foundStudent = students[i];
        break;
      }
    }

    callback(foundStudent);
  }, 1000);
}
//functions getMarks
function getMarks(student, callback) {
  console.log(`Fetching marks for ${student.name}`);
  setTimeout(() => {
    let marks = [100, 10, 29, 40, 59, 60, 70];
    callback(marks);
  }, 1000);
}

//functions gradeCalculate
function calculateGrade(student, marks, callback) {
  console.log("Calculate Grade...");
  setTimeout(() => {
    let total = 0;
    //calculate total marks
    for (let i = 0; i < marks.length; i++) {
      total = marks[i] + total;
    }
    //calculate averages
    const average = total / marks.length;
    let grade;
    if (average >= 80) {
      console.log("Grade A");
    } else if (average >= 70) {
      console.log("Grade B");
    } else if (average >= 60) {
      console.log("Grade C");
    } else if (average >= 50) {
      console.log("Grade D");
    } else {
      console.log("You Failed the Exam");
    }
    const result = {
      student,
      marks,
      average,
      grade,
    };
    console.log(`Grade ${grade}`);
    console.log("Grade Calculatd");
    callback(result);
  }, 1000);
}
getStudent("1", (student) => {
  getMarks(student, (marks) => {
    calculateGrade(student, marks, (result) => {
      console.log(result);
    });
  });
});
