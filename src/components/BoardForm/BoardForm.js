import React from 'react';
import PropTypes from 'prop-types';

import './BoardForm';
import authData from '../../helpers/data/authData';

class BoardForm extends React.Component {
  static propTypes = {
    saveNewBoard: PropTypes.func.isRequired,
    putBoard: PropTypes.func.isRequired,
    board: PropTypes.object.isRequired,
  }

  state = {
    boardName: '',
    boardDescription: '',
    isEditing: false,
  }

  componentDidMount() {
    const { board } = this.props;
    if (board.name) {
      this.setState({ boardName: board.name, boardDescription: board.description, isEditing: true });
    }
  }

  saveBoard = (e) => {
    e.preventDefault();
    const { boardDescription, boardName } = this.state;
    const { saveNewBoard } = this.props;
    const newBoard = {
      description: boardDescription,
      name: boardName,
      uid: authData.getUid(),
    };
    saveNewBoard(newBoard);
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ boardDescription: e.target.value });
  }

  updateBoard = (e) => {
    e.preventDefault();
    const { board, putBoard }  = this.props;
    const { boardDescription, boardName } = this.state;
    const updatedBoard = {
      description: boardDescription,
      name: boardName,
      uid: authData.getUid(),
    }
    putBoard(board.id, updatedBoard);
  }

  render() {
    const { boardName, boardDescription, isEditing } = this.state;

    return (
      <div className="BoardForm">
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="board-name">Name</label>
            <input
              type="text"
              className="form-control"
              id="board-name"
              placeholder="Jim"
              value={boardName}
              onChange={this.nameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="board-description">Description</label>
            <input
              type="text"
              className="form-control"
              id="board-description"
              placeholder="really nice description"
              value={boardDescription}
              onChange={this.descriptionChange}
            />
          </div>
          { isEditing 
            ? <button className="btn btn-dark" onClick={this.updateBoard}>Update Board</button>
          : <button className="btn btn-dark" onClick={this.saveBoard}>Save Board</button>}
        </form>
      </div>
    );
  }
}

export default BoardForm;
