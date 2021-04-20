import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { render, wait } from '@testing-library/react';

import {
  GET_CLINICS,
  HIDE_TOAST_MESSAGE,
  UPDATE_RESULTANT_CLINICS,
  UPDATE_SEARCHED_CLINICS,
} from '../action';
import {
  mapDispatchToProps,
  mapStateToProps,
  ClinicContainer,
} from '../ClinicContainer';
import { TERMINATED, NONE } from '../../constant';
import { navigateTo } from '../../../../helpers/helpers';

const mockStore = configureStore([]);

const getMe = terminated => ({
  member: {
    wallets: {
      wallets: {},
      planYear: {},
      isWalletsDisabled: false,
    },
    profile: {
      role: 'Employee',
      memberId: 1,
      fullName: 'test name',
      dependants: [
        {
          memberId: 2,
          fullName: 'test name 2',
        },
        {
          memberId: 3,
          fullName: 'test name 3',
        },
      ],
      status: terminated ? TERMINATED : NONE,
    },
  },
});

const benefits = {
  wallets: { isWalletsDisabled: false },
  benefitStatus: {
    hasOutpatient: true,
    hasEHealthCard: true,
  },
};

jest.mock('../../../../helpers/helpers', () => ({
  navigateTo: jest.fn(),
}));

describe('Clinic container', () => {
  it('should match snapshot when user is not terminated', async () => {
    const store = mockStore({ me: getMe(false), benefits });
    const { container } = render(
      <Provider store={store}>
        <ClinicContainer eHealthCardEnabled />
      </Provider>,
    );

    expect(container).toMatchSnapshot();

    await wait(() => {
      expect(navigateTo).not.toHaveBeenCalled();
    });
  });

  it('should match snapshot when user is terminated', () => {
    const store = mockStore({ me: getMe(true), benefits });
    const { container } = render(
      <Provider store={store}>
        <ClinicContainer eHealthCardEnabled />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should pass props to component', () => {
    const state = {
      clinic: {
        clinics: [
          {
            name: 'Dr Test Clinic',
            latitude: 1.3006643,
            longitude: 103.8001065,
            area: 'area1',
            district: 'Central1',
            consultationType: 'test consultation1',
          },
        ],
        openSnackBar: false,
      },
      benefits,
    };
    const expected = {
      clinics: [
        {
          name: 'Dr Test Clinic',
          latitude: 1.3006643,
          longitude: 103.8001065,
          area: 'area1',
          district: 'Central1',
          consultationType: 'test consultation1',
        },
      ],
      openSnackBar: false,
      isWalletsDisabled: false,
    };

    const actual = mapStateToProps(state);

    expect(actual).toEqual(expected);
  });

  it('should dispatch get claims', () => {
    const dispatch = jest.fn();
    const expected = {
      type: GET_CLINICS,
      payload: {},
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.getClinics();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch update resultant clinics', () => {
    const dispatch = jest.fn();
    const clinics = [{ id: 100 }];
    const expected = {
      type: UPDATE_RESULTANT_CLINICS,
      payload: {
        resultantClinics: clinics,
      },
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.setResultantClinics(clinics);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch update searched clinics', () => {
    const dispatch = jest.fn();
    const clinics = [{ id: 100 }];
    const expected = {
      type: UPDATE_SEARCHED_CLINICS,
      payload: {
        searchedClinics: clinics,
      },
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.setSearchedClinics(clinics);

    expect(dispatch).toHaveBeenCalledWith(expected);
  });

  it('should dispatch hide toast message', () => {
    const dispatch = jest.fn();
    const expected = {
      type: HIDE_TOAST_MESSAGE,
      payload: {},
    };
    const dispatchMapToProps = mapDispatchToProps(dispatch);
    dispatchMapToProps.closeSnackBar();

    expect(dispatch).toHaveBeenCalledWith(expected);
  });
});
