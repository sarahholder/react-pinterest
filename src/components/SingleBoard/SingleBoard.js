import React from 'react';
import PropTypes from 'prop-types';
import './SingleBoard.scss';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';
import PinForm from '../../components/PinForm/PinForm';

import Pin from '../Pin/Pin';

class SingleBoard extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    board: {},
    editPin: {},
    pins: [],
    formOpen: false,
  }

  getInfo = () => {
    const { boardId } = this.props;
    boardsData.getSingleBoard(boardId)
      .then((request) => {
        const board = request.data;
        this.setState({ board });
        pinsData.getPinsByBoardId(boardId)
          .then((pins) => this.setState({ pins }));
      })
      .catch((err) => console.error('unable to get single board:', err));
  }

  componentDidMount() {
    this.getInfo();
  }

  removePin = (pinId) => {
    pinsData.deletePin(pinId)
      .then(() => this.getInfo())
      .catch((err) => console.error('could not delete pin: ', err));
  }

  saveNewPin = (newPin) => {
    pinsData.savePin(newPin)
    .then(() => {
      this.getInfo();
      this.setState({ formOpen: false, editPin: {} });
    })
    .catch((err) => console.error('unable to update Pin: ', err));
  }

  putPin = (pinId, updatedPin) => {
    pinsData.updatePin(pinId, updatedPin)
      .then(() => {
        this.getInfo();
        this.setState({ formOpen: false, editPin: {} });
      })
      .catch((err) => console.error('unable to update pin', err));
  }

  editAPin = (pin) => {
    this.setState({ editPin: pin, formOpen: true });
  }
  
  render() {
    const { setSingleBoard, boardId} = this.props;
    const {
      board,
      pins,
      formOpen,
      editPin,
    } = this.state;

    const makePins = pins.map((p) => <Pin key={p.id} pin={p} removePin={this.removePin} editAPin={this.editAPin}/>);

    return (
      <div className="SingleBoard">
        <button className="btn btn-danger" onClick={() => { setSingleBoard(''); }}>X</button>
        <h2>{board.name} Board</h2>
        <h3>{board.description}</h3>
        <button className="btn btn-warning" onClick={() => this.setState({ formOpen: true })}><i className="fas fa-plus"> Pin</i></button>
        { formOpen ? <PinForm boardId={boardId} saveNewPin={this.saveNewPin} pin={editPin} putPin={this.putPin} /> : '' }
        <div className="d-flex flex-wrap">
          {makePins}
        </div>
      </div>
    );
  }
}

export default SingleBoard;