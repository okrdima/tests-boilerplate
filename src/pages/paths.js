const PATHS = {
  CONFIG: {
    DEFAULT: '/auth',
    AFTER_LOGIN: '/dashboard',
    AFTER_LOGOUT: '/auth',
    AFTER_SIGNUP: '/dashboard'
  },
  UNAUTHENTICATED: {
    LOGIN: '/auth',
    LOGIN_WITH_EMAIL: '/auth/login-with-email',
    SIGNUP: '/auth/signup',
    SIGNUP_WITH_EMAIL: '/auth/sign-up-with-email',
    FORGOT_PASSWORD: '/auth/forgot-password',
    CONFIRM_EMAIL: '/auth/confirm-email'
  },
  SERVICE: {
    ACCESS_DENIED: '/service/access-denied',
    GDPR: '/service/gdpr',
    NOT_FOUND: '/service/404',
    TERMS_AND_CONDITIONS: '/service/terms-and-conditions'
  },
  AUTHENTICATED: {
    DASHBOARD: '/dashboard',
    USER_SHOW: '/users/:userId',
    TRANSLATIONS: '/translations',
    SETTINGS: '/settings',
    STATISTICS: '/statistics',
    MATERIALS_ALL: '/materials',
    MATERIAL_SHOW: '/materials/:materialId',
    MATERIAL_CREATE: '/material/create',
    MATERIAL_EDIT: '/materials/:materialId/edit',
    KEYWORD_SHOW: '/keywords/:keywordId',
    KEYWORD_EDIT: '/keywords/:keywordId/edit',
    KEYWORDS_ALL: '/keywords',
    KEYWORD_CREATE: '/keyword/create',
    CATEGORY_SHOW: '/categories/:categoryId',
    CATEGORY_EDIT: '/categories/:categoryId/edit',
    CATEGORIES_ALL: '/categories',
    CATEGORY_CREATE: '/category/create',
    MATERIAL_TYPE_SHOW: '/material-types/:materialTypeId',
    MATERIAL_TYPE_EDIT: '/material-types/:materialTypeId/edit',
    ARTICLES_ALL: '/articles',
    ARTICLE_SHOW: '/articles/:articleId',
    ARTICLE_CREATE: '/article/create',
    ARTICLE_EDIT: '/articles/:articleId/edit'
  }
}

export default PATHS
