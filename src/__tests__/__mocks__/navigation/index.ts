export const mockNavigation = {
  navigate: jest.fn(),
  goBack: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  reset: jest.fn(),
  setParams: jest.fn(),
  dispatch: jest.fn(),
  canGoBack: jest.fn(() => true),
  isFocused: jest.fn(() => true),
  getState: jest.fn(),
  addListener: jest.fn(),
  removeListener: jest.fn(),
  setOptions: jest.fn(),
  getParent: jest.fn(),
  getId: jest.fn(() => 'mock-id'),
  setStateForNextRouteNamesChange: jest.fn(),
  navigateDeprecated: jest.fn(),
  preload: jest.fn(),
  pop: jest.fn(),
  popTo: jest.fn(),
  popToTop: jest.fn(),
};
