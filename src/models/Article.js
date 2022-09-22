import { model, attr, hasMany } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('Field name has wrong type')
    .required('Field name is required'),
  materials: yup
    .array()
    .typeError('Field materials has wrong type')
    .default(null)
    .nullable()
})

const Article = model(
  'article',
  {
    name: attr('string'),
    materials: hasMany('material')
  },
  validationSchema
)

export default Article
