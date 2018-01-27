import './lib/util/customPolyfills';
import { ap, q, cr, on } from './lib/ui/dom';
import button from './lib/ui/button';
import sfx from './lib/sfx';

const render = () => {

  // Remove all content from container
  const container = q('.app-container');
  container.innerHTML = '';

  const volumeFader = cr('input', null, null, {
    type: 'range',
    min: 0,
    max: 100,
    step: 1,
    value: 100
  });

  on(volumeFader, 'input', (event) => sfx.setVolume(event.target.value));

  ap(container,
    button(() => sfx.play('click'), null, 'CLICK'),
    button(() => sfx.play('pong'), null, 'PONG'),
    volumeFader
  );

};

render();
