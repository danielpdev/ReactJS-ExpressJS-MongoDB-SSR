import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const Contest = ({_id, description, onClick, fetchNames, nameIds, lookupName, addName}) => {
  const [newName, setNewName] = useState('');
  useEffect(() => {
    fetchNames(nameIds)
  },[]);
  const handleSubmit = (ev) => {
    ev.preventDefault();
    addName(newName, _id);
  };
    return (
      <React.Fragment>
   <div className="Contest">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Contest Description</h3>
          </div>
          <div className="panel-body">
            <div className="contest-description">
              {description}
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Proposed Names</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {nameIds.map(nameId => {
                 return <li key={nameId} className="list-group-item">{lookupName(nameId)}</li>
              })};
            </ul>
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Propose a New Name</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={ev => handleSubmit(ev)}>
              <div className="input-group">
                <input type="text" text={newName} onChange={ev => setNewName(ev.target.value)} placeholder="New Name Here..." className="form-control" />
                <span className="input-group-btn">
                  <button type="submit"  className="btn btn-info">Sumbit</button>
                </span>
              </div>
            </form>
          </div>
        </div>

        <div className="home-link link"
             onClick={() => onClick()}>
          Contest List
        </div>
</div>    
      </React.Fragment>

 );
}; 
Contest.propTypes = {
  _id: PropTypes.string.isRequired,
  lookupName: PropTypes.func.isRequired,
  addName: PropTypes.func.isRequired
}
export default Contest;