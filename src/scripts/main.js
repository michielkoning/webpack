import 'sass/style.scss';

// import { used } from './data.json';
import { bb } from './functions';

require.context('favicons', true, /\.(svg|png|ico|xml|json|webmanifest)$/);
require.context('icons', true, /\.(svg|png|ico|xml|json|webmanifest)$/);

document.innerHTML(`${used} aba ${bb}`);
