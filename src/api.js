import axios from 'axios';

const fetchContest = id => 
  axios.get(`/api/contests/${id}`).then(resp => resp.data);

const fetchContests = () => 
  axios.get(`/api/contests`).then(resp => resp.data.contests);

const fetchNames = nameIds => 
  axios.get(`/api/names/${nameIds.join(',')}`).then(resp => resp.data.names);

const addName = (newName, contestId) => 
  axios.post('/api/names', { newName, contestId }).then(resp => resp.data);

export  default { fetchContest, fetchContests, fetchNames, addName };