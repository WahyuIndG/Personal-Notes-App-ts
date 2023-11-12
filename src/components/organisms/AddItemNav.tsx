import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { BriefText } from '../atoms';
import { descAddItemNav } from '../../utils/transcript-data';

const AddItemNav = () => {
  return (
    <div className="add-item">
      <Link to={'/add'}>
        <FiPlus />
        <BriefText>{descAddItemNav}</BriefText>
      </Link>
    </div>
  );
};

export default AddItemNav;
