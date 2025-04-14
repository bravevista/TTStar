import { moderateScale } from 'react-native-size-matters';

export interface Typography {
    fontSizes: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
        xxxl: number;
    };
    fontWeights: {
        light: FontWeight;
        regular: FontWeight;
        medium: FontWeight;
        semibold: FontWeight;
        bold: FontWeight;
    };
    lineHeights: {
        tight: number;
        normal: number;
        relaxed: number;
    };
};

type FontWeight = 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900';

export const typography: Typography = {
    fontSizes: {
        xs: moderateScale(10), //12
        sm: moderateScale(12), //14  
        md: moderateScale(14), //16
        lg: moderateScale(16), //18
        xl: moderateScale(18), //20
        xxl: moderateScale(22), //24
        xxxl: moderateScale(28), //30
    },
    fontWeights: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
    },
    lineHeights: {
        tight: 1.25,
        normal: 1.5,
        relaxed: 1.75,
    }
};