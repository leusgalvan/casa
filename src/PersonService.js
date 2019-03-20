import axios from 'axios';

class PersonService {
  create(personData) {
    console.log('Creating person');
    console.log(personData);
    return axios.post('http://localhost:9000/people', personData)
      .then(response => response.data);
  }

  list() {
    console.log('Listing all people')
    return axios.get('http://localhost:9000/people')
      .then(response => response.data);
  }

  delete(id) {
    console.log('Deleting person with id: ' + id);
    return axios.delete('http://localhost:9000/people/' + id)
      .then(function(response) {
        return id;
      });
  }

  update(personData) {
    console.log('Updating person')
    console.log(personData);
    return axios.put('http://localhost:9000/people/' + personData.id, personData)
      .then(response => response.data);
  }
}

export default PersonService;
