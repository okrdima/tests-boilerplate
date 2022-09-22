import CategoryAdvancedView from './CategoryAdvancedView'
import { render } from '@testing-library/react'
import ReactRouter from 'react-router-dom'

test('CategoryAdvancedView render test', () => {
  jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' })
  render(<CategoryAdvancedView />)
})
