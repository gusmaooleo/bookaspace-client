---
to: src/pages/<%= h.changeCase.lower(name) %>/index.tsx
---
import './styles.css'

const <%= name %> = () => {
  return (
    <div className='page'>
      <p><%= name %> page works</p>
    </div>
  );
}

export default <%= name %>;


