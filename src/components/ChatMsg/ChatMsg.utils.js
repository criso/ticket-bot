import { colors } from '../../lib/constants/Styles';

/**
 * @param {String} type  warning | success | error
 * @returns {{borderColor: String}|{}}
 */
export const getBorderColorFromType = (type) => {
  const byType = {
    warning: colors.warning,
    success: colors.success,
    error: colors.error
  };

  return byType[type] ? { borderColor: byType[type] } : {};
};

/**
 * @param {String} type  warning
 * @returns {{maxWidth: String}}
 */
export const getMaxWidth = (type) => {
  const byType = {
    warning: '100%',
    NONE: '60%'
  };

  return {
    maxWidth: byType[type]
  };
};
