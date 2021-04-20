import { createSelector } from 'reselect';

const clinicSelector = clinics => clinics;

const filterArea = (areas, district, area) => {
  const districts = areas[area] || [];
  if (!districts.includes(district)) {
    districts.push(district);
  }
  return districts;
};

const filterConsultationType = (consultationTypes, consultationType) => {
  if (!consultationTypes.includes(consultationType)) {
    consultationTypes.push(consultationType);
  }
};

export default createSelector(
  clinicSelector,
  clinics => {
    const areas = {};
    const consultationTypes = [];
    clinics.forEach(clinic => {
      const { area, district, consultationType } = clinic;
      areas[area] = filterArea(areas, district, area);
      filterConsultationType(consultationTypes, consultationType);
    });
    return { areas, consultationTypes };
  },
);
