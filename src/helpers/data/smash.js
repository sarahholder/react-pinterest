import boardsData from './boardsData';
import pinsData from './pinsData';

const completelyRemoveBoard = (boardId) => new Promise((resolve, reject) => {
  // 1.  delete the board
  boardsData.deleteBoard(boardId)
    .then(() => {
      // 2.  get all pins by boardId
      pinsData.getPinsByBoardId(boardId)
        .then((pins) => {
          // 3.  loop over the pins and delete each pinId
          pins.forEach((pin) => pinsData.deletePin(pin.id));
          resolve();
        });
    })
    .catch((err) => reject(err));
});

export default { completelyRemoveBoard };