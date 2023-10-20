

## Coders id TODO  👋

This guide provides a comprehensive overview of the project's schemas, controllers, routes, and middleware.

### Schemas

#### User Schema (`registerModel`)

Represents registered users in the system.

```javascript
const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

const registerModel = mongoose.model('registerModel', registerSchema);
```

- `firstname`: First name of the user.
- `lastname`: Last name of the user.
- `email`: Email address of the user (unique).
- `password`: Password for user authentication.

#### Todo Schema (`todoModel`)

Represents tasks or to-dos associated with registered users.

```javascript
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'registerModel', // Reference to the User model
  },
}, { timestamps: true });

const todoModel = mongoose.model('todoModel', todoSchema);
```

- `title`: Title of the todo (required).
- `description`: Description of the todo.
- `completed`: Boolean indicating whether the todo is completed (default is `false`).
- `user`: Reference to the User model.

### Controllers

#### User Controllers

- **User Registration (`registration`)**: `POST /register` - Registers a new user.
- **User Login (`login`)**: `POST /login` - Logs in an existing user.

#### Todo Controllers

- **Create Todo (`createTodo`)**: `POST /createTodo` - Creates a new todo for the authenticated user.
- **Get All Todos (`getAllTodos`)**: `GET /getAllTodos` - Retrieves all todos for the authenticated user.
- **Update Todo (`updateTodo`)**: `POST /updateTodo/:id` - Updates a todo identified by the provided `id` for the authenticated user.
- **Delete Todo (`deleteTodo`)**: `DELETE /deleteTodo/:id` - Deletes a todo identified by the provided `id` for the authenticated user.

### Middleware

- **JWT Verification Middleware (`verifyToken`)**: Middleware to verify JWT tokens for protected routes.

### Routes

#### User Routes

- **Registration**: `POST /register` - Controller: `registration`
- **Login**: `POST /login` - Controller: `login`

#### Todo Routes

- **Create Todo**: `POST /createTodo` - Middleware: `verifyToken`, Controller: `createTodo`
- **Get All Todos**: `GET /getAllTodos` - Middleware: `verifyToken`, Controller: `getAllTodos`
- **Update Todo**: `POST /updateTodo/:id` - Middleware: `verifyToken`, Controller: `updateTodo`
- **Delete Todo**: `DELETE /deleteTodo/:id` - Middleware: `verifyToken`, Controller: `deleteTodo`

---

 Happy coding! 🚀
