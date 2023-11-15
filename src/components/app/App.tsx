import { Comunication } from '../comunication/comunication';
import { List } from '../list/list';
import './app.scss';

function App() {
  const quote = 'Una frase que dice alguien';
  return (
    <>
      <List></List>
      <Comunication quote={quote}></Comunication>
    </>
  );
}

export default App;
