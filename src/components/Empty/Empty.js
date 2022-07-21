import {
  Button,
  Col,
  Container,
  Img,
  Row,
  Title,
  Box
} from '@qonsoll/react-design'
import { useTranslations } from 'contexts/Translation'
import { PlusOutlined } from '@ant-design/icons'

import PropTypes from 'prop-types'
import noDataLogo from '../../assets/empty.svg'

const Empty = (props) => {
  const {
    withCreate = true,
    withIllustration = true,
    message,
    buttonMessage,
    onCreateButtonClick,
    withText = true
  } = props

  // [ADDITIONAL_HOOKS]
  const { t } = useTranslations()

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Box>
        {withIllustration && (
          <Img mb={4} src={noDataLogo} alt="No data" width={150} />
        )}
        {withText && (
          <Title textAlign="center" level={4}>
            {message || t('No data')}
          </Title>
        )}
        {withCreate && (
          <Button
            mt={2}
            block
            icon={<PlusOutlined />}
            onClick={onCreateButtonClick}
            type="primary"
          >
            {buttonMessage || t('Create')}
          </Button>
        )}
      </Box>
    </Container>
  )
}

Empty.propTypes = {
  message: PropTypes.string,
  buttonMessage: PropTypes.string,
  onCreateButtonClick: PropTypes.func,
  showImage: PropTypes.bool,
  withCreate: PropTypes.bool,
  withIllustration: PropTypes.bool,
  withText: PropTypes.bool
}

export default Empty
