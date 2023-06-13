import { useState, KeyboardEvent, useEffect } from 'react';
import * as C from './styles';

type Props = {
    onEnter: (taskName: string) => void
    onClicked: (taskName: string) => void
    onChangeBuscar: (taskName: string) => void
}

export const AddArea = ({ onEnter, onClicked, onChangeBuscar }: Props) => {
    const [inputText, setInputText] = useState('');
    const [inputBusca, setInputBusca] = useState('');
    const [timeoutId, setTimeoutId] = useState<number | undefined>(undefined);

    const handleKeyUp = (e: KeyboardEvent) => {
        if (e.code === 'Enter' && inputText !== '') {
            onEnter(inputText);
            setInputText('');
        }
    }
    const handleClick = () => {
        if (inputText.length > 0) {
            onClicked(inputText)
        }
    }

    const handleBusca  = (event: string) => {
        setInputBusca(event);

        if (timeoutId !== null) {
            clearTimeout(timeoutId); // Cancela o agendamento anterior
          }
      
          const newTimeoutId = window.setTimeout(() => {            
            onChangeBuscar(inputBusca);            
          }, 1000);
      
          setTimeoutId(newTimeoutId);
    }

  useEffect(() => {
    clearTimeout(timeoutId);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [timeoutId]);

    return (
        <>
            <C.Container>
                <>
                    <div className="image" onClick={handleClick}>➕</div>
                    <input
                        type="text"
                        placeholder="Adicione uma tarefa"
                        value={inputText}
                        onChange={e => setInputText(e.target.value)}
                        onKeyUp={handleKeyUp}
                    />
                </>
            </C.Container>
            <C.Container>
                <>  
                    <input
                        type="text"
                        placeholder="Buscar Tarefa"
                        value={inputBusca}
                        onChange={e => handleBusca(e.target.value)}
                        onKeyUp={handleKeyUp}
                    />
                </>
            </C.Container>
        </>
    );
}