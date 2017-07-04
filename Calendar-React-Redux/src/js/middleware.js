
export function middleware(store) {
  return function (next) {
    return function (action) {
      switch (action.type) {
        case 'LOAD_DATA': {
          fetch("http://128.199.53.150/events")
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              store.dispatch({
                type: 'RECEIVE_DATA_EVENTS',
                payload: data,
              });
            });
          fetch("http://128.199.53.150/trainers")
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              store.dispatch({
                type: 'RECEIVE_DATA_TRAINERS',
                payload: data,
              });
            })
            .catch((error) => {
              alert(error);
              throw new Error('Error with fetch');
            });
          break;
        }
      }
      return next(action);
    }
  }
}
