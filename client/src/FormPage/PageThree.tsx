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

function getStyles(val: string, valArr: string[], theme: Theme) {
  return {
    fontWeight:
      valArr.indexOf(val) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface Props {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
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
  const [survivorDOB, setsurvivorDOB] = React.useState<Dayjs | null>(
    dayjs('2000-01-01T00:00:00'),
  );

  let youthQuestions;
  if (data.survivorAge <= 22) {
    youthQuestions = (
      <div>
        {/* What School Or Community Based Site does Survivor Attend? */}
        <FormControl sx={{ marginBottom: 2, marginRight: 2, minWidth: 480 }}>
          <InputLabel id="demo-simple-select-label">
            School/Community-Based Site Youth Attends
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            label="School/Community-Based Site Youth Attends"
            onChange={(event) =>
              setData({
                ...data,
                survivorSchoolOrCommunitySite: event.target.value,
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

        {/* What Grade is the Surivor In? */}
        <FormControl sx={{ marginBottom: 2, minWidth: 240 }}>
          <InputLabel id="demo-simple-select-label">
            Grade Youth Is In
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            label="Grade Youth Is In"
            onChange={(event) =>
              setData({
                ...data,
                survivorGrade: event.target.value,
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
      </div>
    );
  }

  let notSelfQuestions;
  if (data.relationshipToVictim !== 'Self') {
    notSelfQuestions = (
      <div>
        <FormControl sx={{ marginBottom: 2, marginRight: 2, minWidth: 420 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Name of Victim"
            onChange={(event) =>
              setData({ ...data, survivorAddress: event.target.value })
            }
          />
        </FormControl>
        <FormControl sx={{ marginBottom: 2, marginRight: 2, minWidth: 420 }}>
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Age of Victim"
            onChange={(event) =>
              setData({ ...data, survivorAddress: event.target.value })
            }
          />
        </FormControl>
        <FormControl sx={{ marginBottom: 2, minWidth: 240 }}>
          <InputLabel id="demo-simple-select-label">
            Gender of Victim
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            label="Gender of Victim"
            onChange={(event) =>
              setData({
                ...data,
                victimGender: event.target.value,
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
            {/* TODO: add new textbox for input for 'Other' option */}
          </Select>
        </FormControl>
      </div>
    );
  }

  let youthContactQuestions;
  if (data.survivorAge <= 18) {
    youthContactQuestions = (
      <div>
        <div>
          <FormControl sx={{ marginBottom: 2, marginRight: 2, minWidth: 240 }}>
            <InputLabel id="demo-simple-select-label">
              Is Adult The Main Contact For The Youth?
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              label="Is Adult The Main Contact For The Youth? "
              onChange={(event) =>
                setData({
                  ...data,
                  isGuardianResponsible: event.target.value,
                })
              }
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

          <FormControl sx={{ marginBottom: 2, minWidth: 420 }}>
            <InputLabel id="demo-simple-select-label">
              Relationship of Adult to Youth Being Referred
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select-label"
              label="Relationship of Adult to Youth Being Referred"
              onChange={(event) =>
                setData({
                  ...data,
                  guardianRelationship: event.target.value,
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
              {/* TODO: add new textbox for input for 'Other' option */}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl sx={{ marginBottom: 2, marginRight: 2, minWidth: 420 }}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Name of Adult"
              onChange={(event) =>
                setData({ ...data, guardianName: event.target.value })
              }
            />
          </FormControl>
        </div>
        <div>
          {/* survivorAddress */}
          <FormControl
            required
            sx={{ marginBottom: 2, marginRight: 2, minWidth: 420 }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Street Address (Adult)"
              onChange={(event) =>
                setData({ ...data, guardianAddress: event.target.value })
              }
            />
          </FormControl>

          <FormControl
            required
            sx={{ marginBottom: 2, marginRight: 2, minWidth: 240 }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="City (Adult)"
              onChange={(event) =>
                setData({ ...data, guardianAddress: event.target.value })
              }
            />
          </FormControl>

          <FormControl
            required
            sx={{ marginBottom: 2, marginRight: 2, minWidth: 30 }}
          >
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="State (Adult)"
              onChange={(event) =>
                setData({ ...data, guardianAddress: event.target.value })
              }
            />
          </FormControl>

          <FormControl
            required
            sx={{ marginBottom: 2, marginRight: 2, minWidth: 60 }}
          >
            <TextField
              id="outlined-number"
              label="Zip Code (Adult)"
              type="number"
              onChange={(event) =>
                setData({ ...data, guardianAddress: event.target.value })
              }
            />
          </FormControl>

          <div>
            {/* guardianPhone */}
            <FormControl
              required
              sx={{ marginBottom: 2, marginRight: 2, minWidth: 240 }}
            >
              <TextField
                id="outlined-number"
                label="Phone Number (Adult)"
                type="number"
                onChange={(event) =>
                  setData({ ...data, guardianPhone: event.target.value })
                }
              />
            </FormControl>

            {/* guardianEmail */}
            <FormControl
              required
              sx={{ marginBottom: 2, marginRight: 2, minWidth: 360 }}
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Email Address (Adult)"
                onChange={(event) =>
                  setData({ ...data, guardianEmail: event.target.value })
                }
              />
            </FormControl>

            {/* guardianPreferredContactMethod */}
            <FormControl sx={{ width: 240 }}>
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
                    guardianPreferredContactMethod: value.join(', '),
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
  }

  return (
    <div>
      {/* survivorName */}
      <FormControl sx={{ marginBottom: 2, marginRight: 2, minWidth: 420 }}>
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Name of Person Being Referred"
          onChange={(event) =>
            setData({ ...data, survivorName: event.target.value })
          }
        />
      </FormControl>

      <br />

      {/* survivorDOB */}
      <FormControl sx={{ marginRight: 2, marginBottom: 2 }}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label="Date of Birth"
            inputFormat="MM/DD/YYYY"
            value={survivorDOB}
            onChange={(newValue: Dayjs | null) => {
              setsurvivorDOB(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>

      {/* survivorAge */}
      <FormControl
        required
        sx={{ marginBottom: 2, marginRight: 2, minWidth: 60 }}
      >
        <TextField
          id="outlined-number"
          label="Age"
          type="number"
          onChange={(event) =>
            setData({ ...data, survivorAge: event.target.value })
          }
        />
      </FormControl>

      {/* primaryLanguage */}
      <FormControl
        required
        sx={{ marginBottom: 2, marginRight: 2, minWidth: 420 }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Primary Language"
          onChange={(event) =>
            setData({ ...data, primaryLanguage: event.target.value })
          }
        />
      </FormControl>

      {youthQuestions}

      <div>
        {/* survivorGender */}
        <FormControl sx={{ marginBottom: 2, marginRight: 2, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            label="Gender"
            onChange={(event) =>
              setData({
                ...data,
                survivorGender: event.target.value,
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
            {/* TODO: add new textbox for input for 'Other' option */}
          </Select>
        </FormControl>

        {/* survivorRace */}
        <FormControl sx={{ marginBottom: 2, minWidth: 180 }}>
          <InputLabel id="demo-simple-select-label">Race/Ethnicity</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select-label"
            label="Race/Ethnicity"
            onChange={(event) =>
              setData({
                ...data,
                survivorRace: event.target.value,
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
            {/* TODO: add new textbox for input for 'Other' option */}
          </Select>
        </FormControl>
      </div>

      {/* survivorAddress */}
      <FormControl
        required
        sx={{ marginBottom: 2, marginRight: 2, minWidth: 420 }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Street Address"
          onChange={(event) =>
            setData({ ...data, survivorAddress: event.target.value })
          }
        />
      </FormControl>

      <FormControl
        required
        sx={{ marginBottom: 2, marginRight: 2, minWidth: 240 }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="City"
          onChange={(event) =>
            setData({ ...data, survivorAddress: event.target.value })
          }
        />
      </FormControl>

      <FormControl
        required
        sx={{ marginBottom: 2, marginRight: 2, minWidth: 30 }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="State"
          onChange={(event) =>
            setData({ ...data, survivorAddress: event.target.value })
          }
        />
      </FormControl>

      <FormControl
        required
        sx={{ marginBottom: 2, marginRight: 2, minWidth: 60 }}
      >
        <TextField
          id="outlined-number"
          label="Zip Code"
          type="number"
          onChange={(event) =>
            setData({ ...data, survivorAddress: event.target.value })
          }
        />
      </FormControl>

      <div>
        {/* survivorPhoneNumber */}
        <FormControl
          required
          sx={{ marginBottom: 2, marginRight: 2, minWidth: 240 }}
        >
          <TextField
            id="outlined-number"
            label="Phone Number"
            type="number"
            onChange={(event) =>
              setData({ ...data, survivorPhoneNumber: event.target.value })
            }
          />
        </FormControl>

        {/* survivorEmail */}
        <FormControl
          required
          sx={{ marginBottom: 2, marginRight: 2, minWidth: 360 }}
        >
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Email Address"
            onChange={(event) =>
              setData({ ...data, survivorEmail: event.target.value })
            }
          />
        </FormControl>

        {/* survivorPreferredContactMethod */}
        <FormControl sx={{ width: 240 }}>
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
                survivorPreferredContactMethod: value.join(', '),
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

      <div>
        {/* Relationship to Victim */}
        <FormControl required sx={{ marginBottom: 2, minWidth: 420 }}>
          <InputLabel id="demo-simple-select-required-label">
            Relationship to Victim
          </InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required-label"
            label="Relationship to Victim"
            onChange={(event) =>
              setData({
                ...data,
                relationshipToVictim: event.target.value,
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
      </div>

      {notSelfQuestions}

      {/* additional info */}
      <FormControl
        required
        sx={{ marginBottom: 2, marginRight: 2, minWidth: 1000 }}
      >
        <TextField
          id="outlined-basic"
          variant="outlined"
          label="Additional Info We Should Know About"
          onChange={(event) =>
            setData({ ...data, additionalInfo: event.target.value })
          }
        />
      </FormControl>

      {youthContactQuestions}
    </div>
  );
}
