UI Components Library

A reusable set of modern UI components built with React, TypeScript, TailwindCSS, Framer Motion, and documented using Storybook.
This project currently includes a DataTable and an InputField component with flexible configurations and animations.

🚀 Features
✅ InputField

Variants: outlined, filled, ghost

Sizes: sm, md, lg

States: disabled, invalid, clearable, password toggle

Animated error and helper messages

Smooth transitions with Framer Motion

✅ DataTable

Configurable columns and rows

Sorting (asc/desc) by column

Row selection with checkboxes

Loading state (skeleton shimmer)

Empty state with animation

Built-in animations for table rows (Framer Motion)

📦 Tech Stack

React 18 + TypeScript

TailwindCSS for styling

Framer Motion for animations

Storybook for documentation & isolated development

classnames for conditional styling

⚙️ Installation & Setup
1. Clone Repository
git clone https://github.com/your-username/ui-components.git
cd ui-components

2. Install Dependencies
npm install
# or
yarn install

3. Run Storybook
npm run storybook
# or
yarn storybook


Storybook will start at http://localhost:6006/

4. Run in Development Mode
npm start
# or
yarn start

📖 Usage
InputField Example
import { InputField } from "./components/InputField";

export function Example() {
  return (
    <InputField
      label="Email"
      placeholder="Enter your email"
      helperText="We'll never share your email"
      invalid={false}
      clearable
      passwordToggle
    />
  );
}

DataTable Example
import { DataTable, Column } from "./components/DataTable";

interface User {
  id: number;
  name: string;
  age: number;
}

const data: User[] = [
  { id: 1, name: "Alice", age: 24 },
  { id: 2, name: "Bob", age: 30 },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

export function Example() {
  return (
    <DataTable<User>
      data={data}
      columns={columns}
      selectable
      onRowSelect={(rows) => console.log("Selected rows:", rows)}
    />
  );
}

🛠️ Approach

Component Design – Built reusable, type-safe React components with generics for flexibility.

Styling – Used TailwindCSS utility classes for consistency and rapid UI development.

Animations – Integrated Framer Motion for smooth enter/exit transitions (loading, empty state, error messages, row rendering).

Storybook Integration – Documented each component with stories showcasing different states and configurations.

Accessibility – Included aria-* attributes, disabled states, and semantic HTML elements.

📚 Storybook

All components are documented in Storybook with interactive props and states.
You can explore them locally by running:

npm run storybook

