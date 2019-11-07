import api from '@/services/api';
import token from '@/utils/token';

export default {
  async getDesign() {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).get('/api/design/get');
  },
  async createDesign(design) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).post('/api/design/create', {
      design
    });
  },
  async updateDesign(design) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).put('/api/design/update', {
      design
    });
  },
  async deleteDesign(design) {
    const data = await token.checkToken();
    return api(data.id, data.accessToken).post('/api/design/delete', {
      design
    });
  }
};
