
import * as Localization from 'expo-localization';
const { currencyCode, languageTag } = Localization.getLocales()[0];

const transformPrice = (price: number) => {
    const currency = currencyCode || 'USD';
    const locale = languageTag || 'es-CL';
    return new Intl.NumberFormat(locale, {
        currency: currency,
        style: 'currency',
        currencySign: 'accounting',
    }).format(price);
};

export default transformPrice;