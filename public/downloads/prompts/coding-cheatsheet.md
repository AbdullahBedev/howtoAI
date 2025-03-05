# AI Coding Assistant Prompt Engineering Cheat Sheet

A comprehensive guide to optimizing prompts for code generation, debugging, and software development

## Code Generation Best Practices

### Specify Requirements Clearly
Be explicit about what you need:

```
Create a React component that:
1. Displays a paginated table of user data
2. Allows sorting by any column
3. Includes a search function that filters across all fields
4. Is responsive and works on mobile devices
5. Uses TypeScript with proper type definitions
6. Follows accessibility best practices
```

### Define Context and Dependencies
Provide information about your environment:

```
I'm working with:
- Next.js 14 with App Router
- TypeScript 5.2
- Tailwind CSS for styling
- React Query for data fetching
- PostgreSQL database

Please create a user authentication system with login, registration, and password reset functionality.
```

### Request Code Style and Patterns
Specify your preferred coding style:

```
Please write the code following these guidelines:
- Use functional components with hooks, not class components
- Follow the container/presentational pattern
- Use named exports instead of default exports
- Include JSDoc comments for functions
- Follow the Airbnb style guide for JavaScript
```

## Debugging and Code Improvement

### Error Troubleshooting
When sharing errors, provide:

```
I'm getting the following error:
```
TypeError: Cannot read property 'map' of undefined
    at UserList (UserList.tsx:15)
    at RenderComponent (react-dom.development.js:16685)
```

Here's my UserList component:
```jsx
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}
```

What's causing this error and how can I fix it?
```

### Code Review Requests
Ask for specific feedback:

```
Please review this authentication middleware code for:
1. Security vulnerabilities
2. Performance issues
3. Error handling improvements
4. Best practices compliance
5. Edge cases I might have missed

```javascript
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
```
```

### Refactoring Guidance
Be specific about refactoring goals:

```
I need to refactor this function to:
1. Improve readability
2. Reduce complexity
3. Make it more testable
4. Handle errors properly
5. Follow SOLID principles

```javascript
function processUserData(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].active === true) {
      let user = {
        id: data[i].id,
        name: data[i].firstName + ' ' + data[i].lastName,
        email: data[i].email
      };
      if (data[i].role === 'admin') {
        user.permissions = ['read', 'write', 'delete'];
      } else if (data[i].role === 'editor') {
        user.permissions = ['read', 'write'];
      } else {
        user.permissions = ['read'];
      }
      result.push(user);
    }
  }
  return result;
}
```
```

## Advanced Techniques

### Step-by-Step Implementation
Break down complex tasks:

```
I need to implement a file upload feature with progress tracking. Please guide me through:

1. First, show me how to set up the basic file input component
2. Then, add drag-and-drop functionality
3. Next, implement the upload logic with progress tracking
4. Finally, add error handling and success feedback

For each step, explain the code and any important considerations.
```

### Architecture Design
Ask for high-level guidance:

```
I'm building a real-time collaborative document editor. Please help me design the architecture by:

1. Suggesting the appropriate tech stack
2. Outlining the main components and their responsibilities
3. Explaining how to handle real-time synchronization
4. Addressing potential scalability challenges
5. Recommending data structures for efficient conflict resolution

Please include diagrams or pseudo-code where helpful.
```

### Testing Strategy
Request testing approaches:

```
I've created this user authentication service:

```typescript
class AuthService {
  async login(email: string, password: string): Promise<User | null> {
    // implementation
  }
  
  async register(userData: UserRegistrationData): Promise<User> {
    // implementation
  }
  
  async verifyEmail(token: string): Promise<boolean> {
    // implementation
  }
  
  async resetPassword(email: string): Promise<boolean> {
    // implementation
  }
}
```

Please help me create:
1. Unit tests for each method
2. Integration tests for the authentication flow
3. Mock strategies for external dependencies
4. Edge case scenarios I should test
```

## Language-Specific Tips

### JavaScript/TypeScript
```
Please implement this feature using modern JavaScript:
- Use ES6+ syntax (arrow functions, destructuring, etc.)
- Implement proper error handling with try/catch
- Use async/await for asynchronous operations
- Include TypeScript interfaces for all data structures
- Add appropriate JSDoc comments
```

### Python
```
Please write this utility in Python following these guidelines:
- Compatible with Python 3.9+
- Follow PEP 8 style guidelines
- Use type hints for all functions and parameters
- Include docstrings in Google style format
- Implement proper error handling with custom exceptions
- Write the code to be easily testable
```

### SQL
```
I need a SQL query that:
- Retrieves user activity data joined with user profiles
- Filters for activities in the last 30 days
- Groups by activity type
- Calculates average time spent per activity
- Orders results by most time spent
- Optimizes for performance on large datasets
```

---

© 2024 How-to-AI. All rights reserved.
For educational purposes only. Updated as of March 2024. 