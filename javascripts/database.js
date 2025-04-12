let database = {
    students: {
        col: ["id", "name", "age", "grade"],
        rows: [
          [1, "Amit", 20, "A"],
          [2, "Neha", 21, "B"],
          [3, "Ravi", 19, "A"],
          [4, "Simran", 22, "C"],
          [5, "Karan", 20, "B"],
          [6, "Priya", 21, "A"],
          [7, "Aditya", 23, "C"],
          [8, "Sneha", 18, "B"],
          [9, "Vivek", 20, "A"],
          [10, "Anjali", 22, "C"],
          [11, "Harsh", 21, "B"],
          [12, "Divya", 19, "A"]
        ]
      }
      ,

      books: {
        col: ["isbn", "title", "author", "price"],
        rows: [
          ["978-123", "Learn JS", "John Doe", 499],
          ["978-456", "Master CSS", "Jane Smith", 299],
          ["978-789", "HTML Pro", "Alice", 399],
          ["978-101", "React Made Easy", "Tom Kent", 599],
          ["978-102", "Node.js Basics", "Nina Brown", 499],
          ["978-103", "MongoDB 101", "Rick Chan", 349],
          ["978-104", "Tailwind Guide", "Ella Rose", 299],
          ["978-105", "Vue for All", "Mark Zane", 399],
          ["978-106", "Next.js Pro", "Lea Dale", 549],
          ["978-107", "Python for Web", "Alan Poe", 459],
          ["978-108", "AI Essentials", "David Kim", 699]
        ]
      }
      ,

      employees: {
        col: ["empId", "name", "role", "salary"],
        rows: [
          [101, "Raj", "Developer", 50000],
          [102, "Meena", "Designer", 45000],
          [103, "Vikram", "Tester", 40000],
          [104, "Nisha", "Manager", 70000],
          [105, "Tushar", "Developer", 52000],
          [106, "Reena", "HR", 35000],
          [107, "Sameer", "Analyst", 48000],
          [108, "Pooja", "Developer", 51000],
          [109, "Deepak", "Designer", 43000],
          [110, "Alok", "Tester", 39000],
          [111, "Isha", "Manager", 72000]
        ]
      }
      ,

    orders: {
        col: ["orderId", "product", "quantity", "orderDate"],
        rows: [
            [1, "Laptop", 2, "2024-12-01"],
            [2, "Mouse", 10, "2024-12-03"],
            [3, "Keyboard", 5, "2024-12-05"]
        ]
    }
};


// Whole database is a object of tabels and each table has  cols and rows , cols will store columns in an array , rows will store rows array in array