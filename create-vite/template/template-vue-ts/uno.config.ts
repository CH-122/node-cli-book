import {
  defineConfig,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
  UserConfig,
} from 'unocss';
import { Theme } from 'unocss/preset-mini';
import { generateUnocssTheme } from '@itshixun/qst-ui-system';

export const theme: Theme = Object.assign(generateUnocssTheme(), {
  breakpoints: {
    xxs: '380px',
    xs: '480px',
    sm: '640px',
    md: '768px',
    df: '900px',
    lg: '1024px',
    xl: '1280px',
    xxl: '1536px',
  },
  boxShadow: {
    // boxShadow example
    card: '0 2px 20px color-mix(in srgb, var(--el-color-info-light-8) 50%, transparent)',
  },
});

export const uplusIconCollection = {
  // uplus logo
  logo: '<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="22" cy="22" r="22" fill="#217AFF"/><path d="M28.4934 15.5298H25.2642V24.4631C25.2646 24.6008 25.2646 24.7383 25.2573 24.8771H25.2538C25.2531 24.9066 25.2542 24.9352 25.2519 24.966C25.087 28.0246 22.556 30.2588 19.5915 30.0887C18.1957 30.0087 16.955 29.3844 16.0488 28.4287C17.1818 30.2433 19.1129 31.4962 21.3572 31.625C24.8455 31.8258 27.8713 29.2475 28.4108 25.7623C28.4422 25.5271 28.4669 25.2875 28.4798 25.0448C28.4876 24.8996 28.4854 24.7558 28.4856 24.6119H28.4934V15.5298Z" fill="white"/><path d="M21.3321 32.0915C17.4789 31.8702 14.4926 28.5514 14.5177 24.6119C14.5166 24.4894 14.5187 24.3673 14.5252 24.2429C14.5256 24.2342 14.5272 24.226 14.5278 24.2173H14.5177V15.5298H14.5172H11.2886V24.6119V24.8871L11.2996 24.8785C11.4565 29.4119 14.9371 33.1575 19.4118 33.4152C22.2244 33.5765 24.7949 32.325 26.4787 30.2615C25.1082 31.4967 23.2892 32.2035 21.3321 32.0915Z" fill="white"/><path d="M30.7853 18.3383C30.5611 18.3383 30.3316 18.3383 30.1011 18.3383V19.6831C30.3596 19.6831 30.5597 19.6831 30.7853 19.6831C30.8764 19.6831 30.9545 19.6831 31.0149 19.6831C32.1061 19.6831 32.8132 19.01 32.8132 19.01L33.5116 18.3425H33.4998L33.5116 18.3381C33.5116 18.3383 32.2608 18.3383 30.7853 18.3383Z" fill="white"/><path d="M36.1646 19.6833C36.389 19.6833 36.6184 19.6833 36.849 19.6833V18.3385C36.5905 18.3385 36.3905 18.3385 36.1646 18.3385C36.0737 18.3385 35.9958 18.3385 35.9352 18.3385C34.8443 18.3385 34.1366 19.0116 34.1366 19.0116L33.4385 19.6791H33.45L33.4385 19.6835C33.4385 19.6833 34.6889 19.6833 36.1646 19.6833Z" fill="white"/><path d="M34.1255 16.236C34.1255 16.0039 34.1255 15.7675 34.1255 15.5298H32.8228C32.8228 15.7964 32.8228 16.0027 32.8228 16.236C32.8228 16.3298 32.8228 16.4093 32.8228 16.4723C32.8228 17.5983 33.4749 18.3281 33.4749 18.3281L34.1218 19.0487V19.0362L34.1255 19.0487C34.1255 19.0489 34.1255 17.7585 34.1255 16.236Z" fill="white"/><path d="M32.8228 21.7854C32.8228 22.0175 32.8228 22.2539 32.8228 22.4916H34.1255C34.1255 22.225 34.1255 22.0187 34.1255 21.7854C34.1255 21.6916 34.1255 21.6116 34.1255 21.5491C34.1255 20.4231 33.4734 19.6933 33.4734 19.6933L32.8265 18.9727V18.9846L32.8228 18.9727C32.8228 18.9725 32.8228 20.2629 32.8228 21.7854Z" fill="white"/></svg>',
};

/** 将上方自定义的svg图表类明生成列表，传给下面配置中的safeList，保证动态嵌入的自定义图标样式有效 */
export const getUplusIconList = () => {
  const list: string[] = [];
  for (const key in uplusIconCollection) {
    list.push('i-uplus:' + uplusIconCollection[key]);
  }
  return list;
};

const config: UserConfig = defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      scale: 1,
      warn: true,
      collections: {
        uplus: uplusIconCollection,
      },
    }),
  ],
  // unocss can't render icon class dynamically, when adding menu icon class
  // in route.meta.menuConfig, you must also add the icon class in safelist.
  // TODO get icon name list from all route's meta.iconName
  safelist: [...getUplusIconList(), 'i-mdi-home', 'i-mdi-information'],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme,
});

export default config;
