import axios from 'axios';

class PersonService {
  create(personData) {
    console.log('Creating person')
    return axios.post('http://localhost:9000/people', personData)
      .then(function(response){
        const idValues = Object.values(response.data);
        const personValues = Object.values(personData);
        return idValues.concat(personValues);
      });
  }

  list() {
    console.log('Listing all people')
    return axios.get('http://localhost:9000/people')
      .then(function(response) {
        return response.data.map(row => Object.values(row));
      });
  }
}

export default PersonService;
