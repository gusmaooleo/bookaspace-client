---
to: src/components/<%= type %>/<%= h.changeCase.camel(name) %>/<%= name %>Component.tsx
---
import './index.css'

interface <%= name %>Props {
  value: any,
  method: () => void,
}

const <%= name %>Component = ({ value, method }: <%= name %>Props) => {
  return (
    <>
      <p><%= name %>Component works!</p>
    </>
  );
}

export default <%= name %>Component;

