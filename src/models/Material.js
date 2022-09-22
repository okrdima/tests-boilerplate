import { model, attr, hasMany, hasOne, belongsTo } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  url: yup
    .string()
    .typeError('Field url has wrong type')
    .default(null)
    .nullable(),
  keywords: yup
    .array()
    .typeError('Field keywords has wrong type')
    .default(null)
    .nullable(),
  category: yup
    .string()
    .typeError('Field category has wrong type')
    .default(null)
    .nullable(),
  type: yup
    .string()
    .typeError('Field type has wrong type')
    .default(null)
    .nullable()
})

const Material = model(
  'material',
  {
    url: attr('string'),
    keywords: hasMany('keyword'),
    category: hasOne('category'),
    type: belongsTo('materialType')
  },
  validationSchema
)

export default Material
