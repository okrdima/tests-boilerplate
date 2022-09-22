import { model, attr } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('Field name has wrong type')
    .default(null)
    .nullable()
})

const MaterialType = model(
  'materialType',
  {
    name: attr('string')
  },
  validationSchema
)

export default MaterialType
