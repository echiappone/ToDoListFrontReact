import styled from 'styled-components';

type ContainerProps = {
    done: boolean;
}
export const Item = styled.div`
display: flex;
align-items: center;
`
export const ItemActions = styled.div`
display: flex;
align-items: center;
gap: 10px;
`
export const Container = styled.div(({ done }: ContainerProps) =>(
    `
    display: flex;
    justify-content: space-between;
    background-color: #20212C;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    align-items: center;
    gap: 5px;
    input {
        width: 25px;
        height: 25px;
        margin-right: 5px;
    }

    label {
        color: #CCC;
        text-decoration: ${done ? 'line-through' : 'initial'};
    }
`
));