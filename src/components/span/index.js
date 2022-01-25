import './style.scss';
import EfSpan from './Span';
import EfTimeSpan from './TimeSpan';
import EfSwitchSpan from './SwitchSpan';
import EfJoinSpan from './JoinSpan';
import matcher from './matcher';

EfSpan.install = Vue => {
  Vue.component(EfSpan.name, EfSpan);
  Vue.component(EfTimeSpan.name, EfTimeSpan);
  Vue.component(EfSwitchSpan.name, EfSwitchSpan);
  Vue.component(EfJoinSpan.name, EfJoinSpan);
};

export {
  EfSpan as default,
  EfSpan,
  EfTimeSpan,
  EfSwitchSpan,
  EfJoinSpan,
  matcher
};
