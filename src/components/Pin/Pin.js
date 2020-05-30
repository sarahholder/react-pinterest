  
import React from 'react';
import PropTypes from 'prop-types';
import pinShape from '../../helpers/propz/pinShape';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
    removePin: PropTypes.func.isRequired,
    editAPin: PropTypes.func.isRequired,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { pin, removePin } = this.props;
    removePin(pin.id);
  }

  editPinEvent = (e) => {
    e.preventDefault();
    const { pin, editAPin } = this.props;
    editAPin(pin);
  }

  render() {
    const { pin } = this.props;

    return (
      <div className="Pin col-3">
        <div className="card">
          <img className="card-img-top" src={pin.imageUrl} alt="pin" />
          <div className="card-body">
            <h5 className="card-title">{pin.title}</h5>
            <button className="btn btn-danger" onClick={this.deletePinEvent}><i className="fas fa-dumpster"></i></button>
            <button className="btn btn-warning" onClick={this.editPinEvent}><i className="fas fa-pencil-alt"></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pin;