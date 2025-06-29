# NOXUI

NOXUI is a modern, customizable React component library designed to accelerate UI development with a consistent, accessible, and beautiful set of components.

---

## ✨ Features

- **Rich Component Set:** Buttons, Inputs, Modals, Tables, Forms, Notifications, and more.
- **Customizable:** Easily style and theme components to fit your brand.
- **Accessible:** Built with accessibility best practices.
- **TypeScript Support:** Fully typed for a great developer experience.
- **Storybook Integration:** Interactive documentation and examples.

---

## 📦 Installation

```bash
npm install noxui
# or
yarn add noxui
```

---

## 🚀 Usage

Import components as needed in your React project:

```jsx
import { Button, Input, Modal, Notification } from 'noxui';

function App() {
  return (
    <div>
      <Button>Click Me</Button>
      <Input placeholder="Type here..." />
      {/* ...other components */}
    </div>
  );
}
```

---

## 🧩 Components

### Button
```jsx
import { Button } from 'noxui';

<Button type="primary" onClick={handleClick}>Primary Button</Button>
```

### Input
```jsx
import { Input } from 'noxui';

<Input placeholder="Enter text" />
```

### Checkbox
```jsx
import { Checkbox } from 'noxui';

<Checkbox label="Accept Terms" />
```

### Radio
```jsx
import { Radio } from 'noxui';

<Radio label="Option 1" />
```

### Select
```jsx
import { Select } from 'noxui';

<Select options={[{ label: 'One', value: 1 }]} />
```

### DateInput
```jsx
import { DateInput } from 'noxui';

<DateInput />
```


### Drawer
```jsx
import { Drawer } from 'noxui';

<Drawer open={isDrawerOpen} onClose={closeDrawer}>Drawer Content</Drawer>
```

### Notification
```jsx
import { useNotification } from 'noxui';

const { NotificationComponent, triggerNotification } = useNotification();

triggerNotification({
  type: 'success',
  message: 'Operation successful!',
  duration: 3000,
});
```

### Table
```jsx
import { Table } from 'noxui';

<Table columns={columns} data={data} />
```

### Tag
```jsx
import { Tag } from 'noxui';

<Tag color="blue">Info</Tag>
```

### TextArea
```jsx
import { TextArea } from 'noxui';

<TextArea placeholder="Type your message..." />
```

### Grid
```jsx
import { Grid, Row, Col } from 'noxui';

<Grid>
  <Row>
    <Col span={12}>Left</Col>
    <Col span={12}>Right</Col>
  </Row>
</Grid>
```

### Icon
```jsx
import { Icon } from 'noxui';

<Icon name="down-outlined" />
```

---

## 📚 Storybook

To explore all components interactively, run:

```bash
npm run storybook
```

---

## 🛠️ Customization & Theming

NOXUI supports easy customization via CSS variables and custom class names. You can override styles in your own CSS or extend components as needed.

---

## 🧑‍💻 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgements

- Built with [React](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/).
