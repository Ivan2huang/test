import { fetchData } from '../../../helpers/fetch';
import URL from '../../../helpers/url';

const sortHealthScoresHistory = healthScores => {
  return healthScores.sort((currentHealthScore, nextHealthScore) =>
    currentHealthScore.createdOn.localeCompare(nextHealthScore.createdOn),
  );
};

const getLifestyleHealthScoresHistory = async () => {
  const response = await fetchData(
    'GET',
    URL.lifestyleHealthScoresHistory,
    undefined,
    true,
  );
  if (response.error) return response;
  return sortHealthScoresHistory(response);
};

export default getLifestyleHealthScoresHistory;
