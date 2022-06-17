import PropTypes from 'prop-types'
import { Box, Text, Spin } from '@qonsoll/react-design'
// import { Spin } from 'antd'

// import { Spin } from 'antd'

// const Spinner = () => {
//   return (
//     <Container py={6}>
//       <Row h="center">
//         <Col cw="auto">
//           <Spin />
//         </Col>
//       </Row>
//     </Container>
//   )
// }

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
