import ZH_CN from './zh_cn';
import ZH_TW from './zh_tw';
import EN from './en';
import AR from './ar';
import KO from './ko';
import VI from './vi';
import TH from './th';
import MS from './ms';
import ID from './id';
import TR from './tr';
import BN from './bn';
import HI from './hi';
import UR from './ur';

export default class Locale {
  static language = 'en';
  static init(lan = 'en') {
    lan = lan.toLowerCase();
    this.language = lan;
    return (
      {
        zh_cn: ZH_CN,
        zh_tw: ZH_TW,
        en: EN,
        ar: AR,
        ko: KO,
        vi: VI,
        th: TH,
        ms: MS,
        id: ID,
        tr: TR,
        bn: BN,
        hi: HI,
        ur: UR,
      }[lan] || EN
    );
  }
}