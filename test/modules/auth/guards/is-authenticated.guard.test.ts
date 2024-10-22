import isAuthenticatedGuard from '@/modules/auth/guards/is-authenticated.guard';
import type { RouteLocationNormalized } from 'vue-router';

describe('is-authenticated.guard', () => {
  const to: RouteLocationNormalized = {
    name: undefined,
    params: {},
    matched: [],
    fullPath: '',
    query: {},
    hash: '',
    redirectedFrom: undefined,
    path: '/home-screen',
    meta: {},
  };

  const next = vi.fn();

  beforeEach(() => {
    localStorage.clear();
  });

  test('should block if not authenticated', async () => {
    await isAuthenticatedGuard(to, to, next);

    expect(next).toHaveBeenCalledWith({
      name: 'login',
    });
  });

  test('should call localStorage setItem lastPath', async () => {
    await isAuthenticatedGuard(to, to, next);

    const lastPath = localStorage.getItem('lastPath');

    expect(lastPath).toBe(to.path);
  });

  test('should block if not authenticated with spies', async () => {
    const setItemSpy = vi.spyOn(Storage.prototype, 'setItem');

    await isAuthenticatedGuard(to, to, next);
    expect(setItemSpy).toHaveBeenCalledWith('lastPath', to.path);
  });

  test('should call next if authenticated', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue('ABC-123');
    await isAuthenticatedGuard(to, to, next);

    expect(next).toHaveBeenCalledWith();
  });
});
