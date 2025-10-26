import { getRecommendations } from './recommendations';
import { hospitals as mockHospitals } from '../data/hospitals';

// Mock the API fetch call
global.fetch = jest.fn();

// Mock the hospitals data
jest.mock('../data/hospitals', () => ({
  hospitals: [
    { name: 'Beta Hospital', departments: ['Cardiology'], queue: 'Medium' },
    { name: 'Alpha Hospital', departments: ['Cardiology'], queue: 'Medium' },
    { name: 'Gamma Hospital', departments: ['Cardiology'], queue: 'Low' },
  ],
}));

describe('getRecommendations', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should sort hospitals by queue priority and then by name on API fallback', async () => {
    // Simulate an API failure
    (fetch as jest.Mock).mockRejectedValue(new Error('API is down'));

    const result = await getRecommendations('chest pain');

    // Expecting Gamma (Low), then Alpha (Medium), then Beta (Medium)
    expect(result.hospitals.map(h => h.name)).toEqual([
      'Gamma Hospital',
      'Alpha Hospital',
      'Beta Hospital',
    ]);
    expect(result.aiConnected).toBe(false);
  });
});
