export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizResult {
  score: number;
  passed: boolean;
  correctAnswers: number;
  totalQuestions: number;
}

export const PASSING_SCORE = 50;

export const getMockQuizQuestions = (trackId: string): QuizQuestion[] => {
  if (trackId === "ai-data-science") {
    return [
      {
        id: "ai-q1",
        question: "What is the main goal of data cleaning?",
        options: [
          "To make data ready for analysis",
          "To delete all rows",
          "To make charts only",
          "To change the programming language",
        ],
        correctAnswer: "To make data ready for analysis",
      },
      {
        id: "ai-q2",
        question: "Mean, median, and variance are related to which topic?",
        options: ["HTML", "Statistics", "Routing", "Authentication"],
        correctAnswer: "Statistics",
      },
      {
        id: "ai-q3",
        question:
          "In machine learning, features are used to help the model learn patterns.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
      {
        id: "ai-q4",
        question: "Python dictionaries store data as:",
        options: [
          "Key-value pairs",
          "Only images",
          "Only CSS styles",
          "HTML tags",
        ],
        correctAnswer: "Key-value pairs",
      },
    ];
  }

  if (trackId === "mobile-development") {
    return [
      {
        id: "mobile-q1",
        question: "Mobile-first design means starting with which screen size?",
        options: ["Small screens", "Large TVs", "Projectors", "Printers"],
        correctAnswer: "Small screens",
      },
      {
        id: "mobile-q2",
        question: "React Native is used to build mobile app interfaces.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
      {
        id: "mobile-q3",
        question: "Navigation in mobile apps helps users move between:",
        options: ["Screens", "Fonts only", "Colors only", "Files only"],
        correctAnswer: "Screens",
      },
      {
        id: "mobile-q4",
        question:
          "Local storage is useful for saving small data on the device.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
    ];
  }

  if (trackId === "cybersecurity") {
    return [
      {
        id: "cyber-q1",
        question: "Ports and protocols are part of networking basics.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
      {
        id: "cyber-q2",
        question: "OWASP focuses on common security risks, especially in:",
        options: ["Web applications", "Cooking", "Video editing", "Typography"],
        correctAnswer: "Web applications",
      },
      {
        id: "cyber-q3",
        question: "Authentication is related to checking user identity.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
      {
        id: "cyber-q4",
        question: "Logs can help detect suspicious activity.",
        options: ["True", "False"],
        correctAnswer: "True",
      },
    ];
  }

  return [
    {
      id: "web-q1",
      question: "HTML is mainly used for:",
      options: [
        "Page structure",
        "Database hosting",
        "Operating systems",
        "Image compression",
      ],
      correctAnswer: "Page structure",
    },
    {
      id: "web-q2",
      question: "CSS is used to style web pages.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
    {
      id: "web-q3",
      question: "Flexbox and Grid are used for:",
      options: ["Layout", "Authentication", "Databases", "Audio editing"],
      correctAnswer: "Layout",
    },
    {
      id: "web-q4",
      question: "React components help build reusable UI parts.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
  ];
};