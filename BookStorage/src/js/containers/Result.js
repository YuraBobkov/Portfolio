import React from 'react';
import Modal from '../components/Modal';

import Item from './Item';

const Result = props => {
  if (!props.data.length) {
    return null;
  }
  return (
    <div className="result">
      {props.data.map( elem => <Item elem={elem} key={elem._id} />)}
      <Modal />
    </div>
  );
};
export default Result;
