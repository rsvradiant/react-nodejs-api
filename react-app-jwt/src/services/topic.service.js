import axios from "axios";
import authHeader from './auth-header';

const API_URL = '/api/wellnesstopics';

class TopicService {

  getTopicsData() {
    return axios.get(API_URL , { headers: authHeader() });
  }
}

export default new TopicService();

