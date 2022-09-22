import MaterialAdvancedView from './MaterialAdvancedView'
import { render } from '@testing-library/react'
import ReactRouter from 'react-router-dom'

test('MaterialAdvancedView render test', () => {
  jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' })
  render(<MaterialAdvancedView />)
})
