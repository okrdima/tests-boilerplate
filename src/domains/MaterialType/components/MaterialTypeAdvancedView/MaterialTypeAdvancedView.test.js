import MaterialTypeAdvancedView from './MaterialTypeAdvancedView'
import { render } from '@testing-library/react'
import ReactRouter from 'react-router-dom'

test('MaterialTypeAdvancedView render test', () => {
  jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' })
  render(<MaterialTypeAdvancedView />)
})
