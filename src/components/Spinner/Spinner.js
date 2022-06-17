import { Box, Spin, Text } from '@qonsoll/react-design'

import PropTypes from 'prop-types'

const Spinner = (props) => {
  const { text, ...rest } = props

  return (
    <Box
      height="inherit"
      display="flex"
      alignItems="center"
      justifyContent="center"
      {...rest}
    >
      <Spin />
      {text && <Text ml={2}>{text}</Text>}
    </Box>
  )
}

Spinner.propTypes = {
  text: PropTypes.string
}

export default Spinner
