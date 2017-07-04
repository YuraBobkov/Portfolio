export  default function requestEvents ( state = [], action) {
  switch (action.type){
    case 'RECEIVE_DATA_EVENTS':
      return makeDB (action.payload);

    default: return state;
  }
}

function makeDB (data) {
  let dataBase = {};
  data.forEach(item => {
    let itemsDate = new Date(item.start);
    let key = `${itemsDate.getFullYear()}-${itemsDate.getMonth()}-${itemsDate.getDate()}`;
    if(key in dataBase) {
      dataBase[key].push(item);
    }
    else{
      dataBase[key] = [item];
    }
  });
  return dataBase;
}
