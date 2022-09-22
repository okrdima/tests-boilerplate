import ArticleAdvancedView from './ArticleAdvancedView'
import { render } from '@testing-library/react'
import ReactRouter from 'react-router-dom'

test('ArticleAdvancedView render test', () => {
  jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ categoryId: '1234' })
  render(<ArticleAdvancedView />)
})
