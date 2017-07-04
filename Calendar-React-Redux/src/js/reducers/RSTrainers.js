export  default function requestTrainers ( state = [], action) {
  switch (action.type){
    case 'RECEIVE_DATA_TRAINERS':
      return makeDB (action.payload);

    default: return state;
  }
}

function makeDB (data) {
  let dataBase = {};
  data.forEach(item => {
    let key = item.id;
    if(key in dataBase) {
      dataBase[key].push(item);
    }
    else{
      dataBase[key] = item;
    }
  });
  return dataBase;
}
