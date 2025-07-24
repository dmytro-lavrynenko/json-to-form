# JSON to Form Generator (React + TypeScript + Vite)

- Two tabs:
  - **Config** - for entering JSON input and viewing an example structure
  - **Result** - displays the generated form based on the JSON
- Supports multiple field types:
  - `string`, `numeric`, `multi-line`, `boolean`, `date`, `enum`
- Supports setting a title and custom text for Confirm and Cancel buttons
- JSON validation with error feedback
- Form submission and reset logic
- Input validation and error handling
- Covered with unit tests

## Tech Stack & Tools

| Tool / Library         | Purpose / Reason for Use                                      |
|------------------------|---------------------------------------------------------------|
| **React**              | Building reactive UI components                               |
| **TypeScript**         | Ensures type safety across the app                            |
| **Tailwind CSS**       | Utility-first styling for rapid UI development                |
| **shadcn/ui**          | Accessible pre-built components built on top of Radix UI      |
| **react-hook-form**    | Lightweight and performant form state management              |
| **Zod**                | Runtime validation and parsing of JSON form config            |
| **JSON5**              | Supports flexible, human-friendly JSON syntax                 |
| **React Context**      | For managing shared state (like parsed JSON and form methods) between tabs |
| **Vitest**             | Modern test runner, fast and Vite-native                      |
| **React Testing Library**    | Writing tests that reflect real user interactions 

## Design Considerations

The project is structured with future scalability and reusability in mind.  
By using **React Context**, **Tailwind CSS**, **shadcn/ui**, and **Zod**, the architecture enables clean state management, consistent styling, robust validation, and component-level modularity - all of which make it easy to extend the functionality later without major rewrites.

## Run project
```js
npm install
npm run dev
```

## Run test
```js
npm run test
```

## Run prettier
```js
npm run format
```
