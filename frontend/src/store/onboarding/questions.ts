export type PlacementQuestion = {
  id: string;
  category: string;
  prompt: string;
  code?: string;
  helper: string;
  answers: Array<{
    id: string;
    text: string;
    isCorrect: boolean;
  }>;
};

export const placementQuestions: PlacementQuestion[] = [
  {
    id: "q1",
    category: "Computer Science Fundamentals",
    prompt: "What will be the output of the following JavaScript execution block?",
    code: `const data = [1, 2, 3];
const result = data.reduce((acc, val) => {
  return acc + val;
}, 10);

console.log(result);`,
    helper:
      "Analyze the reduction function carefully, paying attention to the initial value provided as the second argument to the method.",
    answers: [
      { id: "a", text: "6", isCorrect: false },
      { id: "b", text: "16", isCorrect: true },
      { id: "c", text: "10", isCorrect: false },
      { id: "d", text: "undefined", isCorrect: false },
    ],
  },
  {
    id: "q2",
    category: "Computer Science Fundamentals",
    prompt: "Which data structure follows Last In, First Out behavior?",
    helper: "Think about the structure where the most recently added item is removed first.",
    answers: [
      { id: "a", text: "Queue", isCorrect: false },
      { id: "b", text: "Stack", isCorrect: true },
      { id: "c", text: "Graph", isCorrect: false },
      { id: "d", text: "Hash table", isCorrect: false },
    ],
  },
  {
    id: "q3",
    category: "JavaScript Fundamentals",
    prompt: "What does the === operator check in JavaScript?",
    helper: "Focus on both value and type comparison.",
    answers: [
      { id: "a", text: "Value only", isCorrect: false },
      { id: "b", text: "Type only", isCorrect: false },
      { id: "c", text: "Value and type", isCorrect: true },
      { id: "d", text: "Reference only", isCorrect: false },
    ],
  },
  {
    id: "q4",
    category: "Web Fundamentals",
    prompt: "Which HTTP method is typically used to create a new resource?",
    helper: "Choose the verb most commonly used for resource creation.",
    answers: [
      { id: "a", text: "GET", isCorrect: false },
      { id: "b", text: "POST", isCorrect: true },
      { id: "c", text: "DELETE", isCorrect: false },
      { id: "d", text: "HEAD", isCorrect: false },
    ],
  },
  {
    id: "q5",
    category: "Programming Logic",
    prompt: "What is the time complexity of binary search on a sorted array?",
    helper: "Each step halves the remaining search space.",
    answers: [
      { id: "a", text: "O(1)", isCorrect: false },
      { id: "b", text: "O(n)", isCorrect: false },
      { id: "c", text: "O(log n)", isCorrect: true },
      { id: "d", text: "O(n log n)", isCorrect: false },
    ],
  },
  {
    id: "q6",
    category: "Databases",
    prompt: "Which SQL clause filters rows before grouping?",
    helper: "HAVING filters after grouping; choose the clause before aggregation.",
    answers: [
      { id: "a", text: "WHERE", isCorrect: true },
      { id: "b", text: "GROUP BY", isCorrect: false },
      { id: "c", text: "ORDER BY", isCorrect: false },
      { id: "d", text: "HAVING", isCorrect: false },
    ],
  },
  {
    id: "q7",
    category: "React Fundamentals",
    prompt: "Which React hook is used to store local component state?",
    helper: "Pick the hook that returns a value and a setter.",
    answers: [
      { id: "a", text: "useEffect", isCorrect: false },
      { id: "b", text: "useMemo", isCorrect: false },
      { id: "c", text: "useState", isCorrect: true },
      { id: "d", text: "useRef", isCorrect: false },
    ],
  },
  {
    id: "q8",
    category: "Networking",
    prompt: "Which protocol is used to securely browse websites?",
    helper: "Look for HTTP with encryption.",
    answers: [
      { id: "a", text: "FTP", isCorrect: false },
      { id: "b", text: "SMTP", isCorrect: false },
      { id: "c", text: "HTTPS", isCorrect: true },
      { id: "d", text: "UDP", isCorrect: false },
    ],
  },
  {
    id: "q9",
    category: "Algorithms",
    prompt: "What does a hash function primarily produce?",
    helper: "It maps input data to a fixed representation used for lookup or integrity.",
    answers: [
      { id: "a", text: "A fixed-size value", isCorrect: true },
      { id: "b", text: "A sorted list", isCorrect: false },
      { id: "c", text: "A database row", isCorrect: false },
      { id: "d", text: "A UI component", isCorrect: false },
    ],
  },
  {
    id: "q10",
    category: "CSS Fundamentals",
    prompt: "Which CSS layout model is designed for one-dimensional layouts?",
    helper: "One axis at a time: row or column.",
    answers: [
      { id: "a", text: "Grid", isCorrect: false },
      { id: "b", text: "Flexbox", isCorrect: true },
      { id: "c", text: "Float", isCorrect: false },
      { id: "d", text: "Position fixed", isCorrect: false },
    ],
  },
  {
    id: "q11",
    category: "Python Fundamentals",
    prompt: "Which Python type is immutable?",
    helper: "Immutable values cannot be changed after creation.",
    answers: [
      { id: "a", text: "list", isCorrect: false },
      { id: "b", text: "dict", isCorrect: false },
      { id: "c", text: "tuple", isCorrect: true },
      { id: "d", text: "set", isCorrect: false },
    ],
  },
  {
    id: "q12",
    category: "Security Fundamentals",
    prompt: "What is the purpose of hashing passwords?",
    helper: "Stored passwords should not be recoverable as plain text.",
    answers: [
      { id: "a", text: "To compress them", isCorrect: false },
      { id: "b", text: "To store irreversible representations", isCorrect: true },
      { id: "c", text: "To make login faster only", isCorrect: false },
      { id: "d", text: "To send them by email", isCorrect: false },
    ],
  },
  {
    id: "q13",
    category: "Data Science",
    prompt: "Which metric is commonly used for classification accuracy?",
    helper: "It compares correct predictions against total predictions.",
    answers: [
      { id: "a", text: "Correct predictions / total predictions", isCorrect: true },
      { id: "b", text: "Total rows / total columns", isCorrect: false },
      { id: "c", text: "Model size / dataset size", isCorrect: false },
      { id: "d", text: "Epochs / features", isCorrect: false },
    ],
  },
  {
    id: "q14",
    category: "Mobile Fundamentals",
    prompt: "What does an API usually allow an app to do?",
    helper: "Think about communication between software systems.",
    answers: [
      { id: "a", text: "Communicate with another service", isCorrect: true },
      { id: "b", text: "Only change screen brightness", isCorrect: false },
      { id: "c", text: "Disable all network calls", isCorrect: false },
      { id: "d", text: "Replace the operating system", isCorrect: false },
    ],
  },
  {
    id: "q15",
    category: "Git Fundamentals",
    prompt: "Which command records staged changes in Git?",
    helper: "This creates a snapshot in the repository history.",
    answers: [
      { id: "a", text: "git push", isCorrect: false },
      { id: "b", text: "git commit", isCorrect: true },
      { id: "c", text: "git clone", isCorrect: false },
      { id: "d", text: "git status", isCorrect: false },
    ],
  },
  {
    id: "q16",
    category: "Operating Systems",
    prompt: "What is a process?",
    helper: "A process is a program while it is executing.",
    answers: [
      { id: "a", text: "A running program", isCorrect: true },
      { id: "b", text: "A CSS class", isCorrect: false },
      { id: "c", text: "A database column", isCorrect: false },
      { id: "d", text: "A network cable", isCorrect: false },
    ],
  },
  {
    id: "q17",
    category: "Software Design",
    prompt: "Why do developers use functions?",
    helper: "Functions help organize logic and avoid repeating code.",
    answers: [
      { id: "a", text: "To reuse and organize behavior", isCorrect: true },
      { id: "b", text: "To remove all variables", isCorrect: false },
      { id: "c", text: "To prevent testing", isCorrect: false },
      { id: "d", text: "To turn code into images", isCorrect: false },
    ],
  },
  {
    id: "q18",
    category: "Cloud Fundamentals",
    prompt: "What does deployment usually mean?",
    helper: "It makes software available to users or environments.",
    answers: [
      { id: "a", text: "Writing comments only", isCorrect: false },
      { id: "b", text: "Publishing software to run somewhere", isCorrect: true },
      { id: "c", text: "Deleting source code", isCorrect: false },
      { id: "d", text: "Changing font size", isCorrect: false },
    ],
  },
  {
    id: "q19",
    category: "Testing",
    prompt: "What is a unit test?",
    helper: "It checks a small, isolated piece of behavior.",
    answers: [
      { id: "a", text: "A test for an entire company", isCorrect: false },
      { id: "b", text: "A test for a small unit of code", isCorrect: true },
      { id: "c", text: "A visual color palette", isCorrect: false },
      { id: "d", text: "A deployment server", isCorrect: false },
    ],
  },
  {
    id: "q20",
    category: "Computer Science Fundamentals",
    prompt: "What is recursion?",
    helper: "A recursive solution calls itself with a smaller problem.",
    answers: [
      { id: "a", text: "A function calling itself", isCorrect: true },
      { id: "b", text: "A loop that never starts", isCorrect: false },
      { id: "c", text: "A database transaction", isCorrect: false },
      { id: "d", text: "A CSS selector", isCorrect: false },
    ],
  },
];
