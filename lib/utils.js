const SIM_WIDTH = 500;

export const diff = (pos1, pos2, dir) => {

  let idx = dir === 'x' ? 0 : 1;

  if(Math.abs(pos2[idx] - pos1[idx]) > (SIM_WIDTH / 2)){
    if(pos2[idx] > (SIM_WIDTH / 2)){
      return (pos2[idx] - SIM_WIDTH) - pos1[idx];
    } else {
      return (SIM_WIDTH + pos2[idx]) - pos1[idx];
    }
  } else {
    return (pos2[idx] - pos1[idx]);
  }
};


export const dir = (pos1, pos2, dir) => {
  let idx = dir === 'x' ? 0 : 1;
  if(pos1[idx] < pos2[idx]){
    if((pos2[idx] - pos1[idx]) < (pos1[idx] + SIM_WIDTH - pos2[idx])){
      return 1;
    } else {
      return - 1;
    }
  } else {
    if((pos1[idx] - pos2[idx]) < (pos2[idx] + SIM_WIDTH - pos1[idx])){
      return -1;
    } else {
      return 1;
    }
  }
};


export const distance = (pos1, pos2) => {
  let xDiff = diff(pos1, pos2, 'x');
  let yDiff = diff(pos1, pos2, 'y');

  return Math.sqrt(Math.pow(xDiff, 2) + Math.pow(yDiff, 2));
}

export const findDirection = (pos1, pos2) => {
  let posDiff = [diff(pos1, pos2, 'x'), diff(pos1, pos2, 'y')];

  let xDir = dir(pos1, pos2, 'x');
  let yDir = dir(pos1, pos2, 'y');

  let magnitude = Math.pow(posDiff[0], 2) + Math.pow(posDiff[1], 2);
  return [xDir * Math.pow(posDiff[0], 2)/magnitude, yDir * Math.pow(posDiff[1], 2)/magnitude];
}
