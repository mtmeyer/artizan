# Artizan

### Tiny CSS in JS library focusing on CSS custom properties for theming

```javascript
import { css } from "artizan";

const buttonStyles = css`
    background-color: red;
    border-radius: 4px;
    cursor: pointer

    &:hover {
      background-color: aqua;
    }
  `;

return <button className={buttonStyles}>A button</button>;
```
