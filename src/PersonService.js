import axios from 'axios';

class PersonService {
  create(personData) {
    console.log('Creating person')
    return axios.post('http://localhost:9000/people', personData)
  }
}

export default PersonService;
