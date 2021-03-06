import { Animation, MenuI } from '../../../interface';

import { baseAnimation } from './base';

const BOX_SHADOW_WIDTH = 8;
/**
 * @hidden
 * Menu Overlay Type
 * The menu slides over the content. The content
 * itself, which is under the menu, does not move.
 */
export function menuOverlayAnimation(AnimationC: Animation, _: HTMLElement, menu: MenuI): Promise<Animation> {
  let closedX: string;
  let openedX: string;
  const width = menu.width + BOX_SHADOW_WIDTH;
  if (menu.isEndSide) {
    // right side
    closedX = width + 'px';
    openedX = '0px';

  } else {
    // left side
    closedX = -width + 'px';
    openedX = '0px';
  }

  const menuAni = new AnimationC()
    .addElement(menu.menuInnerEl)
    .fromTo('translateX', closedX, openedX);

  const backdropAni = new AnimationC()
    .addElement(menu.backdropEl)
    .fromTo('opacity', 0.01, 0.3);

  return baseAnimation(AnimationC).then(animation => {
    return animation.add(menuAni)
      .add(backdropAni);
  });
}
