import 'sass/style.scss';

// import { used } from './data.json';
import { bb } from './functions';

import 'icons/twitter.svg';
import 'icons/facebook.svg';

require.context('favicons', true, /\.(svg|png|ico|xml|json|webmanifest)$/);

document.innerHTML(`${used} aba ${bb}`);
