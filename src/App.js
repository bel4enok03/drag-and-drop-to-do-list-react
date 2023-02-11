import './App.css';
import {useState} from "react";

function App() {
    const [boards, setBoards] = useState([{
        id: 1,
        title: 'Сделать',
        items: [{id: 1, title: 'Помыть посуду'}, {id: 2, title: 'Погулять с собакой'}, {
            id: 3,
            title: 'Помыть полы'
        }, {id: 4, title: 'Сходить в душ'}, {id: 5, title: 'Сходить в магазин'},]
    }, {
        id: 2,
        title: 'В процессе',
        items: [{id: 1, title: 'Посмотреть фильм'}, {id: 2, title: 'Посмотреть youtube'}, {id: 3, title: 'Поучиться'}]
    }, {
        id: 3, title: 'Готово', items: [{id: 1, title: 'Почитать книгу'}, {id: 2, title: 'Проверить почту'},]
    },]);

    const [currentBoard, setCurrentBoard] = useState(null);
    const [currentItem, setCurrentItem] = useState(null);

    function dragStartHandler(e, board, item) {
        setCurrentBoard(board);
        setCurrentItem(item);
    }

    function dragEndHandler(e) {
        e.target.style.boxShadow = 'none'
    }

    function dragOverHandler(e, board, item) {
        e.preventDefault()
        if (e.target.className === 'item') {
            e.target.style.boxShadow = '0 0 0 2px gray'
        }
    }

    function dropHandler(e, board, item) {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            if (b.id === board.id) {
                return board
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }


    function dropCardHandler(e, board) {
        board.items.push(currentItem)
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        setBoards(boards.map(b => {
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            if (b.id === board.id) {
                return board
            }
            return b
        }))
        e.target.style.boxShadow = 'none'
    }

    return (<div className='app'>
        {boards.map(board => <div
            className='board'
            onDragOver={(e) => dragOverHandler(e, board)}
            onDrop={(e) => dropCardHandler(e, board)}>
            <div className='board-title'>{board.title}</div>
            {board.items.map(item => <div
                className='item'
                draggable={true}
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragEndHandler(e)}
                onDragOver={(e) => dragOverHandler(e, board, item)}
                onDrop={(e) => dropHandler(e, board, item)}
            >{item.title}</div>)}
        </div>)};
    </div>);
}

export default App;
