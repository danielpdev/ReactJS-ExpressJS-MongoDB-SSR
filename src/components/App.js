import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';
import ContestList from './ContestList';
import Contest from './Contest';
import api from './../api';
import PropTypes from 'prop-types';

const pushState = (obj, url) => {
  window.history.pushState(obj, '', url);
}

const App = (props) => {
  const [contests, setContests] = useState(props.initialData.contests);
  const [names, setNames] = useState(props.initialData.names);
  const [currentContestId, setCurrentContestId] = useState(props.initialData.currentContestId || null);
  const fetchContest = (contestId) => {
    pushState({
        currentContestId: contestId,
      },
      `/contest/${contestId}`
    )
    api.fetchContest(contestId).then(contest => {
      setCurrentContestId(contest._id);
      setContests({...contests, [contest._id] : contest});
    })
    
  };
  const addName = (newName, contestId) => {
    api.addName(newName, contestId).then(resp => {
      setNames({...names, [resp.newName._id]: resp.newName});
      setContests({...contests, [resp.updatedContest._id]: resp.updatedContest});
    });
  };
  const fetchContests = () => {
    pushState({
        currentContestId: null,
      },
      `/`
    )
    api.fetchContests().then(contests => {
      setCurrentContestId(null);
      setContests({...contests});
    })
  };
  useEffect(() => {
    window.onpopstate = (ev) => {
      if (ev.state && ev.state.currentContestId){
        setCurrentContestId(ev.state.currentContestId);
      }
      else {
        setCurrentContestId(null);
      }
    };
    return () => window.onpopstate = null;
  }, []);
  const fetchNames = (nameIds) => {
    if(nameIds.length === 0)
      return;
    api.fetchNames(nameIds).then(names => {
      setNames(names);
    });
  };
  
  const lookupName = (nameId) => {
    if(!names)
      return <div>...</div>;
    return names[nameId].name;
  };
  const pageHeader = () => {
    if (currentContestId)
      return contests[currentContestId].contestName
    return "Some contest name";
  }
  
  const currentContest = () => { return {...contests[currentContestId]} };
  
  const currentContent = () => {
    if (currentContestId) {
      return <Contest {...currentContest()} addName={addName} lookupName={lookupName} fetchNames={fetchNames} onClick={fetchContests}/>
    }
    return <ContestList onContestClick={fetchContest} contests={contests}/>;
  };

  return (
    <div className="App">
      <Header message={pageHeader()}/>
      {currentContent()}
    </div>
  );
};

App.propTypes = {
  initialData: PropTypes.object.isRequired
}

export default App;