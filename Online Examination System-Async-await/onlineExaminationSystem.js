function login(username, password) {
  return new Promise((resolve, reject) => {
    console.log("Logging in...");
    setTimeout(() => {
      if (!username || !password) {
        reject(new Error("Username and password required!"));
        return;
      }
      if (password.length < 4) {
        reject(new Error("Password must be at least 4 Characters!"));
        return;
      }
      const student = {
        id: "STU" + Math.floor(Math.random() * 10000),
        name: username,
        email: `${username}@university.edu`,
        department: "Computer Science",
        year: "3rd Year",
      };
      console.log(`Welcome ${student.name}!`);
      resolve(student);
    }, 1500);
  });
}

//function verify student
function verifyStudent(student) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isEligible = Math.random() > 0.1;
      if (!isEligible) {
        reject(
          new Error("Student not eligible! fee Pending or attendance issue."),
        );
        return;
      }
      const alreadyTaken = Math.random() > 0.8;
      if (alreadyTaken) {
        reject(new Error("Student has already taken this exam!"));
        return;
      }
      const verifiedStudent = {
        ...student,
        verified: true,
        examId: "EXAM" + Date.now(),
        start: new Date().toISOString(),
      };
      console.log(`Verification Successful!`);
      resolve(verifiedStudent);
    }, 1200);
  });
}

//function loadQuestions
function loadQuestions(student) {
  return new Promise((resolve, reject) => {
    console.log("Loading questions....");
    setTimeout(() => {
      const questions = [
        {
          id: 1,
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          correct: 1,
          marks: 2,
        },
        {
          id: 2,
          question: "Which data structure uses LIFO?",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correct: 1,
          marks: 2,
        },
        {
          id: 3,
          question: "What is the output of '2' + '2' in JavaScript?",
          options: ["4", "22", "Error", "undefined"],
          correct: 1,
          marks: 2,
        },
        {
          id: 4,
          question:
            "Which keyword is used to declare a constant in JavaScript?",
          options: ["let", "var", "const", "constant"],
          correct: 2,
          marks: 2,
        },
        {
          id: 5,
          question: "What does CSS stand for?",
          options: [
            "Cascading Style Sheets",
            "Creative Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets",
          ],
          correct: 0,
          marks: 2,
        },
      ];
      console.log(`Loaded ${questions.length} questions!`);
      resolve({
        student: student,
        questions: questions,
        totalMarks: questions.reduce((sum, q) => sum + q.marks, 0),
        duration: 30,
      });
    }, 2000);
  });
}

//function submit answers
function submitAnswers(examData) {
  return new Promise((resolve, reject) => {
    console.log("Submitting Answers...");
    setTimeout(() => {
      const { student, questions } = examData;
      const answers = questions.map((q, index) => {
        const answerIndex =
          Math.random() > 0.7
            ? Math.floor(Math.random() * q.options.length)
            : q.correct;
        return {
          questionId: q.id,
          selected: answerIndex,
          correct: answerIndex === q.correct,
          marks: answerIndex === q.correct ? q.marks : 0,
        };
      });
      const score = answers.reduce((sum, a) => sum + a.marks, 0);
      const total = questions.reduce((sum, q) => sum + q.marks, 0);
      const percentage = (score / total) * 100;
      const submission = {
        student: student,
        answers: answers,
        score: score,
        totalMarks: total,
        percentage: percentage.toFixed(2),
        status: "Submitted",
        submittedAt: new Date().toISOString(),
      };
      console.log(`Answers submitted Successfully! score: ${score}/${total}`);
      resolve(submission);
    }, 1000);
  });
}
//function generateResult
function generateResult(submission) {
  return new Promise((resolve, reject) => {
    console.log("Generating Report");
    setTimeout(() => {
      const { student, score, totalMarks, percentage } = submission;
      let grade;
      let remark;
      if (percentage >= 90) {
        grade = "A+";
        remark = "Excellent! Outsranding Performance!";
      } else if (percentage >= 80) {
        grade = "A";
        remark = "Very Good! Great effort";
      } else if (percentage >= 70) {
        grade = "B";
        remark = "Good! Keep improving!";
      } else if (percentage >= 60) {
        grade = "C";
        remark = "Satisfactory. Need more Pratice!";
      } else if (percentage >= 50) {
        grade = "D";
        remark = "Below Average. Please work Harder";
      } else {
        grade = "F";
        remark = "Failed. Please retake the exam!";
      }
      const result = {
        student: student,
        score: score,
        totalMarks: totalMarks,
        percentage: percentage,
        grade: grade,
        remark: remark,
        resultId: "RES" + Date.now(),
        generatedAt: new Date().toISOString(),
      };
      console.log(`Result generated! Grade: ${grade}`);
      resolve(result);
    }, 1500);
  });
}
async function conductExam(username, password) {
  console.log("ONLINE EXAMINATION SYSTEM");
  console.log("=".repeat(60));
  console.log(new Date().toLocaleString());
  console.log("=".repeat(60));

  try {
    console.log("\nStep 1: Login");
    const student = await login(username, password);

    console.log("\nStep 2: Verification");
    const verifiedStudent = await verifyStudent(student);

    console.log("\nStep 3: Loading Exam");
    const examData = await loadQuestions(verifiedStudent);

    console.log(`Duration: ${examData.duration} minutes`);
    console.log(`Total Questions: ${examData.questions.length}`);
    console.log(`Total Marks: ${examData.totalMarks}`);

    console.log("\nStep 4: Taking Exam");
    console.log("Student is answering questions...");
    await new Promise((resolve) => setTimeout(resolve, 3000));

    console.log("\nStep 5: Submission");
    const submission = await submitAnswers(examData);

    console.log("\nStep 6: Result Generation");
    const result = await generateResult(submission);

    console.log("\n" + "=".repeat(60));
    console.log("EXAM COMPLETED SUCCESSFULLY");
    console.log("=".repeat(60));
    console.log(`Student: ${result.student.name}`);
    console.log(`ID: ${result.student.id}`);
    console.log(`Department: ${result.student.department}`);
    console.log(`Email: ${result.student.email}`);
    console.log("=".repeat(60));
    console.log(`Score: ${result.score}/${result.totalMarks}`);
    console.log(`Percentage: ${result.percentage}%`);
    console.log(`Grade: ${result.grade}`);
    console.log(`Remark: ${result.remark}`);
    console.log(`Result ID: ${result.resultId}`);
    console.log(
      `Generated at: ${new Date(result.generatedAt).toLocaleString()}`,
    );
    console.log("=".repeat(60));
    console.log("Thank you for using the Online Examination System!");
    console.log("=".repeat(60));

    return result;
  } catch (error) {
    console.error("\n" + "=".repeat(30));
    console.error("ERROR:", error.message);
    console.error("=".repeat(30));
    console.log("Please contact the examination department for assistance.");
    console.log("=".repeat(60));
    throw error;
  } finally {
    console.log("\nSession ended. Please logout.");
    console.log("Your session has been secured.");
    console.log("=".repeat(60));
  }
}

conductExam("Eijkeyal", "1234")
  .then((result) => {
    console.log("\nResult saved to database.");
    console.log("Result sent to student's email.");
  })
  .catch((error) => {
    console.log("\nExamination failed:", error.message);
  });

async function testScenarios() {
  console.log("\nRUNNING TEST SCENARIOS\n");

  const scenarios = [
    { username: "Alice", password: "1234", desc: "Valid Student" },
    { username: "", password: "1234", desc: "Empty Username" },
    { username: "Bob", password: "12", desc: "Short Password" },
    { username: "Charlie", password: "1234", desc: "Ineligible Student" },
  ];

  for (let scenario of scenarios) {
    console.log(`\nTEST: ${scenario.desc}`);
    console.log("=".repeat(40));

    try {
      await conductExam(scenario.username, scenario.password);
    } catch (error) {
      console.log(error.message);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}
conductExam("Eijkeyal", "1234")
  .then((result) => {
    console.log("\nResult saved to database.");
    console.log("Result sent to student's email.");
  })
  .catch((error) => {
    console.log("\nExamination failed:", error.message);
  });

async function testScenarios() {
  console.log("\nRUNNING TEST SCENARIOS\n");

  const scenarios = [
    { username: "Alice", password: "1234", desc: "Valid Student" },
    { username: "", password: "1234", desc: "Empty Username" },
    { username: "Bob", password: "12", desc: "Short Password" },
    { username: "Charlie", password: "1234", desc: "Ineligible Student" },
  ];

  for (const scenario of scenarios) {
    console.log(`\nTEST: ${scenario.desc}`);
    console.log("=".repeat(40));

    try {
      await conductExam(scenario.username, scenario.password);
    } catch (error) {
      console.log("Error:", error.message);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

testScenarios();
