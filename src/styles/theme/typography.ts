interface Typography {
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
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 20,
        xxl: 24,
        xxxl: 30,
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