
import { getRecommendations } from './recommendations';
import { hospitals } from '../data/hospitals';

// Mock the global fetch function to simulate API failure
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: false,
    json: () => Promise.resolve({}),
  })
) as jest.Mock;

describe('getRecommendations', () => {
  it('should sort hospitals by queue priority (Low > Medium > High) on API fallback', async () => {
    // Input symptoms that will trigger the fallback
    const userInput = 'chest pain';

    // Expected department from local mapping
    const expectedDepartment = 'Cardiology';

    // Get recommendations, which will use the fallback logic
    const { hospitals: recommendedHospitals, aiConnected } = await getRecommendations(userInput);

    // Filter the original hospitals list to get the expected order
    const expectedHospitals = hospitals
      .filter(h => h.departments.includes(expectedDepartment))
      .sort((a, b) => {
        const priority = { Low: 0, Medium: 1, High: 2 };
        if (priority[a.queue] !== priority[b.queue]) {
          return priority[a.queue] - priority[b.queue];
        }
        return a.name.localeCompare(b.name);
      });

    // Assert that the returned hospitals are sorted correctly
    expect(aiConnected).toBe(false);
    expect(recommendedHospitals.map(h => h.name)).toEqual(expectedHospitals.map(h => h.name));
  });
});
