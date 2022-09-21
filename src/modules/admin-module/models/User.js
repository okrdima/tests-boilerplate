import { model, attr } from 'services/model'
import * as yup from 'yup'

const validationSchema = yup.object().shape({
  imageUrl: yup
    .string()
    .typeError('Field imageUrl has wrong type')
    .default(null)
    .nullable(),
  firstName: yup
    .string()
    .typeError('Field first name has wrong type')
    .required('Field name is required'),
  lastName: yup
    .string()
    .typeError('Field last name has wrong type')
    .default(null)
    .nullable()
})

const User = model(
  'user',
  {
    imageUrl: attr('string'),
    firstName: attr('string'),
    lastName: attr('string')
  },
  validationSchema
)

export default User
