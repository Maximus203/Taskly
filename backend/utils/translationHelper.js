// backend/utils/translationHelper.js
const STATUS_TRANSLATION = {
    'pending': 'En attente',
    'in_progress': 'En cours',
    'completed': 'Terminé'
};

const IMPORTANCE_TRANSLATION = {
    'low': 'Faible',
    'medium': 'Moyenne',
    'high': 'Haute'
};

const translateStatus = (status) => STATUS_TRANSLATION[status];
const translateImportance = (importance) => IMPORTANCE_TRANSLATION[importance];

module.exports = {
    translateStatus,
    translateImportance
};
