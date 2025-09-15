import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import AuthProvider from './AuthProvider';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from './useAuth';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('AuthContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>
      <AuthProvider>{children}</AuthProvider>
    </MemoryRouter>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('throws error if used outside provider', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useAuth())).toThrow('[useAuth] Missing Provider');
  });

  it('should have isAuthenticated as false initially', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should set isAuthenticated to true and navigate on login', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    result.current.login('test@test.com', 'password123');
    await waitFor(() => expect(result.current.isAuthenticated).toBe(true));
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should set isAuthenticated to false and navigate on logout', async () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    result.current.login('test@test.com', 'password123');
    await waitFor(() => expect(result.current.isAuthenticated).toBe(true));
    result.current.logout();
    await waitFor(() => expect(result.current.isAuthenticated).toBe(false));
    expect(mockNavigate).toHaveBeenLastCalledWith('/auth');
  });
});
