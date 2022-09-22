import KeywordAdvancedView from './KeywordAdvancedView'
import { render } from '@testing-library/react'
import ReactRouter from 'react-router-dom'

test('KeywordAdvancedView render test', () => {
  jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: '1234' })
  render(<KeywordAdvancedView />)
})
