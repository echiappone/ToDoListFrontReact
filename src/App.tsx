import { useState, useEffect } from 'react';
import * as Styled from './App.styles';
import { Item } from './types/Item';
import { ListItem } from './components/ListItem';
import { AddArea } from './components/AddArea';


const App = () => {

  const todoList = [
    { id: 1, name: 'Comprar o mortadela na padaria', done: false },
    { id: 2, name: 'Comprar o pão na padaria', done: false },
    { id: 3, name: 'Comprar o queijo na padaria', done: false },
    { id: 4, name: 'Comprar o maionese na padaria', done: false },
    { id: 5, name: 'Comprar o tomate na padaria', done: true },
    { id: 6, name: 'Comprar um bolo na padaria', done: true },
    { id: 7, name: 'Teste', done: true },
  ]
  const [list, setList] = useState<Item[]>(todoList);
  const [filteredList, setFilteredList] = useState<Item[]>(todoList)

  useEffect(() => setFilteredList(list), [list])
  useEffect(() => setFilteredList(filteredList), [filteredList])

  const handleAddTask = (taskName: string) => {
    let newList = [...list];
    newList.push({
      id: list.length + 1,
      name: taskName,
      done: false
    });
    setList(newList);
  }

  const handleTaskChange = (id: number, done: boolean) => {
    let newList = [...list];
    for (let i in newList) {
      if (newList[i].id === id) {
        newList[i].done = done;
      }
    }
    setList(newList);
  }

  const filterDone = () => {
    let filtered = list.filter((item) => item.done === true)
    setFilteredList(filtered)
  }
  
  const filterAll = () => {
    setFilteredList(list)
  }

  const filterNotDone = () => {
    let filtered = list.filter((item) => item.done === false)
    setFilteredList(filtered)
  }

  const handleChange = (event: any) => {
    switch (event.target.value) {
      case 'all':
        filterAll()
        break;
      case 'done':
        filterDone()
        break;
      case 'notdone':
        filterNotDone()
        break;

      default:
        break;
    }
  };

  function orderList(lista: Array<Item>, order: 'aZ' | 'zA') : Item[] {
    let newList = lista.sort(function (a, b) {
      var nameA = a.name.toUpperCase();
      var nameB = b.name.toUpperCase();
      if (nameA < nameB) {
        return order === 'aZ' ? -1 : 1;
      }
      if (nameA > nameB) {
        return order === 'zA' ? 1 : -1;
      }
      return 0;      
    });

    return newList;
  }

  const handleListOrder = (event: any) => {
    setFilteredList([] as Item[]);
    let value = event.target.value;  
    const sortedList = orderList(list, value);
    console.log(sortedList[0])
    setTimeout(() => {      
      setFilteredList(sortedList);
    }, 0);
  };

  const handleBusca = (taskName: string) => {
    console.log(taskName)
  };

  return (
    <Styled.Container>
      <Styled.Area>
        <Styled.Header>
          Lista de Tarefas
        </Styled.Header>

        <Styled.Bar>
          <AddArea onEnter={handleAddTask} onClicked={handleAddTask} onChangeBuscar={handleBusca} />
          <Styled.BarContainer>
            <Styled.Select onChange={handleListOrder}>
              <option value="aZ">
                A-Z
              </option>
              <option value="Za">
                Z-A
              </option>
            </Styled.Select>
            <Styled.Select onChange={handleChange}>
              <option value="all">
                Todos
              </option>
              <option value="done">Realizados</option>
              <option value="notdone">Nao realizados</option>
            </Styled.Select>
          </Styled.BarContainer>
        </Styled.Bar>
      
        {filteredList.map((item, index) => (
          <ListItem
            key={index}
            item={item}
            onChange={handleTaskChange}
          />
        ))}

      </Styled.Area>
    </Styled.Container>
  );
}

export default App;