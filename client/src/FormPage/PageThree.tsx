/* eslint-disable react/jsx-props-no-spreading */
import {
  FormControl,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';
import React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { IReferral } from '../util/types/referral';

function getStyles(val: string, valArr: string[], theme: Theme) {
  return {
    fontWeight:
      valArr.indexOf(val) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  data: IReferral;
  setData: React.Dispatch<React.SetStateAction<IReferral>>;
}

const youthSchools = [
  'Achievement House Cyber Charter School',
  'Andrew Hamilton School',
  'Constitution High School',
  'Cristo Rey Philadelphia High School',
  'Diversified Community Services',
  'Feltonville School of Arts & Sciences',
  'Global Leadership Academy Charter School',
  'Harding Middle School',
  'High Road School of Philadelphia',
  'Hill Freeman World Academy',
  'KAPS Academy of Philadelphia',
  'Kensington Health Sciences Academy',
  'Kensington High School',
  'KIPP DuBois Collegiate Academy',
  'KIPP North Philadelphia Academy',
  'KIPP Philadelphia Elementary Academy',
  'KIPP Philadelphia Preparatory Academy',
  'KIPP West Philadelphia Elementary Academy',
  'KIPP West Philadelphia Preparatory Charter School',
  'Martin Luther King High School',
  'Master Charter School - Harrity Elementary',
  'Mastery Charter School - Gratz High School',
  'Mastery Charter School - Hardy High School',
  'Mastery Charter School - Lenfest Campus',
  'Mastery Charter School - Pickett Campus',
  'Mastery Charter School - Thomas Campus',
  'Northwood Academy Charter School',
  'Philadelphia Charter School for Arts & Sciences',
  'Philadelphia Millitary Academy',
  'Philadelphia Performing Arts Charter School - East',
  'Philadelphia Performing Arts Charter School - Vine',
  'Philadelphia Performing Arts Charter School - West',
  'Philadelphia Virtual Academy',
  'Roxborough High School',
  'St. Katharine Drexel School',
  'Strawberry Mansion High School',
  'TECH Freire Charter School',
  'Vaux Big Picture High School',
];

const youthGrade = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  'Post Secondary',
  'NA',
];

const survivorGender = [
  'Female (woman/girl)',
  'Male (man/boy)',
  'Non-binary/non-conforming',
  'Transgender',
  'Other',
  'Unknown',
];

const survivorRace = [
  'American Indian or Alaska Native',
  'Asian',
  'African American or Black',
  'Hispanic or Latinx',
  'Native Hawaiian or Other Pacific Islander',
  'White',
  'Other',
  'Unknown',
];

const preferedContactMethod = ['Call', 'Text', 'Email'];

const relationshipToVictim = [
  'Self',
  'Acquaintance',
  'Adoptive parent',
  'Aunt/Uncle',
  'Boy/girlfriend',
  'Child',
  'Cousin',
  'Ex-boy/girlfriend',
  'Ex-partner',
  'Ex-spouse',
  'Friend',
  'Grandparent',
  'Niece/nephew',
  'Other (please explain below)',
  'Other Relative (please explain below)',
  'Parent (biological or unspecified)',
  'Partner',
  'Sibling',
  'Spouse',
  'Step-child',
  'Step-parent',
  'Stranger',
];

const guardianMainContact = ['Yes', 'No'];

export default function PageThree({ data, setData }: Props) {
  const theme = useTheme();
  const [survivorDOB, setsurvivorDOB] = React.useState<Dayjs | null>();

  let otherGenderInput;
  if (data.survivorGender && data.survivorGender.indexOf('Other') >= 0) {
    otherGenderInput = (
      <span>
        <FormControl required sx={{ m: 1, minWidth: 240 }}>
          <TextField
            value={data.survivorGenderOther}
            id="outlined-basic"
            variant="outlined"
            label="Please Specify Gender"
            onChange={(event) =>
              setData({
                ...data,
                survivorGenderOther: event.target.value,
              })
            }
          />
        </FormControl>
      </span>
    );
  }

  let otherRaceInput;
  if (data.survivorRace && data.survivorRace.indexOf('Other') >= 0) {
    otherRaceInput = (
      <span>
        <FormControl required sx={{ m: 1, minWidth: 240 }}>
          <TextField
            value={data.survivorRaceOther}
            id="outlined-basic"
            variant="outlined"
            label="Please Specify Race"
            onChange={(event) =>
              setData({
                ...data,
                survivorRaceOther: event.target.value,
              })
            }
          />
        </FormControl>
      </span>
    );
  }

  let relationshipToVictimExplained;
  if (
    data.relationshipToVictim &&
    data.relationshipToVictim.indexOf('Other') >= 0
  ) {
    relationshipToVictimExplained = (
      <div>
        <FormControl required sx={{ m: 1, minWidth: 860 }}>
          <TextField
            value={data.relationshipToVictimOther}
            id="outlined-basic"
            variant="outlined"
            label="Please Specify Relationship to Victim"
            onChange={(event) =>
              setData({
                ...data,
                relationshipToVictimOther: event.target.value,
              })
            }
          />
        </FormControl>
      </div>
    );
  }

  let guardianRelationshipExplained;
  if (
    data.guardianRelationship &&
    data.guardianRelationship.indexOf('Other') >= 0
  ) {
    guardianRelationshipExplained = (
      <div>
        <FormControl required sx={{ m: 1, minWidth: 860 }}>
          <TextField
            value={data.guardianRelationshipOther}
            id="outlined-basic"
            variant="outlined"
            label="Please Specify Relationship of Adult to Youth"
            onChange={(event) =>
              setData({
                ...data,
                guardianRelationshipOther: event.target.value,
              })
            }
          />
        </FormControl>
      </div>
    );
  }

  let youthGradeInput;
  if (data.survivorSchoolOrCommunitySite) {
    youthGradeInput = (
      <span>
        <FormControl sx={{ m: 1, minWidth: 240 }}>
          <InputLabel id="demo-simple-select-label">
            Grade Survivor/Victim Is In
          </InputLabel>
          <Select
            value={data.survivorGrade}
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            label="Grade Youth Is In"
            onChange={(event) =>
              setData({
                ...data,
                survivorGrade: event.target.value as string,
              })
            }
          >
            {youthGrade.map((val) => (
              <MenuItem
                key={val}
                value={val}
                style={getStyles(val, youthGrade, theme)}
              >
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </span>
    );
  }

  let youthQuestions;
  if (data.survivorAge && data.survivorAge <= 22) {
    youthQuestions = (
      <div>
        {/* What School Or Community Based Site does Survivor Attend? */}
        <FormControl sx={{ m: 1, minWidth: 480 }}>
          <InputLabel id="demo-simple-select-label">
            School or Community-Based Site Survivor/Victim Attends
          </InputLabel>
          <Select
            value={data.survivorSchoolOrCommunitySite}
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            label="School/Community-Based Site Youth Attends"
            onChange={(event) =>
              setData({
                ...data,
                survivorSchoolOrCommunitySite: event.target.value as string,
              })
            }
          >
            {youthSchools.map((val) => (
              <MenuItem
                key={val}
                value={val}
                style={getStyles(val, youthSchools, theme)}
              >
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {youthGradeInput}
      </div>
    );
  }

  let homicideQuestions;
  console.log(data.crimeType);
  if (data.crimeType.includes('Homicide')) {
    homicideQuestions = (
      <div>
        <FormControl required sx={{ m: 1, minWidth: 420 }}>
          <TextField
            value={data.survivorAddress}
            id="outlined-basic"
            variant="outlined"
            label="Name of Victim"
            onChange={(event) =>
              setData({ ...data, survivorAddress: event.target.value })
            }
          />
        </FormControl>
        <FormControl required sx={{ m: 1, minWidth: 240 }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            value={data.victimGender}
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            label="Gender of Victim"
            onChange={(event) =>
              setData({
                ...data,
                victimGender: event.target.value as string,
              })
            }
          >
            {survivorGender.map((val) => (
              <MenuItem
                key={val}
                value={val}
                style={getStyles(val, survivorGender, theme)}
              >
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

  let contactQuestions;
  if (data.isGuardianResponsible) {
    contactQuestions = (
      <div>
        <div>
          <FormControl required sx={{ m: 1, minWidth: 420 }}>
            <TextField
              value={data.guardianName}
              id="outlined-basic"
              variant="outlined"
              label="Name of Adult"
              onChange={(event) =>
                setData({ ...data, guardianName: event.target.value })
              }
            />
          </FormControl>

          <FormControl required sx={{ m: 1, minWidth: 420 }}>
            <InputLabel id="demo-simple-select-label">
              Relationship of Adult to Youth Being Referred
            </InputLabel>
            <Select
              value={data.guardianRelationship}
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              label="Relationship of Adult to Youth Being Referred"
              onChange={(event) =>
                setData({
                  ...data,
                  guardianRelationship: event.target.value as string,
                })
              }
            >
              {relationshipToVictim
                .filter((val) => val !== 'Self')
                .map((val) => (
                  <MenuItem
                    key={val}
                    value={val}
                    style={getStyles(val, relationshipToVictim, theme)}
                  >
                    {val}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          {/* guardianRelationshipExplained */}
          {guardianRelationshipExplained}
        </div>
        <div>
          {/* survivorAddress */}
          <FormControl required sx={{ m: 1, minWidth: 420 }}>
            <TextField
              value={data.guardianAddress}
              id="outlined-basic"
              variant="outlined"
              label="Address (Adult)"
              onChange={(event) =>
                setData({ ...data, guardianAddress: event.target.value })
              }
            />
          </FormControl>

          {/* <FormControl required sx={{ m: 1, minWidth: 240 }}>
            <TextField
              value={data.guardianAddress}
              id="outlined-basic"
              variant="outlined"
              label="City (Adult)"
              onChange={(event) =>
                setData({ ...data, guardianAddress: event.target.value })
              }
            />
          </FormControl>

          <FormControl required sx={{ m: 1, minWidth: 30 }}>
            <TextField
              value={data.guardianAddress}
              id="outlined-basic"
              variant="outlined"
              label="State (Adult)"
              onChange={(event) =>
                setData({ ...data, guardianAddress: event.target.value })
              }
            />
          </FormControl> */}

          {/* <FormControl required sx={{ m: 1, minWidth: 60 }}>
            <TextField
              id="outlined-number"
              label="Zip Code (Adult)"
              type="number"
              onChange={(event) =>
                setData({ ...data, guardianAddress: event.target.value })
              }
            />
          </FormControl> */}

          <div>
            {/* guardianPhone */}
            <FormControl required sx={{ m: 1, minWidth: 240 }}>
              <TextField
                value={data.guardianPhone}
                id="outlined-number"
                label="Phone Number (Adult)"
                type="number"
                onChange={(event) =>
                  setData({ ...data, guardianPhone: event.target.value })
                }
              />
            </FormControl>

            {/* guardianEmail */}
            <FormControl required sx={{ m: 1, minWidth: 360 }}>
              <TextField
                value={data.guardianEmail}
                id="outlined-basic"
                variant="outlined"
                label="Email Address (Adult)"
                onChange={(event) => {
                  setData({ ...data, guardianEmail: event.target.value });
                }}
              />
            </FormControl>

            {/* guardianPreferredContactMethod */}
            <FormControl required sx={{ m: 1, width: 240 }}>
              <InputLabel id="demo-multiple-name-label">
                Preferred Contact Method
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={
                  data.guardianPreferredContactMethod
                    ? data.guardianPreferredContactMethod.split(', ')
                    : []
                }
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;
                  setData({
                    ...data,
                    guardianPreferredContactMethod: Array.isArray(value)
                      ? value.join(', ')
                      : value,
                  });
                }}
                input={
                  <OutlinedInput label="Preferred Contact Method(s)  (Adult)" />
                }
              >
                {preferedContactMethod.map((val) => (
                  <MenuItem
                    key={val}
                    value={val}
                    style={getStyles(val, preferedContactMethod, theme)}
                  >
                    {val}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    );
  } else {
    contactQuestions = (
      <div>
        {/* survivorPhoneNumber */}
        <FormControl required sx={{ m: 1, minWidth: 240 }}>
          <TextField
            value={data.survivorPhoneNumber}
            id="outlined-number"
            label="Phone Number"
            type="number"
            onChange={(event) =>
              setData({ ...data, survivorPhoneNumber: event.target.value })
            }
          />
        </FormControl>

        {/* survivorEmail */}
        <FormControl required sx={{ m: 1, minWidth: 360 }}>
          <TextField
            value={data.survivorEmailAddress}
            id="outlined-basic"
            variant="outlined"
            label="Email Address"
            onChange={(event) =>
              setData({ ...data, survivorEmailAddress: event.target.value })
            }
          />
        </FormControl>

        {/* survivorPreferredContactMethod */}
        <FormControl sx={{ m: 1, width: 240 }}>
          <InputLabel id="demo-multiple-name-label">
            Preferred Contact Method
          </InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple
            value={
              data.survivorPreferredContactMethod
                ? data.survivorPreferredContactMethod.split(', ')
                : []
            }
            onChange={(event) => {
              const {
                target: { value },
              } = event;
              setData({
                ...data,
                survivorPreferredContactMethod: Array.isArray(value)
                  ? value.join(', ')
                  : value,
              });
            }}
            input={<OutlinedInput label="Preferred Contact Method" />}
          >
            {preferedContactMethod.map((val) => (
              <MenuItem
                key={val}
                value={val}
                style={getStyles(val, preferedContactMethod, theme)}
              >
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }

  return (
    <div>
      {/* survivorName */}
      <FormControl required sx={{ m: 1, minWidth: 420 }}>
        <TextField
          value={data.survivorName}
          id="outlined-basic"
          variant="outlined"
          label="Name of Person Being Referred"
          onChange={(event) =>
            setData({ ...data, survivorName: event.target.value })
          }
        />
      </FormControl>

      {/* relationship to victim of crime/violence */}
      <FormControl required sx={{ m: 1, minWidth: 420 }}>
        <InputLabel id="demo-simple-select-label">
          Relationship To Victim
        </InputLabel>
        <Select
          value={data.relationshipToVictim}
          labelId="demo-simple-select-label"
          id="demo-simple-select-label"
          label="Relationship to Victim"
          onChange={(event) =>
            setData({
              ...data,
              relationshipToVictim: event.target.value as string,
            })
          }
        >
          {relationshipToVictim.map((val) => (
            <MenuItem
              key={val}
              value={val}
              style={getStyles(val, relationshipToVictim, theme)}
            >
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* relationshipToVictimExplained */}
      {relationshipToVictimExplained}

      <div>
        {/* survivorDOB */}
        <FormControl sx={{ m: 1 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date of Birth"
              value={survivorDOB}
              onChange={(newValue: Dayjs | null) => {
                setsurvivorDOB(newValue);
              }}
            />
          </LocalizationProvider>
        </FormControl>

        {/* survivorAge */}
        <FormControl required sx={{ m: 1, minWidth: 60 }}>
          <TextField
            value={data.survivorAge}
            id="outlined-number"
            label="Age"
            type="number"
            onChange={(event) =>
              setData({
                ...data,
                survivorAge: parseInt(event.target.value as string, 10),
              })
            }
          />
        </FormControl>
      </div>

      {/* youthQuestions */}
      {youthQuestions}

      {/* preferredLanguage */}
      <FormControl required sx={{ m: 1, minWidth: 420 }}>
        <TextField
          value={data.primaryLanguage}
          id="outlined-basic"
          variant="outlined"
          label="Preferred Language"
          onChange={(event) =>
            setData({ ...data, primaryLanguage: event.target.value })
          }
        />
      </FormControl>

      <div>
        {/* survivorGender */}
        <FormControl required sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            value={data.survivorGender}
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            label="Gender"
            onChange={(event) =>
              setData({
                ...data,
                survivorGender: event.target.value as string,
              })
            }
          >
            {survivorGender.map((val) => (
              <MenuItem
                key={val}
                value={val}
                style={getStyles(val, survivorGender, theme)}
              >
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* otherGenderInput */}
        {otherGenderInput}

        {/* survivorRace */}
        <FormControl required sx={{ m: 1, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-label">Race/Ethnicity</InputLabel>
          <Select
            value={data.survivorRace}
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            label="Race/Ethnicity"
            onChange={(event) =>
              setData({
                ...data,
                survivorRace: event.target.value as string,
              })
            }
          >
            {survivorRace.map((val) => (
              <MenuItem
                key={val}
                value={val}
                style={getStyles(val, survivorRace, theme)}
              >
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* otherRaceInput */}
        {otherRaceInput}
      </div>

      {/* survivorAddress */}
      <FormControl required sx={{ m: 1, minWidth: 420 }}>
        <TextField
          value={data.survivorAddress}
          id="outlined-basic"
          variant="outlined"
          label="Survivor Address"
          onChange={(event) =>
            setData({ ...data, survivorAddress: event.target.value })
          }
        />
      </FormControl>

      {/* <FormControl required sx={{ m: 1, minWidth: 240 }}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="City"
          onChange={(event) =>
            setData({ ...data, survivorAddress: event.target.value })
          }
        />
      </FormControl>

      <FormControl required sx={{ m: 1, minWidth: 30 }}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="State"
          onChange={(event) =>
            setData({ ...data, survivorAddress: event.target.value })
          }
        />
      </FormControl>

      <FormControl required sx={{ m: 1, minWidth: 60 }}>
        <TextField
          id="outlined-number"
          label="Zip Code"
          type="number"
          onChange={(event) =>
            setData({ ...data, survivorAddress: event.target.value })
          }
        />
      </FormControl> */}

      {/* is parent/responsible adult the main contact */}
      <div>
        <FormControl required sx={{ m: 1, minWidth: 600 }}>
          <InputLabel id="demo-simple-select-label">
            Is a parent/responsible adult the main contact for the
            survivor/victim?
          </InputLabel>
          <Select
            value={data.isGuardianResponsible ? 'Yes' : 'No'}
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            label="Is Adult The Main Contact For The Youth? "
            onChange={(event) => {
              const val: string = event.target.value as string;
              setData({
                ...data,
                isGuardianResponsible: val.includes('Yes'),
              });
            }}
          >
            {guardianMainContact.map((val) => (
              <MenuItem
                key={val}
                value={val}
                style={getStyles(val, guardianMainContact, theme)}
              >
                {val}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      {contactQuestions}

      {homicideQuestions}

      {/* additional info */}
      <FormControl required sx={{ m: 1, minWidth: 1000 }}>
        <TextField
          value={data.notesFromOrg}
          id="outlined-basic"
          variant="outlined"
          label="Any additional information we should know about?"
          onChange={(event) =>
            setData({ ...data, notesFromOrg: event.target.value })
          }
        />
      </FormControl>
    </div>
  );
}
