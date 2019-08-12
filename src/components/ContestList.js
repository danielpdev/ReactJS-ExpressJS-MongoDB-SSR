import React from 'react';
import ContestPreview from './ContestPreview';
import PropTypes from 'prop-types';

const ContestList = ({contests, onContestClick}) => {
  return (<div>
      {Object.values(contests).map(contest => {
        return <ContestPreview onClick={onContestClick} key={contest._id} {...contest} />
      })}
      </div>
  );
}

ContestList.proptypes = {
  contests: PropTypes.object,
  onContestClick: PropTypes.func.isRequired
};

export default ContestList;