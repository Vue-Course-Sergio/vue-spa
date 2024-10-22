import App from '@/App.vue';
import router from '@/router';
import { mount } from '@vue/test-utils';
import type { _RouteRecordProps, RouteLocationNormalized } from 'vue-router';

describe('Router', () => {
  const wrapper = mount(App, {
    global: {
      plugins: [router],
    },
  });

  test('should render HomePage when visiting /', async () => {
    await router.replace('/');
    await router.isReady();
    expect(wrapper.html()).toContain('Bienvenido a nuestro sitio web');
  });

  test('should render FeaturesPage when visiting /features', async () => {
    await router.replace('/features');
    await router.isReady();
    expect(wrapper.html()).toContain('Master Cleanse Reliac Heirloom');
  });

  test('should render PricingPage when visiting /pricing', async () => {
    await router.replace('/pricing');
    await router.isReady();
    expect(wrapper.html()).toContain('Flexible');
  });

  test('should render ContactPage when visiting /contact', async () => {
    await router.replace('/contact');
    await router.isReady();
    expect(wrapper.html()).toContain('Feedback');
  });

  test('should render LoginPage when visiting /pokemon/:id is not authenticated', async () => {
    localStorage.clear();

    await router.replace('/pokemon/10');
    await router.isReady();
    expect(wrapper.find('h1').text()).toContain('Login');
  });

  test('should render PokemonPage when visiting /pokemon/:id when is authenticated', async () => {
    localStorage.setItem('userId', 'abc-123');

    await router.replace('/pokemon/10');
    await router.isReady();
    expect(wrapper.find('h1').text()).toBe('Pokémon #10');
  });

  test('should convert the segment into numbers', () => {
    const route: RouteLocationNormalized = {
      name: undefined,
      params: { id: '2' },
      matched: [],
      fullPath: '/pokemon/2',
      query: {},
      hash: '',
      redirectedFrom: undefined,
      meta: {},
      path: '',
    };

    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    const { id } = (pokemonRoute?.props as any).default(route);

    expect(pokemonRoute).toBeTruthy();
    expect(id).toBe(2);
  });

  test('should return default value if argument is not a number', () => {
    const route = {
      params: { id: '2abc' },
      fullPath: '/pokemon/2',
    };

    const pokemonRoute = router.getRoutes().find((route) => route.name === 'pokemon');

    const { id } = (pokemonRoute?.props as any).default(route);

    expect(pokemonRoute).toBeTruthy();
    expect(id).toBe(1);
  });
});
