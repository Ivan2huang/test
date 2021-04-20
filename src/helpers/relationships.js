export const CATEGORY_SPOUSE = 'spouse';
export const CATEGORY_CHILD = 'child';

export const GetDisplayRelationship = (relationship, formatMessage) => {
  if (!relationship) return '';

  const relationshipType = relationship
    .replace(/\s/g, '')
    .replace(/^\w/, char => char.toLowerCase());

  return formatMessage({
    id: `me.tabs.myDetails.relationship.${relationshipType}`,
    defaultMessage: relationship.split(/(?=[A-Z])/).join(' '),
  });
};

export const IsCategorySpouse = (relationshipCategory = '') => {
  return (
    relationshipCategory !== null &&
    relationshipCategory.toLowerCase() === CATEGORY_SPOUSE
  );
};

export const IsCategoryChild = (relationshipCategory = '') => {
  return (
    relationshipCategory !== null &&
    relationshipCategory.toLowerCase() === CATEGORY_CHILD
  );
};
