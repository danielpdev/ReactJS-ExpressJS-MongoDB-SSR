import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const ContestPreview = ({_id, categoryName, contestName, onClick}) => {
  const handleClick = () => {
    onClick(_id);
  };
  
  return (
    <div className="link ContestPreview" onClick={handleClick}>
      <div className="category-name">
        {categoryName}
      </div>
      <div className="contest-name">
        {contestName}
      </div>
    </div>
  );
};

ContestPreview.propTypes = {
  _id: PropTypes.string.isRequired,
  categoryName: PropTypes.string.isRequired,
  contestName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default ContestPreview;