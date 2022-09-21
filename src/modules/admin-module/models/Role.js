import { model, attr } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('Field name has wrong type')
    .required('Field name is required')
})

const Role = model(
  'role',
  {
    name: attr('string')
  },
  validationSchema
)

export default Role
