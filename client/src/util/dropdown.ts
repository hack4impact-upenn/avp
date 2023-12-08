// eslint-disable-next-line import/no-named-as-default
import IReferral from './types/referral';

export const genderDropdown = [
  'Female (woman/girl)',
  'Male (man/boy)',
  'Non-binary/non-conforming',
  'Transgender',
  'Gender Fluid',
  'Other',
  'Unknown',
];

export const raceDropdown = [
  'American Indian or Alaska Native',
  'Asian',
  'African American or Black',
  'Hispanic or Latinx',
  'Native Hawaiian or Other Pacific Islander',
  'White',
  'Other',
  'Unknown',
];

export const handleFormChange = (
  data: any,
  setData: any,
  event: any,
  field: keyof IReferral,
  isString = false,
) => {
  // console.log(event, field, data);
  const {
    target: { value },
  } = event;
  if (isString) {
    setData({
      ...data,
      [field]: value,
    });
  } else {
    setData({
      ...data,
      [field]: value.join(', ') as string,
    });
  }
  // console.log(data);
};
