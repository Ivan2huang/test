import DefaultImages from './images';
import CendolImages from './images.cendol';
import BasilImages from './images.basil';
import GingerImages from './images.ginger';
import CoreImages from './images.core';

import CONFIG from '../config';

const images = {
  cendol: CendolImages,
  basil: BasilImages,
  ginger: GingerImages,
  core: CoreImages,
};

const exportedImages = images[CONFIG.themeCode] || DefaultImages;

export default exportedImages;
